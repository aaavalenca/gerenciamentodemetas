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

  tratarCsv(csv : string){
    let data = csv.split('\r');
    for (let i = 0; i < data[0].length; i++){

    }

  }

  onFileChange (event) {
  //console.log(event);
  const file = event.srcElement.files[0];
  const reader = new FileReader();
  reader.readAsText(file)
  reader.onload = (e: any)=> {
    const csv : string = e.target.result;
    this.tratarCsv(csv);
    
  }
  }



  }
