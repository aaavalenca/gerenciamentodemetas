import { equal } from 'assert';
import { defineSupportCode } from 'cucumber';
import { request } from 'http';
import { browser, $, element, ElementArrayFinder, by, promise, ElementFinder } from 'protractor';

let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;
let path = require("path");

let sameCPF = ((elem, cpf) => elem.element(by.name('cpflist')).getText().then(text => text === cpf));
let sameName = ((elem, name) => elem.element(by.name('nomelist')).getText().then(text => text === name));

let pAND = ((p,q) => p.then(a => q.then(b => a && b)))

async function criarAluno(name, cpf, email) {
    await $("input[name='namebox']").sendKeys(<string> name);
    await $("input[name='cpfbox']").sendKeys(<string> cpf);
    await $("input[name='emailbox']").sendKeys(<string> email);
    await element(by.buttonText('Adicionar')).click();
}

async function removerAluno() {
    await element(by.name('x')).click();
}

async function assertTamanhoEqual(set,n) {
    await set.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(n));
}

async function assertTamanhoEqualArray(set,n) {
    await set.then(elems => expect(Promise.resolve(elems[0].length)).to.eventually.equal(n));
}

async function assertTamanhoNotEqualArray(set,n) {
    await set.then(elems => expect(Promise.resolve(elems[0].length)).to.eventually.not.equal(n));
}

async function assertElementsWithSameCPFAndName(n,cpf,name) { 
    var allalunos : ElementArrayFinder = element.all(by.name('alunolist'));
    var samecpfsandname = allalunos.filter(elem => pAND(sameCPF(elem,cpf),sameName(elem,name)));
    await assertTamanhoEqual(samecpfsandname,n);
}

async function assertElementsWithSameCPF(n,cpf) {
    var allalunos : ElementArrayFinder = element.all(by.name('alunolist'));
    var samecpfs = allalunos.filter(elem => sameCPF(elem,cpf));
    await assertTamanhoEqual(samecpfs,n); 
}

defineSupportCode(function ({ Given, When, Then}) {

    Given(/^I am at the students page$/, async () => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('GerenciamentoDeMetas');
        await $("a[name='alunos']").click();
    })

    Given(/^I am at the metas page$/, async () => {
        await browser.get("http://localhost:4200/metas");
        await expect(browser.getTitle()).to.eventually.equal('GerenciamentoDeMetas');
    })

    Given(/^I cannot see a student with CPF "(\d*)" in the students list$/, async (cpf) => {
        await assertElementsWithSameCPF(0,cpf);
    });

    When(/^I try to register the student "([^\"]*)" with CPF "(\d*)" and email "([^\"]*)"$/, async (name, cpf, email) => {
        await criarAluno(name,cpf, email);
    });

    Then(/^I can see "([^\"]*)" with CPF "(\d*)" in the students list$/, async (name, cpf) => {
        await assertElementsWithSameCPFAndName(1,cpf,name);
    });

    Given(/^I can see a student with CPF "(\d*)" in the students list$/, async (cpf) => {
        await assertElementsWithSameCPF(1,cpf);
    });

    Given(/^I can see a student with CPF "(\d*)" in the goals table$/, async (cpf) => {
        var allalunos : ElementArrayFinder = element.all(by.name('goalstable'));
        var samecpfs = allalunos.filter(elem => sameCPF(elem,cpf));
        await assertTamanhoEqual(samecpfs,1);
    });

    Then(/^I cannot see "([^\"]*)" with CPF "(\d*)" in the students list$/, async (name, cpf) => {
        await assertElementsWithSameCPFAndName(0,cpf,name);
    });

    Then(/^I can see an error message$/, async () => {
        var allmsgs : ElementArrayFinder = element.all(by.name('msgcpfexistente'));
        await assertTamanhoEqual(allmsgs,1);
    });

    Given(/^I can see a student with CPF "(\d*)" in the student list$/, async(cpf) => {
        await assertElementsWithSameCPF(1,cpf);
    })

    When (/^I try to remove the student with CPF "(\d*)"$/, async(cpf) => {
        var allalunos: ElementArrayFinder = element.all(by.name('alunolist'));
        var samecpfs = allalunos.filter(elem => sameCPF(elem, cpf));
        await samecpfs.all(by.name('x')).click();
       })

    Then (/^I cannot see the student with CPF "(\d*)" in the students list$/, async(cpf) => {
        await assertElementsWithSameCPF(0,cpf);
    })

    When(/^I fill EE1 with "([^\"]*)", EE2 with "([^\"]*)", EE3 with "([^\"]*)", EE4 with "([^\"]*)" and EE5 with "([^\"]*)" for the student with CPF "(\d*)"$/, async (ee1, ee2, ee3, ee4, ee5, cpf) => {
        var allalunos: ElementArrayFinder = element.all(by.name('goalstable'));
        var samecpfs = allalunos.filter(elem => sameCPF(elem, cpf));
        await samecpfs.all(by.name('EE1')).sendKeys(<string> ee1);
        await samecpfs.all(by.name('EE2')).sendKeys(<string> ee2);
        await samecpfs.all(by.name('EE3')).sendKeys(<string> ee3);
        await samecpfs.all(by.name('EE4')).sendKeys(<string> ee4);
        await samecpfs.all(by.name('EE5')).sendKeys(<string> ee5);
        await samecpfs.all(by.name('EE1')).sendKeys(<string>"");
    });

    When(/^I incompletely fill EE1 with "([^\"]*)", EE2 with "([^\"]*)", EE3 with "([^\"]*)" and EE5 with "([^\"]*)" for the student with CPF "(\d*)"$/, async (ee1, ee2, ee3, ee5, cpf) => {
        var allalunos: ElementArrayFinder = element.all(by.name('goalstable'));
        var samecpfs = allalunos.filter(elem => sameCPF(elem, cpf));
        await samecpfs.all(by.name('EE1')).sendKeys(<string> ee1);
        await samecpfs.all(by.name('EE2')).sendKeys(<string> ee2);
        await samecpfs.all(by.name('EE3')).sendKeys(<string> ee3);
        await samecpfs.all(by.name('EE5')).sendKeys(<string> ee5);
        await samecpfs.all(by.name('EE1')).sendKeys(<string>"");
    });

    When (/^I try to calculate the average grade from the students$/, async() => {
        await element(by.name('calcularMedia')).click();
    })

    Then (/^I can see the average grade of the student with CPF "(\d*)"$/, async(cpf:string) => {
        var allstudents : ElementArrayFinder = element.all(by.name('goalstable'));
        var thisstudent = allstudents.filter(elem => sameCPF(elem,cpf));
        var studentvalue = thisstudent.all(by.name('media')).getAttribute('value');
        await assertTamanhoNotEqualArray(studentvalue,0)
    })

    Then (/^I cannot see the average grade of the student with CPF "(\d*)"$/, async(cpf:string) => {
        var allstudents : ElementArrayFinder = element.all(by.name('goalstable'));
        var thisstudent = allstudents.filter(elem => (sameCPF(elem,cpf)));
        var studentvalue = thisstudent.all(by.name('media')).getAttribute('value');
        await assertTamanhoEqualArray(studentvalue,0)
    })
})