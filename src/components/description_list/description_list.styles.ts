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

export const euiDescriptionListStyles = ({ euiTheme }: UseEuiTheme) => {
  return {
    euiDescriptionList: css`
      &.euiDescriptionList--row {
        &.euiDescriptionList--center {
          text-align: center;
        }

        // Reversed makes the description larger than the title
        &.euiDescriptionList--reverse {
          .euiDescriptionList__title {
            @include euiText;
            @include euiFontSizeS;
          }

          .euiDescriptionList__description {
            color: blue;
            /* @include euiTitle('xs'); */
          }
        }
      }
    `,
    'euiDescriptionList-row': css`
      &.euiDescriptionList__title {
        ${euiTitle('xs', euiTheme)};
        line-height: ${euiTheme.size.l};
        margin-top: ${euiTheme.size.base};

        // Make sure the first <dt> doesn't get a margin.
        &:first-of-type {
          margin-top: 0;
        }
      }
      &.euiDescriptionList__description {
        /*${euiTheme.size.s} */
      }
    `,
    'euiDescriptionList-column': css``,
    'euiDescriptionList-responsiveColumn': css``,
    'euiDescriptionList-inline': css``,
  };
};

// return {
//     euiDescriptionList: css``,
//     'euiDescriptionList--row': css`
//       .euiDescriptionList__title {
//         ${euiTitle('xs', euiTheme)};
//         line-height: ${euiTheme.size.l};
//         margin-top: ${euiTheme.size.base};
//         font-weight: bold;

//         &:first-of-type {
//           margin-top: 0;
//         }
//       }
//     `,
//   };
