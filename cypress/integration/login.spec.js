
describe('Login', () => {

  it('With empty login fields, login button is disabled', () => {
    cy.visit('/')
    cy.contains('Login').click()

    cy.url().should('include', '/login')
    cy.get('button').contains('Login').should('be.disabled')
  })

  it('Email can be typed to the email field', () => {
    cy.get('input[name="email"]')
      .type('fake@email.com')
      .should('have.value', 'fake@email.com')
  })

  it('Password can be typed to the password field', () => {
    cy.get('input[name="password"]')
      .type('wrongpassword')
      .should('have.value', 'wrongpassword')
  })

  it('Login attempt with wrong password produces error', () => {
    cy.get('button').contains('Login').click()
    cy.contains('no user record')
  })

  it('Login with valid credentials succeeds', () => {
    cy.get('input[name="email"]')
      .clear()
      .type('joose.helle@gmail.com')

    cy.get('input[name="password"]')
      .clear()
      .type('salaisuudet')

    cy.get('button').contains('Login').click()
    cy.contains('Logout')
    cy.wait(2000)
  })

  it('Loggs out', () => {
    cy.contains('Logout').click()
    cy.contains('Logged out')
  })

  after(() => {

  })

})