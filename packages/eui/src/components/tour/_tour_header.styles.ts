/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { UseEuiTheme } from '../../services';
import { logicalCSS } from '../../global_styling';

export const euiTourHeaderStyles = ({ euiTheme }: UseEuiTheme) => ({
  // Base
  euiTourHeader: css`
    ${logicalCSS('border-bottom', 'none')}
    /* Overriding default EuiPopoverTitle styles */
    ${logicalCSS('margin-bottom', euiTheme.size.s)}
  `,
  // Elements
  euiTourHeader__title: css`
    /* Removes extra margin applied to sibling EuiTitle's */
    ${logicalCSS('margin-top', 0)}
  `,
  euiTourHeader__subtitle: css`
    color: ${euiTheme.colors.textSubdued};
    padding-block-end: ${euiTheme.size.xs};
  `,
});
