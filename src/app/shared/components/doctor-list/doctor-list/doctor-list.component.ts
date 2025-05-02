import { Component } from '@angular/core';
import { finalize } from 'rxjs';
import { Doctor } from '../../../../core/models/doctor.model';
import { DoctorService } from '../../../../core/services/doctor/doctor.service';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-doctor-list',
  imports: [FormsModule, CommonModule, NgIf],
  standalone: true,
  templateUrl: './doctor-list.component.html',
  styleUrl: './doctor-list.component.css'
})
export class DoctorListComponent {
  doctors: Doctor[] = [];
  loading = true;
  error?: string | null = null;
  selectedDate: string = new Date().toISOString().split("T")[0];

  constructor(private doctorServices: DoctorService) { }

  ngOnInit(): void {
    console.log(this.doctors);
    this.loadDoctors();
  }

  onDateChange(): void {
    this.loadDoctors();
  }

  loadDoctors(): void {
    this.error = "";
    this.loading = true;
    this.doctors;
    this.doctorServices
      .getDoctors()
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (data) => {
  
          this.checkAvailability();
        },
        error: (err) => {
          this.error = "Error al cargar Los doctores:" + err.message;
          console.log(err);
        },
      });
  }

  checkAvailability(): void {
    if (this.doctors?.length === 0) return;
    this.doctors?.forEach((doctor) => {
      this.doctorServices.checkAvailability(doctor.doct_IdDoctor, this.selectedDate).subscribe({
        next: (result) => {
          doctor.isAvailable = result.available;
          doctor.nextAvailability = result.nextAvailability;
        },
        error: (err) => {
          console.error(`Error al verificar disponibilidad del doctor ${doctor.doct_IdDoctor}:`, err);
        },
      });
    });
  }

  nextAvailability?: {
    nextDate: Date;
    startTime: string;
    endTime: string;
  };


  getDayName(date: Date): string {
    const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    return days[date.getDay()];
  }

  formatDate(date: Date): string {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }


}