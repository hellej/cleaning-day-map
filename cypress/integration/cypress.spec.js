

describe.skip('Cypress works (skipped)', () => {

  describe('My First Test', () => {
    it('Should be just fine!', () => {
      expect(true).to.equal(true)
    })
  })

  describe('My Second Test', () => {
    it('This is expected to fail...', () => {
      expect(true).to.equal(false)
    })
  })

})