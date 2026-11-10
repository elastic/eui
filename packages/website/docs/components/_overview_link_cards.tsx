/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { ReactNode } from 'react';
import { css } from '@emotion/react';
import Link from '@docusaurus/Link';
import {
  EuiFlexGrid,
  EuiFlexGroup,
  EuiImage,
  EuiText,
  EuiTextBlockTruncate,
  useEuiTheme,
} from '@elastic/eui';

export type OverviewLinkItem = {
  label: string;
  description: string;
  href: string;
  image?: string;
  preview?: ReactNode;
};

type OverviewLinkCardsProps = {
  items: OverviewLinkItem[];
};

export const OverviewLinkCards = ({ items }: OverviewLinkCardsProps) => {
  const { euiTheme } = useEuiTheme();

  const grid = css`
    margin-block: ${euiTheme.size.xxl} ${euiTheme.size.xxxxl};
  `;

  const card = css`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    block-size: 100%;
    overflow: hidden;
    border: ${euiTheme.border.width.thin} solid
      ${euiTheme.colors.borderBasePlain};
    border-radius: ${euiTheme.border.radius.panel};
    background-color: ${euiTheme.colors.backgroundBasePlain};
    box-shadow: none;
    color: ${euiTheme.colors.textHeading};
    text-decoration: none;
    transition: box-shadow ${euiTheme.animation.fast} ease;

    &:hover {
      box-shadow: ${euiTheme.shadows.hover.base.down};
      color: ${euiTheme.colors.textHeading};
      text-decoration: none;
    }

    &:focus-visible {
      box-shadow: ${euiTheme.shadows.hover.base.down};
    }

    @media (prefers-reduced-motion: reduce) {
      transition: none;
    }
  `;

  const imageFrame = css`
    display: flex;
    align-items: center;
    justify-content: center;
    inline-size: 100%;
    aspect-ratio: 2 / 1;
    background-color: ${euiTheme.colors.backgroundBaseSubdued};
    border-block-end: ${euiTheme.border.width.thin} solid
      ${euiTheme.colors.borderBasePlain};
  `;

  const image = css`
    .euiImageWrapper,
    .euiImage {
      inline-size: 100%;
      block-size: 100%;
      object-fit: cover;
      object-position: center;
    }
  `;

  const body = css`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: ${euiTheme.size.xs};
    padding: ${euiTheme.size.m};
  `;

  const title = css`
    margin: 0;
    color: ${euiTheme.colors.textHeading};
    font-size: var(--eui-font-size-m);
    font-weight: ${euiTheme.font.weight.bold};
    line-height: var(--eui-line-height-m);
    min-block-size: 1lh;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `;

  const description = css`
    color: ${euiTheme.colors.textSubdued};
    font-size: var(--eui-font-size-s);
    font-weight: ${euiTheme.font.weight.regular};
    line-height: var(--eui-line-height-s);
    min-block-size: 2lh;
  `;

  return (
    <EuiFlexGrid columns={2} gutterSize="m" css={grid}>
      {items.map((item) => (
          <Link key={item.href} to={item.href} css={card}>
            <EuiFlexGroup
              alignItems="center"
              justifyContent="center"
              gutterSize="none"
              css={imageFrame}
              aria-hidden="true"
            >
              {item.preview ? (
                item.preview
              ) : item.image ? (
                <EuiImage
                  alt=""
                  src={item.image}
                  size="fullWidth"
                  allowFullScreen={false}
                  css={image}
                />
              ) : null}
            </EuiFlexGroup>
            <EuiFlexGroup
              direction="column"
              gutterSize="xs"
              alignItems="stretch"
              responsive={false}
              css={body}
            >
              <EuiText component="p" size="m" css={title}>
                {item.label}
              </EuiText>
              <EuiTextBlockTruncate lines={2} css={description}>
                {item.description}
              </EuiTextBlockTruncate>
            </EuiFlexGroup>
          </Link>
      ))}
    </EuiFlexGrid>
  );
};
