/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { testCustomHook } from '../../test/internal';
import { PADDING_SIZES, useEuiPadding } from './_padding';
import { LOGICAL_SIDES } from '../functions/logicals';

describe('useEuiPadding mixin returns a static padding property', () => {
  describe('for each padding size', () => {
    PADDING_SIZES.forEach((size) => {
      it(size, () => {
        expect(
          testCustomHook(() => useEuiPadding(size)).return
        ).toMatchSnapshot();
      });
    });

    describe('for each logical side', () => {
      LOGICAL_SIDES.forEach((side) => {
        it(side, () => {
          expect(
            testCustomHook(() => useEuiPadding('m', side)).return
          ).toMatchSnapshot();
        });
      });
    });
  });
});
