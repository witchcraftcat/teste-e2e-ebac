/// <reference types="cypress" />
import { faker } from '@faker-js/faker';
import comprarProdutosPage from '../support/page_objects/comprarProdutos.page';

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
  /*  Como cliente 
      Quero acessar a Loja EBAC 
      Para fazer um pedido de 4 produtos 
      Fazendo a escolha dos produtos
      Adicionando ao carrinho
      Preenchendo todas opções no checkout
      E validando minha compra ao final */

  beforeEach(() => {
      comprarProdutosPage.visitarPaginaProdutos()
  });

  it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
    cy.fixture("listaProduto").then((dados) =>{
        dados.forEach((produtos) =>{
            comprarProdutosPage.visitarProduto(produtos.nomeProduto)
            comprarProdutosPage.addCarrinho(produtos.tamanho, produtos.cor, produtos.quantidade)
        })
        //cy.get('.woocommerce-message > .button').click()
    })

    cy.get('#cart > .dropdown-toggle').click()
    cy.get('#cart > .dropdown-menu > .widget_shopping_cart_content > .mini_cart_content > .mini_cart_inner > .mcart-border > .buttons > .view-cart').click()
    cy.get('.checkout-button').click()

    cy.get('#billing_first_name').type(faker.person.firstName())
    cy.get('#billing_last_name').type(faker.person.lastName())
    cy.get('#billing_address_1').type(faker.location.streetAddress())
    cy.get('#billing_city').type(faker.location.city())
    cy.get('#billing_postcode').type(faker.location.zipCode("########"))
    cy.get('#billing_phone').type(faker.phone.number({ style: 'national' }))
    cy.get('#billing_email').type(faker.internet.email())

    cy.get('#terms').click()
    cy.get('#place_order').click()

    cy.get('.woocommerce-order-overview__order > strong').should("exist")



  });


})