import {common} from "../common/CommonFunctions";
import {homepageSelectors} from "../utils/selectors/Selectors";
import {data} from "../utils/data/Data";
import {urls} from "../utils/urls/Urls";

export class Homepage {
    //actions
    //this function will click on restart link under the board
    restartTheGame() {
        common.click(homepageSelectors.RESTART);
        homepage.assertGameRestarted();
        cy.log('The game has been restarted')
    };

    //this function will dynamically move a piece from a position to another
    movePiece(firstPosition, secondPosition) {
        common.click(`[name='space${firstPosition}']`)
        common.click(`[name='space${secondPosition}']`)
    };

    //this function will close the privacy pop-up
    closeAgreePrivacy() {
        cy.intercept(data.GET, urls.AUDIT_URL).as(data.QUANTCAST);
        cy.wait('@Quantcast', {timeout: 35000});
        common.click(homepageSelectors.AGREE_PRIVACY)
    };

    //this function will wait for the computer to make its move
    waitForComputerToMove() {
        cy.intercept(data.GET, urls.PAGE_AD_URL).as(data.PAGE_AD);
        cy.wait('@pageAd', {timeout: 35000});
        common.assertText(homepageSelectors.MESSAGE, data.MAKE_A_MOVE_TEXT)
    };

    assertGameRestarted() {
        common.assertText(homepageSelectors.MESSAGE, data.SELECT_AN_ORANGE_PIECE_TEXT)
    }

    //asserts
    //this function will get the number of orange pieces on the board
    assertCurrentNumberOfOrangePieces(nrOfPieces) {
        cy.get('body').find(homepageSelectors.ORANGE_PIECES, {timeout: 35000}).then((selector) => {
            let numberOfPieces = selector;
            expect(numberOfPieces.length).to.eq(nrOfPieces);
        })
    };
}

export const homepage = new Homepage();