/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { UseEuiTheme } from '../../services';

export const euiCodeBlockAnnotationButtonStyles = (
  euiThemeContext: UseEuiTheme
) => {
  const euiTheme = euiThemeContext.euiTheme;

  return {
    euiCodeBlock__annotationButton: css`
      // the smallest size of the button is 24px, so we need to override it to make it smaller
      &.euiCodeBlock__annotationButton {
        width: ${euiTheme.size.base};
        height: ${euiTheme.size.base};
        border-radius: 50%;
      }
    `,
  };
};
