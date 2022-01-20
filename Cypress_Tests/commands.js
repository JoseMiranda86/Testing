
Cypress.Commands.add('loginToApplication', () => {

    const userCredentials = {
        "user": {
            "email": "User1@mail.com",
            "password": "TestAccount1"
        }
    }

    cy.request('POST', 'https://conduit.productionready.io/api/users/login', userCredentials)
        .its('body').then( body => {
            const token = body.user.token
            cy.wrap(token).as('token')
            cy.visit('/', {
                onBeforeLoad (win) {
                    win.localStorage.setItem('jwtToken', token)
                }
            })
        })
})
