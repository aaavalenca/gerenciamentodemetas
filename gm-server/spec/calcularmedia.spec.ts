import { CalculoDeMedias } from '../calculomedia'
import {Aluno} from '../../common/aluno'

describe("O calculo das metas", () => {
    var calcular: CalculoDeMedias;
  
    function calcMedia(ee1: string, ee2: string, ee3: string, ee4: string, ee5: string) : Aluno {
        var a: Aluno = new Aluno();
        a.nome = "Mateus";
        a.cpf = "054";
        a.email = "m@cin";
        a.metas["EE1"] = ee1;
        a.metas["EE2"] = ee2;
        a.metas["EE3"] = ee3;
        a.metas["EE4"] = ee4;
        a.metas["EE5"] = ee5;
        calcular.atualizar(a)
        a.media = calcular.calcMedia(a);
        return a
    }
  
    beforeEach(() => calcular = new CalculoDeMedias())

    it("calcula média de alunos corretamente", () => {
        expect(calcMedia("MA", "MPA", "MANA", "MPA", "MA").media).not.toBe("")
    }) 

    it("não calcula média de alunos sem todas as metas preenchidas", () => {
        expect(calcMedia("MA", "MPA", "", "MPA", "MA").media).toBe(undefined)
    })

    it("não calcula média de alunos com as metas mal preenchidas", () => {
        expect(calcMedia("Ma", "MMA", "MANA", "MA", "MA").media).toBe(undefined)
    })

})