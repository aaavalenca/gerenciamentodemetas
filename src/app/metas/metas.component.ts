import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';

import { Aluno } from '../../../common/aluno';
import { AlunoService } from '../aluno.service';

  @Component({
   selector: 'metas',
   templateUrl: './metas.component.html',
   styleUrls: ['./metas.component.css']
 })
 export class MetasComponent implements OnInit {
    constructor(private alunoService: AlunoService) {}

    alunos: Aluno[];

    atualizarAluno(aluno: Aluno): void {
      this.alunoService.atualizar(aluno).subscribe(
         (a) => { if (a == null) alert("Unexpected fatal error trying to update student information! Please contact the systems administratos."); },
         (msg) => { alert(msg.message); }
      );
    }

    checkMetas(a: Aluno): Aluno {
      let arrayNotas = ["EE1", "EE2", "EE3", "EE4", "EE5"]
      let b = false;
      arrayNotas.forEach(k => {
        if (a.metas[k] === undefined) {
          b = true
        }
        if (a.metas[k] !== "MA" && a.metas[k] !== "MPA" && a.metas[k] !== "MANA") {
          b = true
      }
      });
      if (b) 
        return null
      return a
  }

    conteMetas(a: Aluno): any {
      let x: any = {};
      let arrayMetas = [];
      for(let k in a.metas){
        arrayMetas.push(a.metas[k]);
      }
      let result = arrayMetas.reduce(function(tally, currVal) {
        if (tally[currVal]) {
          tally[currVal]++
        } else {
          tally[currVal] = 1;
        }
      return tally
    },x);
      return result
    }

    calcMedia(a: Aluno): any {
      if (this.checkMetas(a)){ 
      let mediaFinal = 0;
      let metasDoAluno = this.conteMetas(a)
      if("MANA" in metasDoAluno) {
        for(let k in metasDoAluno){
          if(k == "MA") {
            mediaFinal = mediaFinal + (6.9/5)*metasDoAluno[k]
          }
          else if(k == "MPA") {
            mediaFinal = mediaFinal + (4.5/5)*metasDoAluno[k]
          }
          else {
            mediaFinal = mediaFinal + 0;
          }
        }
      } else {
        for(let k in metasDoAluno) {
          if(k == "MA") {
            mediaFinal = mediaFinal + (10/5)*metasDoAluno[k]
          }
          else if(k == "MPA") {
            mediaFinal = mediaFinal + (6/5)*metasDoAluno[k]
          }
          else {
            mediaFinal = mediaFinal + 0;
          }
        }
      }
      return mediaFinal.toFixed(2);
    }
    return "";
    }

    mediaAluno() : void {
      for (let i = 0; i < this.alunos.length; i ++){
        this.alunos[i].media = this.calcMedia(this.alunos[i]);
        this.atualizarAluno(this.alunos[i]);
      }
    }

    ngOnInit(): void {
      this.alunoService.getAlunos()
      .subscribe(
         (as) =>  { this.alunos = as; },
         (msg) => { alert(msg.message); }
      );
    }

  }