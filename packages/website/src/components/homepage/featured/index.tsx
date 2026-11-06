/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {
  EuiLink,
  EuiPanel,
  EuiText,
  EuiTitle,
  useEuiMemoizedStyles,
  UseEuiTheme,
  useGeneratedHtmlId,
} from '@elastic/eui';

type FeaturedCard = {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  href?: string;
  external?: boolean;
};

const FEATURED_CARDS = [
  {
    title: 'Elastic Brand',
    description:
      'Create consistent brand experience by using our Elastic Brand toolkit.',
    imageSrc: '/images/homepage/elastic-brand.gif',
    imageAlt: '',
    href: 'https://brand.elastic.co',
    external: true,
  },
  {
    title: 'Elastic Charts',
    description:
      'Library of charts, and components that share a series of common rules.',
    imageSrc: '/images/homepage/elastic-charts.png',
    imageAlt: '',
    href: './docs/dataviz/',
  },
] satisfies FeaturedCard[];

const getStyles = ({ euiTheme }: UseEuiTheme) => ({
  section: css`
    padding: ${euiTheme.size.xl} ${euiTheme.size.l} 0;
  `,
  heading: css`
    margin: 0;
    margin-block-end: ${euiTheme.size.l};
  `,
  list: css`
    display: grid;
    grid-template-columns: 1fr;
    gap: ${euiTheme.size.l};
    margin: 0;
    padding: 0;
    list-style: none;

    @media (min-width: 900px) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    > li {
      display: flex;
    }
  `,
  cardLink: css`
    display: flex;
    flex: 1;
    color: inherit;
    text-decoration: none;

    &:hover {
      color: inherit;
      text-decoration: none;
    }
  `,
  card: css`
    display: flex;
    align-items: center;
    gap: ${euiTheme.size.base};
    block-size: 100%;
    border-radius: ${euiTheme.border.radius.frame};

    @media (max-width: 560px) {
      flex-direction: column;
      align-items: stretch;
    }
  `,
  copy: css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: ${euiTheme.size.s};
    flex: 0 1 50%;
    min-inline-size: 0;
  `,
  title: css`
    margin: 0;
  `,
  titleDivider: css`
    display: block;
    flex-shrink: 0;
    inline-size: ${euiTheme.size.xxxxl};
    block-size: ${euiTheme.size.xs};
    margin: ${euiTheme.size.s} 0;
    background-color: ${euiTheme.colors.accent};
    border: none;
  `,
  description: css`
    margin: 0;
    color: ${euiTheme.colors.textSubdued};
  `,
  media: css`
    flex: 0 1 50%;
    min-inline-size: 0;
    block-size: 240px;
    border-radius: ${euiTheme.border.radius.medium};
    overflow: hidden;

    img {
      display: block;
      inline-size: 100%;
      block-size: 240px;
      object-fit: cover;
    }
  `,
  mediaEmpty: css`
    background-color: ${euiTheme.colors.lightestShade};
  `,
});

const FeaturedCardView = ({ card }: { card: FeaturedCard }) => {
  const styles = useEuiMemoizedStyles(getStyles);
  const imageSrc = useBaseUrl(card.imageSrc);
  const panel = (
    <EuiPanel color="plain" hasBorder hasShadow paddingSize="l" css={styles.card}>
      <div css={styles.copy}>
        <EuiTitle size="s">
          <h3 css={styles.title}>{card.title}</h3>
        </EuiTitle>
        <hr aria-hidden css={styles.titleDivider} />
        <EuiText size="s">
          <p css={styles.description}>{card.description}</p>
        </EuiText>
      </div>
      <div css={[styles.media, !imageSrc && styles.mediaEmpty]}>
        {imageSrc ? <img src={imageSrc} alt={card.imageAlt} /> : null}
      </div>
    </EuiPanel>
  );

  if (!card.href) {
    return panel;
  }

  return (
    <EuiLink
      href={card.href}
      target={card.external ? '_blank' : undefined}
      external={false}
      css={styles.cardLink}
    >
      {panel}
    </EuiLink>
  );
};

export const HomepageFeatured = () => {
  const styles = useEuiMemoizedStyles(getStyles);
  const headingId = useGeneratedHtmlId();

  return (
    <section css={styles.section} aria-labelledby={headingId}>
      {/* POC: needs design input — heading size and spacing */}
      <EuiTitle size="m">
        <h2 id={headingId} css={styles.heading}>
          In the family
        </h2>
      </EuiTitle>
      <ul css={styles.list}>
        {FEATURED_CARDS.map((card) => (
          <li key={card.title}>
            <FeaturedCardView card={card} />
          </li>
        ))}
      </ul>
    </section>
  );
};
