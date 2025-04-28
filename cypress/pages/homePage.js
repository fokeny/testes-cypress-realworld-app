class HomePage {
    selectorsList() {
        const selectors = {
            homeGrid: "[data-test='nav-public-tab']",
            historySectionButton: "[data-test='nav-personal-tab']",
            usernameBoard: "[data-test='sidenav-username']",
            lastEntryInHistory: "[data-test='transaction-list']",
            checkEmptyList: "[data-test='empty-list-header']",
            dateFilterButton: "[data-test='transaction-list-filter-date-range-button']",
            nextOnboardButton: "[data-test='user-onboarding-next']",
            bankNameInput: "[data-test='bankaccount-bankName-input']",
            numberInput: "[data-test='bankaccount-routingNumber-input']",
            accountNuberInput: "[data-test='bankaccount-accountNumber-input']",
            submitAcountButton: "[data-test='bankaccount-submit']",
        }
        return selectors
    }

    checkHomePage() {
        cy.get(this.selectorsList().homeGrid)
        cy.get(this.selectorsList().usernameBoard)
    }

    checkLastEntryInHistory(amount) {
        cy.get(this.selectorsList().historySectionButton).click()
        cy.get(this.selectorsList().lastEntryInHistory).should('be.visible').and('contain', amount )
    }

    checkEmptyEntryInHistory() {
        cy.get(this.selectorsList().historySectionButton).click()
        cy.get(this.selectorsList().checkEmptyList).should('be.visible').and('contain', 'No Transactions')
    }

    confirmRegister (firtsname, number, accountnumber) {
        cy.get(this.selectorsList().nextOnboardButton).click()
        cy.get(this.selectorsList().bankNameInput).type(firtsname)
        cy.get(this.selectorsList().numberInput).type(number)
        cy.get(this.selectorsList().accountNuberInput).type(accountnumber)
        cy.get(this.selectorsList().submitAcountButton).should('be.visible').click()
        cy.get(this.selectorsList().nextOnboardButton).click()
    }


}
export default HomePage