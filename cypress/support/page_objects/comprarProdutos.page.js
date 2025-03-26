class ComprarProdutos {

    visitarPaginaProdutos(){
        cy.visit("produtos")
    }

    visitarProduto(nomeProduto){
        const urlFormatada = nomeProduto.replace(/ /g,"-")
        cy.visit(`produtos/${urlFormatada}`)

    }

    addCarrinho(tamanho, cor, quantidade){
        cy.get('.button-variable-item-' + tamanho).click()
        cy.wait(4000)
        cy.get('.button-variable-item-' + cor).click()
        cy.wait(4000)
        cy.get('.input-text').clear().type(quantidade)
        cy.get('.single_add_to_cart_button').click()
        cy.get('.woocommerce-message > .button').should("exist")
    }

}

export default new ComprarProdutos()