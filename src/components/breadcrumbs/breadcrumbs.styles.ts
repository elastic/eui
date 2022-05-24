/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { UseEuiTheme } from '../../services';
import { euiFontSize, euiTextTruncate } from '../../global_styling/mixins';

export const euiBreadcrumbsListStyles = ({ euiTheme }: UseEuiTheme) => ({
  euiBreadcrumbs__list: css`
    ${euiFontSize('s', euiTheme)};
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    line-height: ${euiTheme.size.l};
    margin-bottom: -${euiTheme.size.xs};
    min-width: 0; // Ensure it shrinks if the window is narrow
  `,
  isTruncated: css`
    flex-wrap: nowrap;
    white-space: nowrap;
  `,
});

export const euiBreadcrumbStyles = ({ euiTheme }: UseEuiTheme) => ({
  euiBreadcrumb: css`
    align-items: center;
    display: flex;
    margin-bottom: ${euiTheme.size.xs}; /* 1 */

    &:not(:last-of-type) {
      color: ${euiTheme.colors.subdued};

      &:after {
        background: ${euiTheme.colors.lightShade};
        content: '';
        flex-shrink: 0;
        height: ${euiTheme.size.base};
        margin: ${euiTheme.size.xs} ${euiTheme.size.s} 0;
        transform: translateY(-1px) rotate(15deg);
        width: 1px;
      }
    }

    &:last-of-type {
      font-weight: ${euiTheme.font.weight.medium};
    }
  `,
  isCollapsed: css`
    flex-shrink: 0;

    & a,
    & button {
      :focus {
        outline-offset: -1px;
      }
    }
  `,
  isTruncated: css`
    overflow: hidden;

    &:not([class*='euiBreadcrumb-isCollapsed']) {
      & > a,
      & > span {
        max-width: calc(${euiTheme.size.base} * 10);
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    &:last-of-type {
      & > a,
      & > span {
        max-width: none;
      }
    }
  `,
});

export const euiBreadcrumbContentStyles = ({ euiTheme }: UseEuiTheme) => ({
  euiBreadcrumb__content: css`
    font-weight: ${euiTheme.font.weight.medium};

    &:is(a) {
      :focus {
        outline-offset: -1px;
      }
    }
  `,
  isTruncated: css`
    ${euiTextTruncate()};
    max-width: calc(${euiTheme.size.base} * 10);
    text-align: center;
    vertical-align: baseline;
  `,
});

export const euiBreadcrumbsInPopoverStyles = ({ euiTheme }: UseEuiTheme) => ({
  euiBreadcrumbs__inPopover: css`
    & li:last-of-type > a,
    & li:last-of-type > span {
      color: ${euiTheme.colors.subdued};
    }
  `,
});
