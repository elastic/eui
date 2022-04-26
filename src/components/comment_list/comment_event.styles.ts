/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { UseEuiTheme } from '../../services';

export const euiCommentEventStyles = ({ euiTheme }: UseEuiTheme) => ({
  euiCommentEvent: css`
    overflow: hidden;
  `,
  // types
  regular: css`
    border-radius: ${euiTheme.border.radius.medium};
    border: ${euiTheme.border.thin};

    > [class*='euiCommentEvent__header'] {
      background: ${euiTheme.colors.lightestShade};
      border-bottom: ${euiTheme.border.thin};
    }

    > * {
      padding: ${euiTheme.size.s};
    }
  `,
  update: css`
    > [class*='euiCommentEvent__body'] {
      padding-top: ${euiTheme.size.xs};
    }
  `,
  custom: css``,
  euiCommentEvent__header: css`
    display: flex;
    align-items: center;
  `,
  euiCommentEvent__body: css``,
  euiCommentEvent__headerData: css`
    display: flex;
    flex: 1;
    align-items: center;
    flex-wrap: wrap;

    > * {
      padding-right: ${euiTheme.size.xs};
    }
  `,
  euiCommentEvent__headerUsername: css`
    font-weight: ${euiTheme.font.weight.semiBold};
    padding-right: ${euiTheme.size.xs};
  `,
  euiCommentEvent__headerIconUpdate: css`
    margin-right: ${euiTheme.size.xs};
  `,
  euiCommentEvent__updatePanel: css`
    padding: ${euiTheme.size.xs} 0;
  `,
});
