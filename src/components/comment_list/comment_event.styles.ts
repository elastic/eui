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

export const euiCommentEventStyles = ({ euiTheme }: UseEuiTheme) => ({
  euiCommentEvent: css`
    overflow: hidden;
  `,
  // types
  regular: css`
    border: ${euiTheme.border.thin};
    border-radius: ${euiTheme.border.radius.medium};
  `,
  update: css``,
  custom: css``,
});

export const euiCommentEventHeaderStyles = ({ euiTheme }: UseEuiTheme) => ({
  euiCommentEvent__header: css``,
  // types
  regular: css`
    background: ${euiTheme.colors.lightestShade};
    ${logicalCSS('border-bottom', euiTheme.border.thin)}
    padding: ${euiTheme.size.s};
  `,
  // variants
  hasEventColor: css`
    padding: 0;
  `,
  // Children
  euiCommentEvent__headerMain: css`
    display: flex;
    flex: 1;
    gap: ${euiTheme.size.s};
  `,
  euiCommentEvent__headerData: css`
    display: flex;
    flex: 1;
    align-items: center;
    flex-wrap: wrap;
    gap: ${euiTheme.size.xs};
  `,
  euiCommentEvent__headerEventIcon: css`
    ${logicalCSS('margin-right', euiTheme.size.xs)}
  `,
  euiCommentEvent__headerUsername: css`
    font-weight: ${euiTheme.font.weight.semiBold};
  `,
  euiCommentEvent__headerEvent: css`
    align-items: center;
    display: inline-flex;
    /* the header event can have inline badges so we're adding some white-space and flex-wrap properties  */
    white-space: pre-wrap;
    flex-wrap: wrap;
  `,
  euiCommentEvent__headerActions: css`
    display: flex;
    flex-wrap: wrap;
    gap: ${euiTheme.size.xs};
  `,
});

export const euiCommentEventBodyStyles = ({ euiTheme }: UseEuiTheme) => ({
  euiCommentEvent__body: css``,
  // types
  regular: css`
    padding: ${euiTheme.size.s};
  `,
  update: css`
    ${logicalCSS('padding-top', euiTheme.size.xs)}
  `,
  custom: css``,
});
