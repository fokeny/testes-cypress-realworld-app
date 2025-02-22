class MenuPage {
    selectorsList() {
        const selectors = {
            homeButton: "[data-test='sidenav-home']",
            myAccountButton: "[data-test='sidenav-user-settings']",
            bankAccountsButton: "[data-test='sidenav-bankaccounts']",
            notificationsButton: "[data-test='sidenav-notifications']",
            logoutButton: "[data-test='sidenav-signout']"
        }
        return selectors
    }

}
export default MenuPage