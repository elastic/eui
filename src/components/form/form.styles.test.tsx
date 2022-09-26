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
  euiFormControlSize,
  euiCustomControl,
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
        "customControlBorderColor": "#f5f7fc",
        "customControlDisabledIconColor": "#cacfd8",
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

describe('euiFormControlSize', () => {
  it('outputs the logical properties for height, width, and max-width', () => {
    const { result } = renderHook(() => euiFormControlSize(useEuiTheme()));
    expect(result.current.trim()).toMatchInlineSnapshot(`
      "max-inline-size: 400px;
          inline-size: 100%;
          block-size: 40px;"
    `);
  });

  it('allows passing in a custom height', () => {
    const { result } = renderHook(() =>
      euiFormControlSize(useEuiTheme(), { height: '100px' })
    );
    expect(result.current.trim()).toMatchInlineSnapshot(`
      "max-inline-size: 400px;
          inline-size: 100%;
          block-size: 100px;"
    `);
  });

  test('fullWidth', () => {
    const { result } = renderHook(() =>
      euiFormControlSize(useEuiTheme(), { fullWidth: true })
    );
    expect(result.current.trim()).toMatchInlineSnapshot(`
      "max-inline-size: 100%;
          inline-size: 100%;
          block-size: 40px;"
    `);
  });

  test('compressed', () => {
    const { result } = renderHook(() =>
      euiFormControlSize(useEuiTheme(), { compressed: true })
    );
    expect(result.current.trim()).toMatchInlineSnapshot(`
      "max-inline-size: 400px;
          inline-size: 100%;
          block-size: 32px;"
    `);
  });

  test('compressed & fullWidth', () => {
    const { result } = renderHook(() =>
      euiFormControlSize(useEuiTheme(), { compressed: true, fullWidth: true })
    );
    expect(result.current.trim()).toMatchInlineSnapshot(`
      "max-inline-size: 100%;
          inline-size: 100%;
          block-size: 32px;"
    `);
  });

  test('inGroup', () => {
    const { result } = renderHook(() =>
      euiFormControlSize(useEuiTheme(), { inGroup: true })
    );
    expect(result.current.trim()).toMatchInlineSnapshot(`
      "max-inline-size: 400px;
          inline-size: 100%;
          block-size: 100%;"
    `);
  });

  test('inGroup & fullWidth', () => {
    const { result } = renderHook(() =>
      euiFormControlSize(useEuiTheme(), { inGroup: true, fullWidth: true })
    );
    expect(result.current.trim()).toMatchInlineSnapshot(`
      "max-inline-size: 100%;
          inline-size: 100%;
          block-size: 100%;"
    `);
  });

  test('compressed overrides custom height', () => {
    const { result } = renderHook(() =>
      euiFormControlSize(useEuiTheme(), { height: '500px', compressed: true })
    );
    expect(result.current.trim()).toMatchInlineSnapshot(`
      "max-inline-size: 400px;
          inline-size: 100%;
          block-size: 32px;"
    `);
  });

  test('inGroup overrides compressed and custom height', () => {
    const { result } = renderHook(() =>
      euiFormControlSize(useEuiTheme(), {
        height: '500px',
        compressed: true,
        inGroup: true,
      })
    );
    expect(result.current.trim()).toMatchInlineSnapshot(`
      "max-inline-size: 400px;
          inline-size: 100%;
          block-size: 100%;"
    `);
  });
});

describe('euiCustomControl', () => {
  it('returns CSS styles for padding, borders, backgrounds', () => {
    const { result } = renderHook(() => euiCustomControl(useEuiTheme()));
    expect(result.current).toMatchInlineSnapshot(`
      "
          padding: 7px;
          
          border: 1px solid #f5f7fc;
          background: #FFF no-repeat center;

          @media screen and (prefers-reduced-motion: no-preference) {
            transition: background-color 150ms ease-in,
                    border-color 150ms ease-in;
          }
        "
    `);
  });

  it('allows passing custom padding size', () => {
    const { result } = renderHook(() =>
      euiCustomControl(useEuiTheme(), { size: '32px' })
    );
    expect(result.current).toMatchInlineSnapshot(`
      "
          padding: 15px;
          
          border: 1px solid #f5f7fc;
          background: #FFF no-repeat center;

          @media screen and (prefers-reduced-motion: no-preference) {
            transition: background-color 150ms ease-in,
                    border-color 150ms ease-in;
          }
        "
    `);
  });

  test('type.round', () => {
    const { result } = renderHook(() =>
      euiCustomControl(useEuiTheme(), { type: 'round' })
    );
    expect(result.current).toMatchInlineSnapshot(`
      "
          padding: 7px;
          border-radius: 16px;
          border: 1px solid #f5f7fc;
          background: #FFF no-repeat center;

          @media screen and (prefers-reduced-motion: no-preference) {
            transition: background-color 150ms ease-in,
                    border-color 150ms ease-in;
          }
        "
    `);
  });

  test('size and type.round changes both padding and border-radius', () => {
    const { result } = renderHook(() =>
      euiCustomControl(useEuiTheme(), { size: '6px', type: 'round' })
    );
    expect(result.current).toMatchInlineSnapshot(`
      "
          padding: 2px;
          border-radius: 6px;
          border: 1px solid #f5f7fc;
          background: #FFF no-repeat center;

          @media screen and (prefers-reduced-motion: no-preference) {
            transition: background-color 150ms ease-in,
                    border-color 150ms ease-in;
          }
        "
    `);
  });

  test('type.square', () => {
    const { result } = renderHook(() =>
      euiCustomControl(useEuiTheme(), { type: 'square' })
    );
    expect(result.current).toMatchInlineSnapshot(`
      "
          padding: 7px;
          border-radius: 4px;
          border: 1px solid #f5f7fc;
          background: #FFF no-repeat center;

          @media screen and (prefers-reduced-motion: no-preference) {
            transition: background-color 150ms ease-in,
                    border-color 150ms ease-in;
          }
        "
    `);
  });
});
