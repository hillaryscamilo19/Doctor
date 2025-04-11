import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
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
    HttpClientModule,
    ReactiveFormsModule,  
    FormsModule,
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }
