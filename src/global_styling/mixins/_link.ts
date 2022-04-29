/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { UseEuiTheme } from '../../services';

export const euiLinkHoverMixin = () => {
  return css`
    text-decoration: underline;
  `;
};

export const euiLinkFocusMixin = ({ euiTheme }: UseEuiTheme) => {
  return css`
    text-decoration: underline;
    text-decoration-thickness: ${euiTheme.border.width.thick} !important;
  `;
};

export const euiLinkMixin = (_theme: UseEuiTheme) => {
  const { euiTheme } = _theme;

  return css`
    font-weight: ${euiTheme.font.weight.medium};
    text-align: left;

    &:hover {
      ${euiLinkHoverMixin()}
    }

    &:focus {
      // TODO: Once converted, add the Emotion equivalent to the euiFocusRing mixin below and delete src/components/link/_link.scss
      // @include euiFocusRing(null, 'outer');
      ${euiLinkFocusMixin(_theme)}
    }
  `;
};
