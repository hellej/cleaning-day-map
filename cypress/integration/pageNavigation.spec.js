

describe('Page navigation', () => {

  it('Loads the front page', () => {
    cy.visit('localhost:3000/')
    cy.contains('List Tables')
    cy.contains('Add Table')
    cy.contains('Login')
  })

  it('Loads the feature list', () => {
    cy.visit('http://localhost:3000/filtertables')
    cy.contains('Kledjuja ja pyörä')
  })

  it('Loads the add feature form', () => {
    cy.visit('http://localhost:3000/addtable')
    cy.contains('Set Location')
  })

  it('Loads the login page', () => {
    cy.visit('http://localhost:3000/login')
    cy.contains('Sign Up')
  })

  it('Loads the sign up page', () => {
    cy.visit('http://localhost:3000/signup')
    cy.contains('Sign In')
  })

  it('Navigation menu links work', () => {
    cy.visit('localhost:3000/')

    cy.contains('Login').click()
    cy.url().should('include', '/login')
    cy.contains('Sign Up')

    cy.contains('Add Table').click()
    cy.url().should('include', '/addtable')
    cy.contains('Set Location')

    cy.contains('List Tables').click()
    cy.url().should('include', '/filtertables')
    cy.contains('Kledjuja ja pyörä')
  })

})



