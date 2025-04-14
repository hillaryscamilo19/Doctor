import { Component, type OnInit } from "@angular/core"
import { finalize } from "rxjs"
import { Doctor } from "../../../../../core/models/doctor.model"
import { DoctorService } from "../../../../../core/services/doctor/doctor.service"
import { CommonModule, NgIf } from "@angular/common"
import { FormsModule } from "@angular/forms"

@Component({
  selector: "app-doctor-list",
  templateUrl: "./doctor-list.component.html",
  imports: [FormsModule, CommonModule, NgIf],
  styleUrls: ["./doctor-list.component.css"],
})
export class DoctorListComponent implements OnInit {
  doctors: Doctor[] | null = null; // Inicializar como null para controlar mejor
  loading = true;
  error: string | null = null;
  selectedDate: string = new Date().toISOString().split("T")[0];

  constructor(private doctorServices: DoctorService) {}

  ngOnInit(): void {
    this.loadDoctors();
  }

  onDateChange(): void {
    this.loadDoctors();
  }

  loadDoctors(): void {
    this.error = "";
    this.loading = true;
    this.doctors = []; // Asegúrate de que doctors sea un array vacío mientras carga
    
    this.doctorServices
      .getDoctors()
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (data) => {
          this.doctors = data;
          this.checkAvailability();
        },
        error: (err) => {
          this.error = "Error al cargar Los doctores:" + err.message;
          console.log(err);
        },
      });
  }

  checkAvailability(): void {
    if (!this.doctors) return; // Verificación adicional
    
    this.doctors.forEach((doctor) => {
      this.doctorServices.checkAvailability(doctor.doct_IdDoctor, this.selectedDate).subscribe({
        next: (result) => {
          doctor.isAvailable = result.available;
          doctor.nextAvailability = result.nextAvailability;
        },
        error: (err) => {
          console.log(`Error al verificar disponibilidad del doctor ${doctor.doct_IdDoctor}:`, err);
        },
      });
    });
  }

  getDayName(date: Date): string {
    const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    return days[date.getDay()];
  }

  formatDate(date: Date): string {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }
}