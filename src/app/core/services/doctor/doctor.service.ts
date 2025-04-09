import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Doctor } from '../../models/doctor.model';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  constructor(private apiService: ApiService) {}


  getDoctors(): Observable<Doctor[]> {
    return this.apiService.get<Doctor[]>('doctors');
  }


  getDoctor(id: string): Observable<Doctor> {
    return this.apiService.get<Doctor>(`doctors/${id}`);
  }


  checkAvailability(doctorId: string, date: string): Observable<{ available: boolean; nextAvailability?: any }> {
    return this.apiService.get<{ available: boolean; nextAvailability?: any }>(
      `doctors/${doctorId}/availability`, 
      { date }
    );
  }
}
