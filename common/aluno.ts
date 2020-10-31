export class Aluno {
nome: string;
cpf: string;
email: string;
metas: Map<string,string>;
media: string;

constructor() {
  this.nome = "";
  this.cpf = "";
  this.email = "";
  this.metas = new Map<string,string>();
  this.media = "";
 }

 clone(): Aluno {
  var aluno: Aluno = new Aluno();
  aluno.copyFrom(this);
  return aluno;
}

clear(): void {
  this.nome = "";
  this.cpf = "";
  this.email = "";
  this.metas = new Map<string,string>();
  this.media = "";
}

copyFrom(from: Aluno): void {
  this.nome = from.nome;
  this.cpf = from.cpf;
  this.email = from.email;
  this.copyMetasFrom(from.metas);
  this.media = from.media;
}

copyMetasFrom(from: Map<string,string>): void {
  this.metas = new Map<string,string>();
  for (let key in from) {
    this.metas[key] = from[key];
  }
}
}
