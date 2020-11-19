"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const calculomedia_1 = require("../calculomedia");
const aluno_1 = require("../../common/aluno");
describe("O calculo das metas", () => {
    var calcular;
    function calcMedia(ee1, ee2, ee3, ee4, ee5) {
        var a = new aluno_1.Aluno();
        a.nome = "Mateus";
        a.cpf = "054";
        a.email = "m@cin";
        a.metas["EE1"] = ee1;
        a.metas["EE2"] = ee2;
        a.metas["EE3"] = ee3;
        a.metas["EE4"] = ee4;
        a.metas["EE5"] = ee5;
        calcular.atualizar(a);
        a.media = calcular.calcMedia(a);
        return a;
    }
    beforeEach(() => calcular = new calculomedia_1.CalculoDeMedias());
    it("calcula média de alunos corretamente", () => {
        expect(calcMedia("MA", "MPA", "MANA", "MPA", "MA").media).not.toBe("");
    });
    it("não calcula média de alunos sem todas as metas preenchidas", () => {
        expect(calcMedia("MA", "MPA", "", "MPA", "MA").media).toBe(undefined);
    });
    it("não calcula média de alunos com as metas mal preenchidas", () => {
        expect(calcMedia("Ma", "MMA", "MANA", "MA", "MA").media).toBe(undefined);
    });
});
//# sourceMappingURL=calcularmedia.spec.js.map