/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { renderHook } from '@testing-library/react';

import { useEuiTheme } from '../../services';
import { EuiThemeFontScales, EuiThemeFontUnits } from '../variables/typography';
import {
  useEuiFontSize,
  euiTextBreakWord,
  euiTextTruncate,
  euiNumberFormat,
} from './_typography';

describe('euiFontSize', () => {
  describe('returns an object of font-size and line-height for each scale', () => {
    EuiThemeFontUnits.forEach((unit) => {
      describe(unit, () => {
        EuiThemeFontScales.forEach((size) => {
          test(size, () => {
            expect(
              renderHook(() => useEuiFontSize(size, { unit })).result.current
            ).toMatchSnapshot();
          });
        });
      });
    });
  });

  it('handles the optional customScale property by multiplying it against the passed scale', () => {
    expect(
      renderHook(() => useEuiFontSize('m', { customScale: 'xs' })).result
        .current
    ).toMatchSnapshot({}, 'm scale with xs customScale');
    expect(
      renderHook(() => useEuiFontSize('l', { customScale: 'xxs' })).result
        .current
    ).toMatchSnapshot({}, 'l scale with xxs customScale');
    expect(
      renderHook(() => useEuiFontSize('s', { customScale: 'xl' })).result
        .current
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
    expect(
      renderHook(() => euiNumberFormat(useEuiTheme())).result.current
    ).toMatchSnapshot();
  });
});
