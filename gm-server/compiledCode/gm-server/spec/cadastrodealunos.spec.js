"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cadastrodealunos_1 = require("../cadastrodealunos");
const aluno_1 = require("../../common/aluno");
// adiciona o f na frente de describe (fdescribe) para testar apenas ele
describe("O cadastro de alunos", () => {
    var cadastro;
    function cadastrarAluno(nome, cpf, email) {
        var aluno = new aluno_1.Aluno();
        aluno.nome = nome;
        aluno.cpf = cpf;
        aluno.email = email;
        cadastro.cadastrar(aluno);
    }
    beforeEach(() => cadastro = new cadastrodealunos_1.CadastroDeAlunos());
    it("é inicialmente vazio", () => {
        expect(cadastro.getAlunos().length).toBe(0);
    });
    it("cadastra alunos corretamente", () => {
        cadastrarAluno("Andre", "093", "aaav@cin.ufpe.br");
        expect(cadastro.getAlunos().length).toBe(1);
        var aluno = cadastro.getAlunos()[0];
        expect(aluno.nome).toBe("Andre");
        expect(aluno.cpf).toBe("093");
        expect(aluno.email).toBe("aaav@cin.ufpe.br");
        expect(aluno.metas.size).toBe(0);
    });
    it("não aceita alunos com CPF duplicado", () => {
        cadastrarAluno("Andre", "093", "aaav@cin.ufpe.br");
        cadastrarAluno("Mateus", "093", "mfarn@cin.ufpe.br");
        expect(cadastro.getAlunos().length).toBe(1);
    });
    it("não aceita alunos com campo de nome vazio", () => {
        var aluno = new aluno_1.Aluno();
        cadastrarAluno("", "014", "mfarn@cin.ufpe.br");
        expect(cadastro.getAlunos().length).toBe(0);
    });
});
//# sourceMappingURL=cadastrodealunos.spec.js.map