/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { UseEuiTheme } from '../../services';

export const <%= cssClassName %>Styles = ({ euiTheme }: UseEuiTheme) => {
  return {
    <%= cssClassName %>: css` // Always start the object with the first key being the name of the component
      color: ${euiTheme.colors.textPrimary};
    `,
  };
};