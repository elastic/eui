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
      padding-block-start: ${euiTheme.size.xs};
    }
  `,
  custom: css``,
});

export const euiCommentEventUpdatePanelStyles = ({
  euiTheme,
}: UseEuiTheme) => ({
  euiCommentEvent__updatePanel: css`
    padding-block: ${euiTheme.size.xs};
  `,
});

export const euiCommentEventHeaderStyles = ({ euiTheme }: UseEuiTheme) => ({
  euiCommentEvent__header: css`
    display: flex;
    align-items: center;
    gap: ${euiTheme.size.s};
  `,
  euiCommentEvent__headerData: css`
    display: flex;
    flex: 1;
    align-items: center;
    flex-wrap: wrap;
    gap: ${euiTheme.size.xs};
  `,
  euiCommentEvent__headerUsername: css`
    font-weight: ${euiTheme.font.weight.semiBold};
  `,
  euiCommentEvent__headerActions: css`
    > * + * {
      margin-inline-start: ${euiTheme.size.xs};
    }
  `,
});
