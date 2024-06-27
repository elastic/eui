/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, PropsWithChildren } from 'react';
import { renderHook } from '../../test/rtl';
import { useEuiTheme } from '../../services';
import { EuiProvider } from '../provider';

import {
  euiFormVariables,
  euiFormControlStyles,
  euiCustomControl,
} from './form.styles';

const darkModeWrapper: FunctionComponent<PropsWithChildren> = ({
  children,
}) => <EuiProvider colorMode="DARK">{children}</EuiProvider>;

describe('euiFormVariables', () => {
  it('outputs an object of reusable form vars', () => {
    const { result } = renderHook(() => euiFormVariables(useEuiTheme()));
    expect(result.current).toMatchInlineSnapshot(`
      {
        "animationTiming": "150ms ease-in",
        "backgroundColor": "#f9fbfd",
        "backgroundDisabledColor": "#eef1f7",
        "backgroundReadOnlyColor": "#FFF",
        "borderColor": "rgba(32,38,47,0.1)",
        "controlBorderRadius": "6px",
        "controlBoxShadow": "0 0 transparent",
        "controlCompressedBorderRadius": "4px",
        "controlCompressedHeight": "32px",
        "controlCompressedPadding": "8px",
        "controlDisabledColor": "#98A2B3",
        "controlHeight": "40px",
        "controlIconSize": {
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
        "iconAffordance": "24px",
        "iconCompressedAffordance": "18px",
        "inputGroupBorder": "none",
        "inputGroupLabelBackground": "#e9edf3",
        "maxWidth": "400px",
        "textColor": "#343741",
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
    expect(result.current.customControlBorderColor).toEqual('#16171c');
  });
});

describe('euiFormControlStyles', () => {
  it('outputs an object of control states and modifiers', () => {
    const { result } = renderHook(() => euiFormControlStyles(useEuiTheme()));
    expect(result.current).toMatchInlineSnapshot(`
      {
        "autoFill": "
          &:-webkit-autofill {
            -webkit-text-fill-color: #343741;
            -webkit-box-shadow: inset 0 0 0 1px rgba(0,107,184,0.2), inset 0 0 0 100vw #f0f7fc;

            &:invalid {
              -webkit-box-shadow: inset 0 0 0 1px #BD271E, inset 0 0 0 100vw #f0f7fc;
            }
          }
        ",
        "compressed": "
            block-size: 32px;
            padding-block: 8px;
            padding-inline-start: calc(8px + (18px * var(--euiFormControlLeftIconsCount, 0)));
            padding-inline-end: calc(8px + (18px * var(--euiFormControlRightIconsCount, 0)));
            border-radius: 4px;
          ",
        "disabled": "
          color: #98A2B3;
          /* Required for Safari */
          -webkit-text-fill-color: #98A2B3;
          background-color: #eef1f7;
          cursor: not-allowed;

          
        &::-webkit-input-placeholder { 
            color: #98A2B3;
            opacity: 1;
           }
        &::-moz-placeholder { 
            color: #98A2B3;
            opacity: 1;
           }
        &:-ms-input-placeholder { 
            color: #98A2B3;
            opacity: 1;
           }
        &:-moz-placeholder { 
            color: #98A2B3;
            opacity: 1;
           }
        &::placeholder { 
            color: #98A2B3;
            opacity: 1;
           }

        ",
        "focus": "
        --euiFormControlStateColor: #07C;
        background-color: #FFF;
        background-size: 100% 100%;
        outline: none; /* Remove all outlines and rely on our own bottom border gradient */
      ",
        "formWidth": "
            max-inline-size: 400px;
            inline-size: 100%;
          ",
        "fullWidth": "
            max-inline-size: 100%;
            inline-size: 100%;
          ",
        "inGroup": "
            block-size: 100%;
            box-shadow: none;
            border-radius: 0;
          ",
        "invalid": "
        --euiFormControlStateColor: #BD271E;
        background-size: 100% 100%;
      ",
        "readOnly": "
          cursor: default;
          color: #343741;
          -webkit-text-fill-color: #343741; /* Required for Safari */

          background-color: #FFF;
          --euiFormControlStateColor: transparent;
        ",
        "shared": "
            
          font-family: 'Inter', BlinkMacSystemFont, Helvetica, Arial, sans-serif;
          font-size: 1.0000rem;
          color: #343741;

          
        &::-webkit-input-placeholder { 
            color: #646a77;
            opacity: 1;
           }
        &::-moz-placeholder { 
            color: #646a77;
            opacity: 1;
           }
        &:-ms-input-placeholder { 
            color: #646a77;
            opacity: 1;
           }
        &:-moz-placeholder { 
            color: #646a77;
            opacity: 1;
           }
        &::placeholder { 
            color: #646a77;
            opacity: 1;
           }

        
            
          /* We use inset box-shadow instead of border to skip extra hight calculations */
          border: none;
          box-shadow: inset 0 0 0 1px rgba(32,38,47,0.1);
          background-color: #f9fbfd;

          background-repeat: no-repeat;
          background-size: 0% 100%;
          background-image: linear-gradient(to top,
            var(--euiFormControlStateColor),
            var(--euiFormControlStateColor) 2px,
            transparent 2px,
            transparent 100%
          );

          @media screen and (prefers-reduced-motion: no-preference) {
            transition:
              box-shadow 150ms ease-in,
              background-image 150ms ease-in,
              background-size 150ms ease-in,
              background-color 150ms ease-in;
          }
        
          ",
        "uncompressed": "
            block-size: 40px;
            padding-block: 12px;
            padding-inline-start: calc(12px + (24px * var(--euiFormControlLeftIconsCount, 0)));
            padding-inline-end: calc(12px + (24px * var(--euiFormControlRightIconsCount, 0)));
            border-radius: 6px;
          ",
      }
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
