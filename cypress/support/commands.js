Cypress.Commands.add('login', (usuario, senha) => {
    cy.get('#username').type(usuario)
    cy.get('#password').type(senha, { log: false })
    cy.get('.woocommerce-form > .button').click()

});

Cypress.Commands.add('firstRegister', (email, password, firstName, lastName) => {
    cy.get('.icon-user-unfollow').click();
    cy.get('#reg_email').type(email);
    cy.get('#reg_password').type(password);
    cy.get(':nth-child(4) > .button').click();
    cy.get('.woocommerce-MyAccount-navigation-link--edit-account > a').click();
    cy.get('#account_first_name').type(firstName);
    cy.get('#account_last_name').type(lastName);
    cy.get('.woocommerce-Button').click();
    cy.get('.woocommerce-message').should('contain', 'Detalhes da conta modificados com sucesso.');

})

Cypress.Commands.add('addProductOnCart', (item,size,color,quantity) => {
    //adicionando primeiro item
    cy.get('#primary-menu > .menu-item-629 > a').click();
    cy.get('[class="product-block grid"]').eq(item).click();
    //cy.get(`.button-variable-item-${size}`).click({force:true});
    cy.get(`[class="variable-item button-variable-item button-variable-item-${size}"]`).click();
    cy.get(`.button-variable-item-${color}`).click();
   // cy.get('.button-variable-item-Red').click();
    cy.get('.input-text').clear().type(quantity); 
    cy.get('.single_add_to_cart_button').click();
    }) 

Cypress.Commands.add('checkout',()=>{
    cy.get('.woocommerce-message > .button').click();
    cy.get('.checkout-button').click()
    //cy.get('#payment_method_cod').click();
    //cy.get('[class="woocommerce-form__input woocommerce-form__input-checkbox input-checkbox"]').click();
    cy.get('.woocommerce-terms-and-conditions-checkbox-text').click({ force:true });
    cy.get('#place_order').click({force:true});
    cy.get('.woocommerce-notice').should('contain','Obrigado. Seu pedido foi recebido.');
})


 //cy.get('[data-attribute_values='+ arraySize +']').click();
   //cy.get('[data-attribute_values='+ arrayColor +']').click();
    //cy.get('[class="variable-item button-variable-item button-variable-item-'+color+']"').click();
    //cy.get('[class="variable-item button-variable-item button-variable-item-Red"]').click();