import { Component, OnInit } from '@angular/core';

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
  styleUrls: ['./assign-patient.component.css']
})
export class AssignPatientComponent implements OnInit {
  activeTab: string = 'patients';
  loading: boolean = false;
  error: string | null = null;
  
  // Modal state
  showAssignmentModal: boolean = false;
  selectedPatientId: number | null = null;
  selectedDoctorId: number | null = null;
  
  // Data
  doctors: Doctor[] = [
    { id: 1, nombre: 'Dr. Ana García', especialidad: 'Cardiología', isAvailable: true },
    { id: 2, nombre: 'Dra. María López', especialidad: 'Dermatología', isAvailable: true },
    { id: 3, nombre: 'Dr. Juan Pérez', especialidad: 'Neurología', isAvailable: false }
  ];
  
  patients: Patient[] = [
    { id: 1, nombre: 'Pedro Sánchez', sintoma: 'Dolor en el pecho', doctorAsignado: this.doctors[0] },
    { id: 2, nombre: 'Laura Fernández', sintoma: 'Erupción cutánea', doctorAsignado: this.doctors[1] },
    { id: 3, nombre: 'Miguel Torres', sintoma: 'Dolor de cabeza crónico', doctorAsignado: undefined }
  ];
  
  constructor() { }
  
  ngOnInit(): void {
    // Aquí cargarías los datos de un servicio
  }
  
  // Tab management
  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }
  
  // Doctor selection
  get availableDoctors(): Doctor[] {
    return this.doctors.filter(doctor => doctor.isAvailable);
  }
  
  get patientsWithoutDoctor(): Patient[] {
    return this.patients.filter(patient => !patient.doctorAsignado);
  }
  
  // Assignment functions
  assignAutomatically(patient: Patient): void {
    // Lógica para asignar automáticamente basado en la especialidad
    const availableDoctor = this.availableDoctors[0]; // Simplemente toma el primero disponible
    if (availableDoctor) {
      patient.doctorAsignado = availableDoctor;
    } else {
      this.error = 'No hay doctores disponibles para asignación automática';
    }
  }
  
  assignManually(patient: Patient): void {
    this.selectedPatientId = patient.id;
    this.showAssignmentModal = true;
  }
  
  selectDoctor(doctor: Doctor): void {
    this.selectedDoctorId = doctor.id;
    this.showAssignmentModal = true;
  }
  
  removeAssignment(patient: Patient): void {
    patient.doctorAsignado = undefined;
  }
  
  // Modal functions
  cancelAssignment(): void {
    this.showAssignmentModal = false;
    this.selectedPatientId = null;
    this.selectedDoctorId = null;
  }
  
  confirmAssignment(): void {
    if (this.selectedPatientId && this.selectedDoctorId) {
      const patient = this.patients.find(p => p.id === this.selectedPatientId);
      const doctor = this.doctors.find(d => d.id === this.selectedDoctorId);
      
      if (patient && doctor) {
        patient.doctorAsignado = doctor;
      }
    }
    
    this.cancelAssignment(); // Cerrar modal y limpiar selección
  }
}