/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from '@testing-library/react';

import { useEuiTheme } from '../../../services';

jest.mock('./match_media_hook', () => ({
  useWindowMediaMatcher: jest.fn(),
}));
import { useWindowMediaMatcher } from './match_media_hook';

import { EuiSystemDefaultsProvider } from './system_defaults_provider';

describe('EuiSystemDefaultsProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('color mode', () => {
    const Output = () => {
      const { colorMode } = useEuiTheme();
      return <>{colorMode}</>;
    };

    it('falls back to light mode if no dark mode media query has been set', () => {
      const { container } = render(
        <EuiSystemDefaultsProvider>
          <Output />
        </EuiSystemDefaultsProvider>
      );

      expect(container.textContent).toEqual('LIGHT');
    });

    it('detects dark mode system settings', () => {
      (useWindowMediaMatcher as jest.Mock).mockImplementation((media) => {
        if (media === '(prefers-color-scheme: dark)') return true;
      });

      const { container } = render(
        <EuiSystemDefaultsProvider>
          <Output />
        </EuiSystemDefaultsProvider>
      );

      expect(container.textContent).toEqual('DARK');
    });
  });
});
