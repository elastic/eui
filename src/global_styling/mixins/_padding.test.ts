/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { testCustomHook } from '../../test/internal';
import { PADDING_SIZES, useEuiPaddingSize, useEuiPaddingCSS } from './_padding';
import { LOGICAL_SIDES } from '../functions/logicals';

describe('useEuiPaddingSize returns a static padding value', () => {
  describe('for each size', () => {
    PADDING_SIZES.forEach((size) => {
      it(size, () => {
        expect(
          testCustomHook(() => useEuiPaddingSize(size)).return
        ).toMatchSnapshot();
      });
    });
  });
});

describe('useEuiPaddingCSS hook returns an object of Emotion padding properties', () => {
  LOGICAL_SIDES.forEach((side) => {
    describe(`for side: ${side},`, () => {
      const sizes = testCustomHook(() => useEuiPaddingCSS(side)).return as any;

      describe('for each size:', () => {
        Object.entries(sizes).map(([size, cssObj]) => {
          it(size, () => {
            const output = cssObj ? (cssObj as any).styles : cssObj;
            expect(output).toMatchSnapshot();
          });
        });
      });
    });
  });
});
