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
  describe('nested EuiThemeProviders', () => {
    it('renders with a span wrapper that sets the inherited text color', () => {
      const { container } = render(
        <EuiProvider>
          Top-level provider{' '}
          <EuiThemeProvider colorMode="inverse">Nested</EuiThemeProvider>
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
