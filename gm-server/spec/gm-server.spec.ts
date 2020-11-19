import request = require("request-promise");
import { closeServer } from '../gm-server';

var base_url = "http://localhost:3000/";

fdescribe("O servidor", () => {
  var server:any;

  beforeAll(() => {server = require('../gm-server')});

  afterAll(() => {server.closeServer()});

  it("inicialmente retorna uma lista de alunos vazia", () => {
    return request.get(base_url + "alunos")
            .then(body => 
               expect(body).toBe("[]")
             )
            .catch(e => 
               expect(e).toEqual(null)
             );
  })

  it("só cadastra alunos", () => {
    var options:any = {method: 'POST', url: (base_url + "aluno"), body:{nome: "Andre", email: "aaav@cin.ufpe.br"}, json: true};
    return request(options)
             .then(body =>
                expect(body).toEqual({failure: "O aluno não pode ser cadastrado"})
             ).catch(e =>
                expect(e).toEqual(null)
             )
  });


  it("não cadastra alunos com CPF duplicado", () => {
    var aluno1 = {"json":{"nome": "Andre", "cpf" : "093", "email":"aaav@cin.ufpe.br"}};
    var aluno2 = {"json":{"nome": "Mateus", "cpf" : "093", "email":"mfarn@cin.ufpe.br"}};
    var resposta1 = '{"nome":"Andre","cpf":"093","email":"aaav@cin.ufpe.br","metas":{}}';
    var resposta2 = '{"nome":"Mateus","cpf":"093","email":"mfarn@cin.ufpe.br","metas":{}}';

    return request.post(base_url + "aluno", aluno1)
             .then(body => {
                expect(body).toEqual({success: "O aluno foi cadastrado com sucesso"});
                return request.post(base_url + "aluno", aluno2)
                         .then(body => {
                            expect(body).toEqual({failure: "O aluno não pode ser cadastrado"});
                            return request.get(base_url + "alunos")
                                     .then(body => {
                                        expect(body).toContain(resposta1);
                                        expect(body).not.toContain(resposta2);
                                      });
                          });
              })
              .catch(err => {
                 expect(err).toEqual(null)
              });
 })

 it("nao cadastra alunos com email invalido", () => {
   var options:any = {method: 'POST', url: (base_url + "aluno"), body:{nome: "Andre", cpf: "093", email: "aaav"}, json: true};
   return request(options)
            .then(body =>
               expect(body).toEqual({failure: "O aluno não pode ser cadastrado"})
            ).catch(e =>
               expect(e).toEqual(null)
            )
 })

})