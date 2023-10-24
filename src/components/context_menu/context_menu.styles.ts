/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { UseEuiTheme } from '../../services';
import { logicalCSS, mathWithUnits, euiCanAnimate } from '../../global_styling';

export const euiContextMenuVariables = ({ euiTheme }: UseEuiTheme) => {
  return {
    panelWidth: mathWithUnits(euiTheme.size.base, (x) => x * 16),
  };
};

export const euiContextMenuStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  const { panelWidth } = euiContextMenuVariables(euiThemeContext);

  return {
    euiContextMenu: css`
      ${logicalCSS('width', panelWidth)}
      ${logicalCSS('max-width', '100%')}
      position: relative;
      overflow: hidden;
      border-radius: ${euiTheme.border.radius.medium};

      ${euiCanAnimate} {
        transition: height ${euiTheme.animation.fast}
          ${euiTheme.animation.resistance};
      }
    `,
  };
};
