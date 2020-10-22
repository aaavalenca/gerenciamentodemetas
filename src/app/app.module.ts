import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlunoComponent } from './aluno/aluno.component'
import { AlunoService } from './aluno/aluno.service';

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

providers: [AlunoService],
bootstrap: [AppComponent]
})
export class AppModule { }
