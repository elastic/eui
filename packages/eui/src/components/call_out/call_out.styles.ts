/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import {
  logicalCSS,
  logicalShorthandCSS,
  mathWithUnits,
  preventForcedColors,
} from '../../global_styling';
import { UseEuiTheme } from '../../services';
import { EuiCallOutSize } from './types';

/** Maximum reading width for `text` and `children` slots. */
const TEXT_MAX_WIDTH = 1200;
const CONTAINER_NAME = 'euiCallOut';
const CQC_LAYOUTS = ['superNarrow', 'wide'] as const;
type EuiCallOutLayouts = (typeof CQC_LAYOUTS)[number];
const CQC_BREAKPOINTS: Record<
  EuiCallOutSize,
  Record<EuiCallOutLayouts, string>
> = {
  s: {
    superNarrow: '(max-width: 400px)',
    wide: '(min-width: 800px)',
  },
  m: {
    superNarrow: '(max-width: 600px)',
    wide: '(min-width: 1000px)',
  },
};

const withContainerQuery = ({
  layout,
  styles,
}: {
  layout: EuiCallOutLayouts;
  styles: string;
}) => {
  return Object.keys(CQC_BREAKPOINTS)
    .map(
      (sizeKey) => `
        @container ${CONTAINER_NAME}--${sizeKey} ${
        CQC_BREAKPOINTS[sizeKey as EuiCallOutSize][layout]
      } {
          ${styles}
        }
      `
    )
    .join('\n');
};

export const euiCallOutStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  const paddingSizes = {
    s: euiTheme.size.m,
    m: euiTheme.size.base,
  };
  const borderRadius = euiTheme.border.radius.small;
  const highlightSize = mathWithUnits(
    [euiTheme.border.width.thin, euiTheme.border.width.thick],
    (x, y) => x + y
  );
  const highlightOffset = euiTheme.border.width.thin;
  const highlightSizeOffset = mathWithUnits([highlightOffset], (x) => x * 2);
  const separatorSize = mathWithUnits(
    [euiTheme.size.s, euiTheme.size.xxs],
    (x, y) => x + y
  );

  return {
    euiCallOut: css`
      container-type: inline-size;
      container-name: ${CONTAINER_NAME};
      position: relative;
      display: flex;
      inline-size: 100%;
      align-items: center;
      border: ${euiTheme.border.width.thin} solid;
      border-radius: ${borderRadius};

      &:focus {
        outline-offset: 2px;
      }

      &::before {
        content: '';
        position: absolute;
        inset-block-start: -${euiTheme.border.width.thin};
        inset-inline-start: -${euiTheme.border.width.thin};
        block-size: calc(100% + ${highlightSizeOffset});
        border-inline-start: ${highlightSize} solid var(--euiCallOutTypeColor);
        border-start-start-radius: ${borderRadius};
        border-end-start-radius: ${borderRadius};
        pointer-events: none;

        ${preventForcedColors(euiThemeContext)}
      }

      &:where([data-size='s']) {
        container-name: ${CONTAINER_NAME} ${CONTAINER_NAME}--s;

        ${logicalShorthandCSS('padding', `${paddingSizes.s} ${paddingSizes.m}`)}
      }

      &:where([data-size='m']) {
        container-name: ${CONTAINER_NAME} ${CONTAINER_NAME}--m;

        padding: ${paddingSizes.m};
      }
    `,
    // handles content + actions layout
    wrapper: css`
      display: flex;
      flex-direction: column;
      inline-size: 100%;

      &:where([data-size='s'] &) {
        gap: ${euiTheme.size.s};
      }

      &:where([data-size='m'] &) {
        gap: ${euiTheme.size.m};
      }

      ${withContainerQuery({
        layout: 'wide',
        styles: `
            flex-direction: row;
            gap: ${euiTheme.size.xxl};
          `,
      })}
    `,
    // handles icon + text layout
    body: css`
      display: flex;
      flex-direction: row;
      align-self: center;
      inline-size: 100%;

      &:where([data-size='s'] &) {
        gap: ${euiTheme.size.s};
      }

      &:where([data-size='m'] &) {
        gap: ${euiTheme.size.m};
      }
    `,
    // handles text layout
    content: css`
      align-self: center;
      inline-size: 100%;
      max-inline-size: ${TEXT_MAX_WIDTH}px;

      &:where([data-size='s'] &) {
        gap: ${euiTheme.size.s};
        block-size: min-content;

        > .euiTitle {
          display: inline;
          ${logicalCSS('margin-right', euiTheme.size.xxs)};
        }

        > .euiCallOut__text {
          display: inline;

          * {
            display: inline;
          }

          &:where(:not(:first-child)) {
            /* separator dot between title and text */
            &::before {
              content: '·';
              display: inline-block;
              inline-size: ${separatorSize};
              text-align: center;
              color: ${euiTheme.colors.textHeading};
            }
          }
        }

        .euiCallOut__additionalContent:not(:first-child) {
          ${logicalCSS('margin-top', euiTheme.size.xs)}
        }
      }

      &:where([data-size='m'] &) {
        display: flex;
        flex-direction: column;
        gap: ${euiTheme.size.xs};

        .euiCallOut__text + .euiCallOut__additionalContent {
          ${logicalCSS('margin-top', euiTheme.size.s)}
        }
      }
    `,
    hasDismissButton: css`
      /* additional selector to ensure specificity */
      &:where([data-size]) {
        padding-inline-end: ${euiTheme.size.xxl};
      }
    `,
    dismissButton: {
      euiCallOut__dismissButton: css`
        position: absolute;
        ${logicalCSS('top', euiTheme.size.s)}
        ${logicalCSS('right', euiTheme.size.s)}
      `,
    },
    icon: css`
      grid-area: icon;
      position: relative;
      ${logicalCSS('margin-vertical', euiTheme.size.xxs)}
    `,
    actions: css`
      grid-area: actions;
      display: flex;
      gap: ${euiTheme.size.s};

      &:where([data-size='s'] &) {
        ${logicalCSS('margin-left', euiTheme.size.l)}
      }

      &:where([data-size='m'] &) {
        ${logicalCSS('margin-left', euiTheme.size.xl)}
      }

      /* uses container query directly as it should apply generically independent of size */
      @container ${CONTAINER_NAME} ${CQC_BREAKPOINTS.s.superNarrow} {
        flex-wrap: wrap;

        /* use full width actions */
        *:has(.euiCallOutAction),
        .euiCallOutAction {
          inline-size: 100%;
        }
      }

      ${withContainerQuery({
        layout: 'wide',
        styles: `
            ${logicalCSS('margin-left', '0')}
            align-self: center;
            flex-shrink: 0;
            flex-direction: row-reverse;
          `,
      })}
    `,
  };
};

export const euiCallOutHeaderStyles = ({ euiTheme }: UseEuiTheme) => {
  return {
    euiCallOutHeader: css`
      font-weight: ${euiTheme.font.weight.bold};
      ${logicalCSS(
        'margin-bottom',
        '0 !important'
        // In case it's nested inside EuiText
      )}
    `,
  };
};
