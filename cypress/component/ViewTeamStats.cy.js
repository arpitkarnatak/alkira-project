import App from "../../src/App"
import { PrimaryColors } from "../../src/styles/Colors"
import { getByTestId } from "../utils/testUtils"

describe('Main.cy.js', () => {
    beforeEach(() => {
        cy.mount(<App />)
        getByTestId('all-teams-list').children().first().click()

    })

    it('Row should be highlighted when element is selected', () => {
        getByTestId('team-row-1').should('have.css', 'background-color', PrimaryColors.SelectedTeamGray, 5000)
    })

    it('Should open up the modal for team stats', () => {
        getByTestId('view-team-details-modal').should('be.visible')
    })

    it('Should close modal on clicking close button', () => {
        getByTestId('view-team-details-modal').should('not.exist')
    })
    it('Row should be set back to previous color once the modal closes', () => {
        getByTestId('close-team-details-modal').click()
        getByTestId('team-row-1').should('have.css', 'background-color', PrimaryColors.TableRowColor, 5000)
    })
    it('No Data field should be empty', () => {
        getByTestId('full-name-team').should('not.be.NaN')
        getByTestId('total-games-team').should('not.be.empty')
        getByTestId('random-match-date').should('not.be.empty')
        getByTestId('random-match-home-team').should('not.be.empty')
        getByTestId('random-match-away-team').should('not.be.empty')
        getByTestId('random-match-home-team-score').should('not.be.empty')
        getByTestId('random-match-away-team-score').should('not.be.empty')
     })
})