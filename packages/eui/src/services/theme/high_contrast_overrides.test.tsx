/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from '../../test/rtl';

import { EuiThemeProvider } from './provider';

describe('high contrast mode modification overrides', () => {
  it('overrides the theme border color', () => {
    const { getByText } = render(
      <EuiThemeProvider highContrastMode={true}>
        <div css={({ euiTheme }) => ({ border: euiTheme.border.thin })}>
          High contrast light mode
          <EuiThemeProvider colorMode="dark">
            <div css={({ euiTheme }) => ({ border: euiTheme.border.thin })}>
              High contrast dark mode
            </div>
          </EuiThemeProvider>
          <EuiThemeProvider highContrastMode={false}>
            <div css={({ euiTheme }) => ({ border: euiTheme.border.thin })}>
              Not high contrast mode
            </div>
          </EuiThemeProvider>
        </div>
      </EuiThemeProvider>
    );

    expect(getByText('High contrast light mode')).toHaveStyleRule(
      'border',
      '1px solid #07101F'
    );
    expect(getByText('High contrast dark mode')).toHaveStyleRule(
      'border',
      '1px solid #FFFFFF'
    );
    expect(getByText('Not high contrast mode')).toHaveStyleRule(
      'border',
      '1px solid #E3E8F2'
    );
  });

  it('overrides consumer border color modifications', () => {
    const modify = {
      colors: {
        LIGHT: { border: '#aaaaaa' },
        DARK: { border: '#333333' },
      },
    };
    const { getByText } = render(
      <EuiThemeProvider modify={modify} highContrastMode={true}>
        <div css={({ euiTheme }) => ({ borderColor: euiTheme.border.color })}>
          High contrast mode
        </div>
      </EuiThemeProvider>
    );

    expect(getByText('High contrast mode')).toHaveStyleRule(
      'border-color',
      '#07101F'
    );
  });

  it('preserves modified border widths', () => {
    const { getByText } = render(
      <EuiThemeProvider
        highContrastMode={true}
        modify={{ border: { width: { thin: '5px', thick: '10px' } } }}
      >
        <div css={({ euiTheme }) => ({ border: euiTheme.border.thin })}>
          Thin border
        </div>
        <div css={({ euiTheme }) => ({ border: euiTheme.border.thick })}>
          Thick border
        </div>
      </EuiThemeProvider>
    );

    expect(getByText('Thin border')).toHaveStyleRule(
      'border',
      '5px solid #07101F'
    );
    expect(getByText('Thick border')).toHaveStyleRule(
      'border',
      '10px solid #07101F'
    );
  });
});
