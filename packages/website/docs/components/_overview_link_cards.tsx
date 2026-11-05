/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import Link from '@docusaurus/Link';
import { euiShadow, euiShadowHover, useEuiTheme } from '@elastic/eui';

export type OverviewLinkItem = {
  label: string;
  href: string;
};

type OverviewLinkCardsProps = {
  /** POC: Popular = primary, Layout = accent */
  variant: 'primary' | 'accent';
  items: OverviewLinkItem[];
};

export const OverviewLinkCards = ({
  variant,
  items,
}: OverviewLinkCardsProps) => {
  const euiThemeContext = useEuiTheme();
  const { euiTheme } = euiThemeContext;
  const borderColor =
    variant === 'primary'
      ? euiTheme.colors.borderBasePrimary
      : euiTheme.colors.borderBaseAccent;

  const grid = css`
    display: grid;
    grid-template-columns: repeat(
      auto-fill,
      minmax(${euiTheme.base * 7}px, 1fr)
    );
    gap: ${euiTheme.size.m};
    margin-block: ${euiTheme.size.m} ${euiTheme.size.xl};
  `;

  const card = css`
    position: relative;
    display: flex;
    align-items: flex-end;
    aspect-ratio: 3 / 4;
    max-inline-size: ${euiTheme.base * 10}px;
    padding: ${euiTheme.size.m};
    padding-inline-start: calc(${euiTheme.size.m} + ${euiTheme.size.s});
    overflow: hidden;
    /* POC: book-like — tighter spine corners, rounder page edge */
    /* POC: near-square spine; smallest theme radius still reads soft */
    border-start-start-radius: 2px;
    border-end-start-radius: 2px;
    border-start-end-radius: ${euiTheme.border.radius.panel};
    border-end-end-radius: ${euiTheme.border.radius.panel};
    background-color: ${euiTheme.colors.backgroundBasePlain};
    color: ${euiTheme.colors.textHeading};
    font-size: var(--eui-font-size-s);
    font-weight: ${euiTheme.font.weight.bold};
    line-height: var(--eui-line-height-s);
    text-decoration: none;
    ${euiShadow(euiThemeContext, 'xs')}
    transform: translateZ(0);
    transition: box-shadow ${euiTheme.animation.fast} ease,
      transform ${euiTheme.animation.fast} ${euiTheme.animation.resistance};

    /* POC: flat spine bar (border-radius on thick borders pill-shapes the ends) */
    &::before {
      content: '';
      position: absolute;
      inset-block: 0;
      inset-inline-start: 0;
      inline-size: ${euiTheme.size.s};
      background-color: ${borderColor};
    }

    &:hover {
      color: ${euiTheme.colors.textHeading};
      text-decoration: none;
      ${euiShadowHover(euiThemeContext, 'm')}
      transform: scale(1.04);
    }

    @media (prefers-reduced-motion: reduce) {
      transition: box-shadow ${euiTheme.animation.fast} ease;

      &:hover {
        transform: none;
      }
    }
  `;

  return (
    <div css={grid}>
      {items.map((item) => (
        <Link key={item.href} to={item.href} css={card}>
          {item.label}
        </Link>
      ))}
    </div>
  );
};
