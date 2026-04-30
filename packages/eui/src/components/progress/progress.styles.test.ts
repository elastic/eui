/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { useEuiTheme } from '../../services';
import { renderHook } from '../../test/rtl';

import { POSITIONS, COLORS } from './progress';
import {
  euiProgressStyles,
  euiProgressGradientStyles,
} from './progress.styles';

describe('euiProgressStyles', () => {
  describe('native progress CSS', () => {
    const isNative = true;
    const emotionReturn = renderHook(() =>
      euiProgressStyles(useEuiTheme(), isNative)
    ).result.current;

    describe('positions', () => {
      POSITIONS.forEach((position) => {
        test(position, () => {
          expect(emotionReturn[position].styles).toMatchSnapshot();
        });
      });
    });

    describe('colors', () => {
      COLORS.forEach((color) => {
        test(color, () => {
          expect(emotionReturn[color].styles).toMatchSnapshot();
        });
      });
    });
  });

  describe('indeterminate div CSS', () => {
    const isNative = false;
    const emotionReturn = renderHook(() =>
      euiProgressStyles(useEuiTheme(), isNative)
    ).result.current;

    describe('positions', () => {
      POSITIONS.forEach((position) => {
        test(position, () => {
          expect(emotionReturn[position].styles).toMatchSnapshot();
        });
      });
    });

    describe('colors', () => {
      COLORS.forEach((color) => {
        test(color, () => {
          expect(emotionReturn[color].styles).toMatchSnapshot();
        });
      });
    });
  });
});

describe('euiProgressGradientStyles', () => {
  const gradient = 'linear-gradient(90deg, #00BFB3, #FEC514, #BD271E)';

  test('native progress applies the gradient via background-image on cross-browser fill selectors', () => {
    const styles = euiProgressGradientStyles(gradient, true).styles;
    expect(styles).toMatchSnapshot();
    expect(styles).toContain('::-webkit-progress-value');
    expect(styles).toContain('::-moz-progress-bar');
    expect(styles).toContain(`background-image: ${gradient}`);
    expect(styles).toContain('background-color: transparent');
  });

  test('indeterminate progress applies the gradient via background-image on the ::before pseudo-element', () => {
    const styles = euiProgressGradientStyles(gradient, false).styles;
    expect(styles).toMatchSnapshot();
    expect(styles).toContain('::before');
    expect(styles).toContain(`background-image: ${gradient}`);
    expect(styles).toContain('background-color: transparent');
  });
});
