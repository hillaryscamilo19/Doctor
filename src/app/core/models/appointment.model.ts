import { Doctor } from "./doctor.model"
import { Patient } from "./patients.model"



export interface Appointment {
  id: number
  fecha: string
  horaInicio: string
  horaFin: string
  completada: boolean
  estado: string
  doctorId: string
  pacienteId: number
  doctor?: Doctor
  patient?: Patient
}

export interface CreateAppointmentDto {
  fecha: string
  horaInicio: string
  horaFin: string
  doctorId: string
  pacienteId: number
}

