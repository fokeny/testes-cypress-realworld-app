class TransactionPage{
    selectorsList() {
        const selectors = {
            contact01: "[data-test='user-list-item-GjWovtg2hr']",
            contact02: "[data-test='user-list-item-_XblMqbuoP']",
            amountInput: "[data-test='transaction-create-amount-input']",
            descriptionInput: "[data-test='transaction-create-description-input']",
            confirmTransacitonButton: "[data-test='transaction-create-submit-payment']",
        }
        return selectors
    }

    transferContact01(amount, description) {
        cy.get(this.selectorsList().contact01).click()
        cy.get(this.selectorsList().amountInput).type(amount)
        cy.get(this.selectorsList().descriptionInput).type(description)
        cy.get(this.selectorsList().confirmTransacitonButton).click()
    }

}
export default TransactionPage