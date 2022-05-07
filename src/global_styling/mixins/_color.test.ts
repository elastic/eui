/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { testCustomHook } from '../../test/internal';
import {
  BACKGROUND_COLORS,
  useEuiBackgroundColor,
  useEuiBackgroundColorCSS,
} from './_color';

describe('useEuiBackgroundColor mixin returns a calculated background version', () => {
  describe('for each color:', () => {
    BACKGROUND_COLORS.forEach((color) => {
      it(color, () => {
        expect(
          testCustomHook(() => useEuiBackgroundColor(color)).return
        ).toMatchSnapshot();
      });

      describe('as transparent', () => {
        it(color, () => {
          expect(
            testCustomHook(() => useEuiBackgroundColor(color, 'transparent'))
              .return
          ).toMatchSnapshot();
        });
      });
    });
  });
});

describe('useEuiBackgroundColorCSS hook returns the object of static background-color properties', () => {
  it('for each color', () => {
    expect(
      testCustomHook(() => useEuiBackgroundColorCSS()).return
    ).toMatchSnapshot();
  });
});
