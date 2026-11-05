/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import {
  EuiCode,
  euiShadow,
  euiShadowHover,
  useEuiTheme,
} from '@elastic/eui';

type BrandColor = {
  name: string;
  token: string;
  value: string;
  /** Plain-text usage note for tooltip / a11y */
  summary: string;
};

export const BrandColorsCards = () => {
  const euiThemeContext = useEuiTheme();
  const { euiTheme } = euiThemeContext;

  const colors: BrandColor[] = [
    {
      name: 'Primary',
      token: 'colors.primary',
      value: euiTheme.colors.primary,
      summary:
        'Main brand color and used for most call to actions like buttons and links.',
    },
    {
      name: 'Accent',
      token: 'colors.accent',
      value: euiTheme.colors.accent,
      summary:
        'Pulls attention to key indicators like notifications or number of selections.',
    },
    {
      name: 'Accent secondary',
      token: 'colors.accentSecondary',
      value: euiTheme.colors.accentSecondary,
      summary: 'Secondary attention indicator with lower priority.',
    },
    {
      name: 'Success',
      token: 'colors.success',
      value: euiTheme.colors.success,
      summary:
        'Used for positive messages/graphics and additive actions.',
    },
    {
      name: 'Warning',
      token: 'colors.warning',
      value: euiTheme.colors.warning,
      summary:
        'Used for warnings and actions that have potential to be destructive.',
    },
    {
      name: 'Danger',
      token: 'colors.danger',
      value: euiTheme.colors.danger,
      summary:
        'Used for negative messages/graphics like errors and destructive elements.',
    },
  ];

  const grid = css`
    display: grid;
    /* POC: row 1 = 2 large (span 2); row 2 = 4 compact */
    grid-template-columns: repeat(4, 1fr);
    gap: ${euiTheme.size.l};
    margin-block: ${euiTheme.size.m} ${euiTheme.size.xl};

    & > :nth-child(-n + 2) {
      grid-column: span 2;
      /* Same height as 3:4 cards at half the column width → 3:2 */
      aspect-ratio: 3 / 2;
    }

    @media (max-width: ${euiTheme.breakpoint.m}px) {
      grid-template-columns: repeat(2, 1fr);

      & > :nth-child(-n + 2) {
        grid-column: span 1;
      }
    }

    @media (max-width: ${euiTheme.breakpoint.s}px) {
      grid-template-columns: 1fr;
    }
  `;

  const card = css`
    display: flex;
    flex-direction: column;
    gap: ${euiTheme.size.s};
    aspect-ratio: 3 / 4;
    padding: ${euiTheme.size.s};
    padding-block-end: ${euiTheme.size.m};
    overflow: hidden;
    background-color: ${euiTheme.colors.backgroundBasePlain};
    border-radius: ${euiTheme.border.radius.control};
    ${euiShadow(euiThemeContext, 'xs')}
    transform: translateZ(0);
    transition: box-shadow ${euiTheme.animation.fast} ease,
      transform ${euiTheme.animation.fast} ${euiTheme.animation.resistance};

    &:hover {
      ${euiShadowHover(euiThemeContext, 'm')}
      transform: scale(1.03);
    }

    @media (prefers-reduced-motion: reduce) {
      transition: box-shadow ${euiTheme.animation.fast} ease;

      &:hover {
        transform: none;
      }
    }
  `;

  const swatch = css`
    flex: 1 1 auto;
    min-block-size: 0;
    border-radius: ${euiTheme.border.radius.small};
  `;

  const meta = css`
    display: flex;
    flex-direction: column;
    gap: ${euiTheme.size.xxs};
    padding-inline: ${euiTheme.size.xs};
  `;

  const tokenCode = css`
    padding-inline: 0;
  `;

  const brand = css`
    margin: 0;
    color: ${euiTheme.colors.textSubdued};
    font-size: var(--eui-font-size-xs);
    font-weight: ${euiTheme.font.weight.bold};
    letter-spacing: 0.04em;
    line-height: var(--eui-line-height-xs);
    text-transform: uppercase;
  `;

  const name = css`
    margin: 0;
    color: ${euiTheme.colors.textHeading};
    font-size: var(--eui-font-size-s);
    font-weight: ${euiTheme.font.weight.bold};
    line-height: var(--eui-line-height-s);
  `;

  const value = css`
    margin: 0;
    color: ${euiTheme.colors.textParagraph};
    font-family: ${euiTheme.font.familyCode};
    font-size: var(--eui-font-size-xs);
    line-height: var(--eui-line-height-xs);
  `;

  return (
    <div css={grid}>
      {colors.map((color) => (
        <article key={color.token} css={card} title={color.summary}>
          <div
            css={swatch}
            style={{ backgroundColor: color.value }}
            role="img"
            aria-label={`${color.name} swatch ${color.value}`}
          />
          <div css={meta}>
            <p css={brand}>EUI</p>
            <p css={name}>{color.name}</p>
            <p css={value}>{color.value}</p>
            <EuiCode transparentBackground css={tokenCode}>
              {color.token}
            </EuiCode>
          </div>
        </article>
      ))}
    </div>
  );
};
