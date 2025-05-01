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

  getAppointments(): Observable<Appointment[]> {
    return this.apiService.get<Appointment[]>(`${enviroment.api}/appointments`);
  }


  getAppointment(id: number): Observable<Appointment> {
    return this.apiService.get<Appointment>(`appointments/${id}`);
  }


  getAppointmentsByDoctor(doctorId: string): Observable<Appointment[]> {
    return this.apiService.get<Appointment[]>(`appointments/doctor/${doctorId}`);
  }


  getAppointmentsByPatient(patientId: number): Observable<Appointment[]> {
    return this.apiService.get<Appointment[]>(`appointments/patient/${patientId}`);
  }

  createAppointment(appointment: CreateAppointmentDto): Observable<Appointment> {
    return this.apiService.post<Appointment>('appointments/create', appointment);
  }

  completeAppointment(id: number): Observable<Appointment> {
    return this.apiService.patch<Appointment>(`appointments/${id}/complete`, {});
  }

    getAppointmentsByDate(date: string): Observable<Appointment[]> {
      return this.apiService.get<Appointment[]>('appointments', { date });
    }


  deleteAppointmentByPatientId(patientId: number): Observable<void> {
    return this.apiService.delete<void>(`appointments/patient/${patientId}`);
  }
  cancelAppointment(id: number): Observable<Appointment> {
    return this.apiService.patch<Appointment>(`appointments/${id}/cancel`, {});
  }
}
