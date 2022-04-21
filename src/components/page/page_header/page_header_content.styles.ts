/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { getEuiBreakpoint } from '../../../global_styling/variables/_breakpoint';
import { UseEuiTheme } from '../../../services';

export const euiPageHeaderContentStyles = ({ euiTheme }: UseEuiTheme) => ({
  euiPageHeaderContent: css`
    width: 100%;
  `,
  flex: css`
    display: flex;
    align-items: center;
    flex-direction: column;
    align-items: center;

    ${getEuiBreakpoint[2]} {
      flex-direction: row;
      justify-content: space-between;
    }
  `,

  // Content
  euiPageHeaderContent__titleIcon: css`
    top: -${euiTheme.size.xs};
    position: relative;
    margin-right: ${euiTheme.size.base};
  `,
});
