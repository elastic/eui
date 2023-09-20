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
  cy.wait(1000); // Wait a second to give the font time to load/swap in
});

describe('Truncation utils', () => {
  const sharedProps = {
    fullText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    availableWidth: 200,
    ellipsis: '...',
  };
  const expectedOutput = {
    start: '...t, consectetur adipiscing elit',
    end: 'Lorem ipsum dolor sit amet, ...',
    startEnd: '...lor sit amet, consectetur a...',
    middle: 'Lorem ipsum d...adipiscing elit',
  };

  // Note: the truncation type tests are intended to be primarily unit tests and do not
  // emit any rendered output in the UI. The reason why they're tested in Cypress and
  // not Jest is because jsdom does not return meaningful/valid width calculations
  describe('shared truncation types logic', () => {
    const utils = new TruncationUtilsWithCanvas({ ...sharedProps, font });

    describe('start', () => {
      it('inserts ellipsis at the start of the text', () => {
        expect(utils.truncateStart()).to.equal(expectedOutput.start);
      });

      describe('truncationOffset', () => {
        it('preserves the specified number of characters at the start of the text', () => {
          expect(utils.truncateStart(3)).to.equal(
            'Lor...onsectetur adipiscing elit'
          );
        });

        it('truncates the offset if the truncationOffset is too large', () => {
          expect(utils.truncateStart(30)).to.equal(
            '...rem ipsum dolor sit amet, co'
          );
        });
      });
    });

    describe('end', () => {
      it('inserts ellipsis at the end of the text', () => {
        expect(utils.truncateEnd()).to.equal(expectedOutput.end);
      });

      describe('truncationOffset', () => {
        it('preserves the specified number of characters at the end of the text', () => {
          expect(utils.truncateEnd(3)).to.equal(
            'Lorem ipsum dolor sit ame...lit'
          );
        });

        it('truncates the offset if the truncationOffset is too large', () => {
          expect(utils.truncateEnd(50)).to.equal(
            ' ipsum dolor sit amet, conse...'
          );
        });
      });
    });

    describe('startEnd', () => {
      describe('with no truncationPosition', () => {
        it('shows the middle of the text and inserts ellipsis at the start and end of the text', () => {
          expect(utils.truncateStartEndAtMiddle()).to.equal(
            expectedOutput.startEnd
          );
        });
      });

      describe('with truncationPosition', () => {
        it('allows moving the anchor point of the displayed text', () => {
          expect(utils.truncateStartEndAtPosition(20)).to.equal(
            '...sum dolor sit amet, conse...'
          );
          expect(utils.truncateStartEndAtPosition(30)).to.equal(
            '... sit amet, consectetur adip...'
          );
        });

        it('does not display the leading ellipsis if the index is close to the start', () => {
          expect(utils.truncateStartEndAtPosition(10)).to.equal(
            expectedOutput.end
          );
        });

        it('does not display the trailing ellipsis if the index is close to the end', () => {
          expect(utils.truncateStartEndAtPosition(40)).to.equal(
            expectedOutput.start
          );
        });
      });
    });

    describe('middle', () => {
      it('inserts ellipsis in the middle of the text', () => {
        expect(utils.truncateMiddle()).to.equal(expectedOutput.middle);
      });
    });
  });

  describe('performance stress testing', () => {
    const container = document.createElement('div');
    container.style.font = font;

    before(() => document.body.appendChild(container));
    after(() => document.body.removeChild(container));

    describe('basic iterations', () => {
      const utils = new TruncationUtilsWithDOM({ ...sharedProps, container });

      beforeEach(() => {
        utils.debugPerformance = true;
        utils.debugCounter = 0;
      });

      specify('start', () => {
        utils.truncateStart();
        expect(utils.debugCounter).to.equal(3);

        utils.truncateStart(3);
        expect(utils.debugCounter).to.equal(9);
      });

      specify('end', () => {
        utils.truncateEnd();
        expect(utils.debugCounter).to.equal(5);

        utils.truncateEnd(3);
        expect(utils.debugCounter).to.equal(12);
      });

      specify('startEnd', () => {
        utils.truncateStartEndAtMiddle();
        expect(utils.debugCounter).to.equal(5);

        utils.truncateStartEndAtPosition(25);
        expect(utils.debugCounter).to.equal(10);
      });

      specify('middle', () => {
        utils.truncateMiddle();
        expect(utils.debugCounter).to.equal(5);
      });
    });

    it('maintains the same low number of iterations regardless of full text length', () => {
      const utils = new TruncationUtilsWithDOM({
        ...sharedProps,
        container,
        fullText: sharedProps.fullText.repeat(100),
      });
      utils.debugPerformance = true;

      utils.truncateStart();
      expect(utils.debugCounter).to.equal(3);
    });

    it('maintains the low numbers of iterations regardless of available width', () => {
      const utils = new TruncationUtilsWithDOM({
        ...sharedProps,
        container,
        fullText: sharedProps.fullText.repeat(1000),
        availableWidth: 1000,
      });
      utils.debugPerformance = true;

      utils.truncateMiddle();
      expect(utils.debugCounter).to.equal(5);
    });

    it('maintains low number of iterations in canvas as well as DOM', () => {
      const utils = new TruncationUtilsWithCanvas({
        ...sharedProps,
        font,
        fullText: sharedProps.fullText.repeat(1000),
        availableWidth: 1000,
      });
      utils.debugPerformance = true;

      utils.truncateStartEndAtPosition(1000);
      expect(utils.debugCounter).to.equal(6);
    });
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
    cy.get('#start').should('have.text', expectedOutput.start);
    cy.get('#end').should('have.text', expectedOutput.end);
    cy.get('#middle').should('have.text', expectedOutput.middle);
    cy.get('#startEnd').should('have.text', expectedOutput.startEnd);
    cy.get('#startEndAt').should(
      'have.text',
      '...rem ipsum dolor sit amet, ...'
    );
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
});
