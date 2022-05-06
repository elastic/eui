/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { UseEuiTheme } from '../../services';
import { euiFocusRing } from './_states';

export const euiLinkHoverCSS = () => {
  return `
    text-decoration: underline;
  `;
};

export const euiLinkFocusCSS = ({ euiTheme }: UseEuiTheme) => {
  return `
    text-decoration: underline;
    text-decoration-thickness: ${euiTheme.border.width.thick} !important;
  `;
};

export const euiLinkCSS = (_theme: UseEuiTheme) => {
  const { euiTheme } = _theme;

  return `
    font-weight: ${euiTheme.font.weight.medium};
    text-align: left;

    &:hover {
      ${euiLinkHoverCSS()}
    }

    &:focus {
      ${euiFocusRing(euiTheme, 'outset')}
      ${euiLinkFocusCSS(_theme)}
    }
  `;
};
