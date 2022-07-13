/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { UseEuiTheme } from '../../services';
import { transparentize } from '../../services/color';
import {
  euiFontSize,
  euiTextTruncate,
  euiFocusRing,
} from '../../global_styling/mixins';

export const euiBreadcrumbsListStyles = (euiThemeContext: UseEuiTheme) => {
  // Styles cast to the <nav> element
  const { euiTheme } = euiThemeContext;
  return {
    euiBreadcrumbs__list: css`
      ${euiFontSize(euiThemeContext, 's')};
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
  };
};

export const euiBreadcrumbStyles = (euiThemeContext: UseEuiTheme) => {
  // Styles cast to <li> and descendant elements
  const { euiTheme } = euiThemeContext;
  return {
    euiBreadcrumb: css`
      align-items: center;
      display: flex;
      margin-bottom: ${euiTheme.size.xs}; /* 1 */

      &:not(:last-of-type) {
        color: ${euiTheme.colors.subduedText};

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
    isHeaderBreadcrumb: css`
      &:first-child {
        & > a,
        & > [class*='euiPopover'] button,
        & > span {
          border-radius: ${euiTheme.border.radius.medium} 0 0
            ${euiTheme.border.radius.medium};
          clip-path: polygon(
            0 0,
            calc(100% - ${euiTheme.size.s}) 0,
            100% 50%,
            calc(100% - ${euiTheme.size.s}) 100%,
            0 100%
          );
          padding-left: ${euiTheme.size.m};
        }
      }

      &:only-child {
        & > a,
        & > span {
          border-radius: ${euiTheme.border.radius.medium};
          clip-path: none;
          padding-left: ${euiTheme.size.m};
          padding-right: ${euiTheme.size.m};
        }
      }

      &:last-child {
        & > a,
        & > span {
          border-radius: 0 ${euiTheme.border.radius.medium}
            ${euiTheme.border.radius.medium} 0;
          clip-path: polygon(
            0 0,
            100% 0,
            100% 100%,
            0 100%,
            ${euiTheme.size.s} 50%
          );
          padding-right: ${euiTheme.size.m};
        }
      }

      &:not(:last-of-type) {
        margin-right: -${euiTheme.size.xs};
      }

      &::after {
        display: none;
      }

      > [class*='euiPopover'] button {
        ${euiFontSize(euiThemeContext, 'xs')};
        background-color: ${transparentize(euiTheme.colors.primary, 0.2)};
        color: ${euiTheme.colors.link};
        clip-path: polygon(
          0 0,
          calc(100% - ${euiTheme.size.s}) 0,
          100% 50%,
          calc(100% - ${euiTheme.size.s}) 100%,
          0 100%,
          ${euiTheme.size.s} 50%
        );
        font-weight: ${euiTheme.font.weight.medium};
        line-height: ${euiTheme.size.base};
        padding: ${euiTheme.size.xs} ${euiTheme.size.base};

        :focus {
          ${euiFocusRing(euiTheme, 'inset', {
            color: `${euiTheme.colors.link}`,
          })};
          color: ${euiTheme.colors.link};

          :focus-visible {
            border-radius: ${euiTheme.border.radius.medium};
            clip-path: none;
          }
        }
      }
    `,
  };
};

export const euiBreadcrumbContentStyles = (euiThemeContext: UseEuiTheme) => {
  // Styles cast to <a> or <span> elements
  const { euiTheme } = euiThemeContext;
  return {
    euiBreadcrumb__content: css`
      font-weight: ${euiTheme.font.weight.medium};

      &:is(a) {
        :focus {
          ${euiFocusRing(euiTheme, 'inset')};
        }
      }
    `,
    isTruncated: css`
      ${euiTextTruncate()};
      max-width: calc(${euiTheme.size.base} * 10);
      text-align: center;
      vertical-align: baseline;
    `,
    isHeaderBreadcrumb: css`
      ${euiFontSize(euiThemeContext, 'xs')};
      background-color: ${transparentize(euiTheme.colors.darkestShade, 0.2)};
      clip-path: polygon(
        0 0,
        calc(100% - ${euiTheme.size.s}) 0,
        100% 50%,
        calc(100% - ${euiTheme.size.s}) 100%,
        0 100%,
        ${euiTheme.size.s} 50%
      );
      color: ${euiTheme.colors.darkestShade};
      font-weight: ${euiTheme.font.weight.medium};
      line-height: ${euiTheme.size.base};
      padding: ${euiTheme.size.xs} ${euiTheme.size.base};

      &:is(a) {
        background-color: ${transparentize(euiTheme.colors.primary, 0.2)};
        color: ${euiTheme.colors.link};

        :focus {
          ${euiFocusRing(euiTheme, 'inset')};

          :focus-visible {
            border-radius: ${euiTheme.border.radius.medium};
            clip-path: none;
          }
        }
      }
    `,
  };
};

export const euiBreadcrumbsInPopoverStyles = ({ euiTheme }: UseEuiTheme) => ({
  // Styles cast to breadcrumbs in EUI Popover
  euiBreadcrumbs__inPopover: css`
    & li:last-of-type > a,
    & li:last-of-type > span {
      color: ${euiTheme.colors.subduedText};
    }
  `,
});
