
describe('Sign up', () => {

  before(() => {
    cy.visit('/signup')
  })

  it('Produces error if email is invalid', () => {

    cy.get('input[name="username"]')
      .clear()
      .type('Timo')
      .should('have.value', 'Timo')

    cy.get('input[name="email"]')
      .clear()
      .type('timonsahkoposti')
      .should('have.value', 'timonsahkoposti')

    cy.get('input[name="passwordOne"]')
      .type('salaisuudet')
    cy.get('input[name="passwordOne"]')
      .should('have.value', 'salaisuudet')

    cy.get('input[name="passwordTwo"]')
      .type('salaisuudet')
    cy.get('input[name="passwordTwo"]')
      .should('have.value', 'salaisuudet')

    cy.contains('Sign Up').click()
    // cy.get('button').contains('Sign Up').click()
    cy.contains('badly formatted')
    cy.wait(1000)

  })

  after(() => {
    cy.wait(2000)
    cy.get('body').then(($body) => {
      if ($body.text().includes('Logout')) {
        console.log('CONTAINS LOGOUT', )
        cy.contains('Logout').click()
      }
    })
  })

})