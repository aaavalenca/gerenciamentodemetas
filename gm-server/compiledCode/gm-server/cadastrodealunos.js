"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aluno_1 = require("../common/aluno");
class CadastroDeAlunos {
    constructor() {
        this.alunos = [];
    }
    cadastrar(aluno) {
        var result = null;
        if (this.checkAluno(aluno) && this.cpfNaoCadastrado(aluno.cpf)) {
            result = new aluno_1.Aluno();
            result.copyFrom(aluno);
            this.alunos.push(result);
        }
        return result;
    }
    checkAluno(a) {
        if (a.nome === "" || a.cpf === "" || a.email === "" || !a.email.includes("@") || isNaN(a.cpf)) {
            return false;
        }
        else {
            return true;
        }
    }
    cpfNaoCadastrado(cpf) {
        return !this.alunos.find(a => a.cpf == cpf);
    }
    atualizar(aluno) {
        var result = this.alunos.find(a => a.cpf == aluno.cpf);
        if (result)
            result.copyFrom(aluno);
        return result;
    }
    remover(cpf) {
        var result = this.alunos.findIndex(a => a.cpf == cpf);
        var tempResult = this.alunos[result];
        if (result > -1) {
            this.alunos.splice(result, 1);
        }
        return tempResult;
    }
    getAlunos() {
        return this.alunos;
    }
}
exports.CadastroDeAlunos = CadastroDeAlunos;
//# sourceMappingURL=cadastrodealunos.js.map