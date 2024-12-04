/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { UseEuiTheme } from '../../services';
import { highContrastAffordance, overrideForcedColors } from './high_contrast';

const mockForcedHighContrastMode = {
  highContrastMode: 'forced',
} as UseEuiTheme;

const mockPreferredHighContrastMode = {
  highContrastMode: 'preferred',
} as UseEuiTheme;

const mockRegularContrastMode = {
  highContrastMode: false,
} as UseEuiTheme;

describe('highContrastAffordance', () => {
  describe('no high contrast', () => {
    it('returns the passed `defaultStyles`', () => {
      expect(
        highContrastAffordance(mockRegularContrastMode, {
          default: 'color: red;',
        })
      ).toEqual('color: red;');
      expect(
        highContrastAffordance(mockRegularContrastMode, {
          default: 'color: red;',
          preferred: 'color: black;',
        })
      ).toEqual('color: red;');
      expect(
        highContrastAffordance(mockRegularContrastMode, {
          default: 'color: red;',
          forced: 'forced-color-adjust: none;',
        })
      ).toEqual('color: red;');
      expect(
        highContrastAffordance(mockRegularContrastMode, {
          default: 'color: red;',
          preferred: 'color: black;',
          forced: 'forced-color-adjust: none;',
        })
      ).toEqual('color: red;');
    });

    it('returns nothing if no `defaultStyles` were passed', () => {
      expect(
        highContrastAffordance(mockRegularContrastMode, {
          preferred: 'color: black;',
        })
      ).toEqual('');
      expect(
        highContrastAffordance(mockRegularContrastMode, {
          forced: 'forced-color-adjust: none;',
        })
      ).toEqual('');
      expect(
        highContrastAffordance(mockRegularContrastMode, {
          preferred: 'color: black;',
          forced: 'forced-color-adjust: none;',
        })
      ).toEqual('');
    });
  });

  describe('preferred high contrast', () => {
    it('returns the passed `highContrastStyles`', () => {
      expect(
        highContrastAffordance(mockPreferredHighContrastMode, {
          preferred: 'color: black;',
        })
      ).toEqual('color: black;');
      expect(
        highContrastAffordance(mockPreferredHighContrastMode, {
          default: 'color: red;',
          preferred: 'color: black;',
        })
      ).toEqual('color: black;');
    });

    it('ignores `forcedColorsStyles` if `highContrastStyles` were passed', () => {
      expect(
        highContrastAffordance(mockPreferredHighContrastMode, {
          default: 'color: red;',
          preferred: 'color: black;',
          forced: 'forced-color-adjust: none;',
        })
      ).toEqual('color: black;');
    });

    it('falls back to `defaultStyles` if only `forcedColorsStyles` were passed', () => {
      expect(
        highContrastAffordance(mockPreferredHighContrastMode, {
          default: 'color: red;',
          forced: 'forced-color-adjust: none;',
        })
      ).toEqual('color: red;');
    });

    it('returns nothing if no contrast styles were passed', () => {
      expect(
        highContrastAffordance(mockPreferredHighContrastMode, {
          default: 'color: red;',
        })
      ).toEqual('');
    });
  });

  describe('forced high contrast', () => {
    it('returns the passed `forcedColorsStyles`', () => {
      expect(
        highContrastAffordance(mockForcedHighContrastMode, {
          forced: 'color: black;',
        })
      ).toEqual('color: black;');
      expect(
        highContrastAffordance(mockForcedHighContrastMode, {
          default: 'color: red;',
          forced: 'color: black;',
        })
      ).toEqual('color: black;');
    });

    it('also returns/concatenates `highContrastStyles` if passed', () => {
      expect(
        highContrastAffordance(mockForcedHighContrastMode, {
          preferred: 'background-color: white;',
        })
      ).toEqual('background-color: white;');
      expect(
        highContrastAffordance(mockForcedHighContrastMode, {
          preferred: 'background-color: white;',
          forced: 'color: black;',
        })
      ).toEqual('background-color: white;color: black;');
    });

    it('returns nothing if no contrast styles were passed', () => {
      expect(
        highContrastAffordance(mockForcedHighContrastMode, {
          default: 'color: red;',
        })
      ).toEqual('');
    });
  });
});

describe('overrideForcedColors', () => {
  it('returns forced-color-adjust CSS when high contrast is being forced', () => {
    expect(overrideForcedColors(mockForcedHighContrastMode)).toEqual(
      'forced-color-adjust: none;'
    );
  });

  it('returns nothing when highContrastMode is not forced', () => {
    expect(overrideForcedColors(mockRegularContrastMode)).toEqual('');
  });
});
