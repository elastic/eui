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
  logicalCSS,
  logicalBorderRadiusCSS,
  mathWithUnits,
} from '../../global_styling';

export const euiBreadcrumbStyles = (euiThemeContext: UseEuiTheme) => {
  // Styles cast to <li> element
  const { euiTheme } = euiThemeContext;
  return {
    euiBreadcrumb: css`
      align-items: center;
      display: flex;
      ${logicalCSS(
        // See .euiBreadcrumbs__list's negative margin-bottom
        'margin-bottom',
        euiTheme.size.xs
      )}
    `,
    isTruncated: css`
      overflow: hidden;
    `,
    isCollapsed: css`
      flex-shrink: 0;
    `,

    // Types
    page: css`
      &:not(:last-of-type) {
        &:after {
          background: ${euiTheme.colors.lightShade};
          content: '';
          flex-shrink: 0;
          ${logicalCSS('margin-top', euiTheme.size.xs)}
          ${logicalCSS('margin-bottom', 0)}
          ${logicalCSS('margin-horizontal', euiTheme.size.s)}
          ${logicalCSS('height', euiTheme.size.base)}
          ${logicalCSS('width', '1px')}
          transform: translateY(-1px) rotate(15deg);
        }
      }
    `,
    application: css`
      &:not(:last-of-type) {
        ${logicalCSS('margin-right', `-${euiTheme.size.xs}`)}
      }
    `,
  };
};

export const euiBreadcrumbContentStyles = (euiThemeContext: UseEuiTheme) => {
  // Styles cast to <a>, <span>, or collapsed <button> elements
  const { euiTheme } = euiThemeContext;
  return {
    euiBreadcrumb__content: css`
      font-weight: ${euiTheme.font.weight.medium};
      text-align: center;
      vertical-align: baseline;
    `,
    isTruncated: css`
      ${euiTextTruncate(mathWithUnits(euiTheme.size.base, (x) => x * 10))}
    `,
    isTruncatedLast: css`
      // This removes the default breadcrumb max-width while ensuring that the last breadcrumb
      // still cuts off with a '...' if it's overflowing outside the parent breadcrumbs container
      ${euiTextTruncate('none')}
    `,

    // Types
    page: css`
      &:is(a):focus {
        ${euiFocusRing(euiThemeContext, 'inset')};
      }
      &:is(button):focus {
        ${euiFocusRing(euiThemeContext, 'center')};
      }
    `,
    application: css`
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
      line-height: ${euiTheme.size.base};
      ${logicalCSS('padding-vertical', euiTheme.size.xs)}
      ${logicalCSS('padding-horizontal', euiTheme.size.base)}

      &:is(a),
      &:is(button) {
        background-color: ${transparentize(euiTheme.colors.primary, 0.2)};
        color: ${euiTheme.colors.link};

        :focus {
          ${euiFocusRing(euiThemeContext, 'inset')};

          :focus-visible {
            border-radius: ${euiTheme.border.radius.medium};
            clip-path: none;
          }
        }
      }
    `,
    applicationStyles: {
      onlyChild: css`
        border-radius: ${euiTheme.border.radius.medium};
        clip-path: none;
        ${logicalCSS('padding-horizontal', euiTheme.size.m)},
      `,
      firstChild: css`
        ${logicalBorderRadiusCSS(
          `${euiTheme.border.radius.medium} 0 0 ${euiTheme.border.radius.medium}`,
          true
        )}
        clip-path: polygon(
          0 0,
          calc(100% - ${euiTheme.size.s}) 0,
          100% 50%,
          calc(100% - ${euiTheme.size.s}) 100%,
          0 100%
        );
        ${logicalCSS('padding-left', euiTheme.size.m)},
      `,
      lastChild: css`
        ${logicalBorderRadiusCSS(
          `0 ${euiTheme.border.radius.medium} ${euiTheme.border.radius.medium} 0`,
          true
        )}
        clip-path: polygon(
          0 0,
          100% 0,
          100% 100%,
          0 100%,
          ${euiTheme.size.s} 50%
        );
        ${logicalCSS('padding-right', euiTheme.size.m)},
      `,
    },
  };
};
