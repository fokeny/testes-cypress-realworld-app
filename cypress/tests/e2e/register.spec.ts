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
      const { lastName,username, password, confirmPassword } = TEST_DATA.validUser
      signupPage.registerPersonalDetails('{backspace}', lastName, username , password, confirmPassword )
      cy.get('#firstName-helper-text').should('be.visible')
      signupPage.checkSignupButtonDisabled()
    })

    it('Deve desabilitar o botão Signup se o Lastname não for preenchido', () => {
      const { firstName,username, password, confirmPassword } = TEST_DATA.validUser
      signupPage.registerPersonalDetails(firstName, '{backspace}', username , password, confirmPassword )
      cy.get('#lastName-helper-text').should('be.visible')
      signupPage.checkSignupButtonDisabled()
    })

    it('Deve desabilitar o botão Signup se o Username não for preenchido', () => {
      const { firstName, lastName, password, confirmPassword } = TEST_DATA.validUser
      signupPage.registerPersonalDetails(firstName, lastName, '{backspace}', password, confirmPassword )
      cy.get('#username-helper-text').should('be.visible')
      signupPage.checkSignupButtonDisabled()
    })

    it('Deve desabilitar o botão Signup se o Password não for preenchido', () => {
      const { firstName, lastName, username, confirmPassword } = TEST_DATA.validUser
      signupPage.registerPersonalDetails(firstName, lastName, username, '{backspace}', confirmPassword )
      cy.get('#password-helper-text').should('be.visible')
      signupPage.checkSignupButtonDisabled()
    })

    it('Deve desabilitar o botão Signup se o Confirm Password não for preenchido', () => {
      const { firstName, lastName, username, password } = TEST_DATA.validUser
      signupPage.registerPersonalDetails(firstName, lastName, username, password, '{backspace}')
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
      const { firstName, lastName, username, password } = TEST_DATA.validUser
      signupPage.registerPersonalDetails(firstName, lastName, username, password, 'SenhaForte456')
      cy.get('.App-root').click()
      cy.get('#confirmPassword-helper-text').should('be.visible')
      signupPage.checkSignupButtonDisabled()
    })

    it('Deve exibir erro quando a senha for muito curta', () => {
      const { firstName, lastName, username } = TEST_DATA.validUser
      signupPage.registerPersonalDetails(firstName, lastName, username, '123', '123')
      cy.get('.App-root').click()
      cy.get('#password-helper-text').should('be.visible')
      signupPage.checkSignupButtonDisabled()
    })

  })

  describe('Validações de Interface', () => {
    it('Deve manter os dados preenchidos ao trocar entre campos', () => {
      const { firstName, lastName, username, password } = TEST_DATA.validUser
      signupPage.registerPersonalDetails(firstName, lastName, username, password, '{backspace}')
      cy.get('#firstName').should('have.value', firstName)
      cy.get('#lastName').should('have.value', lastName)
      cy.get('#username').should('have.value', username)
    })
  })
})
