// src/app/features/doctors/doctors.module.ts
import { NgModule } from '@angular/core';
import { DoctorsRoutingModule } from './doctors-routing.module';
import { SharedModule } from '../../shared/share.module';
import { DoctorListComponent } from '../../shared/components/doctor-list/doctor-list/doctor-list.component';
import { DoctorDetailComponent } from '../../shared/components/doctor-detail/doctor-detail/doctor-detail.component';


@NgModule({
  declarations: [
  
  ],
  imports: [
    SharedModule,
    DoctorsRoutingModule,
    DoctorListComponent,
    DoctorDetailComponent
  ]
})
export class DoctorsModule { }