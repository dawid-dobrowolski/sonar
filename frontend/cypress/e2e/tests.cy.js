describe('Elektro.pl tests', () => {
  it('Check if the page is accessible', () => {
    cy.visit('http://127.0.0.1:5173')
  })

  it('Check header elements', () => {
    cy.visit('http://127.0.0.1:5173');

    cy.get('.cartLogo').should('be.visible');
    
    cy.get('.shopLogo img')
      .should('be.visible')
      .should('have.attr', 'src')
      .and('eq', '/src/assets/cpu.png');

    cy.get('.cartLogo button img')
      .should('be.visible')
      .should('have.attr', 'src')
      .and('eq', '/src/assets/trolley.png');
    
    cy.get('.shopLogoText')
      .should('be.visible')
      .should('have.text', 'ElektroBit.pl');
  });
  
  it('Check Products section', () => {
    cy.visit('http://127.0.0.1:5173');

    cy.get('.productDetailsList')
      .should('be.visible');
  })

  it('Products section should contain at least 1 element', () => {
    cy.visit('http://127.0.0.1:5173');
    
    cy.get('.productDetailsList')
      .find('li').should('have.length.greaterThan', 0);
  })

  it('Every product should contain full pack of data', () => {
    cy.visit('http://127.0.0.1:5173');
    
    cy.get('.productDetailsList li')
    .each(($li) => {
      cy.wrap($li).find('img')
        .should('be.visible')
        .should('have.attr', 'src')
        .and('not.be.empty');
      
      cy.wrap($li).find('h3')
        .should('be.visible')
        .should('not.be.empty');

      cy.wrap($li).find('p#productDescription')
        .should('be.visible')  
        .should('not.be.empty');

        // Check that each li contains a p element with id="productPrice" and text
        cy.wrap($li).find('p#productPrice')
        .should('be.visible')
        .should('not.be.empty')
        .should('contain', 'zł');

        // Check that each li contains a button with text
        cy.wrap($li).find('button')
        .should('be.visible')
        .should('not.be.empty')
        .should('contain.text', 'Dodaj do Koszyka');
    });
  });

  it('On cart button click cart modal should be showed', () => {
    cy.visit('http://127.0.0.1:5173');
    
    cy.get('.cartLogo button').click();

    cy.get('.modal-cart')
          .should('have.attr', 'open');
  })

  it('Cart value should be 0 when no product where choosen', () => {
    cy.visit('http://127.0.0.1:5173');
    
    cy.get('.cartLogo button').click();
    
    cy.get('.cart-total')
          .should('contain.text', '0 zł');

  })

  it('Cart value should be different than 0 when products where choosen', () => {
      cy.visit('http://127.0.0.1:5173');

      cy.get('.productDetailsList li')
        .first()
        .find('button')
        .click();

        cy.get('.cartLogo button').click();
        
        cy.get('.cart-total')
        .should('not.contain.text', '0 zł');
  })

  it('If cart dont have any elements the Payment button should be hidden', () => {
    cy.visit('http://127.0.0.1:5173');

    cy.get('.cartLogo button').click();

    cy.get('.paymentGoButton').should('not.exist');

  })

  it('If cart have any elements the Payment button should be visible', () => {
    cy.visit('http://127.0.0.1:5173');

    cy.get('.productDetailsList li')
        .first()
        .find('button')
        .click();

    cy.get('.cartLogo button').click();

    cy.get('.paymentGoButton')
      .should('exist')
      .should('be.visible');

  })

  it('If cart have any elements user should be able to go to Payment, and the Payment view should be visible', () =>{
    cy.visit('http://127.0.0.1:5173');

    cy.get('.productDetailsList li')
        .first()
        .find('button')
        .click();

    cy.get('.cartLogo button').click();

    cy.get('.paymentGoButton').click();

    cy.get('.modal-payment')
      .should('have.attr', 'open');
  })

  it('If the user cancel the payment, the payment windows shouldnt be visible', () => {
    cy.visit('http://127.0.0.1:5173');

    cy.get('.productDetailsList li')
        .first()
        .find('button')
        .click();

    cy.get('.cartLogo button').click();

    cy.get('.paymentGoButton').click();

    cy.get('.paymentCancel').click();

    cy.get('.modal-payment')
      .should('not.have.attr', 'open');
  })

  it('If the user close the cart the cart shouldnt be visible', () => {
    cy.visit('http://127.0.0.1:5173');

    cy.get('.productDetailsList li')
        .first()
        .find('button')
        .click();

    cy.get('.cartLogo button').click();

    cy.get('.closeButton').click();

    cy.get('.modal-cart')
      .should('not.have.attr', 'open');
  })

  it('Header should stick to the top, when the user scroll page down', () => {
    cy.visit('http://127.0.0.1:5173');

    cy.get('header').then(($header) => {
            const initialPosition = $header.position().top;

            cy.scrollTo('bottom');
            cy.get('header').should(($header) => {
              expect($header.position().top).to.equal(initialPosition);
          });
        })
  })

  it('Cart should contain all data about the selected Products', () => {
    cy.visit('http://127.0.0.1:5173');
    let name, price, quantity = 0;

    cy.get('.productDetailsList li')
        .first().as('testedProduct');
    
    cy.get('@testedProduct').find('h3').invoke('text').then((productName) => {
      name = productName;
    })

    cy.get('@testedProduct').find('#productPrice').invoke('text').then((productPrice) => {
      price = productPrice;
      console.log(price);
    })

    for(let i = 0; i < 3; i++) {
      cy.get('.productDetailsList li')
        .first()
        .find('button')
        .click();

        quantity++;
    }

    cy.get('.cartLogo button').click();

    cy.get('.modal-cart ul li').first().within(() => {
      cy.get('p').should('contain.text', name + ' - ' + quantity)
    })
  })

  it('Ensure the cart final price is calculate right', () => {
    cy.visit('http://127.0.0.1:5173');

    let price1 = 0, price2 = 0;
    let quantity1 = 0, quantity2 = 0;

    cy.get('.productDetailsList li').eq(0).as('firstProduct');
    cy.get('.productDetailsList li').eq(1).as('secondProduct');

    cy.get('@firstProduct').find('#productPrice').invoke('text').then((productPrice) => {
      price1 = productPrice;
  
    })

    cy.get('@secondProduct').find('#productPrice').invoke('text').then((productPrice) => {
      price2 = productPrice;
    })

    for(let i = 0; i < 3; i++) {
      cy.get('.productDetailsList li').eq(0)
        .find('button')
        .click();

        quantity1++;
    }

    for(let i = 0; i < 5; i++) {
      cy.get('.productDetailsList li').eq(1)
        .find('button')
        .click();

        quantity2++;
    }

    cy.get('.cartLogo button').click();

    cy.get('.cart-total').should('contain.text', price1*quantity1+price2*quantity2);
  })

  it('Decrease quantity of product in cart work right, the quantity and final price should decrease', () => {
    cy.visit('http://127.0.0.1:5173');

    let quantity = 0;

    for(let i = 0; i < 3; i++) {
      cy.get('.productDetailsList li')
        .first()
        .find('button')
        .click();

        quantity++;
    }
    cy.get('.cartLogo button').click();

    cy.get('.decreaseButton').click();

    cy.get('.modal-cart span').should('contain.text', quantity-1)
  })

  it('Increase quantity of product in cart work right, the quantity and final price should increase', () => {
    cy.visit('http://127.0.0.1:5173');

    let quantity = 0;

    for(let i = 0; i < 3; i++) {
      cy.get('.productDetailsList li')
        .first()
        .find('button')
        .click();

        quantity++;
    }
    cy.get('.cartLogo button').click();

    cy.get('.increaseButton').click();

    cy.get('.modal-cart span').should('contain.text', ++quantity)
  })

  // it('Payment should output error when the payment code is incorrect', () => {
  //   cy.visit('http://127.0.0.1:5173');
  // })

  // it('User should get number of placed order after paying', () => {
  //   cy.visit('http://127.0.0.1:5173');
  // })

  // it('After placed order, the cart should be empty', () => {

  // })
})