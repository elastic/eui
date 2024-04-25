/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { UseEuiTheme } from '../../services';
import { sharedSpacingPadding } from './droppable.styles';

export const euiDraggableStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  return {
    euiDraggable: css`
      &:focus {
        outline: none;

        & > .euiDraggable__item {
          outline: auto;
        }
      }

      /* !importants in this file override inline styles on JS-inserted HTML elements */
      /* stylelint-disable declaration-no-important */
    `,
    isDragging: css`
      z-index: ${euiTheme.levels.toast} !important;
    `,
    hasClone: css`
      transform: none !important;
    `,
    isRemovable: css`
      /* Removes the drop animation */
      transition-duration: 0.001s !important;
    `,
    spacing: sharedSpacingPadding(euiThemeContext),
  };
};

export const euiDraggableItemStyles = {
  euiDraggable__item: css``,
  disabled: css`
    cursor: not-allowed;
  `,
};
