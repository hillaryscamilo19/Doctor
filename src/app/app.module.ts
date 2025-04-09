// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/share.module';
import { RouterLink, RouterModule } from '@angular/router';


@NgModule({
  declarations: [

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    RouterLink,
    RouterModule,
    AppComponent,
    SharedModule
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }