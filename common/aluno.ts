export class Aluno {
nome: string;
cpf: string;
email: string;
metas: Map<string,string>;

constructor() {
  this.nome = "";
  this.cpf = "";
  this.email = "";
  this.metas = new Map<string,string>();
 }

}