import { Component } from '@angular/core';
import { NgModule } from '@angular/core';

import { AlunoService } from './aluno/aluno.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor(private alunoService: AlunoService) {} 
  aluno: Aluno = {nome: "", cpf: "", email: ""}; 
  alunos: Aluno[] = [];
}

export class Aluno {
  nome: string;
  cpf: string;
  email: string;
}