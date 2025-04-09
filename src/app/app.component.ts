// src/app/app.component.ts
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUserMd, faUsersCog, faClipboardList } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  imports: [RouterModule, RouterOutlet,FontAwesomeModule],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  faUserMd = faUserMd;
  faUsersCog = faUsersCog;
  faClipboardList = faClipboardList;
  title = 'Asignación de Pacientes';
}