/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { CanvasTextUtils } from './canvas_text_utils';

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
