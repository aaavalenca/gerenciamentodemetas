import { Component, OnInit } from '@angular/core';
import { Aluno } from 'common/aluno';

@Component({
  selector: 'app-aluno',
  templateUrl: './aluno.component.html',
  styleUrls: ['./aluno.component.css']
})
export class AlunoComponent implements OnInit {

  aluno: Aluno = new Aluno();

  ngOnInit(): void {

  }

  criar(aluno : Aluno){

  }

  onFileChange (event) {

  }


}
