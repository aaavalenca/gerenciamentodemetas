import { CadastroDeAlunos } from '../cadastrodealunos';
import { Aluno } from '../../common/aluno';


// adiciona o f na frente de describe (fdescribe) para testar apenas ele
describe("O cadastro de alunos", () => {
  var cadastro: CadastroDeAlunos;

  function cadastrarAluno(nome:string, cpf:string, email:string) {
    var aluno: Aluno = new Aluno();
    aluno.nome = nome;
    aluno.cpf = cpf;
    aluno.email = email;
    cadastro.cadastrar(aluno);
  }

  beforeEach(() => cadastro = new CadastroDeAlunos())

  it("é inicialmente vazio", () => {
    expect(cadastro.getAlunos().length).toBe(0);
  })

  it("cadastra alunos corretamente", () => {
    cadastrarAluno("Andre", "093", "aaav@cin.ufpe.br");

    expect(cadastro.getAlunos().length).toBe(1);
    var aluno = cadastro.getAlunos()[0];
    expect(aluno.nome).toBe("Andre");
    expect(aluno.cpf).toBe("093");
    expect(aluno.email).toBe("aaav@cin.ufpe.br");
    expect(aluno.metas.size).toBe(0);
  })

  it("não aceita alunos com CPF duplicado", () => {
    cadastrarAluno("Andre", "093", "aaav@cin.ufpe.br");
    cadastrarAluno("Mateus", "093", "mfarn@cin.ufpe.br");
    expect(cadastro.getAlunos().length).toBe(1);
  })

  it("não aceita alunos com campo de nome vazio", () => {
    var aluno: Aluno = new Aluno();
    cadastrarAluno("", "014", "mfarn@cin.ufpe.br");
    expect(cadastro.getAlunos().length).toBe(0);
  })

}) 