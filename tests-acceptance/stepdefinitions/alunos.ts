import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by, promise, ElementFinder } from 'protractor';
import request = require("request-promise");

var base_url = "http://localhost:3000/";
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;
let path = require("path");

// let sameCPF = ((elem: any, cpf:any) => elem.element(by.name('cpflist')).getText().then((text : string) => text === cpf));

async function uploadSpreadsheet(spreadsheet) {
    var absolutePath = path.resolve(__dirname, spreadsheet);
    await element(by.name("uploadbutton")).sendKeys(absolutePath);
}

async function assertElementsWithSameCPF(n, cpf) {
    var allcpfs: ElementArrayFinder = element.all(by.name('cpflist'));
    var samecpfs = allcpfs.filter(elem =>
        elem.getText().then(text => text === cpf));
    await samecpfs.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(n));
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

defineSupportCode(function ({ Given, When, Then }) {

    // GUI

    // 1

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
    });

    Then(/^I can see a student with CPF "(\d*)" in the students list$/, async (cpf: string) => {
        await assertElementsWithSameCPF(1, cpf);
    });


    // 2

    Given(/^I can see a student with CPF "(\d*)" in the list of students$/, async (cpf: string) => {
        await assertElementsWithSameCPF(1, cpf);
    });

    Given(/^I cannot see a student with CPF "(\d*)" in the students list$/, async (cpf: string) => {
        await assertElementsWithSameCPF(0, cpf);
    });

    When(/^I upload a new spreadsheet containing my students$/, async () => {
        var fileToUpload = "../planilha2.csv";
        uploadSpreadsheet(fileToUpload);
    });

    Then(/^I can still see a student with CPF "(\d*)"$/, async (cpf: string) => {
        await assertElementsWithSameCPF(1, cpf);
    });

    Then(/^I can see a student with CPF "(\d*)"$/, async (cpf: string) => {
        await assertElementsWithSameCPF(1, cpf);
    });

    // 3

    When(/^I try to register a student with CPF "(\d*)" and email "([^\"]*)"$/, async (cpf: string, email: string) => {
        await $("input[name='namebox']").sendKeys(<string>"Daniel");
        await $("input[name='cpfbox']").sendKeys(<string>cpf);
        await $("input[name='emailbox']").sendKeys(<string>email);
        await element(by.name('namebox')).click();
    });

    Then(/^I cant see student with CPF "(\d*)" in the list$/, async (cpf: string) => {
        // var invalidEmail = element(by.name('msgemailinvalido'));
        // await expect(invalidEmail.evaluate("emailinvalido")).to.equal(true);
        await assertElementsWithSameCPF(0, cpf);
    });

    // Service

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

})