/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { UseEuiTheme, transparentize } from '../../../../services';
import { euiTextTruncate, useEuiFontSize } from '../../../../global_styling';

export const euiMarkdownMentionsStyles = ({ euiTheme }: UseEuiTheme) => {
  return {
    euiMarkdownMentions: css`
      .euiSelectableListItem:hover .euiSelectableListItem__text,
      .euiSelectableListItem-isFocused .euiSelectableListItem__text {
        text-decoration: none !important; // sass-lint:disable-line no-important
      }
    `,
    euiMarkdownMentions__item: css`
      display: flex;
      gap: ${euiTheme.size.s};
      align-items: center;
    `,
    euiMarkdownMentions__itemLabel: css`
      ${useEuiFontSize('s')};
      font-weight: ${euiTheme.font.weight.semiBold};
    `,
    euiMarkdownMentions__itemFullName: css`
      ${euiTextTruncate()};
      ${useEuiFontSize('xs')};
      flex-grow: 1;
      vertical-align: middle;
    `,
    euiMarkdownMentions__renderer: css`
      font-weight: ${euiTheme.font.weight.semiBold};
      gap: ${euiTheme.size.xs};
      border-radius: ${euiTheme.border.radius.small};
    `,
    euiMarkdownMentions__rendererTooltip: css`
      display: flex;
      flex-direction: row;
      gap: 0 ${euiTheme.size.s};
    `,
    euiMarkdownMentions__rendererTooltipAvatar: css`
      display: flex;
      align-items: center;
    `,
    euiMarkdownMentions__rendererTooltipMainContent: css`
      display: flex;
      align-items: flex-start;
      justify-content: center;
      flex-direction: column;
      gap: ${euiTheme.size.xxs};
    `,
    euiMarkdownMentions__rendererTooltipUsername: css`
      font-weight: ${euiTheme.font.weight.semiBold};
      ${useEuiFontSize('s')};
    `,
    euiMarkdownMentions__rendererTooltipFullname: css`
      ${useEuiFontSize('xs')};
      color: ${transparentize(euiTheme.colors.ghost, 0.8)};
    `,
  };
};
