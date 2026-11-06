/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { css } from '@emotion/react';
import {
  EuiBadge,
  EuiIcon,
  EuiLink,
  EuiPanel,
  EuiSplitPanel,
  EuiText,
  EuiTitle,
  IconType,
  euiShadowHover,
  useEuiMemoizedStyles,
  useGeneratedHtmlId,
  UseEuiTheme,
} from '@elastic/eui';

import { HomepageSection } from '../layout';

// Match DocSidebarTitle / DOC_SECTIONS order and labels
const CONTENT_DATA = [
  {
    title: 'Getting started',
    description: 'Setup, theming, and tokens for your project',
    href: './docs/getting-started/setup/',
    icon: 'rocket' as IconType,
    badges: [
      { label: 'Setup', href: './docs/getting-started/setup/' },
      { label: 'Theming', href: './docs/getting-started/theming/theme-provider/' },
      { label: 'Tokens', href: './docs/getting-started/theming/tokens/colors/' },
    ],
  },
  {
    title: 'Components',
    description: 'Usage examples, guidelines, and prop tables',
    href: './docs/components/',
    icon: 'grid' as IconType,
    badges: [
      { label: 'Forms', href: './docs/components/forms/' },
      { label: 'Tables', href: './docs/components/tables/' },
      { label: 'Buttons', href: './docs/components/navigation/buttons/' },
    ],
  },
  {
    title: 'Utilities',
    description: 'Helpers for portals, accessibility, and more',
    href: './docs/utilities/accessibility/',
    icon: 'wrench' as IconType,
    badges: [
      { label: 'Portal', href: './docs/utilities/portal/' },
      { label: 'Truncation', href: './docs/utilities/text-truncation/' },
      { label: 'Accessibility', href: './docs/utilities/accessibility/' },
    ],
  },
  {
    title: 'Patterns',
    description: 'Preferred solutions to specific user needs',
    href: './docs/patterns/',
    icon: 'pattern' as IconType,
    badges: [
      { label: 'Errors', href: './docs/patterns/error-messages/' },
      { label: 'Tables', href: './docs/patterns/tables/' },
      { label: 'Save', href: './docs/patterns/save-buttons/' },
    ],
  },
  {
    title: 'Content',
    description: 'Thoughtful and consistent in-product copy',
    href: './docs/content/',
    icon: 'pencil' as IconType,
    badges: [
      { label: 'Tone', href: './docs/content/adapt-tone/' },
      { label: 'Language', href: './docs/content/language/' },
      { label: 'Inclusivity', href: './docs/content/inclusivity/' },
    ],
  },
  {
    title: 'Icons',
    description: 'Glyphs, logos, and custom SVG assets',
    href: './docs/components/display/icons/',
    icon: 'faceHappy' as IconType,
    badges: [
      { label: 'Glyphs', href: './docs/components/display/icons/#all-icons' },
      { label: 'Tokens', href: './docs/components/display/icons/#tokens' },
      { label: 'Custom', href: './docs/components/display/icons/#custom-svgs' },
    ],
  },
];

const getStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  // POC: fixed icon well; was xxxl+s (56px)
  const iconSize = '48px';

  return {
    section: css`
      display: flex;
      flex-direction: column;
      align-items: stretch;
      padding: ${euiTheme.size.xxxl} 0;
    `,
    heading: css`
      margin: 0;
      margin-block-end: ${euiTheme.size.l};
      /* Match well EuiPanel paddingSize="l" so title lines up with cards */
      padding-inline-start: ${euiTheme.size.l};
      text-align: start;
    `,
    well: css`
      inline-size: 100%;
      background-color: ${euiTheme.colors.lightestShade};
      border-radius: ${euiTheme.border.radius.panel};
    `,
    list: css`
      display: grid;
      grid-template-columns: 1fr;
      align-items: stretch;
      gap: ${euiTheme.size.base};
      margin: 0;
      padding: 0;
      list-style: none;
      inline-size: 100%;

      > li {
        display: flex;
        block-size: 100%;
      }

      @media (min-width: 1200px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      @media (min-width: 1600px) {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }
    `,
    panel: css`
      flex: 1;
      inline-size: 100%;
      block-size: 100%;
      transition: box-shadow ${euiTheme.animation.fast}
        ${euiTheme.animation.resistance};

      /* EuiPanel border is a ::after pseudo, not border-color on the host */
      &::after {
        transition: opacity ${euiTheme.animation.fast}
          ${euiTheme.animation.resistance};
      }

      @media (prefers-reduced-motion: reduce) {
        transition: none;

        &::after {
          transition: none;
        }
      }

      &:hover {
        ${euiShadowHover(euiThemeContext, 'm')}

        &::after {
          opacity: 0;
        }

        [data-card-icon] {
          background-color: var(--eui-background-color-accent);
          color: ${euiTheme.colors.textAccent};
        }
      }
    `,
    body: css`
      display: flex;
      flex-direction: column;
      flex: 1 1 auto;
      /* Override SplitPanel.Inner flex-basis: 0% so body absorbs height, not footer */
      flex-basis: auto;
      min-block-size: 0;
      padding: 0; /* link owns padding so the hit target fills the pane */
    `,
    bodyLink: css`
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: ${euiTheme.size.s};
      flex: 1 1 auto;
      block-size: 100%;
      padding: ${euiTheme.size.l};
      color: inherit;
      text-decoration: none;

      &:hover {
        text-decoration: none;
        color: inherit;
      }
    `,
    icon: css`
      display: flex;
      align-items: center;
      justify-content: center;
      block-size: ${iconSize};
      inline-size: ${iconSize};
      margin-block-end: ${euiTheme.size.s}; /* + bodyLink gap → more space before title */
      border-radius: ${euiTheme.border.radius.control};
      background-color: ${euiTheme.colors.lightestShade};
      color: ${euiTheme.colors.textSubdued};
    `,
    title: css`
      margin: 0;
    `,
    // POC: match EuiEmptyPrompt accent title divider (64×4)
    titleDivider: css`
      display: block;
      flex-shrink: 0;
      inline-size: ${euiTheme.size.xxxxl};
      block-size: ${euiTheme.size.xs};
      margin: 0;
      margin-inline: 0;
      background-color: ${euiTheme.colors.accent};
      border: none;
    `,
    description: css`
      margin: 0;
      color: ${euiTheme.colors.textSubdued};
    `,
    footer: css`
      /* Keep badge rail content-sized; SplitPanel.Inner defaults to equal flex split */
      flex: 0 0 auto;
      flex-basis: auto;
    `,
    badges: css`
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: ${euiTheme.size.xs};

      .euiBadge {
        margin: 0;
        max-inline-size: 100%;
      }
    `,
  };
};

export const HomepageUsers = () => {
  const styles = useEuiMemoizedStyles(getStyles);
  const headingId = useGeneratedHtmlId();

  return (
    <HomepageSection css={styles.section}>
      <EuiTitle size="m">
        <h2 id={headingId} css={styles.heading}>
          Shared foundation
        </h2>
      </EuiTitle>
      <EuiPanel
        color="transparent"
        paddingSize="l"
        hasShadow={false}
        css={styles.well}
      >
        <ul css={styles.list} aria-labelledby={headingId}>
          {CONTENT_DATA.map((item) => (
            <li key={item.title}>
              <EuiSplitPanel.Outer
                direction="column"
                hasBorder
                grow
                responsive={false}
                css={styles.panel}
              >
                <EuiSplitPanel.Inner paddingSize="none" grow css={styles.body}>
                  <EuiLink href={item.href} css={styles.bodyLink}>
                    <span css={styles.icon} data-card-icon aria-hidden="true">
                      <EuiIcon type={item.icon} size="l" />
                    </span>
                    <EuiTitle size="xs">
                      <h3 css={styles.title}>{item.title}</h3>
                    </EuiTitle>
                    <hr aria-hidden css={styles.titleDivider} />
                    <EuiText size="s">
                      <p css={styles.description}>{item.description}</p>
                    </EuiText>
                  </EuiLink>
                </EuiSplitPanel.Inner>
                <EuiSplitPanel.Inner
                  color="subdued"
                  paddingSize="m"
                  grow={false}
                  css={styles.footer}
                >
                  <div css={styles.badges}>
                    {item.badges.map((badge) => (
                      <EuiBadge key={badge.label} color="hollow" href={badge.href}>
                        {badge.label}
                      </EuiBadge>
                    ))}
                  </div>
                </EuiSplitPanel.Inner>
              </EuiSplitPanel.Outer>
            </li>
          ))}
        </ul>
      </EuiPanel>
    </HomepageSection>
  );
};
