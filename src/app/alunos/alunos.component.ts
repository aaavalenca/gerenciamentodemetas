import { Component, OnInit } from '@angular/core';
import { Aluno } from '../../../common/aluno';
import { AlunoService } from '../aluno.service';
import { AstMemoryEfficientTransformer, Type } from '@angular/compiler';
import { keyframes } from '@angular/animations';

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

     tratarCsv(csv : string){
      let paragraph = csv.split('\r');
      let data: string[];
      let p = paragraph[0].split(";");
      
      for (let i = 1; i < paragraph.length; i++){
        let aluno = new Aluno();
        data = paragraph[i].split(';');
        aluno.nome = data[0].replace(/\n/g, '');
        aluno.cpf = data[1];
        aluno.email = data[2];
        aluno.media = "";
        for (let j = 3; j < p.length; j++){
          aluno.metas[p[j]] = data[j];
        }
        this.criarAluno(aluno);
      }
    }
  
    onFileChange (event) {
    const file = event.srcElement.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = (e: any)=> {
      const csv : string = e.target.result;
      this.tratarCsv(csv);
    }
    }

    removerAluno(cpf: string): void {	
      this.alunoService.removerAluno(cpf)	
             .subscribe(	
               as => {	
               this.alunos = this.alunos.filter(a => a.cpf !== cpf)	
            },	
               msg => { alert(msg.message); }	
             );	
   }

  }
