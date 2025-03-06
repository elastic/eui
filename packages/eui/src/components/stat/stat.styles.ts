/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css, keyframes } from '@emotion/react';
import { logicalTextAlignCSS, euiCanAnimate } from '../../global_styling';
import { UseEuiTheme } from '../../services';

export const euiStatStyles = () => ({
  euiStat: css``,
  // Text align
  left: css`
    ${logicalTextAlignCSS('left')}
    align-items: flex-start;
  `,
  center: css`
    ${logicalTextAlignCSS('center')}
    align-items: center;
  `,
  right: css`
    ${logicalTextAlignCSS('right')}
    align-items: flex-end;
  `,
});

export const euiStatTitleStyles = ({ euiTheme }: UseEuiTheme) => {
  return {
    euiStat__title: css``,
    // Colors
    default: css`
      color: ${euiTheme.colors.fullShade};
    `,
    subdued: css`
      color: ${euiTheme.colors.textSubdued};
    `,
    primary: css`
      color: ${euiTheme.colors.textPrimary};
    `,
    success: css`
      color: ${euiTheme.colors.textSuccess};
    `,
    warning: css`
      color: ${euiTheme.colors.warningText};
    `,
    danger: css`
      color: ${euiTheme.colors.textDanger};
    `,
    accent: css`
      color: ${euiTheme.colors.textAccent};
    `,
    // Loading
    isLoading: css`
      ${euiCanAnimate} {
        animation: ${euiStatPulse} 1.5s infinite ease-in-out;
      }
    `,
  };
};

const euiStatPulse = keyframes`
  0% { opacity: 1; }
  50% { opacity: .25; }
  100% { opacity: 1; }
`;
