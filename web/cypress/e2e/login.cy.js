import users from '../fixtures/users.json'

import loginPage from '../support/pages/LoginPage'

import StudentPage from '../support/pages/StudentPage'

describe('login', () => {

    it('deve logar com o perfil do admin', () => {

        const user = users.admin

        loginPage.doLogin(user)

        StudentPage.navbar.userLoggedIn(user.name)


    })

    it('não deve logar com senha incorreta', () => {

        const user = users.inv_pass

        loginPage.doLogin(user)
        loginPage.popup.haveText('Suas credenciais são inválidas, por favor tente novamente!')

    })

    it('não deve logar com e-mail não cadastrado', () => {

        const user = users.email_not_found

        loginPage.doLogin(user)
        loginPage.popup.haveText('Suas credenciais são inválidas, por favor tente novamente!')

    })

    it('não deve logar com e-mails inválidos', () => {

        const emails = users.inv_emails

        let outputMessages = []
        let expectedMessages = []

        loginPage.go()

        emails.forEach((u) => {
            loginPage.fill(u)
            loginPage.submit()


            loginPage.popup.content()
                .invoke('text')
                .then((t) => {
                    cy.log(t)
                    outputMessages.push(t)
                    expectedMessages.push('Insira um email válido.')
                })

            loginPage.popup.back()
        })

    })

    it('não deve logar com e-mail em branco', () => {

        const user = users.empty_email

        loginPage.doLogin(user)
        loginPage.popup.haveText('Os campos email e senha são obrigatórios.')

    })

    it('não deve logar com senha em branco', () => {

        const user = users.empty_password

        loginPage.doLogin(user)
        loginPage.popup.haveText('Os campos email e senha são obrigatórios.')

    })

})