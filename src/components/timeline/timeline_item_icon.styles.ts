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
      top: 0;
      left: calc(${euiTheme.size.xxl} / 2);
      width: calc(${euiTheme.size.xs} / 2);
      // Adding to the height the padding bottom from the parent container
      height: calc(100% + ${euiTheme.size.xl});
      background-color: ${euiTheme.colors.lightShade};
    }
  `,
  euiTimelineItemIcon__content: css`
    min-width: ${euiTheme.size.xxl};
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  `,
  //  Vertical alignments
  top: css`
    align-items: flex-start;
  `,
  center: css`
    align-items: center;
  `,
});
