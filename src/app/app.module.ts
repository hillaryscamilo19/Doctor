import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule, NgIf } from '@angular/common';
import { DoctorsModule } from './features/doctors/doctors.module';
import { AppointmentsModule } from './features/appointments/appointments.module';


@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    DoctorsModule,
    AppointmentsModule,
    CommonModule,
    AppRoutingModule,
    AppComponent,
    NgIf,
    HttpClientModule,
    ReactiveFormsModule,  
    FormsModule,
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }
