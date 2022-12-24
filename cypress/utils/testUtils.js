export function getByTestId(testId, timeout) {
    if (timeout) {
        return cy.get(`[data-testid="${testId}"]`, { timeout });
    }
    return cy.get(`[data-testid="${testId}"]`)
}

export function getByVariableName(variableName, timeout) {
    if (timeout) {
        return cy.get(`[data-cy="${variableName}"]`, { timeout });
    }
    return cy.get(`[data-cy=${variableName}]`)

}