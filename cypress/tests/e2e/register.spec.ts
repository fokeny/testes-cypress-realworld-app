import LoginPage from "../../pages/loginPage.js"
import SignupPage from "../../pages/singnupPage.js"

const loginPage = new LoginPage()
const signupPage = new SignupPage()

// Dados de teste
const TEST_DATA = {
  validUser: {
    firstName: 'João',
    lastName: 'Silva',
    username: 'joaosilva',
    password: 'SenhaForte123',
    confirmPassword: 'SenhaForte123'
  }
}

describe('Testes de Registro de Usuário', () => {
  beforeEach(() => {
    loginPage.accessLoginPage()
    loginPage.acessSignupPage()
  })

  describe('Cenário de Sucesso', () => {
    it('Deve registrar um novo usuário com informações válidas', () => {
      const { firstName, lastName, username, password, confirmPassword } = TEST_DATA.validUser
      signupPage.registerPersonalDetails(firstName, lastName, username, password, confirmPassword)
      signupPage.clickSignupButton()
      loginPage.loginWithAnyUser(username, password)
      loginPage.clickLoginButton()
      cy.get('[data-test="user-onboarding-dialog-title"]').should('be.visible')
    })
  })

  describe('Validações de Campos Obrigatórios', () => {
    it('Deve desabilitar o botão Signup se o Firstname não for preenchido', () => {
      signupPage.registerPersonalDetails('{backspace}', 'Silva', 'joaosilva', 'SenhaForte123', 'SenhaForte123')
      cy.get('#firstName-helper-text').should('be.visible')
      signupPage.checkSignupButtonDisabled()
    })

    it('Deve desabilitar o botão Signup se o Lastname não for preenchido', () => {
      signupPage.registerPersonalDetails('João', '{backspace}', 'joaosilva', 'SenhaForte123', 'SenhaForte123')
      cy.get('#lastName-helper-text').should('be.visible')
      signupPage.checkSignupButtonDisabled()
    })

    it('Deve desabilitar o botão Signup se o Username não for preenchido', () => {
      signupPage.registerPersonalDetails('João', 'Silva', '{backspace}', 'SenhaForte123', 'SenhaForte123')
      cy.get('#username-helper-text').should('be.visible')
      signupPage.checkSignupButtonDisabled()
    })

    it('Deve desabilitar o botão Signup se o Password não for preenchido', () => {
      signupPage.registerPersonalDetails('João', 'Silva', 'joaosilva', '{backspace}', 'SenhaForte123')
      cy.get('#password-helper-text').should('be.visible')
      signupPage.checkSignupButtonDisabled()
    })

    it('Deve desabilitar o botão Signup se o Confirm Password não for preenchido', () => {
      signupPage.registerPersonalDetails('João', 'Silva', 'joaosilva', 'SenhaForte123', '{backspace}')
      cy.get('.App-root').click()
      cy.get('#confirmPassword-helper-text').should('be.visible')
      signupPage.checkSignupButtonDisabled()
    })

    it('Deve desabilitar o botão Signup se todos os campos não forem preenchidos', () => {
      signupPage.registerPersonalDetails('{backspace}', '{backspace}', '{backspace}', '{backspace}', '{backspace}')
      cy.get('.App-root').click()
      cy.get('#firstName-helper-text').should('be.visible')
      cy.get('#lastName-helper-text').should('be.visible')
      cy.get('#username-helper-text').should('be.visible')
      cy.get('#password-helper-text').should('be.visible')
      cy.get('#confirmPassword-helper-text').should('be.visible')
      signupPage.checkSignupButtonDisabled()
    })
  })

  describe('Validações de Senha', () => {
    it('Deve exibir erro quando as senhas não coincidirem', () => {
      signupPage.registerPersonalDetails('João', 'Silva', 'joaosilva', 'SenhaForte123', 'SenhaForte456')
      cy.get('.App-root').click()
      cy.get('#confirmPassword-helper-text').should('be.visible')
      signupPage.checkSignupButtonDisabled()
    })

    it('Deve exibir erro quando a senha for muito curta', () => {
      signupPage.registerPersonalDetails('João', 'Silva', 'joaosilva', '123', '123')
      cy.get('.App-root').click()
      cy.get('#password-helper-text').should('be.visible')
      signupPage.checkSignupButtonDisabled()
    })

  })

  describe('Validações de Interface', () => {
    it('Deve manter os dados preenchidos ao trocar entre campos', () => {
      const { firstName, lastName, username } = TEST_DATA.validUser
      signupPage.registerPersonalDetails(firstName, lastName, username, 'SenhaForte123', '{backspace}')
      cy.get('#firstName').should('have.value', firstName)
      cy.get('#lastName').should('have.value', lastName)
      cy.get('#username').should('have.value', username)
    })
  })
})
