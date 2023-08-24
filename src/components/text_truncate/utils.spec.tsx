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

// CI doesn't have access to the Inter font, so we need to manually include it
// for font calculations to work correctly
const font = '14px Inter';
before(() => {
  const linkElem = document.createElement('link');
  linkElem.setAttribute('rel', 'stylesheet');
  linkElem.setAttribute(
    'href',
    'https://fonts.googleapis.com/css2?family=Inter:wght@400&display=swap'
  );
  document.head.appendChild(linkElem);
  cy.wait(1000); // Wait a tick to give the font time to load/swap in
});

// Test utility for outputting the returned strings from each truncation utility
// in React. Given the same shared props and fonts, both render methods should
// arrive at the same truncated strings
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
  cy.get('#start').should('have.text', '...t, consectetur adipiscing elit');
  cy.get('#end').should('have.text', 'Lorem ipsum dolor sit amet, ...');
  cy.get('#middle').should('have.text', 'Lorem ipsum d...adipiscing elit');
  cy.get('#startEnd').should('have.text', '...lor sit amet, consectetur a...');
  cy.get('#startEndAt').should('have.text', '...rem ipsum dolor sit amet, ...');
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
          return new TruncationUtilsWithDOM(props);
        }}
      />
    );
    assertExpectedOutput();
  });
});

describe('TruncationUtilsWithCanvas', () => {
  describe('container', () => {
    const container = document.createElement('div');
    container.style.font = font;
    const props = { ...sharedProps, container };

    it('truncates text as expected', () => {
      cy.mount(
        <TestSetup
          getUtils={() => {
            document.body.appendChild(container);
            return new TruncationUtilsWithCanvas(props);
          }}
        />
      );
      assertExpectedOutput();
    });
  });

  describe('font', () => {
    const props = { ...sharedProps, font };

    it('truncates text as expected', () => {
      cy.mount(
        <TestSetup getUtils={() => new TruncationUtilsWithCanvas(props)} />
      );
      assertExpectedOutput();
    });
  });
});
