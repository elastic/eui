/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { TruncationUtilsWithDOM, TruncationUtilsWithCanvas } from './utils';

const sharedParams = {
  fullText: 'Lorem ipsum dolor sit amet',
  ellipsis: '...',
  availableWidth: 200,
};

describe('TruncationUtilsWithDOM', () => {
  const params = {
    ...sharedParams,
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

  describe('DOM utils', () => {
    const utils = new TruncationUtilsWithDOM(params);

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

  describe('ratio utils', () => {
    const utils = new TruncationUtilsWithDOM({
      ...params,
      availableWidth: 1000,
    });

    describe('setTextWidthRatio', () => {
      it('sets the ratio of the available width to the full text width', () => {
        setSpanWidth(10000);
        utils.setTextWidthRatio();
        expect(utils.widthRatio).toEqual(0.1);
      });

      it('allow measuring passed text and deducting an offset width', () => {
        // Note: there isn't a super great way to mock a real-world example of this
        // in Jest because setSpanWidth applies to both the measured text and excluded text
        setSpanWidth(500);
        utils.setTextWidthRatio('text to measure', 'some excluded text');
        expect(utils.widthRatio).toEqual(1);
      });
    });

    describe('getTextFromRatio', () => {
      it('splits the passed text string by the ratio determined by `setTextWidthRatio`', () => {
        setSpanWidth(3000);
        utils.setTextWidthRatio(); // 0.33
        // Should split the strings by the last/first third
        expect(utils.getTextFromRatio('Lorem ipsum', 'start')).toEqual('psum');
        expect(utils.getTextFromRatio('dolor sit', 'end')).toEqual('dol');
      });
    });
  });

  describe('early return checks', () => {
    const utils = new TruncationUtilsWithDOM(params);
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

    describe('checkTruncationOffsetWidth', () => {
      it('returns false and errors if the container is not wide enough for the offset text', () => {
        setSpanWidth(201);
        expect(utils.checkTruncationOffsetWidth('hello')).toEqual(false);
        expect(consoleErrorSpy).toHaveBeenCalledWith(
          'The passed truncationOffset is too large for the available width. Truncating the offset instead.'
        );

        setSpanWidth(200);
        expect(utils.checkTruncationOffsetWidth('world')).toBeUndefined();
      });
    });
  });

  // As JSDOM has no concept of widths, we can't meaningfully test the
  // truncation type methods in Jest - see `utils.spec.tsx` instead,
  // and use `yarn combine-test-coverage` to see final code coverage
});

describe('TruncationUtilsWithCanvas', () => {
  // Jest absolutely does not have canvas so I honestly have no idea why I'm even doing this
  // Except that like a Pavlovian dog conditioned for treats, so I am conditioned
  // for that sweet sweet green 100% code coverage
  Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
    value: () => ({ measureText: () => ({ width: 200 }), font: '' }),
  });

  describe('font calculations', () => {
    it('computes the set font if passed a container element', () => {
      const container = document.createElement('div');
      container.style.font = '14px Inter';

      const utils = new TruncationUtilsWithCanvas({
        ...sharedParams,
        container,
      });
      expect(utils.context.font).toEqual('14px Inter');
    });

    it('accepts a static font string', () => {
      const utils = new TruncationUtilsWithCanvas({
        ...sharedParams,
        font: '14px Inter',
      });
      expect(utils.context.font).toEqual('14px Inter');
    });
  });

  describe('canvas utils', () => {
    const utils = new TruncationUtilsWithCanvas({ ...sharedParams, font: '' });

    describe('textWidth', () => {
      it('returns the measured text width from the canvas', () => {
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
