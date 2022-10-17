export class ApiRequests {
    createNewDeck() {
        cy.request({
            method: 'POST',
            url: `http://deckofcardsapi.com/api/deck/new/`,
        }).then((response) => {
            expect(response.status).to.deep.equal(200);
            expect(response.body).to.include({
                success: true,
                remaining: 52,
                shuffled: false
            });
            expect(response.body.deck_id).to.not.be.empty;
            cy.wrap(response.body.deck_id).as('deckId');
            cy.log('Id of deck: ' + response.body.deck_id);
        });
    };

    shuffleTheNewlyCreatedDeck() {
        cy.get('@deckId').then((deckId) => {
            cy.request({
                method: 'POST',
                url: `http://deckofcardsapi.com/api/deck/${deckId}/shuffle/?deck_count=1`,
            }).then((response) => {
                expect(response.status).to.deep.equal(200);
                expect(response.body.success).to.be.true;
                expect(response.body.remaining).to.deep.equal(52)
                expect(response.body.shuffled).to.be.true;
                expect(response.body.deck_id).to.deep.equal(deckId);
            });
        });
    };

    drawCardsFromDeck(cardsToDraw) {
        cy.get('@deckId').then((deckId) => {
            cy.request({
                method: 'POST',
                url: `http://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${cardsToDraw}`,
            }).then((response) => {
                expect(response.status).to.deep.equal(200);
                expect(response.body.remaining).to.equal(52 - cardsToDraw);
            });
        });
    };

    addToPile(pileName, cards) {
        cy.get('@deckId').then((deckId) => {
            cy.request({
                method: 'POST',
                url: `http://deckofcardsapi.com/api/deck/${deckId}/pile/${pileName}/add/?cards=${cards}`,
            }).then((response) => {
                expect(response.status).to.deep.equal(200);
                cy.log(response.body.remaining)
            }).then(() => {
                cy.request({
                    method: 'GET',
                    url: `http://deckofcardsapi.com/api/deck/${deckId}/pile/${pileName}/list/`
                }).then((response) => {
                    expect(response.status).to.deep.equal(200);
                    expect(response.body.success).to.be.true;
                    expect(response.body.deck_id).to.deep.equal(deckId);
                    expect(response.body).to.have.property('remaining');
                });
            });
        });
    };

    listCards(pileName) {
        cy.get('@deckId').then((deckId) => {
            cy.request({
                method: 'POST',
                url: `https://deckofcardsapi.com/api/deck/${deckId}/pile/${pileName}/list/`,
            }).then((response) => {
                expect(response.status).to.deep.equal(200);
            });
        });
    };

    shuffleThePile(pileName) {
        cy.get('@deckId').then((deckId) => {
            cy.request({
                method: 'POST',
                url: `http://deckofcardsapi.com/api/deck/${deckId}/pile/${pileName}/shuffle/`,
            }).then((response) => {
                expect(response.status).to.deep.equal(200);
            });
        });
    };

    drawCardsFromPile(pileName, numberOfCardsToDraw) {
        cy.get('@deckId').then((deckId) => {
            cy.request({
                method: 'POST',
                url: `http://deckofcardsapi.com/api/deck/${deckId}/pile/${pileName}/draw/?count=${numberOfCardsToDraw}`,
            }).then((response) => {
                expect(response.status).to.deep.equal(200);
            });
        });
    };
}

export const apis = new ApiRequests();
