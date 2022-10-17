import {common} from "../../common/CommonFunctions";
import {homepage} from "../../pages/Homepage";
import {urls} from "../../utils/urls/Urls";

beforeEach(() => {
    common.openUrl(urls.CHECKERS_URL);
    homepage.closeAgreePrivacy();
});

describe('Test for interview', () => {
    it('Verify a piece is properly taken by computer', () => {
        homepage.restartTheGame();
        homepage.assertCurrentNumberOfOrangePieces(12);
        homepage.movePiece('62', '73');
        homepage.waitForComputerToMove();
        homepage.movePiece('73', '64');
        homepage.assertCurrentNumberOfOrangePieces(11);
        homepage.restartTheGame();
    });
})
