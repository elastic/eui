/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { logicalCSS } from '../../global_styling';
import { ALIGNMENTS } from './page_section/page_section.styles';
import { PAGE_MAX_WIDTH, _EuiPageRestrictWidth } from './_restrict_width';

export const euiPageRestrictWidthStyles = (
  restrictWidth: _EuiPageRestrictWidth,
  alignment?: typeof ALIGNMENTS[number]
) => {
  const width = alignment?.toLowerCase().includes('center') ? 'auto' : '100%';

  if (restrictWidth === true) {
    return css`
      ${logicalCSS('margin-horizontal', 'auto')};
      ${logicalCSS('width', width)};
      ${logicalCSS('max-width', PAGE_MAX_WIDTH)};
    `;
  } else if (restrictWidth !== undefined) {
    return css`
      ${logicalCSS('margin-horizontal', 'auto')};
      ${logicalCSS('width', width)};
      ${logicalCSS('max-width', restrictWidth)};
    `;
  }
};
