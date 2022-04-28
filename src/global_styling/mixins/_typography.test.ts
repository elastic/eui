/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { testCustomHook } from '../../test/internal';
import {
  EuiThemeFontScales,
  EuiThemeFontSizeMeasurements,
} from '../variables/typography';
import { useEuiFontSize } from './_typography';

describe('useEuiFontSize mixin returns a static object with properties related to font-size', () => {
  describe('for each scale', () => {
    EuiThemeFontScales.forEach((scale) => {
      it(scale, () => {
        expect(
          testCustomHook(() => useEuiFontSize(scale)).return
        ).toMatchSnapshot();
      });

      describe('and each measurement', () => {
        EuiThemeFontSizeMeasurements.forEach((measure) => {
          it(measure, () => {
            expect(
              testCustomHook(() => useEuiFontSize(scale, measure)).return
            ).toMatchSnapshot();
          });
        });
      });
    });
  });
});
