import express = require('express');
import bodyParser = require("body-parser");

import {Aluno} from '../common/aluno';
import {CadastroDeAlunos} from './cadastrodealunos';
import {CalculoDeMedias} from './calculomedia';

var gmserver = express();
var cadastro : CadastroDeAlunos = new CadastroDeAlunos();

var allowCrossDomain = function (req: any, res: any, next: any) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};

gmserver.use(allowCrossDomain);
gmserver.use(bodyParser.json());

gmserver.get('/alunos', function (req: express.Request, res: express.Response) {
    res.send(JSON.stringify(cadastro.getAlunos()));
});

gmserver.post('/aluno', function (req: express.Request, res: express.Response) {
    var aluno: Aluno = <Aluno> req.body;
    aluno = cadastro.cadastrar(aluno);
    if (aluno) {
        res.send({ "success": "O aluno foi cadastrado com sucesso" });
    }
    else {
        res.send({ "failure": "O aluno não pode ser cadastrado" });
    }
});

gmserver.put('/aluno', function (req: express.Request, res: express.Response) {
    var aluno: Aluno = <Aluno> req.body;
    aluno = cadastro.atualizar(aluno);
    if (aluno) {
        res.send({ "success": "O aluno foi atualizado com sucesso" });
    }
    else {
        res.send({ "failure": "O aluno não pode ser atualizado" });
    }
});

gmserver.delete('/aluno/:cpf', function (req: express.Request, res: express.Response) {
    var cpf : string = req.params.cpf;
    var aluno : Aluno = cadastro.remover(cpf);
    if (aluno) {
        res.send({"success": "O aluno foi deletado com sucesso"});
    } else
        res.send({ "failure": "O aluno não pode ser deletado" });
    }
);

var server = gmserver.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})

function closeServer(): void {
  server.close();
}

export { server, closeServer }