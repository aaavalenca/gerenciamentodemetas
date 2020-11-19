import { CalculoDeMedias } from './../../gm-server/calculomedia';
import { equal } from 'assert';
import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by, promise, ElementFinder } from 'protractor';
import request = require("request-promise");

var base_url = "http://localhost:3000/";
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;
let path = require("path");

let sameName = ((elem, name) => elem.element(by.name('nomelist')).getText().then(text => text === name));
let sameCPF = ((elem: any, cpf: any) => elem.element(by.name('cpflist')).getText().then((text: string) => text === cpf));
let pAND = ((p, q) => p.then(a => q.then(b => a && b)))


async function criarAluno(name, cpf, email) {
    await $("input[name='namebox']").sendKeys(<string>name);
    await $("input[name='cpfbox']").sendKeys(<string>cpf);
    await $("input[name='emailbox']").sendKeys(<string>email);
    await element(by.name('namebox')).click();
}

async function removerAluno() {
    await element(by.name('x')).click();
}

async function uploadSpreadsheet(spreadsheet) {
    var absolutePath = path.resolve(__dirname, spreadsheet);
    await element(by.name("uploadbutton")).sendKeys(absolutePath);
}

async function assertTamanhoEqual(set, n) {
    await set.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(n));
}

async function assertTamanhoEqualArray(set, n) {
    await set.then(elems => expect(Promise.resolve(elems[0].length)).to.eventually.equal(n));
}

async function assertTamanhoNotEqualArray(set, n) {
    await set.then(elems => expect(Promise.resolve(elems[0].length)).to.eventually.not.equal(n));
}

async function assertElementsWithSameCPF(n, cpf) {
    var allcpfs: ElementArrayFinder = element.all(by.name('cpflist'));
    var samecpfs = allcpfs.filter(elem =>
        elem.getText().then(text => text === cpf));
    await samecpfs.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(n));
}

async function assertElementsWithSameCPFAndName(n, cpf, name) {
    var allalunos: ElementArrayFinder = element.all(by.name('alunolist'));
    var samecpfsandname = allalunos.filter(elem => pAND(sameCPF(elem, cpf), sameName(elem, name)));
    await assertTamanhoEqual(samecpfsandname, n);
}

async function postStudent(aluno, s) {
    if (s) {
        var options: any = { method: 'POST', uri: (base_url + "aluno"), body: aluno, json: true };
        await request(options)
            .then(body =>
                expect(JSON.stringify(body)).to.equal(
                    '{"success":"O aluno foi cadastrado com sucesso"}'));
    } else {
        var options: any = { method: 'POST', uri: (base_url + "aluno"), body: aluno, json: true };
        await request(options)
            .then(body =>
                expect(JSON.stringify(body)).to.equal(
                    '{"failure":"O aluno não pode ser cadastrado"}'));
    }
}

async function averageGradeCheck(bool: boolean, cpf: string) {
    var allstudents: ElementArrayFinder = element.all(by.name('goalstable'));
    var thisstudent = allstudents.filter(elem => sameCPF(elem, cpf));
    var studentvalue = thisstudent.all(by.name('media')).getAttribute('value');
    if (bool) {
        await assertTamanhoEqualArray(studentvalue, 0);
    } else {
        await assertTamanhoNotEqualArray(studentvalue, 0);
    }

}

