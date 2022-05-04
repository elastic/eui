/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

const euiScreenReaderOnlyStatic = `
    position: absolute;
    left: -10000px;
    top: auto;
    width: 1px;
    height: 1px;
    overflow: hidden;
  `;

/*
 * Mixin
 */
export const euiScreenReaderOnly = () => euiScreenReaderOnlyStatic;

/*
 * Styles
 */
export const euiScreenReaderOnlyStyles = (showOnFocus?: boolean) => {
  if (showOnFocus) {
    return css`
      // The :active selector is necessary for Safari which removes :focus when a button is pressed
      &:not(:focus):not(:active) {
        ${euiScreenReaderOnlyStatic}
      }
    `;
  }
  return css(euiScreenReaderOnlyStatic);
};
