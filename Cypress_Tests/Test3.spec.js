<reference types="cypress" />

describe('Third suite', () => {

  it('Test1', () => {

          cy.visit('/')
          cy.contains('Forms').click()
          cy.contains('Form Layout').click()

          cy.get('[for="exampleInputEmail1"]').invoke('text').then(text => {
              expect(text).to.equal('Email address')
          })

          cy.contains('nb-card', 'Basic form')
              .find('nb-checkbox')
              .click()
              .find('.custom-checkbox')
              .invoke('attr', 'class')
              .then(classValue => {
                  expect(classValue).to.contain('checked')
              })
      })

})
