import { Component } from '@angular/core';
import { AppointmentService } from '../../../../../core/services/appointment/appointment.service';
import { DoctorService } from '../../../../../core/services/doctor/doctor.service';
import { ActivatedRoute } from '@angular/router';
import { Appointment } from '../../../../../core/models/appointment.model';
import { Doctor } from '../../../../../core/models/doctor.model';
import { finalize } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-doctor-detail',
  imports: [FormsModule, CommonModule],
  templateUrl: './doctor-detail.component.html',
  standalone: true,
  styleUrl: './doctor-detail.component.css'
})
export class DoctorDetailComponent {
  doctor: Doctor | any 
  appointments: Appointment[] = []
  loading = false
  error = ""

  constructor(
    private route: ActivatedRoute,
    private doctorService: DoctorService,
    private appointmentService:AppointmentService,
  ) {}

  ngOnInit(): void {
    const doctorId = this.route.snapshot.paramMap.get("id")
    if (doctorId) {
      this.loadDoctor(doctorId)
      this.loadAppointments(doctorId)
    } else {
      this.error = "ID de doctor no proporcionado"
    }
  }

  loadDoctor(id: string): void {
    this.loading = true;
    this.error = '';
    
    this.doctorService.getDoctor(id)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (data) => {
          this.doctor = data;
        },
        error: (err) => {
          this.error = 'Error al cargar el doctor: ' + err.message;
          console.error(err);
        }
      });
  }


  loadAppointments(doctorId: string): void {
    this.appointmentService.getAppointmentsByDoctor(doctorId).subscribe({
      next: (data) => {
        this.appointments = data
      },
      error: (err) => {
        this.error = "Error al cargar las citas"
        console.error(err)
      },
    })
  }

  completeAppointment(id: number): void {
    this.appointmentService.completeAppointment(id).subscribe({
      next: () => {
        // Actualizar la lista de citas
        if (this.doctor) {
          this.loadAppointments(this.doctor.id);
        }
      },
      error: (err) => {
        this.error = 'Error al completar la cita: ' + err.message;
        console.error(err);
      }
    });
  }

  cancelAppointment(id: number): void {
    if (confirm("¿Está seguro de que desea cancelar esta cita?")) {
      this.appointmentService.cancelAppointment(id).subscribe({
        next: () => {
          // Actualizar la lista de citas
          if (this.doctor) {
            this.loadAppointments(this.doctor.id)
          }
        },
        error: (err) => {
          this.error = "Error al cancelar la cita"
          console.error(err)
        },
      })
    }
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString("es-ES")
  }

  getDayName(date: string): string {
    const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
    return days[new Date(date).getDay()]
  }

}
