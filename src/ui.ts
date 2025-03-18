import { Tablero} from "./model";
import { 
    iniciaPartida, 
    sePuedeVoltearLaCarta, 
    voltearLaCarta, 
    sonPareja, 
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
    actualizarInterfaz(tablero); 
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

  const manejarAnimacionClick = (elementoCarta: Element, callback: () => void): void => {
    elementoCarta.classList.add('click-animation');
    setTimeout(() => {
      elementoCarta.classList.remove('click-animation');
      callback();
    }, 300);
  };
  
  const procesarSegundaCarta = (nuevoTablero: Tablero, callback: (esPareja: boolean) => void): void => {
    setTimeout(() => {
      if (nuevoTablero.indiceCartaVolteadaA === undefined || 
          nuevoTablero.indiceCartaVolteadaB === undefined) return;
  
      const esPareja = sonPareja(
        nuevoTablero.indiceCartaVolteadaA,
        nuevoTablero.indiceCartaVolteadaB,
        nuevoTablero
      );
      
      callback(esPareja);
    }, 1000);
  };
  
  const manejarResultadoPareja = (tableroActual: Tablero, esPareja: boolean): void => {
    const tableroActualizado = esPareja 
      ? parejaEncontrada(tableroActual) 
      : parejaNoEncontrada(tableroActual);
  
    actualizarTablero(tableroActualizado);
  
    if (esPartidaCompleta(tableroActualizado)) {
      mostrarMensajeVictoria();
    }
  };
  
  const mostrarMensajeVictoria = (): void => {
    const mensaje = document.getElementById("mensaje-victoria");
    if (mensaje) {
      mensaje.classList.remove("mensaje-oculto");
    }
    
    const botonCerrar = document.getElementById("cerrar-mensaje");
    if (botonCerrar) {
      botonCerrar.onclick = () => {
        if (mensaje) {
          mensaje.classList.add("mensaje-oculto");
        }
      };
    }
  };
  
  const manejarClickCarta = (indice: number): void => {
    const elementoCarta = document.querySelector(`[data-indice="${indice}"]`);
    
    if (!elementoCarta || !sePuedeVoltearLaCarta(tablero, indice)) return;
  
    manejarAnimacionClick(elementoCarta, () => {
      const nuevoTablero = voltearLaCarta(tablero, indice);
      actualizarTablero(nuevoTablero);
  
      if (nuevoTablero.estadoPartida === "DosCartasLevantadas") {
        procesarSegundaCarta(nuevoTablero, (esPareja) => {
          manejarResultadoPareja(nuevoTablero, esPareja);
        });
      }
    });
  };
  
  export const inicializarJuego = () => {
    const botonInicio = document.getElementById("inicio");
    if (botonInicio) {
      botonInicio.addEventListener("click", () => {
        actualizarTablero(iniciaPartida());
      });
    }
    renderizarCartas();
    const mensaje = document.getElementById("mensaje-victoria");
    if (mensaje) {
      mensaje.classList.add("mensaje-oculto");
    }
  };
  