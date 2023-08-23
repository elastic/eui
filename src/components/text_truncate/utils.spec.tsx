/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/// <reference types="cypress" />
/// <reference types="cypress-real-events" />
/// <reference types="../../../cypress/support" />

import React, {
  ReactNode,
  FunctionComponent,
  useState,
  useEffect,
} from 'react';

import { TruncationUtilsWithDOM, TruncationUtilsWithCanvas } from './utils';

const sharedProps = {
  fullText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  availableWidth: 200,
  ellipsis: '...',
};
const font = '14px Verdana'; // We need to use a OS-safe font that CI machines are likely to have

/**
 * Test utility for outputting the returned strings from each truncation utility
 * in React. Given the same shared props and fonts, both render methods should
 * arrive at the same truncated strings
 */
const TestSetup: FunctionComponent<{
  getUtils: () => TruncationUtilsWithDOM | TruncationUtilsWithCanvas;
}> = ({ getUtils }) => {
  const [rendered, setRendered] = useState<ReactNode>(null);

  useEffect(() => {
    const utils = getUtils();
    setRendered(
      <div style={{ font }}>
        <div id="start">{utils.truncateStart()}</div>
        <div id="end">{utils.truncateEnd()}</div>
        <div id="middle">{utils.truncateMiddle()}</div>
        <div id="startEnd">{utils.truncateStartEndAtMiddle()}</div>
        <div id="startEndAt">{utils.truncateStartEndAtPosition(15)}</div>
      </div>
    );
    // @ts-ignore - the `?.` handles canvas which doesn't require a cleanup
    utils.cleanup?.();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <>{rendered}</>;
};

const assertExpectedOutput = () => {
  cy.get('#start').should('have.text', '...consectetur adipiscing elit');
  cy.get('#end').should('have.text', 'Lorem ipsum dolor sit am...');
  cy.get('#middle').should('have.text', 'Lorem ipsum ...dipiscing elit');
  cy.get('#startEnd').should('have.text', '...r sit amet, consectetur...');
  cy.get('#startEndAt').should('have.text', '...m ipsum dolor sit amet...');
};

describe('TruncationUtilsWithDOM', () => {
  const container = document.createElement('div');
  container.style.font = font;
  const props = { ...sharedProps, container };

  it('truncates text as expected', () => {
    cy.mount(
      <TestSetup
        getUtils={() => {
          document.body.appendChild(container);
          const utils = new TruncationUtilsWithDOM(props);
          return utils;
        }}
      />
    );
    assertExpectedOutput();
  });
});

describe('TruncationUtilsWithCanvas', () => {
  const props = { ...sharedProps, font };

  it('truncates text as expected', () => {
    cy.mount(
      <TestSetup getUtils={() => new TruncationUtilsWithCanvas(props)} />
    );
    assertExpectedOutput();
  });
});
