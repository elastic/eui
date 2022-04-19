/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { UseEuiTheme } from '../../services';

export const euiAccordionStyles = (
  { euiTheme }: UseEuiTheme,
  {
    _arrowDisplay,
    isOpen,
    isLoading,
  }: {
    _arrowDisplay: string | undefined;
    isOpen: boolean;
    isLoading: boolean | undefined;
  }
) => ({
  // BEM named blocks
  euiAccordion__button: css`
    align-items: center;
    display: flex;
    flex-grow: 1;
    text-align: left;
    width: 100%;

    &:hover,
    &:focus {
      cursor: pointer;
      text-decoration: underline;
    }
  `,
  euiAccordion__children_isLoading: css`
    ${isLoading &&
    `
      align-items: center;
      display: flex;
    `}
  `,
  euiAccordion__childWrapper: css`
    height: 0;
    opacity: 0;
    overflow: hidden;
    transform: translatez(0);
    transition: height ${euiTheme.animation.normal}
        ${euiTheme.animation.resistance},
      opacity ${euiTheme.animation.normal} ${euiTheme.animation.resistance};
    visibility: hidden;

    &:focus {
      outline: none; // Hide focus ring because of tabindex=-1 on Safari
    }

    ${isOpen &&
    `
      height: auto;
      opacity: 1;
      visibility: visible;
    `}
  `,
  euiAccordion__iconButton: css`
    flex-shrink: 0;
    margin-right: ${euiTheme.size.xs};
    transform: rotate(0deg) !important;
    transform: rotate(0deg) !important;

    ${isOpen &&
    `
      transform: rotate(90deg) !important;
    `}

    ${_arrowDisplay === 'right' &&
    `
      margin-left: ${euiTheme.size.xs}
      margin-right: 0;
    `}
  `,
  euiAccordion__optionalAction: css`
    flex-shrink: 0;
  `,
  euiAccordion__spinner: css`
    ${isLoading &&
    `
      margin-right: ${euiTheme.size.xs};
    `}
  `,
  euiAccordion__triggerWrapper: css`
    align-items: center;
    display: flex;
  `,

  // Padding
  none: '',
  xs: css`
    padding: ${euiTheme.size.xs};
  `,
  s: css`
    padding: ${euiTheme.size.s};
  `,
  m: css`
    padding: ${euiTheme.size.m};
  `,
  l: css`
    padding: ${euiTheme.size.l};
  `,
  xl: css`
    padding: ${euiTheme.size.xl};
  `,
});
