/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { testCustomHook } from '../../test/internal';
import {
  PADDING_SIZES,
  useEuiPaddingSize,
  useEuiPaddingStyles,
} from './_padding';
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

describe('useEuiPaddingStyles hook returns the object of static background-color properties', () => {
  describe('and each logical side', () => {
    LOGICAL_SIDES.forEach((side) => {
      it(side, () => {
        expect(
          testCustomHook(() => useEuiPaddingStyles(side)).return
        ).toMatchSnapshot();
      });
    });
  });
});
