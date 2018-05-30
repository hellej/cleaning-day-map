
describe('Sign up', () => {

  it('Produces error if email is invalid', () => {

    cy.visit('/signup')

    cy.get('input[name="username"]')
      .clear()
      .type('Timo')
      .should('have.value', 'Timo')

    cy.get('input[name="email"]')
      .clear()
      .type('timonsahkoposti')
      .should('have.value', 'timonsahkoposti')

    cy.get('input[name="passwordOne"]')
      .clear()
      .type('salaisuudet')
      .should('have.value', 'salaisuudet')

    cy.get('input[name="passwordTwo"]')
      .clear()
      .type('salaisuudet')
      .should('have.value', 'salaisuudet')

    cy.get('button').contains('Sign Up').click()
    cy.contains('badly formatted')
    cy.wait(2000)

  })
})