defineSupportCode(function ({ Given, When, Then }) {

    // GUI


    // alunos.feature
    // 1 Registering students with spreadsheet

    Given(/^I am at the students page$/, async () => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('GerenciamentoDeMetas');
        await $("a[name='alunos']").click();
    })

    Given(/^I cant see a student with CPF "(\d*)" in the students list$/, async (cpf: string) => {
        await assertElementsWithSameCPF(0, cpf);
    });

    When(/^I upload a spreadsheet containing my students$/, async () => {
        var fileToUpload = "../planilha.csv";
        await uploadSpreadsheet(fileToUpload);
        await browser.sleep(3000);
    });

    Then(/^I can see a student with CPF "(\d*)" in the students list$/, async (cpf: string) => {
        await assertElementsWithSameCPF(1, cpf);
    });


    // 2 Registering students with spreadsheet when there's already a student registered

    Given(/^I can see a student with CPF "(\d*)" in the list of students$/, async (cpf: string) => {
        await assertElementsWithSameCPF(1, cpf);
    });

    When(/^I upload a new spreadsheet containing my students$/, async () => {
        var fileToUpload = "../planilha2.csv";
        uploadSpreadsheet(fileToUpload);
    });

    Then(/^I can still see a student with CPF "(\d*)"$/, async (cpf: string) => {
        await assertElementsWithSameCPF(1, cpf);
    });

    // 3 Registering student with invalid email

    When(/^I try to register a student with CPF "(\d*)" and email "([^\"]*)"$/, async (cpf: string, email: string) => {
        await criarAluno("Daniel", cpf, email);
    });

    Then(/^I cant see student with CPF "(\d*)" in the list$/, async (cpf: string) => {
        // var invalidEmail = element(by.name('msgemailinvalido'));
        // await expect(invalidEmail.evaluate("emailinvalido")).to.equal(true);
        await assertElementsWithSameCPF(0, cpf);
    });

    // SERVICE

    // alunos.feature

    // 1 Registering students, service

    Given(/^The system has no students with CPF "(\d*)" registered$/, async (cpf: string) => {
        await request.get(base_url + "alunos")
            .then(body =>
                expect(body.includes(`"cpf":"${cpf}"`)).to.equal(false));
    });

    When(/^I register a student with CPF "(\d*)"$/, async (cpf: string) => {
        let aluno = { "nome": "Carlos", "cpf": cpf, "email": "c@bol" };
        postStudent(aluno, true);
    });

    Then(/^The system now stores a student with CPF "(\d*)"$/, async (cpf: string) => {
        let resposta = `{"nome":"Carlos","cpf":"${cpf}","email":"c@bol","metas":{}}`;
        await request.get(base_url + "alunos")
            .then(body => expect(body.includes(resposta)).to.equal(true));
    });

    // 2 Registering a student when there's already a student registered, service

    Given(/^The system has already a student with CPF "(\d*)" registered$/, async (cpf: string) => {
        await request.get(base_url + "alunos")
            .then(body =>
                expect(body.includes(`"cpf":"${cpf}"`)).to.equal(true));
    });

    When(/^I attempt to register a student with CPF "(\d*)"$/, async (cpf: string) => {
        let aluno = { "nome": "Carlos", "cpf": cpf, "email": "c@bol" };
        postStudent(aluno, false);
    });

    Then(/^The system still has a student with CPF "(\d*)"$/, async (cpf: string) => {
        let resposta = `{"nome":"Carlos","cpf":"${cpf}","email":"c@bol","metas":{}}`;
        await request.get(base_url + "alunos")
            .then(body => expect(body.includes(resposta)).to.equal(true));
    });

    // 3 Registering student with invalid email, service

    When(/^I attempt to register a student with CPF "(\d*)" and email "([^\"]*)"$/, async (cpf: string, email: string) => {
        let aluno = { "nome": "Carlos", "cpf": cpf, "email": email };
        postStudent(aluno, false);
    });

    Then(/^The system does not store a student with CPF "(\d*)" and email "([^\"]*)"$/, async (cpf: string, email: string) => {
        let resposta = `{"nome":"Carlos","cpf":"${cpf}","email": ${email},"metas":{}}`;
        await request.get(base_url + "alunos")
            .then(body => expect(body.includes(resposta)).to.equal(false));
    });

    // GUI

    // calcmedia.feature

    Given(/^I am at the metas page$/, async () => {
        await browser.get("http://localhost:4200/metas");
        await expect(browser.getTitle()).to.eventually.equal('GerenciamentoDeMetas');
    })

    Given(/^I can see a student with CPF "(\d*)" in the goals table$/, async (cpf) => {
        var allalunos: ElementArrayFinder = element.all(by.name('goalstable'));
        var samecpfs = allalunos.filter(elem => sameCPF(elem, cpf));
        await assertTamanhoEqual(samecpfs, 1);
    });

    When(/^I fill EE1 with "([^\"]*)", EE2 with "([^\"]*)", EE3 with "([^\"]*)", EE4 with "([^\"]*)" and EE5 with "([^\"]*)" for the student with CPF "(\d*)"$/, async (ee1, ee2, ee3, ee4, ee5, cpf) => {
        var allalunos: ElementArrayFinder = element.all(by.name('goalstable'));
        var samecpfs = allalunos.filter(elem => sameCPF(elem, cpf));
        await samecpfs.all(by.name('EE1')).sendKeys(<string>ee1);
        await samecpfs.all(by.name('EE2')).sendKeys(<string>ee2);
        await samecpfs.all(by.name('EE3')).sendKeys(<string>ee3);
        await samecpfs.all(by.name('EE4')).sendKeys(<string>ee4);
        await samecpfs.all(by.name('EE5')).sendKeys(<string>ee5);
        await samecpfs.all(by.name('EE1')).sendKeys(<string>"");
    });

    When(/^I incompletely fill EE1 with "([^\"]*)", EE2 with "([^\"]*)", EE3 with "([^\"]*)" and EE5 with "([^\"]*)" for the student with CPF "(\d*)"$/, async (ee1, ee2, ee3, ee5, cpf) => {
        var allalunos: ElementArrayFinder = element.all(by.name('goalstable'));
        var samecpfs = allalunos.filter(elem => sameCPF(elem, cpf));
        await samecpfs.all(by.name('EE1')).sendKeys(<string>ee1);
        await samecpfs.all(by.name('EE2')).sendKeys(<string>ee2);
        await samecpfs.all(by.name('EE3')).sendKeys(<string>ee3);
        await samecpfs.all(by.name('EE5')).sendKeys(<string>ee5);
        await samecpfs.all(by.name('EE1')).sendKeys(<string>"");
    });

    When(/^I try to calculate the average grade from the students$/, async () => {
        await element(by.name('calcularMedia')).click();
    })

    Then(/^I can see the average grade of the student with CPF "(\d*)"$/, async (cpf: string) => {
        await averageGradeCheck(false, cpf);
    })

    Then(/^I cannot see the average grade of the student with CPF "(\d*)"$/, async (cpf: string) => {
        await averageGradeCheck(true, cpf);
    })

    // GUI

    // remover.feature

    When(/^I try to remove the student with CPF "(\d*)"$/, async (cpf) => {
        var allalunos: ElementArrayFinder = element.all(by.name('alunolist'));
        var samecpfs = allalunos.filter(elem => sameCPF(elem, cpf));
        await samecpfs.all(by.name('x')).click();
    })


    // SERVICE

    Given(/^The system has already a student with CPF "(\d*)", email "([^\"]*)" and grades EE1 with "([^\"]*)", EE2 with "([^\"]*)", EE3 with "([^\"]*)", EE4 with "([^\"]*)" and EE5 with "([^\"]*)"$/, async (cpf, email, ee1, ee2, ee3, ee4, ee5) => {
        await request.get(base_url + "alunos")
            .then(body =>
                expect(body.includes(`"cpf":"${cpf}","email":"${email}","metas":{"EE1":"${ee1}","EE2":"${ee2}","EE3":"${ee3}","EE4":"${ee4}","EE5":"${ee5}"}`)).to.equal(true)
                );
    })

    Then(/^The system has the average grade of the student with CPF "(\d*)" and grades EE1 with "([^\"]*)", EE2 with "([^\"]*)", EE3 with "([^\"]*)", EE4 with "([^\"]*)" and EE5 with "([^\"]*)"$/, async (cpf, ee1, ee2, ee3, ee4, ee5)=> {
        await request.get(base_url + "alunos")
            .then(body => {
                expect(body.includes(`"cpf":"${cpf}","email":"aaav@cin","metas":{"EE1":"${ee1}","EE2":"${ee2}","EE3":"${ee3}","EE4":"${ee4}","EE5":"${ee5}"},"media":""`)).to.equal(false);
            });
    })

    Then(/^The system doesnt have the average grade of the student with CPF "(\d*)" and grades EE1 with "([^\"]*)", EE2 with "([^\"]*)", EE3 with "([^\"]*)", EE4 with "([^\"]*)" and EE5 with "([^\"]*)"$/, async (cpf, ee1, ee2, ee3, ee4, ee5) => {
        await request.get(base_url + "alunos")
            .then(body => {
                expect(body.includes(`"cpf":"114","email":"l.de@hot","metas":{"EE1":"ma","EE2":"MPa","EE3":"MPA","EE4":"mA","EE5":"MaNa"},"media":""`)).to.equal(true);
                                        
            });
    })

})