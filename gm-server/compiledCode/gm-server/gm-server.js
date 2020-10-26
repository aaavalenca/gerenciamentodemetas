"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const cadastrodealunos_1 = require("./cadastrodealunos");
var gmserver = express();
var cadastro = new cadastrodealunos_1.CadastroDeAlunos();
var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};
gmserver.use(allowCrossDomain);
gmserver.use(bodyParser.json());
gmserver.get('/alunos', function (req, res) {
    res.send(JSON.stringify(cadastro.getAlunos()));
});
gmserver.post('/aluno', function (req, res) {
    var aluno = req.body;
    aluno = cadastro.cadastrar(aluno);
    if (aluno) {
        res.send({ "success": "O aluno foi cadastrado com sucesso" });
    }
    else {
        res.send({ "failure": "O aluno não pode ser cadastrado" });
    }
});
gmserver.put('/aluno', function (req, res) {
    var aluno = req.body;
    aluno = cadastro.atualizar(aluno);
    if (aluno) {
        res.send({ "success": "O aluno foi atualizado com sucesso" });
    }
    else {
        res.send({ "failure": "O aluno não pode ser atualizado" });
    }
});
gmserver.delete('/aluno/:cpf', function (req, res) {
    var cpf = req.params.cpf;
    var aluno = cadastro.remover(cpf);
    if (aluno) {
        res.send({ "success": "O aluno foi deletado com sucesso" });
    }
    else
        res.send({ "failure": "O aluno não pode ser deletado" });
});
var server = gmserver.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
exports.server = server;
function closeServer() {
    server.close();
}
exports.closeServer = closeServer;
//# sourceMappingURL=gm-server.js.map