/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

const copyToClipboard = () => {
  return cy.window().then((window) => {
    const selectedText = window.getSelection()?.toString() ?? '';
    const clipboardData = new window.DataTransfer();
    const copyEvent = new window.ClipboardEvent('copy', {
      bubbles: true,
      cancelable: true,
    });
    Object.defineProperty(copyEvent, 'clipboardData', {
      value: clipboardData,
    });

    window.document.dispatchEvent(copyEvent);

    // Browsers ignore `clipboardData` changes unless the copy is canceled
    return copyEvent.defaultPrevented
      ? clipboardData.getData('text/plain')
      : selectedText;
  });
};

const selectAndCopy = (selectorToCopy: string, startSelector?: string) => {
  cy.get(selectorToCopy).should(($el) => {
    const el = $el[0];
    const document = el.ownerDocument;
    const range = document.createRange();
    if (startSelector) {
      const start = el.querySelector(startSelector);
      if (!start) {
        throw new Error(`Could not find start selector: ${startSelector}`);
      }
      range.selectNodeContents(el);
      range.setStartBefore(start);
    } else {
      range.selectNodeContents(el);
    }
    document.getSelection()!.removeAllRanges();
    document.getSelection()!.addRange(range);
    expect(document.getSelection()!.toString()).not.to.be.empty;
  });

  return copyToClipboard();
};

const copyWithoutSelecting = () => {
  cy.window().then((window) => {
    window.getSelection()?.removeAllRanges();
  });

  return copyToClipboard();
};

Cypress.Commands.add('selectAndCopy', selectAndCopy);
Cypress.Commands.add('copyToClipboard', copyToClipboard);
Cypress.Commands.add('copyWithoutSelecting', copyWithoutSelecting);
