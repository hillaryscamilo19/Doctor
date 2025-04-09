// src/app/features/appointments/appointments-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignPatientComponent } from './components/assign-patient/assign-patient/assign-patient.component';


const routes: Routes = [
  { path: 'assign/:doctorId', component: AssignPatientComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentsRoutingModule { }