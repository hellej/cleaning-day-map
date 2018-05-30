

describe('Feature list', () => {

  before(() => {
    logIn()
  })

  it('First feature is rendered in the list', () => {
    cy.contains('List Tables').click()
    cy.contains('Kledjuja ja pyörä')
    cy.contains('lastenvaatteita')
  })

  it('After click to zoom button, popup of the feature is rendered', () => {
    cy.contains('Zoom').click()
    cy.wait(3000)
    cy.contains('Aamulla')

  })


  after(() => {
    cy.contains('Logout').click()
  })

})


const logIn = () => {
  cy.visit('localhost:3000/')
  cy.contains('Login').click()
  cy.get('input[name="email"]')
    .clear()
    .type('joose.helle@gmail.com')
  cy.get('input[name="password"]')
    .clear()
    .type('salaisuudet')
  cy.get('button').contains('Login').click()
  cy.wait(3000)
  cy.contains('welcome')
  cy.contains('Jose')
}


// cy.get('body').then(($body) => {
//   if ($body.text().includes('Logout')) {
//     console.log('CONTAINS LOGOUT', )
//     cy.contains('Logout').click()
//   }
//   console.log('LOGGING IN', )
// })