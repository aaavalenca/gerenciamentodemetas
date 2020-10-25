import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule }   from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlunosComponent } from './alunos/alunos.component'
import { MetasComponent } from './metas/metas.component'
import { AlunoService } from './aluno.service';

@NgModule({
  declarations: [
    AppComponent,
    AlunosComponent,
    MetasComponent
],
imports: [
  BrowserModule,
  AppRoutingModule,
  FormsModule,
  HttpClientModule, 
  RouterModule.forRoot([
    {
      path: 'metas',
      component: MetasComponent
    },
    {
      path: 'alunos',
      component: AlunosComponent
    }
  ])
],
providers: [AlunoService],
bootstrap: [AppComponent]
})
export class AppModule { }
