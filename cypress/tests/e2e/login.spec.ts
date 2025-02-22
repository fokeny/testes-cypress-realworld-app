import userData from "../../fixtures/users/userData.json"
import LoginPage from "../../pages/loginPage.js"
import HomePage from "../../pages/homePage.js"

const loginPage = new LoginPage()
const homePage = new HomePage()

// Dados de teste
const TEST_DATA = {
  specialChars: '!@#$%^&*()',
  longString: 'a'.repeat(100),
  unicodeChars: '😀🔑',
  invalidUser: 'UsuarioErrado'
}

describe('Testes de Login', () => {
  beforeEach(() => {
    loginPage.accessLoginPage()
  })

  describe('Cenário de Sucesso', () => {
    it('Deve fazer login com um usuário válido', () => {
      loginPage.loginWithAnyUser(userData.userSuccess.username, userData.userSuccess.password)
      loginPage.clickLoginButton()
      homePage.checkHomePage()
    })
  })

  describe('Validações de Credenciais', () => {
    it('Deve exibir erro ao tentar login com username correto e senha incorreta', () => {
      loginPage.loginWithAnyUser(userData.userSuccess.username, userData.userFail.password)
      loginPage.clickLoginButton()
      loginPage.checkAccesInvalid()
    })

    it('Deve exibir erro ao tentar login com username incorreto e senha correta', () => {
      loginPage.loginWithAnyUser(TEST_DATA.invalidUser, userData.userSuccess.password)
      loginPage.clickLoginButton()
      loginPage.checkAccesInvalid()
    })

    it('Deve exibir erro ao tentar login com username e senha incorretos', () => {
      loginPage.loginWithAnyUser(TEST_DATA.invalidUser, userData.userFail.password)
      loginPage.clickLoginButton()
      loginPage.checkAccesInvalid()
    })
  })

  describe('Validações de Campos Vazios', () => {
    it('Deve manter botão desabilitado ao tentar login sem username e com senha correta', () => {
      loginPage.loginWithAnyUser('{backspace}', userData.userSuccess.password)
      loginPage.checkLoginButtonDisabled()
    })

    it('Deve manter botão desabilitado ao tentar login sem username e com senha incorreta', () => {
      loginPage.loginWithAnyUser('{backspace}', userData.userFail.password)
      loginPage.checkLoginButtonDisabled()
    })

    it('Deve manter botão desabilitado ao tentar login com username correto e sem senha', () => {
      loginPage.loginWithAnyUser(userData.userSuccess.username, '{backspace}')
      loginPage.checkLoginButtonDisabled()
    })

    it('Deve manter botão desabilitado ao tentar login com username incorreto e sem senha', () => {
      loginPage.loginWithAnyUser(TEST_DATA.invalidUser, '{backspace}')
      loginPage.checkLoginButtonDisabled()
    })

    it('Deve manter botão desabilitado ao tentar login sem username e sem senha', () => {
      loginPage.loginWithAnyUser('{backspace}', '{backspace}')
      cy.get('.App-root').click()
      loginPage.checkLoginButtonDisabled()
    })
  })

  describe('Validações de Formato', () => {
    it('Deve exibir erro ao tentar login com caracteres especiais no username', () => {
      loginPage.loginWithAnyUser(TEST_DATA.specialChars, userData.userSuccess.password)
      loginPage.clickLoginButton()
      loginPage.checkAccesInvalid()
    })

    it('Deve exibir erro ao tentar login com caracteres Unicode/emojis', () => {
      loginPage.loginWithAnyUser(TEST_DATA.unicodeChars, userData.userSuccess.password)
      loginPage.clickLoginButton()
      loginPage.checkAccesInvalid()
    })

    it('Deve manter botão desabilitado ao tentar login com espaços em branco', () => {
      loginPage.loginWithAnyUser(' ', ' ')
      loginPage.checkLoginButtonDisabled()
    })
  })

  describe('Validações de Comprimento', () => {
    it('Deve exibir erro ao tentar login com username muito longo', () => {
      loginPage.loginWithAnyUser(TEST_DATA.longString, userData.userSuccess.password)
      loginPage.clickLoginButton()
      loginPage.checkAccesInvalid()
    })

    it('Deve exibir erro ao tentar login com senha muito longa', () => {
      loginPage.loginWithAnyUser(userData.userSuccess.username, TEST_DATA.longString)
      loginPage.clickLoginButton()
      loginPage.checkAccesInvalid()
    })
  })

  describe('Validações de Segurança', () => {
    it('Deve limpar dados sensíveis ao sair da página de login', () => {
      loginPage.loginWithAnyUser(userData.userSuccess.username, userData.userSuccess.password)
      cy.visit('/outra-pagina')
      cy.go('back')
      cy.get('#username').should('be.empty')
      cy.get('#password').should('be.empty')
    })
  })
})
