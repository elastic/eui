import { css } from '@emotion/react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import NavbarSearch from '@theme/Navbar/Search';
import SearchBar from '@theme/SearchBar';
import {
  EuiButton,
  EuiDescriptionList,
  EuiDescriptionListDescription,
  EuiDescriptionListTitle,
  EuiIcon,
  EuiLink,
  useEuiMemoizedStyles,
  UseEuiTheme,
} from '@elastic/eui';
import {
  euiFormVariables,
  // @ts-ignore - reusing form styles as we don't have access to the plugin component yet
} from '@elastic/eui/lib/components/form/form.styles';

import { HomepageContainer } from '../layout';

const title = 'Meet the EUI framework';
const tagline = 'powering the Elastic stack';

const getStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  const form = euiFormVariables(euiThemeContext);

  return {
    hero: css`
      --ifm-hero-background-color: transparent;
      --banner-title-font-size: 3.43rem;

      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      inline-size: 100%;
      min-block-size: 40rem;
      padding: 7rem 0;

      color: ${euiTheme.colors.text};
    `,
    left: css`
      flex: 1;
      max-inline-size: 52rem;
    `,
    right: css`
      flex: 0 0 33%;
    `,
    title: css`
      margin-block-end: ${euiTheme.size.xxxl};
      font-size: var(--banner-title-font-size);
      font-weight: ${euiTheme.font.weight.bold};
      line-height: normal;
      text-wrap: balance;

      > h1 {
        margin: 0;
        font-size: inherit;
        line-height: inherit;
      }
    `,
    underscore: css`
      animation: blink 1.5s step-end infinite;
      -webkit-animation: blink 1.5s step-end infinite;

      @keyframes blink {
        50% {
          opacity: 0;
        }
      }

      @-webkit-keyframes blink {
        50% {
          opacity: 0;
        }
      }
    `,
    tagline: css`
      color: ${euiTheme.colors.primary};
    `,
    search: css`
      margin-block-end: ${euiTheme.size.l};

      > :first-child {
        position: relative;
        right: 0;
        padding: 0;
        margin: 0;
      }

      .navbar__search > :nth-child(2) {
        inline-size: 100%;
      }

      .navbar__search-input {
        inline-size: 100%;
        max-inline-size: 100%;
        block-size: ${form.controlHeight};
      }

      // overwrride original header use case behavior
      .ds-dropdown-menu {
        position: absolute !important;

        &:before {
          left: ${euiTheme.size.xl}; // align carret with search input
        }
      }
    `,
    actions: css`
      display: flex;
      align-items: center;
      gap: ${euiTheme.size.xl};

      .button {
        display: flex;
        align-items: center;
      }
    `,
    button: css`
      padding-inline: ${euiTheme.size.l};

      &:hover {
        color: ${euiTheme.colors.ghost};
      }
    `,
    icon: css`
      margin-inline-start: ${euiTheme.size.s};
    `,
    listItem: css`
      padding-inline-start: ${euiTheme.size.l};
      border-inline-start: 4px solid ${euiTheme.colors.primary};

      & + & {
        margin-block-start: ${euiTheme.size.xl};
      }

      &:nth-child(2) {
        border-color: ${euiTheme.colors.accent};
      }

      &:nth-child(3) {
        border-color: ${euiTheme.colors.warning};
      }
    `,
  };
};

export function HomepageHeader() {
  const styles = useEuiMemoizedStyles(getStyles);

  return (
    <header className={clsx('hero hero--primary')} css={styles.hero}>
      <HomepageContainer>
        <div css={styles.left}>
          <div css={styles.title}>
            <Heading as="h1">{title},</Heading>
            <p css={styles.tagline}>
              {tagline}
              <span css={styles.underscore}>_</span>
            </p>
          </div>
          <div css={styles.search}>
            <NavbarSearch>
              <SearchBar />
            </NavbarSearch>
          </div>
          <div css={styles.actions}>
            <EuiButton href="/docs" fill css={styles.button}>
              Get started
              <EuiIcon type="arrowRight" size="s" />
            </EuiButton>
            <EuiLink href="https://github.com/elastic/eui/tree/main/packages/eui/changelogs">
              What's new?
            </EuiLink>
          </div>
        </div>

        <div css={styles.right}>
          <EuiDescriptionList aria-label="Benefits of EUI">
            <div css={styles.listItem}>
              <EuiDescriptionListTitle>
                Flexible and composable
              </EuiDescriptionListTitle>
              <EuiDescriptionListDescription>
                Allows designers and developers to easily mix and match
                components to fit various needs
              </EuiDescriptionListDescription>
            </div>

            <div css={styles.listItem}>
              <EuiDescriptionListTitle>Accessible</EuiDescriptionListTitle>
              <EuiDescriptionListDescription>
                Designed with accessibility in mind, ensures that all users have
                a seamless experience
              </EuiDescriptionListDescription>
            </div>

            <div css={styles.listItem}>
              <EuiDescriptionListTitle>
                Well documented and tested
              </EuiDescriptionListTitle>
              <EuiDescriptionListDescription>
                Provides developers with reliable guidance and confidence in the
                system’s stability
              </EuiDescriptionListDescription>
            </div>
          </EuiDescriptionList>
        </div>
      </HomepageContainer>
    </header>
  );
}
