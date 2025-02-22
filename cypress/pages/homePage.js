class HomePage {
    selectorsList() {
        const selectors = {
            homeGrid: "[data-test='nav-public-tab']",
            usernameBoard: "[data-test='sidenav-username']"
        }
        return selectors
    }

    checkHomePage() {
        cy.get(this.selectorsList().homeGrid)
        cy.get(this.selectorsList().usernameBoard)
    }
}
export default HomePage