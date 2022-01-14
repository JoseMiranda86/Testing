<reference types="cypress" />

describe('Fourth suite', () => {

  //Lists and drop down
  it('Test1', () => {

          cy.visit('/')
          //Individual change and test
          cy.get('nav nb-select').click()
          cy.get('.options-list').contains('Dark').click()
          cy.get('nav nb-select').should('contain', 'Dark')
          cy.get('nb-layout-header nav').should('have.css', 'background-color', 'rgb(34, 43, 69)')

          //Multiple change and check
          cy.get('nav nb-select').then( dropdown => {
              cy.wrap(dropdown).click()
              cy.get('.options-list nb-option').each( (listItem, index) => {
                  const itemText = listItem.text().trim()

                  const colors = {
                      "Light": "rgb(255, 255, 255)",
                      "Dark": "rgb(34, 43, 69)",
                      "Cosmic": "rgb(50, 50, 89)",
                      "Corporate": "rgb(255, 255, 255)"
                  }

                  cy.wrap(listItem).click()
                  cy.wrap(dropdown).should('contain', itemText)
                  cy.get('nb-layout-header nav').should('have.css', 'background-color', colors[itemText])
                  if ( index < 3){
                      cy.wrap(dropdown).click()
                  }
              })
          })
      })

  //Tables
  it.only('Test2', () => {

          cy.visit('/')
          cy.contains('Tables & Data').click()
          cy.contains('Smart Table').click()

          //1
          cy.get('tbody').contains('tr', 'Larry').then( tableRow => {
              cy.wrap(tableRow).find('.nb-edit').click()
              cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('25')
              cy.wrap(tableRow).find('.nb-checkmark').click()
              cy.wrap(tableRow).find('td').eq(6).should('contain', '25')
          })

          //2
          cy.get('thead').find('.nb-plus').click()
          cy.get('thead').find('tr').eq(2).then( tableRow => {
              cy.wrap(tableRow).find('[placeholder="First Name"]').type('Artem')
              cy.wrap(tableRow).find('[placeholder="Last Name"]').type('Bondar')
              cy.wrap(tableRow).find('.nb-checkmark').click()
          })
          cy.get('tbody tr').first().find('td').then( tableColumns => {
              cy.wrap(tableColumns).eq(2).should('contain', 'Artem')
              cy.wrap(tableColumns).eq(3).should('contain', 'Bondar')
          })

          //3
          const age = [20, 30, 40, 200]

          cy.wrap(age).each( age => {
              cy.get('thead [placeholder="Age"]').clear().type(age)
              cy.wait(500)
              cy.get('tbody tr').each( tableRow => {
                  if(age == 200) {
                      cy.wrap(tableRow).should('contain', 'No data found')
                  }else{
                      cy.wrap(tableRow).find('td').eq(6).should('contain', age)
                  }
              })
          })
    })
})
