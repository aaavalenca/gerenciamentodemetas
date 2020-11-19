import { Aluno } from '../common/aluno';

export class CadastroDeAlunos {
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

remover(cpf: string) {
    var result: number = this.alunos.findIndex(a => a.cpf == cpf);
    var tempResult: Aluno = this.alunos[result];
    if(result > -1) {
        this.alunos.splice(result, 1);
    }
    return tempResult;
}
getAlunos() {
    return this.alunos;
}
}