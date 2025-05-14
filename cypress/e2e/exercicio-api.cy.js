/// <reference types="cypress" />
import contratoUsuario from "../contracts/usuarios.contract"
import { faker } from '@faker-js/faker';

describe('Testes da Funcionalidade Usuários', () => {

  it('Deve validar contrato de usuários', () => {
    cy.request("usuarios").then(response => {
      return contratoUsuario.validateAsync(response.body)
    })
  });

  it('Deve listar usuários cadastrados', () => {
    cy.request({
      method:"GET",
      url:"usuarios",
    }).should((response) => {
      expect(response.status).equal(200)
      expect(response.body).to.have.property("usuarios")
    })
  });

  it('Deve cadastrar um usuário com sucesso', () => {
    var usuario = faker.person.fullName()
    var email = faker.internet.email()
    var senha = faker.internet.password()
    var admin = "false"
    cy.cadastrarUsuario(usuario, email, senha, admin).should((response)=> {
      expect(response.status).equal(201)
      expect(response.body.message).equal("Cadastro realizado com sucesso")
    })
  });

  it('Deve validar um usuário com email inválido', () => {
    cy.cadastrarUsuario("Fulaninho de Tal", "fulano@qa.com", "teste", "true").should((response) =>{
      expect(response.status).equal(400)
      expect(response.body.message).equal("Este email já está sendo usado")
    }) 
  });

  it('Deve editar um usuário previamente cadastrado', () => {
    let email = "anakin" + Math.floor(Math.random() * 1000) + "@jeditemple.com"
    let email2 = "darthvader" + Math.floor(Math.random() * 1000) + "@empire.com"
    cy.cadastrarUsuario("Anakin Skywalker", email, "maythe4", "true")
        .then(response => {
            let id = response.body._id
            cy.request({
                method: "PUT",
                url:`usuarios/${id}`,
                body:{
                    "nome": "Darth Vader",
                    "email": email2,
                    "password": "darkside",
                    "administrador": "true"
                },
            }).should((response) =>{
                expect(response.status).equal(200)
                expect(response.body.message).equal("Registro alterado com sucesso")
            })
        })     
  });

  it('Deve deletar um usuário previamente cadastrado', () => {
    let email = "darthsidious" + Math.floor(Math.random() * 1000) + "@deathstar.com"
    cy.cadastrarUsuario("Darth Sidious", email, "doIt", "true")
        .then(response => {
            let id = response.body._id
            cy.request({
                method: "DELETE",
                url:`usuarios/${id}`,
            }).should((response) =>{
                expect(response.status).equal(200)
                expect(response.body.message).equal("Registro excluído com sucesso")
            })
        })    
}); 

  });

