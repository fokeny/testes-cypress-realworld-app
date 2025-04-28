import userData from "../../fixtures/users/userData.json"
import LoginPage from "../../pages/loginPage.js"
import SignupPage from "../../pages/singnupPage.js"
import MenuPage from "../../pages/menuPage.js" 
import TransactionPage from "../../pages/transactionPage.js"
import HomePage from "../../pages/homePage.js"

const loginPage = new LoginPage()
const signupPage = new SignupPage()
const menuPage = new MenuPage()
const transactionPage = new TransactionPage()
const homePage = new HomePage()

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

describe('Testes de checagem de historico', () => {

  describe('Visualizar histórico de transações com sucesso', () => {
    beforeEach(() => {
      loginPage.accessLoginPage()
      loginPage.loginWithAnyUser(userData.userSuccess.username, userData.userSuccess.password)
      loginPage.clickLoginButton()
    })
  
    it('Deve exibir o histórico de transações de um usuário corretamente', () => {
      menuPage.clickTransferButton()
      cy.url().should('include', '/transaction')
      transactionPage.transferContact01('401', 'Transferência com saldo suficiente')
      cy.get('.MuiAlert-message').should('be.visible').and('contain', "Transaction Submitted!")
      transactionPage.returnToHome()
      homePage.checkLastEntryInHistory('-$401')
      
    })  
  })

  describe('Tentar visualizar o histórico de transações sem transações anteriores', () => {

    beforeEach(() => {
      loginPage.accessLoginPage()
      loginPage.acessSignupPage()
    })


    it('Deve exibir uma mensagem indicando que o usuário não possui transações anteriores', () => {
      const { firstName, lastName, username, password, confirmPassword } = TEST_DATA.validUser
      signupPage.registerPersonalDetails(firstName, lastName, username, password, confirmPassword)
      signupPage.clickSignupButton()
      loginPage.loginWithAnyUser(username, password)
      loginPage.clickLoginButton()
      cy.get('[data-test="user-onboarding-dialog-title"]').should('be.visible')
      homePage.confirmRegister(username, '123456789', '123456789')
      homePage.checkEmptyEntryInHistory()
    })  
  })
})