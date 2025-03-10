import "./style.css";

// Set de datos inicial 

type Especialidad = "Medico de familia" | "Pediatra" | "Cardiólogo";

interface Pacientes {
  id: number;
  nombre: string;
  apellidos: string;
  sexo: string;
  temperatura: number;
  frecuenciaCardiaca: number;
  especialidad: Especialidad;
  edad: number;
}

 // Aquí añado la interface que hace falta para el apartado 5
interface NumeroPacientesPorEspecialidad {
  medicoDeFamilia: number;
  pediatria: number;
  cardiologia: number;
}

const pacientes: Pacientes[] = [
  {
    id: 1,
    nombre: "John",
    apellidos: "Doe",
    sexo: "Male",
    temperatura: 36.8,
    frecuenciaCardiaca: 80,
    especialidad: "Medico de familia",
    edad: 44,
  },
  {
    id: 2,
    nombre: "Jane",
    apellidos: "Doe",
    sexo: "Female",
    temperatura: 36.8,
    frecuenciaCardiaca: 70,
    especialidad: "Medico de familia",
    edad: 43,
  },
  {
    id: 3,
    nombre: "Junior",
    apellidos: "Doe",
    sexo: "Male",
    temperatura: 36.8,
    frecuenciaCardiaca: 90,
    especialidad: "Pediatra",
    edad: 8,
  },
  {
    id: 4,
    nombre: "Mary",
    apellidos: "Wien",
    sexo: "Female",
    temperatura: 36.8,
    frecuenciaCardiaca: 120,
    especialidad: "Medico de familia",
    edad: 20,
  },
  {
    id: 5,
    nombre: "Scarlett",
    apellidos: "Somez",
    sexo: "Female",
    temperatura: 36.8,
    frecuenciaCardiaca: 110,
    especialidad: "Cardiólogo",
    edad: 30,
  },
  {
    id: 6,
    nombre: "Brian",
    apellidos: "Kid",
    sexo: "Male",
    temperatura: 39.8,
    frecuenciaCardiaca: 80,
    especialidad: "Pediatra",
    edad: 11,
  },
];

// APARTADO 1

// a) Extraer la lista de pacientes asignados a Pediatría
const obtenPacientesAsignadosAPediatria = (
  pacientes: Pacientes[]
): Pacientes[] => {
  let pacientesPediatria: Pacientes[] = [];
  for (let i = 0; i < pacientes.length; i++) {
    if (pacientes[i].especialidad === "Pediatra") {
      pacientesPediatria[pacientesPediatria.length] = pacientes[i];
    }
  }
  return pacientesPediatria;
};

// b) Extraer la lista de pacientes asignados a Pediatría y con edad menor de 10 años
const obtenPacientesAsignadosAPediatriaYMenorDeDiezAnios = (
  pacientes: Pacientes[]
): Pacientes[] => {
  let pacientesFiltrados: Pacientes[] = [];
  let i = 0;
  while (i < pacientes.length) {
    if (
      pacientes[i].especialidad === "Pediatra" &&
      pacientes[i].edad < 10
    ) {
      pacientesFiltrados[pacientesFiltrados.length] = pacientes[i];
    }
    i++;
  }
  return pacientesFiltrados;
};

// APARTADO 2

const activarProtocoloUrgencia = (pacientes: Pacientes[]): boolean => {
  let activarProtocolo = false;
  for (let i = 0; i < pacientes.length; i++) {
    if (
      pacientes[i].frecuenciaCardiaca > 100 &&
      pacientes[i].temperatura > 39
    ) {
      activarProtocolo = true;
      break;
    }
  }
  return activarProtocolo;
};

// APARTADO 3

const reasignaPacientesAMedicoFamilia = (
  pacientes: Pacientes[]
): Pacientes[] => {
  let pacientesReasignados: Pacientes[] = [];
  for (let i = 0; i < pacientes.length; i++) {
    let nuevaEspecialidad = pacientes[i].especialidad;
    if (nuevaEspecialidad === "Pediatra") {
      nuevaEspecialidad = "Medico de familia";
    }
    let pacienteModificado: Pacientes = {
      id: pacientes[i].id,
      nombre: pacientes[i].nombre,
      apellidos: pacientes[i].apellidos,
      sexo: pacientes[i].sexo,
      temperatura: pacientes[i].temperatura,
      frecuenciaCardiaca: pacientes[i].frecuenciaCardiaca,
      especialidad: nuevaEspecialidad,
      edad: pacientes[i].edad,
    };
    pacientesReasignados[pacientesReasignados.length] = pacienteModificado;
  }
  return pacientesReasignados;
};

// APARTADO 4

const HayPacientesDePediatria = (pacientes: Pacientes[]): boolean => {
  let hayPediatra = false;
  for (let i = 0; i < pacientes.length; i++) {
    if (pacientes[i].especialidad === "Pediatra") {
      hayPediatra = true;
      break;
    }
  }
  return hayPediatra;
};

// APARTADO 5

const cuentaPacientesPorEspecialidad = (
  pacientes: Pacientes[]
): NumeroPacientesPorEspecialidad => {
  let contador: NumeroPacientesPorEspecialidad = {
    medicoDeFamilia: 0,
    pediatria: 0,
    cardiologia: 0,
  };

  for (let i = 0; i < pacientes.length; i++) {
    if (pacientes[i].especialidad === "Medico de familia") {
      contador.medicoDeFamilia++;
    } else if (pacientes[i].especialidad === "Pediatra") {
      contador.pediatria++;
    } else if (pacientes[i].especialidad === "Cardiólogo") {
      contador.cardiologia++;
    }
  }
  return contador;
};

console.log("Pacientes asignados a Pediatría:", obtenPacientesAsignadosAPediatria(pacientes));
console.log("Pacientes asignados a Pediatría y menor de 10 años:", obtenPacientesAsignadosAPediatriaYMenorDeDiezAnios(pacientes));
console.log("Activar protocolo de urgencia:", activarProtocoloUrgencia(pacientes));
console.log("Pacientes reasignados a Médico de familia:", reasignaPacientesAMedicoFamilia(pacientes));
console.log("¿Hay pacientes de Pediatría?:", HayPacientesDePediatria(pacientes));
console.log("Cuenta de pacientes por especialidad:", cuentaPacientesPorEspecialidad(pacientes));