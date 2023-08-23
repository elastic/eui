/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { TruncationUtils } from './utils';

describe('TruncationUtils', () => {
  const params = {
    fullText: 'Lorem ipsum dolor sit amet',
    ellipsis: '...',
    availableWidth: 200,
    container: document.createElement('div'),
  };

  // JSDOM doesn't have box model widths, so we need to mock it
  const setSpanWidth = (width: number) => {
    Object.defineProperty(HTMLSpanElement.prototype, 'offsetWidth', {
      configurable: true,
      value: width,
    });
  };

  // A few utilities log errors - silence them and capture the messages
  const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
  beforeEach(() => consoleErrorSpy.mockClear());
  afterAll(() => consoleErrorSpy.mockRestore());

  describe('span utils', () => {
    const utils = new TruncationUtils(params);

    describe('textWidth', () => {
      it('returns the offsetWidth of the internal span element', () => {
        setSpanWidth(500);
        expect(utils.textWidth).toEqual(500);
      });
    });

    describe('setTextToCheck', () => {
      it('sets the text content of the internal span element', () => {
        utils.setTextToCheck('hello world');
        expect(utils.span.textContent).toEqual('hello world');
      });
    });

    describe('cleanup', () => {
      it('removes the internal span element from the DOM', () => {
        expect(params.container.contains(utils.span)).toBeTruthy();
        utils.cleanup();
        expect(params.container.contains(utils.span)).toBeFalsy();
      });
    });
  });

  describe('early return checks', () => {
    const utils = new TruncationUtils(params);
    afterAll(() => utils.cleanup());

    describe('checkIfTruncationIsNeeded', () => {
      it('returns false if truncation is not needed', () => {
        setSpanWidth(100);
        expect(utils.checkIfTruncationIsNeeded()).toEqual(false);

        setSpanWidth(400);
        expect(utils.checkIfTruncationIsNeeded()).toBeUndefined();
      });
    });

    describe('checkSufficientEllipsisWidth', () => {
      it('returns false and errors if the container is not wide enough for the ellipsis', () => {
        setSpanWidth(201);
        expect(utils.checkSufficientEllipsisWidth('startEnd')).toEqual(false);
        expect(consoleErrorSpy).toHaveBeenCalledWith(
          'The truncation ellipsis is larger than the available width. No text can be rendered.'
        );

        setSpanWidth(10);
        expect(utils.checkSufficientEllipsisWidth('start')).toBeUndefined();
      });
    });
  });

  describe('truncation types', () => {
    // Again, JSDOM doesn't have the concept of widths, so this is a bit
    // of a mockery, but it at least gives us some confidence in our substring logic
    let mockSpanWidth: number;
    beforeEach(() => {
      mockSpanWidth = params.availableWidth + 5; // 5 while loop iterations
    });

    // Simulate the width going down with each removed character
    let mockTextWidth: jest.SpyInstance;
    beforeAll(() => {
      mockTextWidth = jest
        .spyOn(TruncationUtils.prototype, 'textWidth', 'get')
        .mockImplementation(() => mockSpanWidth--);
    });
    const utils = new TruncationUtils(params);

    afterAll(() => {
      utils.cleanup();
      mockTextWidth.mockRestore();
    });

    describe('start', () => {
      it('inserts ellipsis at the start of the text', () => {
        expect(utils.truncateStart(0)).toEqual('... ipsum dolor sit amet');
      });

      describe('truncationOffset', () => {
        it('preserves the specified number of characters at the start of the text', () => {
          mockTextWidth.mockImplementationOnce(() => 30); // Mocks the `checkTruncationOffsetWidth` check
          expect(utils.truncateStart(3)).toEqual('Lor...sum dolor sit amet');
        });
      });
    });

    describe('end', () => {
      it('inserts ellipsis at the end of the text', () => {
        expect(utils.truncateEnd(0)).toEqual('Lorem ipsum dolor sit...');
      });

      describe('truncationOffset', () => {
        it('preserves the specified number of characters at the end of the text', () => {
          mockTextWidth.mockImplementationOnce(() => 30); // Mocks the `checkTruncationOffsetWidth` check
          expect(utils.truncateEnd(3)).toEqual('Lorem ipsum dolor ...met');
        });
      });
    });

    describe('startEnd', () => {
      describe('with no truncationPosition', () => {
        it('inserts ellipsis at the start and end of the text', () => {
          expect(utils.truncateStartEndAtMiddle()).toEqual(
            '... ipsum dolor sit...'
          );
        });
      });

      describe('with truncationPosition', () => {
        // Because this approach builds up text instead of removing, we need to re-mock widths
        beforeEach(() => {
          mockSpanWidth = params.availableWidth - 8;
          mockTextWidth.mockImplementation(() => mockSpanWidth++);
        });
        afterAll(() => {
          mockTextWidth.mockImplementation(() => mockSpanWidth--); // restore mock
        });

        it('allows moving the anchor point of the displayed text', () => {
          expect(utils.truncateStartEndAtPosition(10)).toEqual(
            '...rem ipsum dolor ...'
          );
        });

        it('does not display the leading ellipsis if the index is close to the start', () => {
          expect(utils.truncateStartEndAtPosition(2)).toEqual('Lorem ipsu...');
        });

        it('does not display the trailing ellipsis if the index is close to the end', () => {
          expect(utils.truncateStartEndAtPosition(20)).toEqual(
            '...dolor sit amet'
          );
        });
      });
    });

    describe('middle', () => {
      it('inserts ellipsis in the middle of the text', () => {
        expect(utils.truncateMiddle()).toEqual('Lorem ipsu...or sit amet');
      });
    });
  });
});
