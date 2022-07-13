/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { testCustomHook } from '../../test/internal';
import { useEuiTheme } from '../../services';

import { POSITIONS, COLORS } from './progress';
import { euiProgressStyles } from './progress.styles';

describe('euiProgressStyles', () => {
  describe('native progress CSS', () => {
    const isNative = true;
    const emotionReturn = testCustomHook(() =>
      euiProgressStyles(useEuiTheme(), isNative)
    ).return as any;

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
    const emotionReturn = testCustomHook(() =>
      euiProgressStyles(useEuiTheme(), isNative)
    ).return as any;

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
