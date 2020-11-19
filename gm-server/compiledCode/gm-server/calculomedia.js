"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aluno_1 = require("../common/aluno");
class CalculoDeMedias {
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
    checkMetas(a) {
        let arrayNotas = ["EE1", "EE2", "EE3", "EE4", "EE5"];
        let b = false;
        arrayNotas.forEach(k => {
            if (a.metas[k] === undefined) {
                b = true;
            }
            if (a.metas[k] !== "MA" && a.metas[k] !== "MPA" && a.metas[k] !== "MANA") {
                b = true;
            }
        });
        if (b)
            return false;
        return true;
    }
    conteMetas(a) {
        let x = {};
        let arrayMetas = [];
        for (let k in a.metas) {
            arrayMetas.push(a.metas[k]);
        }
        let result = arrayMetas.reduce(function (tally, currVal) {
            if (tally[currVal]) {
                tally[currVal]++;
            }
            else {
                tally[currVal] = 1;
            }
            return tally;
        }, x);
        return result;
    }
    calcMedia(a) {
        if (this.checkMetas(a)) {
            let mediaFinal = 0;
            let metasDoAluno = this.conteMetas(a);
            if ("MANA" in metasDoAluno) {
                for (let k in metasDoAluno) {
                    if (k == "MA") {
                        mediaFinal = mediaFinal + (6.9 / 5) * metasDoAluno[k];
                    }
                    else if (k == "MPA") {
                        mediaFinal = mediaFinal + (4.5 / 5) * metasDoAluno[k];
                    }
                    else {
                        mediaFinal = mediaFinal + 0;
                    }
                }
            }
            else {
                for (let k in metasDoAluno) {
                    if (k == "MA") {
                        mediaFinal = mediaFinal + (10 / 5) * metasDoAluno[k];
                    }
                    else if (k == "MPA") {
                        mediaFinal = mediaFinal + (6 / 5) * metasDoAluno[k];
                    }
                    else {
                        mediaFinal = mediaFinal + 0;
                    }
                }
            }
            return mediaFinal.toFixed(2);
        }
    }
    mediaAluno() {
        for (let i = 0; i < this.alunos.length; i++) {
            this.alunos[i].media = this.calcMedia(this.alunos[i]);
            this.atualizar(this.alunos[i]);
        }
    }
    setMedia(ee1, ee2, ee3, ee4, ee5, cpf) {
        this.alunos[0].metas["EE1"] = ee1;
        this.alunos[0].metas["EE2"] = ee2;
        this.alunos[0].metas["EE3"] = ee3;
        this.alunos[0].metas["EE4"] = ee4;
        this.alunos[0].metas["EE5"] = ee5;
    }
    getAlunos() {
        return this.alunos;
    }
}
exports.CalculoDeMedias = CalculoDeMedias;
//# sourceMappingURL=calculomedia.js.map