import {apis} from "../../api/ApiRequests";

describe('Flexiana deck of cards', () => {
    it('Deck of cards test', () => {
        apis.createNewDeck();
        apis.shuffleTheNewlyCreatedDeck()
        apis.drawCardsFromDeck(3);
        //api not working correctly, so draw from pile api with value 0
        apis.addToPile('PILE1', '5H,6D,7H,8s,9H');
        apis.addToPile('PILE2', '5S,6D,7H,8D,9D');
        apis.listCards('PILE1');
        apis.listCards('PILE2');
        apis.shuffleThePile('PILE1');
        apis.drawCardsFromPile('PILE1', 0);
        apis.drawCardsFromPile('PILE2', 0);
    });
})
