import { Injectable }    from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, map } from 'rxjs/operators';

import { Aluno } from '../../common/aluno';

@Injectable()
export class AlunoService {

  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  private gmURL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  criar(aluno: Aluno): Observable<Aluno> {
    return this.http.post<any>(this.gmURL + "/aluno", aluno, {headers: this.headers})
             .pipe( 
                retry(2),
                map( res => {if (res.success) {return aluno;} else {return null;}} )
              ); 
  }

  atualizar(aluno: Aluno): Observable<Aluno> {
    return this.http.put<any>(this.gmURL + "/aluno",JSON.stringify(aluno), {headers: this.headers})          .pipe( 
                retry(2),
                map( res => {if (res.success) {return aluno;} else {return null;}} )
              ); 
  }

  remover (cpf: string): Observable<Aluno> {
    const url = `${this.gmURL}/aluno/${cpf}`;
    return this.http.delete<any>(url)
      .pipe(
        retry(2)
      );
  }

  getAlunos(): Observable<Aluno[]> {
    return this.http.get<Aluno[]>(this.gmURL + "/alunos")
              .pipe(
                 retry(2)
               );
  }

  removerAluno(cpf: string): Observable<Aluno>  {
    const url = `${this.gmURL}/aluno/${cpf}`;
    return this.http.delete<Aluno>(url)
              .pipe(
                 retry(2)
               );
  }

}