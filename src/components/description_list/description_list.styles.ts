/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { UseEuiTheme } from '../../services';
import { euiTitle } from '../title/title.styles';
import { euiText } from '../text/text.styles';
import { euiFontSize } from '../../global_styling';

export const euiDescriptionListStyles = (euiThemeContext: UseEuiTheme) => {
  const euiTheme = euiThemeContext.euiTheme;

  return {
    euiDescriptionList: css`
      &.euiDescriptionList--row {
        &.euiDescriptionList--center {
          text-align: center;
        }

        // Reversed makes the description larger than the title
        &.euiDescriptionList--reverse {
          .euiDescriptionList__title {
            ${euiText(euiTheme)};
            ${euiFontSize(euiThemeContext, 's')};
          }

          .euiDescriptionList__description {
            ${euiTitle(euiThemeContext, 'xs')}
          }
        }

        // Compressed gets smaller fonts.
        &.euiDescriptionList--compressed {
          .euiDescriptionList__title {
            ${euiTitle(euiThemeContext, 'xxs')}
            line-height: ${euiTheme.size.l};
          }

          .euiDescriptionList__description {
            ${euiFontSize(euiThemeContext, 's')};
          }

          &.euiDescriptionList--reverse {
            .euiDescriptionList__title {
              ${euiText(euiTheme)};
              ${euiFontSize(euiThemeContext, 's')};
            }

            .euiDescriptionList__description {
              ${euiTitle(euiThemeContext, 'xxs')};
              line-height: ${euiTheme.size.l};
            }
          }
        }
      }

      &.euiDescriptionList--column,
      &.euiDescriptionList--responsiveColumn {
        // Align the title to smash against the description.
        &.euiDescriptionList--center {
          .euiDescriptionList__title {
            text-align: right;
          }
        }

        &.euiDescriptionList--reverse {
          .euiDescriptionList__title {
            ${euiText(euiTheme)};
            ${euiFontSize(euiThemeContext, 's')};
          }

          .euiDescriptionList__description {
            ${euiTitle(euiThemeContext, 'xs')};
            line-height: ${euiTheme.size.l};
          }
        }
        &.euiDescriptionList--compressed {
          .euiDescriptionList__title {
            ${euiTitle(euiThemeContext, 'xxs')};
            line-height: ${euiTheme.size.l};
          }

          .euiDescriptionList__description {
            ${euiFontSize(euiThemeContext, 's')};
          }

          &.euiDescriptionList--reverse {
            .euiDescriptionList__title {
              ${euiText(euiTheme)};
              ${euiFontSize(euiThemeContext, 's')};
            }

            .euiDescriptionList__description {
              ${euiTitle(euiThemeContext, 'xs')};
              line-height: ${euiTheme.size.l};
            }
          }
        }
        //->
      }
    `,
    'euiDescriptionList-row': css`
      &.euiDescriptionList__title {
        ${euiTitle(euiThemeContext, 'xs')}
        line-height: ${euiTheme.size.l};
        margin-top: ${euiTheme.size.base};

        // Make sure the first <dt> doesn't get a margin.
        &:first-of-type {
          margin-top: 0;
        }
      }
      &.euiDescriptionList__description {
        ${euiFontSize(euiThemeContext, 's')};
      }
    `,
    'euiDescriptionList-column': css`
      display: flex;
      align-items: stretch;
      flex-wrap: wrap;

      > * {
        margin-top: ${euiTheme.size.base};
      }

      // First two items don't have margin
      > *:first-child,
      > :nth-child(2) {
        margin-top: 0;
      }

      &.euiDescriptionList__title {
        ${euiTitle(euiThemeContext, 'xs')};
        line-height: ${euiTheme.size.l};
        width: 50%; // Flex-basis doesn't work in IE with padding
        padding-right: ${euiTheme.size.s};
      }

      &.euiDescriptionList__description {
        @include euiFontSize;
        width: 50%; // Flex-basis doesn't work in IE with padding
        padding-left: ${euiTheme.size.s};
      }
    `,
    'euiDescriptionList-responsiveColumn': css`
      display: flex;
      align-items: stretch;
      flex-wrap: wrap;

      > * {
        margin-top: ${euiTheme.size.base};
      }

      // First two items don't have margin
      > *:first-child,
      > :nth-child(2) {
        margin-top: 0;
      }

      &.euiDescriptionList__title {
        ${euiTitle(euiThemeContext, 'xs')};
        line-height: ${euiTheme.size.l};
        width: 50%; // Flex-basis doesn't work in IE with padding
        padding-right: ${euiTheme.size.s};
      }

      &.euiDescriptionList__description {
        @include euiFontSize;
        width: 50%; // Flex-basis doesn't work in IE with padding
        padding-left: ${euiTheme.size.s};
      }
    `,
    'euiDescriptionList-inline': css``,
  };
};
