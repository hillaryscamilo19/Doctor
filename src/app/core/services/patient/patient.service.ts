import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from '../../models/patients.model';
import { ApiService } from '../api/api.service';
import { enviroment } from '../../../../assets/enviroment/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  constructor(private apiService: ApiService) {}

  /**
   * Obtiene todos los pacientes
   */
  getPatients(page: number = 1, limit: number = 50): Observable<{data: Patient[]; total: number}> {
    return this.apiService.get<{ data: Patient[]; total: number }>(`patients?page=${page}&limit=${limit}`);
  }



  
  /**
   * Obtiene un paciente por su ID
   */
  getPatient(id: number): Observable<Patient> {
    return this.apiService.get<Patient>(`${enviroment.api}/patients/${id}`);
  }

  /**
   * Crea un nuevo paciente
   */
  createPatient(patient: Partial<Patient>): Observable<Patient> {
    return this.apiService.post<Patient>('patients', patient);
  }

  /**
   * Actualiza un paciente existente
   */
  updatePatient(id: number, patient: Partial<Patient>): Observable<Patient> {
    return this.apiService.patch<Patient>(`patients/${id}`, patient);
  }

  /**
   * Elimina un paciente
   */
  deletePatient(id: number): Observable<void> {
    return this.apiService.delete<void>(`patients/${id}`);
  }
}
