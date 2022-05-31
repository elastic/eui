/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { UseEuiTheme } from '../../services';
import { euiFontSize } from '../../global_styling/mixins';

export const euiAccordionButtonStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  return {
    euiAccordion__button: css`
      ${euiFontSize(euiThemeContext, 's')};
      align-items: center;
      display: flex;
      flex-grow: 1;
      line-height: ${euiTheme.size.l};
      text-align: left;
      width: 100%;

      &:hover,
      &:focus {
        cursor: pointer;
        text-decoration: underline;
      }
    `,
  };
};

export const euiAccordionChildrenStyles = ({ euiTheme }: UseEuiTheme) => ({
  euiAccordion__children: css``,
  isLoading: css`
    align-items: center;
    display: flex;
  `,
  xs: css`
    padding: ${euiTheme.size.xs};
  `,
  s: css`
    padding: ${euiTheme.size.s};
  `,
  m: css`
    padding: ${euiTheme.size.base};
  `,
  l: css`
    padding: ${euiTheme.size.l};
  `,
  xl: css`
    padding: ${euiTheme.size.xl};
  `,
});

export const euiAccordionChildWrapperStyles = ({ euiTheme }: UseEuiTheme) => ({
  euiAccordion__childWrapper: css`
    height: 0;
    opacity: 0;
    overflow: hidden;
    transition: height ${euiTheme.animation.normal}
        ${euiTheme.animation.resistance},
      opacity ${euiTheme.animation.normal} ${euiTheme.animation.resistance};
    visibility: hidden;
    will-change: opacity, visibility, height;

    &:focus {
      outline: none; // Hide focus ring because of tabindex=-1 on Safari
    }
  `,
  isOpen: css`
    height: auto;
    opacity: 1;
    visibility: visible;
  `,
});

export const euiAccordionIconButtonStyles = ({ euiTheme }: UseEuiTheme) => ({
  euiAccordion__iconButton: css`
    flex-shrink: 0;
    margin-inline-end: ${euiTheme.size.xs};
    transform: rotate(0deg) !important;
    transform: rotate(0deg) !important;
  `,
  isOpen: css`
    transform: rotate(90deg) !important;
  `,
  arrowRight: css`
    margin-left: ${euiTheme.size.xs};
    margin-right: 0;
  `,
});

export const euiAccordionOptionalActionStyles = () => ({
  euiAccordion__optionalAction: css`
    flex-shrink: 0;
  `,
});

export const euiAccordionSpinnerStyles = ({ euiTheme }: UseEuiTheme) => ({
  euiAccordion__spinner: css`
    margin-right: ${euiTheme.size.xs};
  `,
});

export const euiAccordionTriggerWrapperStyles = () => ({
  euiAccordion__triggerWrapper: css`
    align-items: center;
    display: flex;
  `,
});
