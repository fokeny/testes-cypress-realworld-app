import userData from "../../fixtures/users/userData.json"
import LoginPage from "../../pages/loginPage.js"
import MenuPage from "../../pages/menuPage.js" 
import TransactionPage from "../../pages/transactionPage.js"

const loginPage = new LoginPage()
const menuPage = new MenuPage()
const transactionPage = new TransactionPage()

describe('Testes de tranferência de dinheiro', () => {
  beforeEach(() => {
    loginPage.accessLoginPage()
    loginPage.loginWithAnyUser(userData.userSuccess.username, userData.userSuccess.password)
    loginPage.clickLoginButton()
  })

  describe('Cenário de Sucesso', () => {
    it('Deve fazer uma transfêricia possuindo o valor em conta', () => {
      menuPage.clickTransferButton()
      cy.url().should('include', '/transaction')
      transactionPage.transferContact01('401', 'Transferência com saldo suficiente')
      cy.get('.MuiAlert-message').should('be.visible').and('contain', "Transaction Submitted!")
    })
  })

  describe('Cenário de Falha', () => {
    it('Temporário: Atualmente permite transferência com valor negativo (BUG)', () => {
      menuPage.clickTransferButton()
      cy.url().should('include', '/transaction')
      transactionPage.transferContact01('-10', 'Tentativa de transferência com valor negativo')
      cy.get('.MuiAlert-message').should('be.visible').and('contain', "Transaction Submitted!")

    })
    
    it('Temporário: Atualmente permite transferência com valor excessivo (BUG)', () => {
      menuPage.clickTransferButton()
      cy.url().should('include', '/transaction')
      transactionPage.transferContact01('1000000', 'Tentativa de transferência excessiva')
      cy.get('.MuiAlert-message').should('be.visible').and('contain', "Transaction Submitted!")
    })

    it('Não deve permitir transferência com valor negativo ', () => {
      menuPage.clickTransferButton()
      cy.url().should('include', '/transaction')
      transactionPage.transferContact01('-10', 'Tentativa de transferência com valor negativo')

      // Atualmente, o sistema permite transferências com saldo negativo (BUG).
      // Este teste deve ser atualizado quando o bug for corrigido.
      cy.get('.MuiAlert-message').should('be.visible').and('contain', "Invalid value!")
    })

    it('Não deve permitir transferência com valor excessivo (saldo insuficiente)', () => {
      menuPage.clickTransferButton()
      cy.url().should('include', '/transaction')
      transactionPage.transferContact01('1000000', 'Tentativa de transferência excessiva')

      // Atualmente, o sistema permite transferências com saldo insuficiente (BUG).
      // Este teste deve ser atualizado quando o bug for corrigido.
      cy.get('.MuiAlert-message').should('be.visible').and('contain', "Insufficient funds!")
    })  
  })
})