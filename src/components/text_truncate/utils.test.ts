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
    font: '14px Inter',
  };

  const setMockTextWidth = (width: number) => (utils: TruncationUtils) => {
    // @ts-ignore - mocked canvas_text_utils.testenv allows setting this value
    utils.textWidth = width;
  };

  // A few utilities log errors - silence them and capture the messages
  const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
  beforeEach(() => consoleErrorSpy.mockClear());
  afterAll(() => consoleErrorSpy.mockRestore());

  describe('ratio utils', () => {
    const utils = new TruncationUtils({
      ...params,
      availableWidth: 1000,
    });

    describe('setTextWidthRatio', () => {
      it('sets the ratio of the available width to the full text width', () => {
        setMockTextWidth(10000)(utils);
        utils.setTextWidthRatio();
        expect(utils.widthRatio).toEqual(0.1);
      });

      it('allow measuring passed text and deducting an offset width', () => {
        // Note: there isn't a super great way to mock a real-world example of this
        // in Jest because mockCanvasWidth applies to both the measured text and excluded text
        setMockTextWidth(500)(utils);
        utils.setTextWidthRatio('text to measure', 'some excluded text');
        expect(utils.widthRatio).toEqual(1);
      });
    });

    describe('getTextFromRatio', () => {
      it('splits the passed text string by the ratio determined by `setTextWidthRatio`', () => {
        setMockTextWidth(3000)(utils);
        utils.setTextWidthRatio(); // 0.33
        // Should split the strings by the last/first third
        expect(utils.getTextFromRatio('Lorem ipsum', 'start')).toEqual('psum');
        expect(utils.getTextFromRatio('dolor sit', 'end')).toEqual('dol');
      });
    });
  });

  describe('early return checks', () => {
    const utils = new TruncationUtils(params);

    describe('checkIfTruncationIsNeeded', () => {
      it('returns false if truncation is not needed', () => {
        setMockTextWidth(100)(utils);
        expect(utils.checkIfTruncationIsNeeded()).toEqual(false);

        setMockTextWidth(400)(utils);
        expect(utils.checkIfTruncationIsNeeded()).toBeUndefined();
      });
    });

    describe('checkSufficientEllipsisWidth', () => {
      it('returns false and errors if the container is not wide enough for the ellipsis', () => {
        setMockTextWidth(201)(utils);
        expect(utils.checkSufficientEllipsisWidth('startEnd')).toEqual(false);
        expect(consoleErrorSpy).toHaveBeenCalledWith(
          'The truncation ellipsis is larger than the available width. No text can be rendered.'
        );

        setMockTextWidth(10)(utils);
        expect(utils.checkSufficientEllipsisWidth('start')).toBeUndefined();
      });
    });

    describe('checkTruncationOffsetWidth', () => {
      it('returns false and errors if the container is not wide enough for the offset text', () => {
        setMockTextWidth(201)(utils);
        expect(utils.checkTruncationOffsetWidth('hello')).toEqual(false);
        expect(consoleErrorSpy).toHaveBeenCalledWith(
          'The passed truncationOffset is too large for the available width. Truncating the offset instead.'
        );

        setMockTextWidth(200)(utils);
        expect(utils.checkTruncationOffsetWidth('world')).toBeUndefined();
      });
    });
  });

  // As JSDOM has no concept of widths, we can't meaningfully test the
  // truncation type methods in Jest - see `utils.spec.tsx` instead,
  // and use `yarn combine-test-coverage` to see final code coverage
});
