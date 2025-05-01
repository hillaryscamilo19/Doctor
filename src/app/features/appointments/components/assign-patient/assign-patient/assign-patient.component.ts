import { Component, OnInit } from '@angular/core';
import { CreateAppointmentDto } from '../../../../../core/models/appointment.model';
import { AppointmentService } from '../../../../../core/services/appointment/appointment.service';
import { forkJoin, catchError, finalize, of } from 'rxjs';
import { DoctorService } from '../../../../../core/services/doctor/doctor.service';
import { PatientService } from '../../../../../core/services/patient/patient.service';

interface Doctor {
  id: number;
  nombre: string;
  especialidad: string;
  isAvailable: boolean;
}

interface Patient {
  id: number;
  nombre: string;
  sintoma: string;
  doctorAsignado?: Doctor;
}

@Component({
  selector: 'app-assign-patient',
  templateUrl: './assign-patient.component.html',
  styleUrls: ['./assign-patient.component.css'],
})
export class AssignPatientComponent  {
 
}
