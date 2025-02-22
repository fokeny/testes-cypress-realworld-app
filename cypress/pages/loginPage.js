class LoginPage {
    selectorsList() {
        const selectors = {
            usernameField: "[data-test='signin-username']",
            passwordField: "[data-test='signin-password']",
            loginButton: "[data-test='signin-submit']",
            singnupButton: "[data-test='signup']",
            wrongCredentialAlert: "[data-test='signin-error']"
        }
        return selectors
    }

    accessLoginPage() {
        cy.visit('/signin')
    }

    loginWithAnyUser(username,password) {
        cy.get(this.selectorsList().usernameField).type(username)
        cy.get(this.selectorsList().passwordField).type(password)
    }

    checkAccesInvalid() {
        cy.get(this.selectorsList().wrongCredentialAlert)
    }

    acessSignupPage() {
        cy.get(this.selectorsList().singnupButton).click()
    }

    checkAccesInvalid() {
        cy.get(this.selectorsList().wrongCredentialAlert)
    }

    assertButtonState(selector, shouldBeDisabled) {
        const assertion = shouldBeDisabled ? 'be.disabled' : 'not.be.disabled'
        cy.get(selector).should(assertion)
    }

    checkLoginButtonDisabled() {
        this.assertButtonState(this.selectorsList().loginButton, true)
      }

      clickLoginButton() {
        cy.get(this.selectorsList().loginButton).click()
    }
}
export default LoginPage