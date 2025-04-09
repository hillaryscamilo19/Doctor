// src/app/features/appointments/appointments.module.ts
import { NgModule } from '@angular/core';
import { AppointmentsRoutingModule } from './appointments-routing.module';
import { SharedModule } from '../../shared/share.module';
import { AssignPatientComponent } from './components/assign-patient/assign-patient/assign-patient.component';


@NgModule({
  declarations: [

  ],
  imports: [
    SharedModule,
    AssignPatientComponent,
    AppointmentsRoutingModule
  ]
})
export class AppointmentsModule { }