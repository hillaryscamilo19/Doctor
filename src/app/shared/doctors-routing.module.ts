import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorDetailComponent } from './components/doctor-detail/doctor-detail/doctor-detail.component';
import { DoctorListComponent } from './components/doctor-list/doctor-list/doctor-list.component';

const routes: Routes = [
  { path: '', component: DoctorListComponent },
  { path: ':id', component: DoctorDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorsRoutingModule {}