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
        cy.get('.woocommerce-message > .button').click()
    })


  });


})