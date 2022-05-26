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
import {
  useEuiFontSize,
  euiTextBreakWord,
  euiTextTruncate,
  useEuiNumberFormat,
} from './_typography';

describe('euiFontSize', () => {
  describe('returns an object of font-size and line-height for each scale', () => {
    EuiThemeFontSizeMeasurements.forEach((measurement) => {
      describe(measurement, () => {
        EuiThemeFontScales.forEach((size) => {
          test(size, () => {
            expect(
              testCustomHook(() => useEuiFontSize(size, { measurement })).return
            ).toMatchSnapshot();
          });
        });
      });
    });
  });

  it('handles the optional customScale property by multiplying it against the passed scale', () => {
    expect(
      testCustomHook(() => useEuiFontSize('m', { customScale: 'xs' })).return
    ).toMatchSnapshot({}, 'm scale with xs customScale');
    expect(
      testCustomHook(() => useEuiFontSize('l', { customScale: 'xxs' })).return
    ).toMatchSnapshot({}, 'l scale with xxs customScale');
    expect(
      testCustomHook(() => useEuiFontSize('s', { customScale: 'xl' })).return
    ).toMatchSnapshot({}, 's scale with xl customScale');
  });
});

describe('euiTextBreakWord', () => {
  it('returns a string of CSS text', () => {
    expect(euiTextBreakWord()).toMatchSnapshot();
  });
});

describe('euiTextTruncate', () => {
  it('returns a string of CSS text', () => {
    expect(euiTextTruncate()).toMatchSnapshot();
  });

  it('allows customizing max-width', () => {
    expect(euiTextTruncate('150px')).toMatchSnapshot();
  });
});

describe('euiNumberFormat', () => {
  it('returns a string of CSS text', () => {
    expect(testCustomHook(() => useEuiNumberFormat()).return).toMatchSnapshot();
  });
});
