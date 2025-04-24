/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { UseEuiTheme } from '../../services';
import { highContrastModeStyles, preventForcedColors } from './high_contrast';

const mockForcedHighContrastMode = {
  highContrastMode: 'forced',
} as UseEuiTheme;

const mockPreferredHighContrastMode = {
  highContrastMode: 'preferred',
} as UseEuiTheme;

const mockRegularContrastMode = {
  highContrastMode: false,
} as UseEuiTheme;

describe('highContrastModeStyles', () => {
  describe('no high contrast', () => {
    it('returns the passed `none` styles', () => {
      expect(
        highContrastModeStyles(mockRegularContrastMode, {
          none: 'color: red;',
        })
      ).toEqual('color: red;');
      expect(
        highContrastModeStyles(mockRegularContrastMode, {
          none: 'color: red;',
          preferred: 'color: black;',
        })
      ).toEqual('color: red;');
      expect(
        highContrastModeStyles(mockRegularContrastMode, {
          none: 'color: red;',
          forced: 'forced-color-adjust: none;',
        })
      ).toEqual('color: red;');
      expect(
        highContrastModeStyles(mockRegularContrastMode, {
          none: 'color: red;',
          preferred: 'color: black;',
          forced: 'forced-color-adjust: none;',
        })
      ).toEqual('color: red;');
    });

    it('returns nothing if no `none` styles were passed', () => {
      expect(
        highContrastModeStyles(mockRegularContrastMode, {
          preferred: 'color: black;',
        })
      ).toEqual('');
      expect(
        highContrastModeStyles(mockRegularContrastMode, {
          forced: 'forced-color-adjust: none;',
        })
      ).toEqual('');
      expect(
        highContrastModeStyles(mockRegularContrastMode, {
          preferred: 'color: black;',
          forced: 'forced-color-adjust: none;',
        })
      ).toEqual('');
    });
  });

  describe('preferred high contrast', () => {
    it('returns the passed `preferred` styles', () => {
      expect(
        highContrastModeStyles(mockPreferredHighContrastMode, {
          preferred: 'color: black;',
        })
      ).toEqual('color: black;');
      expect(
        highContrastModeStyles(mockPreferredHighContrastMode, {
          none: 'color: red;',
          preferred: 'color: black;',
        })
      ).toEqual('color: black;');
    });

    it('ignores `forced` if `preferred` was passed', () => {
      expect(
        highContrastModeStyles(mockPreferredHighContrastMode, {
          none: 'color: red;',
          preferred: 'color: black;',
          forced: 'forced-color-adjust: none;',
        })
      ).toEqual('color: black;');
    });

    it('falls back to `none` if only `forced` was passed', () => {
      expect(
        highContrastModeStyles(mockPreferredHighContrastMode, {
          none: 'color: red;',
          forced: 'forced-color-adjust: none;',
        })
      ).toEqual('color: red;');
    });

    it('returns nothing if no contrast styles were passed', () => {
      expect(
        highContrastModeStyles(mockPreferredHighContrastMode, {
          none: 'color: red;',
        })
      ).toEqual('');
    });
  });

  describe('forced high contrast', () => {
    it('returns the passed `forced` styles', () => {
      expect(
        highContrastModeStyles(mockForcedHighContrastMode, {
          forced: 'color: black;',
        })
      ).toEqual('color: black;');
      expect(
        highContrastModeStyles(mockForcedHighContrastMode, {
          none: 'color: red;',
          forced: 'color: black;',
        })
      ).toEqual('color: black;');
    });

    it('also returns/concatenates `preferred` styles if passed', () => {
      expect(
        highContrastModeStyles(mockForcedHighContrastMode, {
          preferred: 'background-color: white;',
        })
      ).toEqual('background-color: white;');
      expect(
        highContrastModeStyles(mockForcedHighContrastMode, {
          preferred: 'background-color: white;',
          forced: 'color: black;',
        })
      ).toEqual('background-color: white;color: black;');
    });

    it('returns nothing if no contrast styles were passed', () => {
      expect(
        highContrastModeStyles(mockForcedHighContrastMode, {
          none: 'color: red;',
        })
      ).toEqual('');
    });
  });
});

describe('preventForcedColors', () => {
  it('returns forced-color-adjust CSS when high contrast is being forced', () => {
    expect(preventForcedColors(mockForcedHighContrastMode)).toEqual(
      'forced-color-adjust: none;'
    );
  });

  it('returns nothing when highContrastMode is not forced', () => {
    expect(preventForcedColors(mockRegularContrastMode)).toEqual('');
  });
});
