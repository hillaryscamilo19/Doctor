import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointment, CreateAppointmentDto } from '../../models/appointment.model';
import { ApiService } from '../api/api.service';
import { enviroment } from '../../../../assets/enviroment/environment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  constructor(private apiService: ApiService) {}

  /**
   * Obtiene todas las citas
   */
  getAppointments(): Observable<Appointment[]> {
    return this.apiService.get<Appointment[]>(`${enviroment.api}/appointments`);
  }

  /**
   * Obtiene una cita por su ID
   */
  getAppointment(id: number): Observable<Appointment> {
    return this.apiService.get<Appointment>(`appointments/${id}`);
  }

  /**
   * Obtiene las citas de un doctor específico
   */
  getAppointmentsByDoctor(doctorId: string): Observable<Appointment[]> {
    return this.apiService.get<Appointment[]>(`appointments/doctor/${doctorId}`);
  }

  /**
   * Obtiene las citas de un paciente específico
   */
  getAppointmentsByPatient(patientId: number): Observable<Appointment[]> {
    return this.apiService.get<Appointment[]>(`appointments/patient/${patientId}`);
  }

  /**
   * Crea una nueva cita
   */
  createAppointment(appointment: CreateAppointmentDto): Observable<Appointment> {
    return this.apiService.post<Appointment>('appointments', appointment);
  }

  /**
   * Marca una cita como completada
   */
  completeAppointment(id: number): Observable<Appointment> {
    return this.apiService.patch<Appointment>(`appointments/${id}/complete`, {});
  }

  /**
   * Cancela una cita
   */
  cancelAppointment(id: number): Observable<Appointment> {
    return this.apiService.patch<Appointment>(`appointments/${id}/cancel`, {});
  }
}
