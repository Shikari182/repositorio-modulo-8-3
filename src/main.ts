import "./style.css";

// Set de datos inicial

type Especialidad = "Medico de familia" | "Pediatra" | "Cardiólogo";

// Interfaces

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
const obtenPacientesAsignadosAPediatria = (pacientes: Pacientes[]): Pacientes[] =>
  pacientes.filter((paciente) => paciente.especialidad === "Pediatra");

// b) Extraer la lista de pacientes asignados a Pediatría y con edad menor de 10 años
const obtenPacientesAsignadosAPediatriaYMenorDeDiezAnios = (
  pacientes: Pacientes[]
): Pacientes[] =>
  pacientes.filter(
    (paciente) =>
      paciente.especialidad === "Pediatra" && paciente.edad < 10
  );

// APARTADO 2

const activarProtocoloUrgencia = (pacientes: Pacientes[]): boolean =>
  pacientes.some(
    (paciente) =>
      paciente.frecuenciaCardiaca > 100 && paciente.temperatura > 39
  );

// APARTADO 3

const reasignaPacientesAMedicoFamilia = (pacientes: Pacientes[]): Pacientes[] =>
  pacientes.map((paciente) =>
    paciente.especialidad === "Pediatra"
      ? { ...paciente, especialidad: "Medico de familia" }
      : paciente
  );

// APARTADO 4

const HayPacientesDePediatria = (pacientes: Pacientes[]): boolean =>
  pacientes.some((paciente) => paciente.especialidad === "Pediatra");

// APARTADO 5

const cuentaPacientesPorEspecialidad = (
  pacientes: Pacientes[]
): NumeroPacientesPorEspecialidad =>
  pacientes.reduce(
    (contador: NumeroPacientesPorEspecialidad, paciente: Pacientes) => {
      if (paciente.especialidad === "Medico de familia") {
        contador.medicoDeFamilia++;
      } else if (paciente.especialidad === "Pediatra") {
        contador.pediatria++;
      } else if (paciente.especialidad === "Cardiólogo") {
        contador.cardiologia++;
      }
      return contador;
    },
    { medicoDeFamilia: 0, pediatria: 0, cardiologia: 0 }
  );

// Invocaciones de ejemplo para ver el resultado en consola:
console.log("Pacientes asignados a Pediatría:", obtenPacientesAsignadosAPediatria(pacientes));
console.log("Pacientes asignados a Pediatría y menor de 10 años:", obtenPacientesAsignadosAPediatriaYMenorDeDiezAnios(pacientes));
console.log("Activar protocolo de urgencia:", activarProtocoloUrgencia(pacientes));
console.log("Pacientes reasignados a Médico de familia:", reasignaPacientesAMedicoFamilia(pacientes));
console.log("¿Hay pacientes de Pediatría?:", HayPacientesDePediatria(pacientes));
console.log("Cuenta de pacientes por especialidad:", cuentaPacientesPorEspecialidad(pacientes));