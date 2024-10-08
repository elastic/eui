/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

const selectAndCopy = (selectorToCopy: string) => {
  // Force Chrome devtools to allow reading from the clipboard
  cy.wrap(
    Cypress.automation('remote:debugger:protocol', {
      command: 'Browser.grantPermissions',
      params: {
        permissions: ['clipboardReadWrite', 'clipboardSanitizedWrite'],
        origin: window.location.origin,
      },
    })
  );

  // For some annoying reason, mocking selection+copying throws a bunch
  // of document errors from the code coverage reporter - just ignore them
  Cypress.on('uncaught:exception', (err) => {
    console.log(err.message);
    if (
      err.message.includes(
        "Cannot read properties of null (reading 'document')"
      )
    ) {
      return false;
    }
  });

  cy.get(selectorToCopy).then(($el) => {
    const el = $el[0];
    const document = el.ownerDocument;
    const range = document.createRange();
    range.selectNodeContents(el);
    document.getSelection()!.removeAllRanges();
    document.getSelection()!.addRange(range);
  });

  return cy.window().then((window) => {
    document.execCommand('copy');
    return window.navigator.clipboard.readText();
  });
};

Cypress.Commands.add('selectAndCopy', selectAndCopy);
