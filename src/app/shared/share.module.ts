// src/app/shared/shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Aquí importarías componentes, directivas y pipes compartidos

@NgModule({
  declarations: [
    // Componentes, directivas y pipes compartidos
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    // Exportar componentes, directivas y pipes compartidos
  ]
})
export class SharedModule { }