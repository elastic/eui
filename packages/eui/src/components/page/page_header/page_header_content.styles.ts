/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { logicalCSS } from '../../../global_styling';
import { UseEuiTheme } from '../../../services';

export const euiPageHeaderContentStyles = ({ euiTheme }: UseEuiTheme) => ({
  euiPageHeaderContent: css`
    ${logicalCSS('width', '100%')}
    ${logicalCSS('margin-horizontal', 'auto')}
  `,

  // alignItems
  top: css`
    align-items: flex-start;
  `,
  bottom: css`
    align-items: flex-end;
  `,
  center: css`
    align-items: center;
  `,
  stretch: css`
    align-items: stretch;
  `,

  // Children only (legacy) expects EuiPageHeaderSections as children
  childrenOnly: {
    flex: css`
      flex-direction: row;
      display: flex;
      gap: ${euiTheme.size.base};
      justify-content: space-between;
    `,
    // Responsive (what to do at the smaller breakpoint)
    responsive: css`
      flex-direction: column;
      align-items: flex-start;
    `,
    responsiveReverse: css`
      flex-direction: column-reverse;
      align-items: flex-start;
    `,
  },

  euiPageHeaderContent__top: css`
    container-type: inline-size;
  `,
  euiPageHeaderContent__leftSideItems: css`
    @container (max-width: ${euiTheme.breakpoint.m}px) {
      ${logicalCSS('min-width', '50%')}
    }
  `,
  euiPageHeaderContent__rightSideItems: css`
    flex: 0 1 auto;
    align-content: flex-start;
    ${logicalCSS('max-width', '100%')}

    @container (min-width: ${euiTheme.breakpoint.m}px) {
      ${logicalCSS('max-width', '50%')}
      justify-content: flex-end;
    }
  `,
  euiPageHeaderContent__rightSideItem: css`
    ${logicalCSS('max-width', '100%')}
  `,

  euiPageHeaderContent__titleIcon: css`
    position: relative;
    ${logicalCSS('top', `-${euiTheme.size.xs}`)}
    ${logicalCSS('margin-right', euiTheme.size.base)}
  `,
});
