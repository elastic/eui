/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { testCustomHook } from '../../test/internal';

import { EuiThemeFontScales } from '../variables/typography';
import {
  useEuiFontSize,
  euiTextBreakWord,
  euiTextTruncate,
  euiNumberFormat,
} from './_typography';

describe('euiFontSize', () => {
  describe('returns an object of font-size and line-height for each scale', () => {
    describe('rem', () => {
      EuiThemeFontScales.forEach((size) => {
        test(size, () => {
          expect(
            testCustomHook(() => useEuiFontSize(size)).return
          ).toMatchSnapshot();
        });
      });
    });

    describe('em', () => {
      EuiThemeFontScales.forEach((size) => {
        test(size, () => {
          expect(
            testCustomHook(() => useEuiFontSize(size, 'em')).return
          ).toMatchSnapshot();
        });
      });
    });

    describe('px', () => {
      EuiThemeFontScales.forEach((size) => {
        test(size, () => {
          expect(
            testCustomHook(() => useEuiFontSize(size, 'px')).return
          ).toMatchSnapshot();
        });
      });
    });
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
    expect(euiNumberFormat()).toMatchSnapshot();
  });
});
