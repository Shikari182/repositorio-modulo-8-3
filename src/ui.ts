import { Tablero} from "./model";
import { 
    iniciaPartida, 
    sePuedeVoltearLaCarta, 
    voltearLaCarta, 
    sonPareja, // <-- Importación correctamente referenciada
    parejaEncontrada, 
    parejaNoEncontrada,
    esPartidaCompleta
} from "./motor";

let tablero: Tablero = iniciaPartida();

const actualizarInterfaz = (tablero: Tablero) => {
    renderizarCartas();
    actualizarContador(tablero.intentos);
  };
  
  const actualizarContador = (intentos: number) => {
    const contador = document.getElementById("contador-intentos");
    if (contador) {
      contador.textContent = `Intentos fallidos: ${intentos}`;
    }
  };

  const actualizarTablero = (nuevoTablero: Tablero): void => {
    tablero = nuevoTablero;
    actualizarInterfaz(tablero); // Actualiza tanto cartas como contador
  };


const renderizarCartas = (): void => {
    const contenedor = document.getElementById("tablero");
    if (!contenedor) return;
  
    contenedor.innerHTML = "";
    tablero.cartas.forEach((carta, indice) => {
      const elementoCarta = document.createElement("div");
      elementoCarta.className = "carta";
      elementoCarta.dataset.indice = indice.toString();
      
      if (carta.encontrada) {
        elementoCarta.classList.add("encontrada", "volteada");
      } else if (carta.estaVuelta) {
        elementoCarta.classList.add("volteada");
      }
      
      elementoCarta.innerHTML = `
        <div class="cara dorso">?</div>
        <div class="cara frente">
          <img src="${carta.imagen}" alt="Carta ${carta.idFoto}" class="imagen-carta">
        </div>
      `;
  
      if (!carta.encontrada) {
        elementoCarta.addEventListener("click", () => manejarClickCarta(indice));
      }
  
      contenedor.appendChild(elementoCarta);
    });
  };;

  const manejarClickCarta = async (indice: number): Promise<void> => {
    const elementoCarta = document.querySelector(`[data-indice="${indice}"]`);
    
    if (!elementoCarta || !sePuedeVoltearLaCarta(tablero, indice)) return;
  
    // Aplicar animación
    elementoCarta.classList.add('click-animation');
    await new Promise(resolve => setTimeout(resolve, 300));
    elementoCarta.classList.remove('click-animation');
  
    // Resto de la lógica...
    const nuevoTablero = voltearLaCarta(tablero, indice);
    actualizarTablero(nuevoTablero);

    if (nuevoTablero.estadoPartida === "DosCartasLevantadas") {
        // Usamos await dentro de una función async
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (nuevoTablero.indiceCartaVolteadaA === undefined || 
            nuevoTablero.indiceCartaVolteadaB === undefined) return;

        // Corregimos el nombre de la variable para evitar conflicto
        const esPareja = sonPareja(
            nuevoTablero.indiceCartaVolteadaA,
            nuevoTablero.indiceCartaVolteadaB,
            nuevoTablero
        );

        const tableroActualizado = esPareja 
            ? parejaEncontrada(nuevoTablero) 
            : parejaNoEncontrada(nuevoTablero);

        actualizarTablero(tableroActualizado);

        if (esPartidaCompleta(tableroActualizado)) {
            alert("¡Has ganado!");
        }
    }
};

export const inicializarJuego = () => {
    const botonInicio = document.getElementById("inicio");
    if (botonInicio) {
        botonInicio.addEventListener("click", () => {
            actualizarTablero(iniciaPartida());
        });
    }
    renderizarCartas();
};

