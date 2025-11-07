/**
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/// <reference path="../index.d.ts" />

/**
 * A recursive helper function that polls an element's position.
 *
 * @param subject The Cypress subject (the DOM element).
 * @param stabilityCount The number of times the position has been stable.
 * @param retries The number of remaining retries.
 * @param prevRect The element's rect from the previous check.
 */
export function waitForPositionToSettle(
  subject: JQuery<HTMLElement>,
  stabilityCount = 0,
  retries = 40, // 40 * 50ms = 2s timeout
  prevRect?: DOMRect
): Cypress.Chainable<JQuery<HTMLElement>> {
  const STABILITY_THRESHOLD = 3; // require 3 consecutive stable checks

  if (retries < 0) {
    throw new Error('Position did not settle in time after 2s');
  }

  const currentRect = subject[0].getBoundingClientRect();

  let nextStabilityCount = stabilityCount;
  if (
    prevRect &&
    currentRect.top === prevRect.top &&
    currentRect.left === prevRect.left
  ) {
    nextStabilityCount++;
  } else {
    // Position changed, reset counter
    nextStabilityCount = 0;
  }

  if (nextStabilityCount >= STABILITY_THRESHOLD) {
    cy.log('Position settled');
    return cy.wrap(subject);
  }

  return cy.wait(50, { log: false }).then(() => {
    return waitForPositionToSettle(
      subject,
      nextStabilityCount,
      retries - 1,
      currentRect
    );
  });
}

Cypress.Commands.add(
  'waitForPositionToSettle',
  { prevSubject: 'element' },
  (subject: JQuery<HTMLElement>) => {
    return waitForPositionToSettle(subject);
  }
);
