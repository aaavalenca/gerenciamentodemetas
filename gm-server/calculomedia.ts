import { Aluno } from '../common/aluno';

export class CalculoDeMedias {
   alunos: Aluno[] = [];

   cadastrar(aluno: Aluno) {
    var result = null;
    if (this.checkAluno(aluno) && this.cpfNaoCadastrado(aluno.cpf)) {
        result = new Aluno();
        result.copyFrom(aluno);
        this.alunos.push(result);
    }
    return result;
}

checkAluno(a: Aluno): boolean {
    if (a.nome === "" || a.cpf === "" || a.email === "" ||!a.email.includes("@") || isNaN(a.cpf as any)) {
        return false;
    } else {
        return true;
    }
}

cpfNaoCadastrado(cpf: string) {
    return !this.alunos.find(a => a.cpf == cpf);
}

atualizar(aluno: Aluno) {
    var result = this.alunos.find(a => a.cpf == aluno.cpf);
    if (result)
        result.copyFrom(aluno);
    return result;
}

checkMetas(a: Aluno): boolean {
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
        return false
      return true
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
        this.atualizar(this.alunos[i]);
      }
    }

    setMedia(ee1: string, ee2:string, ee3:string, ee4:string, ee5:string, cpf: string) {
      this.alunos[0].metas["EE1"] = ee1
      this.alunos[0].metas["EE2"] = ee2
      this.alunos[0].metas["EE3"] = ee3
      this.alunos[0].metas["EE4"] = ee4
      this.alunos[0].metas["EE5"] = ee5
    }

    getAlunos() {
        return this.alunos;
    }

}