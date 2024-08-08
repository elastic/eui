/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { logicalCSS } from '../../global_styling';

export const euiComboBoxStyles = {
  euiComboBox: css`
    position: relative;
    ${logicalCSS('width', '100%')}
    ${logicalCSS('height', 'auto')}
  `,
  fullWidth: css`
    ${logicalCSS('max-width', '100%')}
  `,
};
