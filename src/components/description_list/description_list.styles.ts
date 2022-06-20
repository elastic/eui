/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { UseEuiTheme, tint } from '../../services';
import { euiTitle } from '../title/title.styles';
import { euiText } from '../text/text.styles';
import { euiFontSize, euiBreakpoint } from '../../global_styling';

export const euiDescriptionListStyles = (euiThemeContext: UseEuiTheme) => {
  const euiTheme = euiThemeContext.euiTheme;
  const colorMode = euiThemeContext.colorMode;
  const { lineHeight } = euiFontSize(euiThemeContext, 's');

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
            line-height: ${lineHeight};
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
              line-height: ${lineHeight};
            }
          }
        }
      }

      &.euiDescriptionList--column,
      &.euiDescriptionList--responsiveColumn {
        display: flex;
        align-items: stretch;
        flex-wrap: wrap;
      
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
            line-height: ${lineHeight};
          }
        }

        &.euiDescriptionList--compressed {
          .euiDescriptionList__title {
            text-align: right;
          }
          .euiDescriptionList__title {
            ${euiTitle(euiThemeContext, 'xxs')};
            line-height: ${lineHeight};
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
              line-height: ${lineHeight};
            }
          }
        }

        &.euiDescriptionList--responsiveColumn {
          ${euiBreakpoint(['xs', 's'])} {
            &.euiDescriptionList--center {
              .euiDescriptionList__title,
              .euiDescriptionList__description {
                text-align: center;
              }
            }

            &.euiDescriptionList--reverse {
              .euiDescriptionList__title {
                ${euiFontSize(euiThemeContext, 's')};
              }

              .euiDescriptionList__description {
                ${euiTitle(euiThemeContext, 'xs')};
              }
            }
          }

      }
    `,
    'euiDescriptionList-row': css`
      .euiDescriptionList__title {
        ${euiTitle(euiThemeContext, 'xs')}
        line-height: ${lineHeight};
        margin-top: ${euiTheme.size.base};

        // Make sure the first <dt> doesn't get a margin.
        &:first-of-type {
          margin-top: 0;
        }
      }
      .euiDescriptionList__description {
        ${euiFontSize(euiThemeContext, 's')};
      }
    `,
    'euiDescriptionList-column': css`
      > * {
        margin-top: ${euiTheme.size.base};
      }

      // First two items don't have margin
      > *:first-child,
      > :nth-child(2) {
        margin-top: 0;
      }

      .euiDescriptionList__title {
        ${euiTitle(euiThemeContext, 'xs')};
        line-height: ${lineHeight};
        width: 50%; // Flex-basis doesn't work in IE with padding
        padding-right: ${euiTheme.size.s};
      }

      .euiDescriptionList__description {
        ${euiFontSize(euiThemeContext, 's')};
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
        line-height: ${lineHeight};
        width: 50%; // Flex-basis doesn't work in IE with padding
        padding-right: ${euiTheme.size.s};
      }

      &.euiDescriptionList__description {
        ${euiFontSize(euiThemeContext, 's')};
        width: 50%; // Flex-basis doesn't work in IE with padding
        padding-left: ${euiTheme.size.s};
      }

      ${euiBreakpoint(['xs', 's'])} {
        display: block;

        &.euiDescriptionList__title,
        &.euiDescriptionList__description {
          width: 100%;
          padding: 0;
        }

        &.euiDescriptionList__description {
          ${euiFontSize(euiThemeContext, 's')};
          margin-top: 0;
        }
      }
    `,

    'euiDescriptionList-inline': css`
      &.euiDescriptionList__title {
        ${euiFontSize(euiThemeContext, 's')};
        display: inline;
        border-radius: ${euiTheme.border.radius.small};
        font-weight: ${euiTheme.font.weight.medium};
        background-color: ${
          colorMode === 'DARK'
            ? tint(euiTheme.colors.lightestShade, 0.5)
            : euiTheme.colors.lightestShade
        };
        padding: 1px ${euiTheme.size.xs};
        margin: 0 ${euiTheme.size.xs};

        // Make sure the first <dt> doesn't get a margin.
        &:first-of-type {
          margin-left: 0;
        }
        ${euiTheme.colors.lightestShade}
      }

      &.euiDescriptionList__description {
        ${euiFontSize(euiThemeContext, 's')};
        display: inline;
      }
      
      &.euiDescriptionList--compressed {
        .euiDescriptionList__title {
          ${euiFontSize(euiThemeContext, 'xs')};
          padding: 0 ${euiTheme.size.xs};
        }

        .euiDescriptionList__description {
          ${euiFontSize(euiThemeContext, 'xs')};
        }
      }
      &.euiDescriptionList--center {
        text-align: center;
      }
    }
    `,
  };
};
