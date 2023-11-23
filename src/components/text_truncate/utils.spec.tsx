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

import { TruncationUtils } from './utils';

const font = '14px Inter';

describe('Truncation utils', () => {
  const params = {
    fullText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    availableWidth: 200,
    ellipsis: '...',
  };

  // Note: These tests are intended to be primarily unit tests and do not emit
  // any rendered output in the UI. The reason why they're tested in Cypress and
  // not Jest is because jsdom does not return meaningful/valid width calculations
  const expectedOutput = {
    start: '...t, consectetur adipiscing elit',
    end: 'Lorem ipsum dolor sit amet, ...',
    startEnd: '...lor sit amet, consectetur a...',
    middle: 'Lorem ipsum d...adipiscing elit',
  };

  describe('truncation types logic', () => {
    const utils = new TruncationUtils({ ...params, font });

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
      const utils = new TruncationUtils({ ...params, container });

      beforeEach(() => {
        utils.debugPerformance = true;
        utils.debugCounter = 0;
      });

      specify('start', () => {
        utils.truncateStart();
        expect(utils.debugCounter).to.equal(3);

        utils.truncateStart(3);
        expect(utils.debugCounter).to.equal(8);
      });

      specify('end', () => {
        utils.truncateEnd();
        expect(utils.debugCounter).to.equal(7);

        utils.truncateEnd(3);
        expect(utils.debugCounter).to.equal(14);
      });

      specify('startEnd', () => {
        utils.truncateStartEndAtMiddle();
        expect(utils.debugCounter).to.equal(4);

        utils.truncateStartEndAtPosition(25);
        expect(utils.debugCounter).to.equal(9);
      });

      specify('middle', () => {
        utils.truncateMiddle();
        expect(utils.debugCounter).to.equal(5);
      });
    });

    it('maintains the same low number of iterations regardless of full text length', () => {
      const utils = new TruncationUtils({
        ...params,
        container,
        fullText: params.fullText.repeat(100),
      });
      utils.debugPerformance = true;

      utils.truncateStart();
      expect(utils.debugCounter).to.equal(3);
    });

    it('maintains the low numbers of iterations regardless of available width', () => {
      const utils = new TruncationUtils({
        ...params,
        container,
        fullText: params.fullText.repeat(1000),
        availableWidth: 1000,
      });
      utils.debugPerformance = true;

      utils.truncateMiddle();
      expect(utils.debugCounter).to.equal(5);
    });

    it('maintains low number of iterations in canvas as well as DOM', () => {
      const utils = new TruncationUtils({
        ...params,
        font,
        fullText: params.fullText.repeat(1000),
        availableWidth: 1000,
      });
      utils.debugPerformance = true;

      utils.truncateStartEndAtPosition(1000);
      expect(utils.debugCounter).to.equal(6);
    });
  });
});
