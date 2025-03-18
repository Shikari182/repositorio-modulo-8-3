import { Carta, Tablero, crearColeccionCartas, EstadoPartida } from "./model";

export const barajarCartas = (cartas: Carta[]): Carta[] => {
  return [...cartas].sort(() => Math.random() - 0.5);
};

export const sePuedeVoltearLaCarta = (tablero: Tablero, indice: number): boolean => {
  const carta = tablero.cartas[indice];
  return !carta.encontrada && 
         !carta.estaVuelta && 
         tablero.estadoPartida !== "DosCartasLevantadas";
};

export const voltearLaCarta = (tablero: Tablero, indice: number): Tablero => {
  const nuevasCartas = [...tablero.cartas];
  nuevasCartas[indice] = { ...nuevasCartas[indice], estaVuelta: true };

  let nuevoEstado: EstadoPartida = tablero.estadoPartida;
  let indiceA = tablero.indiceCartaVolteadaA;
  let indiceB = tablero.indiceCartaVolteadaB;

  switch (tablero.estadoPartida) {
    case "CeroCartasLevantadas":
      indiceA = indice;
      nuevoEstado = "UnaCartaLevantada";
      break;
      
    case "UnaCartaLevantada":
      indiceB = indice;
      nuevoEstado = "DosCartasLevantadas";
      break;
  }

  return {
    ...tablero,
    cartas: nuevasCartas,
    estadoPartida: nuevoEstado,
    indiceCartaVolteadaA: indiceA,
    indiceCartaVolteadaB: indiceB
  };
};
export const sonPareja = (indiceA: number, indiceB: number, tablero: Tablero): boolean => {
  return tablero.cartas[indiceA].idFoto === tablero.cartas[indiceB].idFoto;
};

export const parejaEncontrada = (tablero: Tablero): Tablero => {
  const nuevasCartas = [...tablero.cartas];
  if (tablero.indiceCartaVolteadaA !== undefined && tablero.indiceCartaVolteadaB !== undefined) {
    nuevasCartas[tablero.indiceCartaVolteadaA] = {
      ...nuevasCartas[tablero.indiceCartaVolteadaA],
      encontrada: true,
      estaVuelta: true 
    };
    nuevasCartas[tablero.indiceCartaVolteadaB] = {
      ...nuevasCartas[tablero.indiceCartaVolteadaB],
      encontrada: true,
      estaVuelta: true 
    };
  }
  
  return {
    ...tablero,
    cartas: nuevasCartas,
    estadoPartida: "CeroCartasLevantadas",
    indiceCartaVolteadaA: undefined,
    indiceCartaVolteadaB: undefined
  };
};

export const parejaNoEncontrada = (tablero: Tablero): Tablero => {
  const nuevasCartas = tablero.cartas.map((carta, index) => {
    // Voltear solo las dos cartas levantadas
    if (
      index === tablero.indiceCartaVolteadaA ||
      index === tablero.indiceCartaVolteadaB
    ) {
      return { ...carta, estaVuelta: false };
    }
    return carta;
  });

  return {
    ...tablero,
    cartas: nuevasCartas,
    estadoPartida: "CeroCartasLevantadas",
    indiceCartaVolteadaA: undefined,
    indiceCartaVolteadaB: undefined,
    intentos: tablero.intentos + 1
  };
};

export const esPartidaCompleta = (tablero: Tablero): boolean => {
  return tablero.cartas.every(carta => carta.encontrada);
};

export const iniciaPartida = (): Tablero => ({
  cartas: crearColeccionCartas(), // No usar barajarCartas aquí
  estadoPartida: "CeroCartasLevantadas",
  indiceCartaVolteadaA: undefined,
  indiceCartaVolteadaB: undefined,
  intentos: 0
});