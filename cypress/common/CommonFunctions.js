export class CommonFunctions {
    openUrl(url) {
        cy.visit(url);
    };

    assertText(webElement, text) {
        cy.get(webElement).should('be.visible').contains(text);
    };

    click(selector) {
        cy.get(selector).should("be.visible").click({force: true});
    };
}

export const common = new CommonFunctions();