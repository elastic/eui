/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, PropsWithChildren } from 'react';
import { renderHook } from '../../test/rtl/render_hook';

import { EuiProvider } from '../../components/provider';
import { useEuiTheme } from '../../services';
import { EuiThemeFontScales, EuiThemeFontUnits } from '../variables/typography';

import { euiFontSizeFromScale, euiLineHeightFromBaseline } from './typography';

// Default euiTheme to use for most tests
const { euiTheme } = renderHook(useEuiTheme).result.current;

describe('euiFontSizeFromScale', () => {
  describe('scale', () => {
    EuiThemeFontScales.forEach((scale) => {
      test(scale, () => {
        expect(euiFontSizeFromScale(scale, euiTheme)).toMatchSnapshot();
      });
    });
  });

  describe('custom scale', () => {
    it('allows passing a custom modifier to the existing scale', () => {
      expect(
        euiFontSizeFromScale('xxxs', euiTheme, { customScale: 's' })
      ).toEqual('0.5625rem');
    });
  });

  describe('unit', () => {
    EuiThemeFontUnits.forEach((unit) => {
      test(unit, () => {
        const output = euiFontSizeFromScale('m', euiTheme, { unit });
        expect(output.endsWith(unit)).toBe(true);
        expect(output).toMatchSnapshot();
      });
    });

    it('falls back to the `defaultUnits` theme token if a unit is not passed', () => {
      const wrapper: FunctionComponent<PropsWithChildren> = ({ children }) => (
        <EuiProvider modify={{ font: { defaultUnits: 'px' } }}>
          {children}
        </EuiProvider>
      );
      const { euiTheme: modifiedEuiTheme } = renderHook(useEuiTheme, {
        wrapper,
      }).result.current;

      expect(euiFontSizeFromScale('m', modifiedEuiTheme)).toEqual('16px');
    });
  });
});

describe('euiLineHeightFromBaseline', () => {
  describe('scale', () => {
    EuiThemeFontScales.forEach((scale) => {
      test(scale, () => {
        expect(euiLineHeightFromBaseline(scale, euiTheme)).toMatchSnapshot();
      });
    });
  });

  describe('custom scale', () => {
    it('allows passing a custom modifier to the existing scale', () => {
      expect(
        euiLineHeightFromBaseline('xxxs', euiTheme, { customScale: 's' })
      ).toEqual('0.8571rem');
    });
  });

  describe('unit', () => {
    EuiThemeFontUnits.forEach((unit) => {
      test(unit, () => {
        const output = euiLineHeightFromBaseline('m', euiTheme, { unit });

        if (unit !== 'em') {
          expect(output.endsWith(unit)).toBe(true);
        } else {
          expect(Number(output)).not.toBeNaN();
        }

        expect(output).toMatchSnapshot();
      });
    });

    it('falls back to the `defaultUnits` theme token if a unit is not passed', () => {
      const wrapper: FunctionComponent<PropsWithChildren> = ({ children }) => (
        <EuiProvider modify={{ font: { defaultUnits: 'px' } }}>
          {children}
        </EuiProvider>
      );
      const { euiTheme: modifiedEuiTheme } = renderHook(useEuiTheme, {
        wrapper,
      }).result.current;

      expect(euiLineHeightFromBaseline('m', modifiedEuiTheme)).toEqual('24px');
    });
  });
});
