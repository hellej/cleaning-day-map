
describe('Feature list', () => {

  before(() => {
    logIn()
  })

  it('Add feature form opens', () => {
    cy.wait(1000)
    cy.contains('Add Table').click()
  })

  it('Fields in the form accept text', () => {
    cy.wait(1000)

    cy.get('input[name="title"]')
      .clear()
      .type('Uusi kohde')
      .should('have.value', 'Uusi kohde')

    cy.get('textarea[name="description"]')
      .clear()
      .type('Uuden kohteen kuvaus')
      .should('have.value', 'Uuden kohteen kuvaus')

    cy.get('input[name="phonenum"]')
      .clear()
      .type(54321)
      .should('have.value', '54321')

    cy.get('input[name="openhours"]')
      .clear()
      .type('Aamutuimaan')
      .should('have.value', 'Aamutuimaan')
  })

  it('Select location opens', () => {
    cy.contains('Set Location').click()
    cy.contains('Drag or click')
    cy.contains('Confirm')
    cy.url().should('include', '/location')
  })

  it('Confirm location redirects back to form', () => {
    cy.contains('Confirm').click()
    cy.contains('confirmed')
    cy.url().should('eq', 'http://localhost:3000/addtable')
    cy.get('button').contains('Add Table')
  })

  it('Feature can be added', () => {
    cy.get('button').contains('Add Table').click()
    cy.wait(1500)
    cy.url().should('eq', 'http://localhost:3000/')
    cy.contains('Aamutuimaan')
  })

  it('Feature can be edited', () => {
    cy.get('button').contains('Edit').click()
    cy.url().should('include', '/edittable')
    cy.get('input[name="openhours"]')
      .should('have.value', 'Aamutuimaan')
      .clear()
      .type('Iltamyöhään')
      .should('have.value', 'Iltamyöhään')
    cy.get('button').contains('Save Table').click()
    cy.wait(1500)
    cy.contains('Table saved succesfully')
    cy.url().should('eq', 'http://localhost:3000/')
    cy.contains('Iltamyöhään')
  })

  it('Feature can be deleted', () => {
    cy.get('button').contains('Delete').click()
    cy.contains('Table removed')
  })


  after(() => {
    cy.contains('Logout').click()
    cy.wait(1000)
  })

})


const logIn = () => {
  cy.visit('/')
  cy.contains('Login').click()
  cy.get('input[name="email"]')
    .clear()
    .type('joose.helle@gmail.com')
  cy.get('input[name="password"]')
    .clear()
    .type('salaisuudet')
  cy.get('button').contains('Login').click()
  cy.contains('Logout')
  cy.wait(2000)
}
