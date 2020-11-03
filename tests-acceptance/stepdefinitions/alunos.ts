import { defineSupportCode } from 'cucumber';
import { request } from 'http';
import { browser, $, element, ElementArrayFinder, by, promise, ElementFinder } from 'protractor';

let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;
let path = require("path");

let sameCPF = ((elem: any, cpf:any) => elem.element(by.name('cpflist')).getText().then((text : string) => text === cpf));



defineSupportCode(function ({ Given, When, Then }) {

    // 1

    Given(/^I am at the students page$/, async () => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('GerenciamentoDeMetas');
        await $("a[name='alunos']").click();
    })

    Given(/^I cant see a student with CPF "(\d*)" in the students list$/, async (cpf:string) => {
        var allcpfs : ElementArrayFinder = element.all(by.name('cpflist'));
        var samecpfs = allcpfs.filter(elem =>
                                      elem.getText().then(text => text === cpf));
        await samecpfs.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(0));
    });

    When(/^I upload a spreadsheet containing my students$/, async () => {
        var fileToUpload = "../planilha.csv";
        var absolutePath = path.resolve(__dirname, fileToUpload);
        await element(by.name("uploadbutton")).sendKeys(absolutePath);
    });

    Then(/^I can see a student with CPF "(\d*)" in the students list$/, async (cpf:string) => {
        var allalunos : ElementArrayFinder = element.all(by.name('alunolist'));
        await allalunos.filter(elem => sameCPF(elem,cpf)).then
                   (elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    });

    // 2

    Given (/^I can see a student with CPF "(\d*)" in the list of students$/, async (cpf:string)=>{
        await $("input[name='namebox']").sendKeys(<string> "Andre");
        await $("input[name='cpfbox']").sendKeys(<string> cpf);
        await $("input[name='emailbox']").sendKeys(<string> "aaav@cin");
        var allalunos : ElementArrayFinder = element.all(by.name('alunolist'));
        await expect(allalunos.filter(elem => sameCPF(elem,cpf)).then
        (elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1)));
    });

    Given (/^I cannot see a student with CPF "(\d*)" in the students list$/, async (cpf:string)=>{
        var allalunos : ElementArrayFinder = element.all(by.name('alunolist'));
        await expect(allalunos.filter(elem => sameCPF(elem,cpf)).then
        (elems => expect(Promise.resolve(elems.length)).to.eventually.equal(0)));
    });

    When (/^I upload a new spreadsheet containing my students$/, async ()=>{
        var fileToUpload = "../planilha2.csv";
        var absolutePath = path.resolve(__dirname, fileToUpload);
        await element(by.name("uploadbutton")).sendKeys(absolutePath);
    });

    Then (/^I can still see a student with CPF "(\d*)"$/, async (cpf:string)=>{
        var allalunos : ElementArrayFinder = element.all(by.name('alunolist'));
        await expect(allalunos.filter(elem => sameCPF(elem,cpf)).then
        (elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1)));
    });

    Then (/^I can see a student with CPF "(\d*)"$/, async (cpf:string)=>{
        var allalunos : ElementArrayFinder = element.all(by.name('alunolist'));
        await expect(allalunos.filter(elem => sameCPF(elem,cpf)).then
        (elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1)));
    });

    // 3

    

})