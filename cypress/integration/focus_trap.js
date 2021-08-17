describe('EuiFocusTrap', () => {
  it('does not trap when disabled', () => {
    cy.visit('http://localhost:9999/#/utilities/focus-trap');

    cy.contains('button', 'External Focusable Element').click();
    cy.focused().contains('External Focusable Elementtt');
  });

  it('traps when enabled', () => {
    cy.visit('http://localhost:9999/#/utilities/focus-trap');

    cy.contains('button', 'Enable Focus Trap').click();

    // enable trap
    cy.contains('button', 'External Focusable Element').click();

    // verify focus returned to (the now labeled) Disabled Focus Trap button
    cy.focused().contains('Disable Focus Trap');
  });
});
