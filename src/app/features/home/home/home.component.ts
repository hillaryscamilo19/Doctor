import { Component, OnInit } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import {
  Appointment,
  CreateAppointmentDto,
} from '../../../core/models/appointment.model';
import { Doctor } from '../../../core/models/doctor.model';
import { Patient } from '../../../core/models/patients.model';
import { AppointmentService } from '../../../core/services/appointment/appointment.service';
import { DoctorService } from '../../../core/services/doctor/doctor.service';
import { PatientService } from '../../../core/services/patient/patient.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface PatientWithDoctor extends Patient {
  sintoma?: string;
  doctorAsignado?: Doctor;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [FormsModule, CommonModule],
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  activeTab: 'patients' | 'doctors' = 'doctors';
  loading = false;
  error: string | null = null;
  showAssignmentModal = false;
  patientsWithDoctors: PatientWithDoctor[] = [];
  allPatients: PatientWithDoctor[] = [];
  doctors: Doctor[] = [];
  patients: Appointment[] = [];
  selectedDate: string = new Date().toISOString().split('T')[0];
  selectedPatientId: string = '';
  selectedDoctorId: string = '';
  selectedPatient: PatientWithDoctor | null = null;
  currentPage = 1;
  pageSize = 50;
  totalPatients = 0;

  constructor(
    private patientService: PatientService,
    private doctorService: DoctorService,
    private appointmentService: AppointmentService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  onDateChange(): void {
    this.checkDoctorsAvailability();
    this.loadCurrentAppointments();
  }

  loadData(): void {
    this.loading = true;
    this.error = null;
    this.doctorService.getDoctors().subscribe((data) => {
      this.doctors = data;
    });
    forkJoin({
      patientsResponse: this.patientService.getPatients(1, 50),
    })
      .pipe(
        catchError((err) => {
          this.error =
            'Error al cargar los datos. Por favor, inténtelo de nuevo.';
          throw err;
        }),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe(({ patientsResponse }) => {
        const { data: patients, total } = patientsResponse;
        this.patientsWithDoctors = patients.map((patient) => ({
          ...patient,
          sintoma: patient.expe_Observacion,
        }));
        this.totalPatients = total;
      });
  }

  goToPage(page: number): void {
    if (page < 1 || page > Math.ceil(this.totalPatients / this.pageSize))
      return;
    this.currentPage = page;
    this.loadData();
  }


  

  checkDoctorsAvailability(): void {
    const availabilityRequests = this.doctors.map((doctor) =>
      this.doctorService
        .checkAvailability(doctor.doct_IdDoctor, this.selectedDate)
        .pipe(
          catchError(() => {
            return of({ available: false, nextAvailability: null });
          })
        )
    );

    forkJoin(availabilityRequests).subscribe((results) => {
      results.forEach((availability, index) => {
        this.doctors[index].isAvailable = availability.available;
      });
    });
  }

  loadCurrentAppointments(): void {
    this.appointmentService
      .getAppointmentsByDate(this.selectedDate)
      .subscribe((appointments) => {
        this.patientsWithDoctors.forEach(
          (patient) => (patient.doctorAsignado = undefined)
        );
        appointments.forEach((appointment) => {
          const patient = this.patientsWithDoctors.find(
            (p) => p.expe_NumeroExpediente === appointment.expe_NumeroExpediente
          );
          const doctor = this.doctors.find(
            (d) => d.doct_IdDoctor === appointment.expe_IdDoctor
          );
          if (patient && doctor) {
            patient.doctorAsignado = doctor;
          }
        });
      });
  }

  setActiveTab(tab: 'patients' | 'doctors'): void {
    this.activeTab = tab;
  }

  trackByPatient(index: number, patient: PatientWithDoctor) {
    return patient.expe_NumeroExpediente;
  }

  trackByDoctor(index: number, doctor: Doctor) {
    return doctor.doct_IdDoctor;
  }

  get patientsWithoutDoctor(): PatientWithDoctor[] {
    return this.patientsWithDoctors.filter(
      (patient) => !patient.doctorAsignado
    );
  }

  get availableDoctors(): Doctor[] {
    return this.doctors.filter((doctor) => doctor.isAvailable);
  }

  removeAssignment(patient: PatientWithDoctor): void {
    this.appointmentService
      .deleteAppointmentByPatientId(patient.expe_NumeroExpediente)
      .subscribe(() => {
        patient.doctorAsignado = undefined;
      });
  }

  assignAutomatically(patient: PatientWithDoctor): void {
    const availableDoctor = this.availableDoctors[0];

    if (availableDoctor) {
      this.createAppointment(
        patient.expe_NumeroExpediente,
        availableDoctor.doct_IdDoctor
      );
    } else {
      this.error = 'No hay doctores disponibles en este momento.';
    }
  }

  assignManually(patient: PatientWithDoctor): void {
    this.selectedPatient = patient;
    this.selectedPatientId = patient.expe_NumeroExpediente.toString();
    this.selectedDoctorId = '';
    this.showAssignmentModal = true;
  }

  selectDoctor(doctor: Doctor): void {
    this.selectedDoctorId = doctor.doct_IdDoctor;
    this.showAssignmentModal = true;
  }
  
  cancelAssignment(): void {
    this.showAssignmentModal = false;
    this.selectedPatientId = '';
    this.selectedDoctorId = '';
    this.selectedPatient = null;
  }

  confirmAssignment(): void {
    const patientId = parseInt(this.selectedPatientId, 10);
    const doctorId = this.selectedDoctorId;

    this.createAppointment(patientId, doctorId);
    this.showAssignmentModal = false;
  }

  private createAppointment(patientId: number, doctorId: string): void {
    const doctor = this.doctors.find((d) => d.doct_IdDoctor === doctorId);
    if (!doctor) return;

    const date = new Date(this.selectedDate);
    const dayOfWeek = date.getDay();

    let startTime = '';
    let endTime = '';

    switch (dayOfWeek) {
      case 0:
        startTime = doctor.doct_HorIniConDom || '09:00';
        endTime = doctor.doct_HorFinConDom || '13:00';
        break;
      case 1:
        startTime = doctor.doct_HorIniConLun || '09:00';
        endTime = doctor.doct_HorFinConLun || '17:00';
        break;
      case 2:
        startTime = doctor.doct_HorIniConMar || '09:00';
        endTime = doctor.doct_HorFinConMar || '17:00';
        break;
      case 3:
        startTime = doctor.doct_HorIniConMie || '09:00';
        endTime = doctor.doct_HorFinConMie || '17:00';
        break;
      case 4:
        startTime = doctor.doct_HorIniConJue || '09:00';
        endTime = doctor.doct_HorFinConJue || '17:00';
        break;
      case 5:
        startTime = doctor.doct_HorIniConVie || '09:00';
        endTime = doctor.doct_HorFinConSab || '17:00';
        break;
      case 6:
        startTime = doctor.doct_HorIniConSab || '09:00';
        endTime = doctor.doct_HorFinConSab || '13:00';
        break;
    }

    const patient = this.patientsWithDoctors.find(
      (p) => p.expe_NumeroExpediente === patientId
    );

    const cita_Nombre = patient
      ? `${patient.expe_Nombres} ${patient.expe_Apellidos}`
      : '';

    const appointmentData: CreateAppointmentDto = {
      lisp_IdDoctor: doctorId,
      lisp_Fecha: date,
      lisp_Nombre: cita_Nombre,
      lisP_Apellido: cita_Nombre,
      lisp_NumeroExpediente: patientId,
    };

    this.appointmentService.createAppointment(appointmentData).subscribe(
      () => {
        if (patient && doctor) {
          patient.doctorAsignado = doctor;
        }
      },
      (error) => {
        this.error = 'Error al crear la cita. Por favor, inténtelo de nuevo.';
      }
    );
  }
}
