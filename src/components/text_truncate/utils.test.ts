/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { CanvasTextUtils, TruncationUtils } from './utils';

let mockCanvasWidth = 0;
Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
  value: () => ({ measureText: () => ({ width: mockCanvasWidth }), font: '' }),
});

describe('CanvasTextUtils', () => {
  describe('font calculations', () => {
    it('computes the set font if passed a container element', () => {
      const container = document.createElement('div');
      container.style.font = '14px Inter';

      const utils = new CanvasTextUtils({ container });
      expect(utils.context.font).toEqual('14px Inter');
    });

    it('accepts a static font string', () => {
      const utils = new CanvasTextUtils({ font: '14px Inter' });
      expect(utils.context.font).toEqual('14px Inter');
    });
  });

  describe('text width utils', () => {
    const utils = new CanvasTextUtils({ font: '' });

    describe('textWidth', () => {
      it('returns the measured text width from the canvas', () => {
        mockCanvasWidth = 200;
        expect(utils.textWidth).toEqual(200);
      });
    });

    describe('setTextToCheck', () => {
      it('sets the internal currentText variable', () => {
        utils.setTextToCheck('hello world');
        expect(utils.currentText).toEqual('hello world');
      });
    });
  });
});

describe('TruncationUtils', () => {
  const params = {
    fullText: 'Lorem ipsum dolor sit amet',
    ellipsis: '...',
    availableWidth: 200,
    font: '14px Inter',
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
        mockCanvasWidth = 10000;
        utils.setTextWidthRatio();
        expect(utils.widthRatio).toEqual(0.1);
      });

      it('allow measuring passed text and deducting an offset width', () => {
        // Note: there isn't a super great way to mock a real-world example of this
        // in Jest because mockCanvasWidth applies to both the measured text and excluded text
        mockCanvasWidth = 500;
        utils.setTextWidthRatio('text to measure', 'some excluded text');
        expect(utils.widthRatio).toEqual(1);
      });
    });

    describe('getTextFromRatio', () => {
      it('splits the passed text string by the ratio determined by `setTextWidthRatio`', () => {
        mockCanvasWidth = 3000;
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
        mockCanvasWidth = 100;
        expect(utils.checkIfTruncationIsNeeded()).toEqual(false);

        mockCanvasWidth = 400;
        expect(utils.checkIfTruncationIsNeeded()).toBeUndefined();
      });
    });

    describe('checkSufficientEllipsisWidth', () => {
      it('returns false and errors if the container is not wide enough for the ellipsis', () => {
        mockCanvasWidth = 201;
        expect(utils.checkSufficientEllipsisWidth('startEnd')).toEqual(false);
        expect(consoleErrorSpy).toHaveBeenCalledWith(
          'The truncation ellipsis is larger than the available width. No text can be rendered.'
        );

        mockCanvasWidth = 10;
        expect(utils.checkSufficientEllipsisWidth('start')).toBeUndefined();
      });
    });

    describe('checkTruncationOffsetWidth', () => {
      it('returns false and errors if the container is not wide enough for the offset text', () => {
        mockCanvasWidth = 201;
        expect(utils.checkTruncationOffsetWidth('hello')).toEqual(false);
        expect(consoleErrorSpy).toHaveBeenCalledWith(
          'The passed truncationOffset is too large for the available width. Truncating the offset instead.'
        );

        mockCanvasWidth = 200;
        expect(utils.checkTruncationOffsetWidth('world')).toBeUndefined();
      });
    });
  });

  // As JSDOM has no concept of widths, we can't meaningfully test the
  // truncation type methods in Jest - see `utils.spec.tsx` instead,
  // and use `yarn combine-test-coverage` to see final code coverage
});
