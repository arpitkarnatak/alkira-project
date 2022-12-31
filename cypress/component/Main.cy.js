import App from "../../src/App"
import { getByTestId } from "../utils/testUtils"

describe('Main.cy.js', () => {
  beforeEach(() => {
    cy.mount(<App />)
  })

  it('Main Component is rendered on startup', () => {
    getByTestId('main-component').should('be.visible')
  })

  it('Should only render 7 items on a single page', () => {
    getByTestId('all-teams-list', 5000).children().should('have.length', 7)
  })

  it('Should move to next page on clicking next page button', () => {
    const firstPageFirstItem = getByTestId('all-teams-list').children().first()
    getByTestId('next-page-button').click()
    getByTestId('all-teams-list').children().first().should('not.equal', firstPageFirstItem)
  })

  it('Should move to previous page on clicking previous page button', () => {
    getByTestId('next-page-button').click()
    const secondPageFirstItem = getByTestId('all-teams-list', 5000).children().first()
    getByTestId('prev-page-button').click()
    getByTestId('all-teams-list').children().first().should('not.equal', secondPageFirstItem)
  })

  it('Should search for a team when typed on search bar', () => {
    getByTestId('search-for-team').type('Cleveland')
    getByTestId('team-row-cle').should('be.visible')
  })
})