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
  euiFormCustomControlStyles,
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
        "appendPrependBackground": "#ECF1F9",
        "backgroundColor": "#FFFFFF",
        "backgroundDisabledColor": "#ECF1F9",
        "backgroundReadOnlyColor": "#FFFFFF",
        "borderColor": "#CAD3E2",
        "controlBorderRadius": "6px",
        "controlBoxShadow": "0 0 transparent",
        "controlCompressedBorderRadius": "4px",
        "controlCompressedHeight": "32px",
        "controlCompressedPadding": "8px",
        "controlDisabledColor": "#CAD3E2",
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
        "controlPlaceholderText": "#516381",
        "iconAffordance": "24px",
        "iconCompressedAffordance": "18px",
        "maxWidth": "400px",
        "textColor": "#1D2A3E",
        "textColorDisabled": "#798EAF",
      }
    `);
  });

  test('dark mode', () => {
    const { result } = renderHook(() => euiFormVariables(useEuiTheme()), {
      wrapper: darkModeWrapper,
    });
    // Check custom dark-mode logic
    expect(result.current.backgroundColor).toEqual('#0B1628');
    expect(result.current.controlPlaceholderText).toEqual('#8e9fbc');
  });
});

describe('euiFormControlStyles', () => {
  it('outputs an object of control states and modifiers', () => {
    const { result } = renderHook(() => euiFormControlStyles(useEuiTheme()));
    expect(result.current).toMatchInlineSnapshot(`
      {
        "autoFill": "
          &:-webkit-autofill {
            -webkit-text-fill-color: #2B394F;
            -webkit-box-shadow: inset 0 0 0 1px #BFDBFF, inset 0 0 0 100vw #E8F1FF;

            &:invalid {
              -webkit-box-shadow: inset 0 0 0 1px #C61E25, inset 0 0 0 100vw #E8F1FF;
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
          color: #798EAF;
          /* Required for Safari */
          -webkit-text-fill-color: #798EAF;
          background-color: #ECF1F9;
          cursor: not-allowed;
          --euiFormControlStateColor: transparent;

          
        &::-webkit-input-placeholder { 
            color: #798EAF;
            opacity: 1;
           }
        &::-moz-placeholder { 
            color: #798EAF;
            opacity: 1;
           }
        &:-ms-input-placeholder { 
            color: #798EAF;
            opacity: 1;
           }
        &:-moz-placeholder { 
            color: #798EAF;
            opacity: 1;
           }
        &::placeholder { 
            color: #798EAF;
            opacity: 1;
           }

        ",
        "focus": "
        --euiFormControlStateColor: #0B64DD;
        background-color: #FFFFFF;
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
        --euiFormControlStateColor: #C61E25;
        background-size: 100% 100%;
      ",
        "readOnly": "
          cursor: default;
          color: #1D2A3E;
          -webkit-text-fill-color: #1D2A3E; /* Required for Safari */

          background-color: #FFFFFF;
          --euiFormControlStateColor: transparent;
        ",
        "shared": "
            
          font-family: 'Inter', BlinkMacSystemFont, Helvetica, Arial, sans-serif;
          font-size: 1.0000rem;
          color: #1D2A3E;

          
        &::-webkit-input-placeholder { 
            color: #516381;
            opacity: 1;
           }
        &::-moz-placeholder { 
            color: #516381;
            opacity: 1;
           }
        &:-ms-input-placeholder { 
            color: #516381;
            opacity: 1;
           }
        &:-moz-placeholder { 
            color: #516381;
            opacity: 1;
           }
        &::placeholder { 
            color: #516381;
            opacity: 1;
           }

        
            
          border: none;
          box-shadow: inset 0 0 0 1px #CAD3E2;
          background-color: #FFFFFF;
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

describe('euiFormCustomControlStyles', () => {
  it('outputs an object of styles and child element styles', () => {
    const { result } = renderHook(() =>
      euiFormCustomControlStyles(useEuiTheme())
    );
    expect(result.current).toMatchInlineSnapshot(`
      {
        "input": {
          "disabled": {
            "selected": "
                label: disabled;
                color: #798EAF;
                background-color: #CAD3E2;
              ",
            "unselected": "
                label: disabled;
                color: #CAD3E2;
                background-color: #CAD3E2;
                cursor: not-allowed;
              ",
          },
          "enabled": {
            "selected": "
                color: #FFFFFF;
                background-color: #0B64DD;
              ",
            "unselected": "
                color: transparent;
                background-color: transparent;
                border: 1px solid #8E9FBC;

                &:has(input:focus) {
                  border-color: #0B64DD;
                }
              ",
          },
          "fauxInput": "
              position: relative;
              block-size: 16px;
              inline-size: 16px;
              display: flex;
              justify-content: center;
              align-items: center;

              &:has(input:focus-visible) {
                outline: 2px solid #0B64DD;
                outline-offset: 2px;
              }

              @media screen and (prefers-reduced-motion: no-preference) {
                transition-property: background-color, color;
                transition-duration: 150ms;
                transition-timing-function: ease-in;
              }
            ",
          "hasLabel": "
              margin-block-start: 4px;
            ",
          "hiddenInput": "
              position: absolute;
              inset: 0;
              opacity: 0 !important;
              cursor: pointer;

              &:disabled {
                cursor: not-allowed;
              }
            ",
          "icon": "
              transform: scale(0.75);
            ",
        },
        "label": {
          "disabled": "
              cursor: not-allowed;
              color: #6A7FA0;
            ",
          "enabled": "
              cursor: pointer;
            ",
          "label": "
              /* Needs to use padding and not flex gap for extra mouse click area */
              padding-inline-start: 8px;
              line-height: 24px;
              font-size: 1.0000rem;
            ",
        },
        "wrapper": "
            display: flex;
            align-items: flex-start;
          ",
      }
    `);
  });
});
