import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignPatientComponent } from './features/appointments/components/assign-patient/assign-patient/assign-patient.component';
import { HomeComponent } from './features/home/home/home.component';

const routes: Routes = [
  {
    path: 'doctors',
    loadChildren: () => import('./features/doctors/doctors.module').then(m => m.DoctorsModule)
  },
  {path: 'home', component: HomeComponent },
  {
    path: 'appointments',
    loadChildren: () => import('./features/appointments/appointments.module').then(m => m.AppointmentsModule)
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'assign/:doctorId', component: AssignPatientComponent },
  { path: '**', redirectTo: '/doctors' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }