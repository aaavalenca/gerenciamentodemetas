"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Aluno {
    constructor() {
        this.nome = "";
        this.cpf = "";
        this.email = "";
        this.metas = new Map();
    }
    clone() {
        var aluno = new Aluno();
        aluno.copyFrom(this);
        return aluno;
    }
    clear() {
        this.nome = "";
        this.cpf = "";
        this.email = "";
        this.metas = new Map();
    }
    copyFrom(from) {
        this.nome = from.nome;
        this.cpf = from.cpf;
        this.email = from.email;
        this.copyMetasFrom(from.metas);
    }
    copyMetasFrom(from) {
        this.metas = new Map();
        for (let key in from) {
            this.metas[key] = from[key];
        }
    }
}
exports.Aluno = Aluno;
//# sourceMappingURL=aluno.js.map