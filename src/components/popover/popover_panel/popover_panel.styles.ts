/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import {
  euiShadow,
  euiShadowFlat,
  euiShadowMedium,
} from '../../../themes/amsterdam/global_styling/mixins';
import { UseEuiTheme } from '../../../services';

const translateDistance = 's';

/**
 * 1. Can expand further, but it looks weird if it's smaller than the originating button.
 * 2. Animation happens on the panel. But don't animate when using the attached mode like for inputs
 * 3. Make sure the panel stays within the window.
 */

export const euiPopoverPanelStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  return {
    // Base
    euiPopover__panel: css`
      position: absolute;
      min-width: ${euiTheme.base * 7}px; /* 1 */
      max-width: calc(100vw - ${euiTheme.size.xl}); /* 3 */
      backface-visibility: hidden;
      pointer-events: none;
      opacity: 0; /* 2 */
      transform: translateY(0) translateX(0) translateZ(0); /* 2 */
      ${euiShadowMedium(euiThemeContext, { property: 'filter' })}

      &:focus {
        outline-offset: 0;
      }
    `,

    // Is visible / open
    isOpen: css`
      opacity: 1;
      pointer-events: auto;
      transition: opacity ${euiTheme.animation.bounce}
          ${euiTheme.animation.slow},
        transform ${euiTheme.animation.bounce}
          calc(${euiTheme.animation.slow} + 100ms); /* 2 */
    `,

    // Positions
    top: css`
      transform: translateY(${euiTheme.size[translateDistance]}) translateZ(0);
    `,
    bottom: css`
      transform: translateY(-${euiTheme.size[translateDistance]}) translateZ(0);
    `,
    left: css`
      transform: translateX(${euiTheme.size[translateDistance]}) translateZ(0);
    `,
    right: css`
      transform: translateX(-${euiTheme.size[translateDistance]}) translateZ(0);
    `,

    // Attached version overrides
    attached: {
      isOpen: css`
        filter: none; // Necessary to remove the base shadow
        transition: opacity ${euiTheme.animation.bounce}
          ${euiTheme.animation.slow}; /* 2 */
      `,
      top: css`
        ${euiShadowFlat(euiThemeContext)}
      `,
      bottom: css`
        ${euiShadow(euiThemeContext, 'm')}
      `,
      // Satisfies TS
      left: '',
      right: '',
    },
  };
};
