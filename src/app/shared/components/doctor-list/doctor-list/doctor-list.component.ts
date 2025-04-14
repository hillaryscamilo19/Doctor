import { Component } from '@angular/core';
import { finalize } from 'rxjs';
import { Doctor } from '../../../../core/models/doctor.model';
import { DoctorService } from '../../../../core/services/doctor/doctor.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-doctor-list',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './doctor-list.component.html',
  styleUrl: './doctor-list.component.css'
})
export class DoctorListComponent {
  doctor: Doctor [] = [];
  loading = false;
  error = '';
  selectedDate = new Date().toDateString().split('T')[0]; 

  constructor(private doctorServices: DoctorService){
  }

  ngOnInit(): void {
      
    this.loadDoctors();
  }
  

  loadDoctors(): void {
    this.error = '';
    this.loading = true;

    this.doctorServices.getDoctors()
    .pipe(finalize(() => this.loading = false))
    .subscribe({
      next: (data) =>{
        this.doctor = data
        this.checkAvailability();
      },
      error: (err) => {
        this.error = 'Error al cargar Los doctores:' + err.message;
        console.log(err);
        
      }
    });
  }

  checkAvailability(): void{
    this.doctor.forEach(doctor => {
      this.doctorServices.checkAvailability(doctor.doct_IdDoctor, this.selectedDate).subscribe({
        next:  (result) => {
          doctor.isAvailable = result.available;
          doctor.nextAvailability = result.nextAvailability;
        },
        error: (err) => {
          console.log(`Error al verificar disponibilidad del doctor ${doctor.doct_IdDoctor}:`, err);
        }
      })
    })
  }

  onDateChange(): void {
    this.checkAvailability();
  }

  getDayName(date: Date): string{
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    return days[new Date(date).getDay()];
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

}
