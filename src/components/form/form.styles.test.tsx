/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { useEuiTheme } from '../../services';
import { EuiProvider } from '../provider';

import {
  euiFormVariables,
  euiFormCustomControlBorderColor,
} from './form.styles';

const darkModeWrapper: React.FC = ({ children }) => (
  <EuiProvider colorMode="DARK">{children}</EuiProvider>
);

describe('euiFormVariables', () => {
  it('outputs an object of reusable form vars', () => {
    const { result } = renderHook(() => euiFormVariables(useEuiTheme()));
    expect(result.current).toMatchInlineSnapshot(`
      Object {
        "backgroundColor": "#f9fbfd",
        "backgroundDisabledColor": "#eceff5",
        "backgroundReadOnlyColor": "#FFF",
        "borderColor": "rgba(211,218,230,0.9)",
        "borderDisabledColor": "rgba(211,218,230,0.9)",
        "controlBorderRadius": "6px",
        "controlBoxShadow": "0 0 transparent",
        "controlCompressedBorderRadius": "4px",
        "controlCompressedHeight": "32px",
        "controlCompressedPadding": "8px",
        "controlDisabledColor": "#98A2B3",
        "controlHeight": "40px",
        "controlIconSize": Object {
          "l": "24px",
          "m": "16px",
          "s": "12px",
          "xl": "32px",
          "xxl": "40px",
        },
        "controlLayoutGroupInputCompressedBorderRadius": "4px",
        "controlLayoutGroupInputCompressedHeight": "30px",
        "controlLayoutGroupInputHeight": "38px",
        "controlPadding": "12px",
        "controlPlaceholderText": "#646a77",
        "customControlBorderColor": "#f6f8fc",
        "customControlDisabledIconColor": "#c9cfd7",
        "inputGroupBorder": "none",
        "inputGroupLabelBackground": "#e9edf3",
        "maxWidth": "400px",
      }
    `);
  });

  test('dark mode', () => {
    const { result } = renderHook(() => euiFormVariables(useEuiTheme()), {
      wrapper: darkModeWrapper,
    });
    // Check custom dark-mode logic
    expect(result.current.backgroundColor).toEqual('#16171c');
    expect(result.current.controlPlaceholderText).toEqual('#878b95');
    expect(result.current.inputGroupLabelBackground).toEqual('#2c2f37');
    expect(result.current.customControlDisabledIconColor).toEqual('#33373f');
    expect(result.current.customControlBorderColor).toEqual('#1e1f26');
  });
});

describe('euiFormCustomControlBorderColor', () => {
  it('returns a tinted color based on the current color mode', () => {
    const { result } = renderHook(() =>
      euiFormCustomControlBorderColor(useEuiTheme())
    );
    expect(result.current).toEqual('#fbfcfe');
  });

  test('dark mode', () => {
    const { result } = renderHook(
      () => euiFormCustomControlBorderColor(useEuiTheme()),
      { wrapper: darkModeWrapper }
    );
    expect(result.current).toEqual('#070708');
  });
});
