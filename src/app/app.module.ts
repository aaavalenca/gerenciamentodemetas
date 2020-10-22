import { Aluno } from 'common/aluno';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AlunoComponent } from './aluno/aluno.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    AlunoComponent
],
imports: [
  BrowserModule,
  AppRoutingModule,
  FormsModule
],
providers: [],
bootstrap: [AppComponent]
})
export class AppModule { }
