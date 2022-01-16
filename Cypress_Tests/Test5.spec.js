<reference types="cypress" />

describe('Fourth suite', () => {

  //Popup
  it('Test1', () => {

          cy.visit('/')
          cy.contains('Modal & Overlays').click()
          cy.contains('Tooltip').click()

          cy.contains('nb-card', 'Colored Tooltips')
              .contains('Default').click()
  })

  //Dialog box
  it.only('Test2', () => {

      cy.visit('/')
      cy.contains('Tables & Data').click()
      cy.contains('Smart Table').click()

      //1 Simple solution. No detecting if dialog box is not being displayed
      cy.get('tbody tr').first().find('.nb-trash').click()
      cy.on('window:confirm', (confirm) => {
          expect(confirm).to.equal('Are you sure you want to delete?')
      })

      //2 Complete solution accessing the dialog box and using a stub object to replace the original callback function
      const stub = cy.stub()
      cy.on('window:confirm', stub)
      cy.get('tbody tr').first().find('.nb-trash').click().then(() => {
          expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')
      })

      //3 Testing the cancel option on the dialog box
      cy.get('tbody tr').first().find('.nb-trash').click()
      cy.on('window:confirm', () => false)
  })

})
