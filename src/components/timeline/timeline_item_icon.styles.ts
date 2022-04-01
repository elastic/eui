/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { UseEuiTheme } from '../../services';

export const euiTimelineItemIconStyles = ({ euiTheme }: UseEuiTheme) => ({
  euiTimelineItemIcon: css`
    display: flex;
    position: relative;
    flex-grow: 0;
    margin-right: ${euiTheme.size.base};

    // timeline vertical line
    &::before {
      content: '';
      position: absolute;
      left: calc(${euiTheme.size.xxl} / 2);
      top: ${euiTheme.size.base};
      width: calc(${euiTheme.size.xs} / 2);
      background-color: ${euiTheme.colors.lightShade};
      height: calc(100% + ${euiTheme.size.base});
    }
  `,
  euiTimelineItemIconContent: css`
    min-width: ${euiTheme.size.xxl};
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  `,
});
