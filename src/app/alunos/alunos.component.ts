import { Component, OnInit } from '@angular/core';
import { Aluno } from '../../../common/aluno';
import { AlunoService } from '../aluno.service';

  @Component({
   selector: 'app-root',
   templateUrl: './alunos.component.html',
   styleUrls: ['./alunos.component.css']
 })
 export class AlunosComponent implements OnInit {

    aluno: Aluno = new Aluno();
    alunos: Aluno[] = [];
    cpfduplicado: boolean = false;
    emailinvalido = false;
    campovazio = false;
    cpfinvalido = false;

    constructor(private alunoService: AlunoService) {}

     criarAluno(a: Aluno): void {
       if (this.checkAluno(a) == null){
        a.clear();
       } else{
       this.alunoService.criar(a)
              .subscribe(
                ar => {
                  if (ar) {
                    this.alunos.push(ar);
                    this.aluno = new Aluno();
                  } else {
                    this.cpfduplicado = true;
                  } 
                },
                msg => { alert(msg.message); }
              );
            }
    } 

    checkAluno(a: Aluno): Aluno {
      if (a.nome === "" || a.cpf === "" || a.email === "") {
        this.campovazio = true;
      } else if (!a.email.includes("@")){
        this.emailinvalido = true;
      } else if (isNaN(a.cpf as any)){
        this.cpfinvalido = true;
      } else {
        return a;
      }
      return null;
    } 

    removerAlunos(cpf: string): void {
      this.alunoService.removerAlunos(cpf)
             .subscribe(
               as => {
               this.alunos = this.alunos.filter(a => a.cpf !== cpf)
            },
               msg => { alert(msg.message); }
             );
   }

    onMove(): void {
       this.cpfduplicado = false;
       this.emailinvalido = false;
       this.campovazio = false;
       this.cpfinvalido = false;
    }

     ngOnInit(): void {
       this.alunoService.getAlunos()
             .subscribe(
               as => { this.alunos = as; },
               msg => { alert(msg.message); }
              );
     }

  }
