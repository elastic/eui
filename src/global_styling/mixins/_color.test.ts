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
            testCustomHook(() =>
              useEuiBackgroundColor(color, { method: 'transparent' })
            ).return
          ).toMatchSnapshot();
        });
      });
    });
  });
});

describe('useEuiBackgroundColorCSS hook returns an object of Emotion background-color properties', () => {
  const colors = testCustomHook(useEuiBackgroundColorCSS).return as any;

  describe('for each color:', () => {
    Object.entries(colors).map(([color, cssObj]) => {
      it(color, () => {
        expect((cssObj as any).styles).toMatchSnapshot();
      });
    });
  });
});
