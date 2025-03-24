class MenuPage {
    selectorsList() {
        const selectors = {
            homeButton: "[data-test='sidenav-home']",
            myAccountButton: "[data-test='sidenav-user-settings']",
            bankAccountsButton: "[data-test='sidenav-bankaccounts']",
            notificationsButton: "[data-test='sidenav-notifications']",
            logoutButton: "[data-test='sidenav-signout']",
            transferButton: "[data-test='nav-top-new-transaction']"
        }
        return selectors
    }

    clickTransferButton () {
        cy.get(this.selectorsList().transferButton).click()
    }

}
export default MenuPage