/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { UseEuiTheme } from '../../services';
import {
  euiFontSize,
  logicals,
  logicalCSS,
  logicalTextAlignCSS,
} from '../../global_styling';

export const euiAccordionButtonStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  return {
    euiAccordion__button: css`
      ${euiFontSize(euiThemeContext, 's')};
      align-items: center;
      display: flex;
      flex-grow: 1;
      line-height: ${euiTheme.size.l};
      ${logicalTextAlignCSS('left')}
      ${logicalCSS('width', '100%')}

      &:hover,
      &:focus {
        cursor: pointer;
        text-decoration: underline;
      }
    `,

    // Triggering button needs separate `disabled` key because the element that renders may not support `:disabled`;
    // Hover pseudo selector for specificity
    disabled: css`
      &,
      &:hover {
        cursor: not-allowed;
        color: ${euiTheme.colors.disabledText};
        text-decoration: none;
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
    ${logicalCSS('height', 0)}
    opacity: 0;
    overflow: hidden;
    transition: ${logicals.height} ${euiTheme.animation.normal}
        ${euiTheme.animation.resistance},
      opacity ${euiTheme.animation.normal} ${euiTheme.animation.resistance};
    visibility: hidden;

    &:focus {
      outline: none; // Hide focus ring because of tabindex=-1 on Safari
    }
  `,
  isOpen: css`
    ${logicalCSS('height', 'auto')}
    opacity: 1;
    visibility: visible;
  `,
});

export const euiAccordionIconButtonStyles = ({ euiTheme }: UseEuiTheme) => ({
  euiAccordion__iconButton: css`
    flex-shrink: 0;
    ${logicalCSS('margin-right', euiTheme.size.xs)}
    transform: rotate(0deg) !important;
  `,
  isOpen: css`
    transform: rotate(90deg) !important;
  `,
  arrowRight: css`
    ${logicalCSS('margin-left', euiTheme.size.xs)}
    ${logicalCSS('margin-right', 0)}
  `,
});

export const euiAccordionOptionalActionStyles = () => ({
  euiAccordion__optionalAction: css`
    flex-shrink: 0;
  `,
});

export const euiAccordionSpinnerStyles = ({ euiTheme }: UseEuiTheme) => ({
  euiAccordion__spinner: css`
    ${logicalCSS('margin-right', euiTheme.size.xs)}
  `,
});

export const euiAccordionTriggerWrapperStyles = () => ({
  euiAccordion__triggerWrapper: css`
    align-items: center;
    display: flex;
  `,
});
