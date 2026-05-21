/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { UseEuiTheme } from '../../services';

export type EuiBannerSize = 's' | 'm';
type EuiBannerLayouts = (typeof CQC_LAYOUTS)[number];

const CONTAINER_NAME = 'euiBanner';

const CQC_LAYOUTS = ['superNarrow', 'narrow', 'wide'] as const;
const CQC_BREAKPOINTS: Record<
  EuiBannerSize,
  Record<EuiBannerLayouts, string>
> = {
  s: {
    superNarrow: '(max-width: 400px)',
    narrow: '(min-width: 401px)',
    wide: '(min-width: 800px)',
  },
  m: {
    superNarrow: '(max-width: 600px)',
    narrow: '(min-width: 601px)',
    wide: '(min-width: 1000px)',
  },
};

/** Maximum reading width for `text` and `children` slots. */
const TEXT_MAX_WIDTH = 1200;

const withContainerQuery = ({
  layout,
  styles,
}: {
  layout: EuiBannerLayouts;
  styles: string;
}) => {
  return Object.keys(CQC_BREAKPOINTS)
    .map(
      (sizeKey) => `
        @container ${CONTAINER_NAME}--${sizeKey} ${
        CQC_BREAKPOINTS[sizeKey as EuiBannerSize][layout]
      } {
          ${styles}
        }
      `
    )
    .join('\n');
};

export const euiBannerStyles = ({ euiTheme }: UseEuiTheme) => ({
  euiBanner: css`
    container-name: ${CONTAINER_NAME};
    container-type: inline-size;
    position: relative;
    border: ${euiTheme.border.thin};
    border-radius: ${euiTheme.border.radius.medium};

    &[data-size='s'] {
      container-name: ${CONTAINER_NAME} ${CONTAINER_NAME}--s;
    }

    &[data-size='m'] {
      container-name: ${CONTAINER_NAME} ${CONTAINER_NAME}--m;
    }
  `,
  container: css`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: ${euiTheme.size.base};
    padding-inline-start: ${euiTheme.size.base};
    padding-inline-end: ${euiTheme.size.base};

    [data-size='m'] & {
      padding-block: ${euiTheme.size.base};
    }

    [data-size='s'] & {
      padding-block: ${euiTheme.size.m};
    }

    ${withContainerQuery({
      layout: 'superNarrow',
      styles: `
        flex-direction: column;
        align-items: stretch;
        gap: ${euiTheme.size.m};
      `,
    })}
  `,
  media: css`
    --euiBannerMediaSize: ${`calc(${euiTheme.size.base} * 5)`};

    flex-shrink: 0;
    inline-size: var(--euiBannerMediaSize);
    block-size: var(--euiBannerMediaSize);
    aspect-ratio: 1 / 1;

    [data-size='s'] & {
      --euiBannerMediaSize: ${`calc(${euiTheme.size.base} * 2)`};
    }

    ${withContainerQuery({
      layout: 'wide',
      styles: `
        align-self: center;
      `,
    })}

    img,
    svg {
      block-size: 100%;
      inline-size: 100%;
    }
  `,
  body: css`
    flex: 1 1 auto;
    min-inline-size: 0;
    display: flex;
    flex-direction: column;
    align-self: center;
    gap: ${euiTheme.size.m};

    [data-size='s'] & {
      gap: ${euiTheme.size.s};
    }

    ${withContainerQuery({
      layout: 'superNarrow',
      styles: `
        align-self: flex-start;
        inline-size: 100%;
      `,
    })}

    ${withContainerQuery({
      layout: 'wide',
      styles: `
        flex-direction: row;
        align-items: center;
        /* stretch to match the media's height so align-items has space to work */
        align-self: stretch;
        justify-content: space-between;
        gap: ${euiTheme.size.l};
      `,
    })}
  `,
  // At size `s` the content slot becomes a block container so the title and
  // text flow inline. Other sizes keep the flex column with a fixed gap.
  content: css`
    flex: 1 1 auto;
    min-inline-size: 0;
    max-inline-size: ${TEXT_MAX_WIDTH}px;
    display: flex;
    flex-direction: column;
    gap: ${euiTheme.size.xs};

    [data-size='s'] & {
      display: block;

      > * + *:not(.euiButtonIcon) {
        margin-block-start: ${euiTheme.size.s};
      }
    }
  `,
  title: css`
    [data-size='s'] & {
      display: inline;
    }
  `,
  text: css`
    [data-size='s'] & {
      display: inline;

      /* separator dot between title and text */
      &::before {
        content: '·';
        display: inline-block;
        inline-size: calc(${euiTheme.size.s} + ${euiTheme.size.xxs});
        text-align: center;
        color: ${euiTheme.colors.textHeading};
      }
    }
  `,
  actions: css`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${euiTheme.size.s};

    /* uses container query directly as it should apply generically independent of size */
    @container ${CONTAINER_NAME} ${CQC_BREAKPOINTS.s.superNarrow} {
      flex-wrap: wrap;

      /* use full width actions */
      > * {
        inline-size: 100%;
      }
    }

    ${withContainerQuery({
      layout: 'wide',
      styles: `
        /* Reverses source order so primary appears last (rightmost). */
        flex-direction: row-reverse;
        flex-shrink: 0;
        align-self: center;
      `,
    })}
  `,
  hasDismiss: css`
    ${withContainerQuery({
      layout: 'narrow',
      styles: `
        padding-inline-end: calc(${euiTheme.size.s} * 5);
      `,
    })}
  `,
  dismiss: css`
    position: absolute;
    inset-block-start: ${euiTheme.size.s};
    inset-inline-end: ${euiTheme.size.s};
    color: ${euiTheme.colors.textSubdued};
  `,
});
