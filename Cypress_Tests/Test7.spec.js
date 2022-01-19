<reference types="cypress" />

describe('Test with backend', () => {

    beforeEach('login to the app', () => {
        cy.loginToApplication()
    })

    it('verify correct request and response', () => {

        cy.intercept('POST', '**/articles').as('postArticles')

        cy.contains('New Article').click()
        cy.get('[formcontrolname="title"]').type('This is the title')
        cy.get('[formcontrolname="description"]').type('This is the description')
        cy.get('[formcontrolname="body"]').type('This is the body')
        cy.contains('Publish Article').click()

        cy.wait('@postArticles')
        cy.get('@postArticles').then( xhr => {
            console.log(xhr)
            expect(xhr.response.statusCode).to.equal(200)
            expect(xhr.request.body.article.body).to.equal('This is the body')
            expect(xhr.request.body.article.description).to.equal('This is the description')
        })
    })

    it.only('delete a new article', () => {

        const userCredentials = {
            "user": {
                "email": "User1@mail.com",
                "password": "TestAccount1"
            }
        }

        const bodyRequest = {
            "article": {
                "tagList": [],
                "title": "Testing Request",
                "description": "Test on cypress",
                "body": "Test on cypress to delete an entry"
            }
        }

        cy.request('POST', 'https://conduit.productionready.io/api/users/login', userCredentials)
        .its('body').then( body => {
            const token = body.user.token

            cy.request({
                url:'https://conduit.productionready.io/api/articles',
                headers: { 'Authorization': 'Token '+token},
                method: 'POST',
                body: bodyRequest
            }).then( response => {
                expect(response.status).to.equal(200)
            })

            cy.contains('Global Feed').click()
            cy.get('.article-preview').first().click()
            cy.get('.article-actions').contains('Delete Article').click()

            cy.request({
                url: 'https://conduit.productionready.io/api/articles?limit=10&offset=0',
                headers: { 'Authorization': 'Token '+token},
                method: 'GET'
            }).its('body').then( body => {
                expect(body.articles[0].title).not.to.equal('Testing Request')
            })
        })
    })
})
