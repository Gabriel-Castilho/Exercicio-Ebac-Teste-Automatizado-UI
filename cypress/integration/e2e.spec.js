/// <reference types="cypress" />
import { faker } from '@faker-js/faker'
const dataAddress = require('../fixtures/address.json')
import enderecoPage from '../support/page_objects/endereco.page';
//import { data } from 'cypress/types/jquery';


context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */

    beforeEach(() => {
        cy.visit('/')
    });

    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {

        let firstName = faker.name.firstName();
        let lastName = faker.name.lastName();
        let password = "!Teste@teste.com";
        let email = faker.internet.email(firstName);
        let quantity = Math.floor(Math.random() * (9 - 1) + 1);
        cy.firstRegister(email, password, firstName, lastName)
        cy.get('.woocommerce-message').should('contain', 'Detalhes da conta modificados com sucesso.');
        //editar endereço de cobrança
        enderecoPage.editBillingAddress(firstName,
            lastName,
            dataAddress[2].company,
            dataAddress[2].country,
            dataAddress[2].number,
            dataAddress[2].city,
            dataAddress[2].country,
            dataAddress[2].state,
            dataAddress[2].postalCode,
            dataAddress[2].phoneNumber,
            email
        )
        cy.get('.woocommerce-message').should('contain', 'Endereço alterado com sucesso');
        //editar endereço de entrega
        enderecoPage.editShippingAddress(firstName,
            lastName,
            dataAddress[2].company,
            dataAddress[2].country,
            dataAddress[2].number,
            dataAddress[2].city,
            dataAddress[2].country,
            dataAddress[2].state,
            dataAddress[2].postalCode,
        )
        cy.get('.woocommerce-message').should('contain', 'Endereço alterado com sucesso');
        //adicionar produtos no carrinho

        cy.addProductOnCart(0, "M", "Red", quantity);
        //valida se o número apresentado no carrinho está conforme o que foi adicionado
        cy.get('.dropdown-toggle > .mini-cart-items').should('contain', quantity * 1);
        cy.addProductOnCart(8, "XL", "Blue", quantity);
        //valida se o número apresentado no carrinho está conforme o que foi adicionado
        cy.get('.dropdown-toggle > .mini-cart-items').should('contain', quantity * 2);
        cy.addProductOnCart(0, "S", "Green", quantity);
        //valida se o número apresentado no carrinho está conforme o que foi adicionado
        cy.get('.dropdown-toggle > .mini-cart-items').should('contain', quantity * 3);
        //valida se o número apresentado no carrinho está conforme o que foi adicionado
        cy.addProductOnCart(8, "M", "Blue", quantity);
        //valida se o número apresentado no carrinho está conforme o que foi adicionado
        cy.get('.dropdown-toggle > .mini-cart-items').should('contain', quantity * 4);
        //ir para pagamento
        cy.checkout();
        cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido.');

    });


    //it.only('deve adicionar produtos no carrinho', () => {
    /* NÃO É POSSÍVEL DEIXAR TUDO AUTOMÁTICO, VISTO QUE EXISTEM PRODUTOS QUE SÓ POSSUI UMA COR, OU TAMANHO
    let quantity = Math.floor(Math.random() * (9 - 1) + 1);
    let arraySize = Math.floor(Math.random() * (5 - 1) + 1);
    let arrayColor = Math.floor(Math.random() * (3 - 1) + 1);
     cy.selectProducts(quantity);
    cy.addProductOnCart(arraySize,arrayColor,quantity);
    */

    // })

})