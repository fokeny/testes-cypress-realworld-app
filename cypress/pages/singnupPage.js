class SignupPage {
    selectorsList() {
        const selectors = {
             firtNameField: "[data-test='signup-first-name']",
             lastNameField: "[data-test='signup-last-name']",
             usernameField: "[data-test='signup-username']",
             passwordField: "[data-test='signup-password']",
             confirmPasswordField: "[data-test='signup-confirmPassword']",
             signupButton: "[data-test='signup-submit']"
        }
        return selectors
    }

    clickSignupButton() {
        cy.get(this.selectorsList().signupButton).click()
    }

    registerPersonalDetails(firstName, lastName, username, password, confirmPassword ) {
        cy.get(this.selectorsList().firtNameField).type(firstName)
        cy.get(this.selectorsList().lastNameField).type(lastName)
        cy.get(this.selectorsList().usernameField).type(username)
        cy.get(this.selectorsList().passwordField).type(password)
        cy.get(this.selectorsList().confirmPasswordField).type(confirmPassword)
    }

    assertButtonState(selector, shouldBeDisabled) {
        const assertion = shouldBeDisabled ? 'be.disabled' : 'not.be.disabled'
        cy.get(selector).should(assertion)
    }

    checkSignupButtonDisabled() {
        this.assertButtonState(this.selectorsList().signupButton, true)
      }

}
export default SignupPage