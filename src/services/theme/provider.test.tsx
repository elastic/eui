/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from '@testing-library/react'; // Note - don't use the EUI custom RTL `render`, as it auto-wraps an `EuiProvider`
import { css } from '@emotion/react';

import { EuiProvider } from '../../components/provider';
import { EuiThemeProvider } from './provider';

describe('EuiThemeProvider', () => {
  describe('colorMode', () => {
    it('sets `colorMode`', () => {
      const { getByText } = render(
        <>
          <EuiThemeProvider colorMode="light">
            <div css={({ euiTheme }) => ({ color: euiTheme.colors.fullShade })}>
              Light mode
            </div>
            <EuiThemeProvider colorMode="inverse">
              <div
                css={({ euiTheme }) => ({ color: euiTheme.colors.fullShade })}
              >
                Inverse of light mode
              </div>
            </EuiThemeProvider>
          </EuiThemeProvider>
          <EuiThemeProvider colorMode="dark">
            <div css={({ euiTheme }) => ({ color: euiTheme.colors.fullShade })}>
              Dark mode
            </div>
            <EuiThemeProvider colorMode="inverse">
              <div
                css={({ euiTheme }) => ({ color: euiTheme.colors.fullShade })}
              >
                Inverse of dark mode
              </div>
            </EuiThemeProvider>
          </EuiThemeProvider>
        </>
      );

      expect(getByText('Light mode')).toHaveStyleRule('color', '#000');
      expect(getByText('Dark mode')).toHaveStyleRule('color', '#FFF');
      expect(getByText('Inverse of light mode')).toHaveStyleRule(
        'color',
        '#FFF'
      );
      expect(getByText('Inverse of dark mode')).toHaveStyleRule(
        'color',
        '#000'
      );
    });
  });

  describe('modify', () => {
    it('allows overriding theme tokens', () => {
      const { getByText } = render(
        <EuiThemeProvider
          modify={{ colors: { LIGHT: { primary: 'hotpink' } } }}
        >
          <div css={({ euiTheme }) => ({ color: euiTheme.colors.primary })}>
            Modified
          </div>
        </EuiThemeProvider>
      );

      expect(getByText('Modified')).toHaveStyleRule('color', 'hotpink');
    });
  });

  describe('nested EuiThemeProviders', () => {
    it('renders with a span wrapper that sets the inherited text color', () => {
      const { container } = render(
        <EuiProvider>
          Top-level provider{' '}
          <EuiThemeProvider colorMode="dark">
            Nested
            <EuiThemeProvider colorMode="light">
              Double nested
              <EuiThemeProvider colorMode="inverse">
                Triple nested
              </EuiThemeProvider>
            </EuiThemeProvider>
          </EuiThemeProvider>
        </EuiProvider>
      );

      expect(container).toMatchSnapshot();
    });

    it('allows customizing the span wrapper with `wrapperProps`', () => {
      const customCss = css`
        display: flex;
      `;

      const { container } = render(
        <EuiProvider>
          Top-level provider{' '}
          <EuiThemeProvider
            colorMode="dark"
            wrapperProps={{
              className: 'test',
              'data-test-subj': 'nested',
              css: customCss,
            }}
          >
            Nested
          </EuiThemeProvider>
        </EuiProvider>
      );

      expect(container).toMatchSnapshot();
      expect(container.querySelector('.test')).toBeTruthy();
    });

    it('allows avoiding the extra span wrapper with `wrapperProps.cloneElement`', () => {
      const { container } = render(
        <EuiProvider>
          Top-level provider{' '}
          <EuiThemeProvider
            colorMode="dark"
            wrapperProps={{ cloneElement: true, className: 'hello' }}
          >
            <div className="world">clone provider color onto div</div>
          </EuiThemeProvider>
        </EuiProvider>
      );

      expect(container).toMatchSnapshot();
      expect(container.querySelector('.hello.world')).toBeTruthy();
    });
  });
});
