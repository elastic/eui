import { css } from '@emotion/react';
import Heading from '@theme/Heading';
import NavbarSearch from '@theme/Navbar/Search';
import SearchBar from '@theme/SearchBar';
import {
  EuiButton,
  EuiDescriptionList,
  EuiDescriptionListDescription,
  EuiDescriptionListTitle,
  EuiLink,
  useEuiMemoizedStyles,
  UseEuiTheme,
} from '@elastic/eui';
import {
  euiFormVariables,
  // @ts-ignore - reusing form styles as we don't have access to the plugin component yet
} from '@elastic/eui/lib/components/form/form.styles';

import { HomepageContainer } from '../layout';
import { DecorRight } from './decor_right';
import { DecorLeft } from './decor_left';

const title = 'Meet the EUI framework';
const tagline = 'powering the Elastic Stack';

const DESCRIPTION_DATA = [
  {
    title: 'Flexible and composable',
    text: 'Mix and match a wide range of powerful components and adapt to every situation',
  },
  {
    title: 'Accessible',
    text: 'Ensure a seamless experience for all users with accessibility at the core of the framework',
  },
  {
    title: 'Well documented and tested',
    text: 'Build your designs and code with confidence in a reliable and fully documented framework',
  },
];

const getStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  const form = euiFormVariables(euiThemeContext);

  return {
    hero: css`
      --ifm-hero-background-color: transparent;
      --banner-title-font-size: 3.43rem;

      --hero-decor-fill-white: ${euiTheme.colors.ghost};
      --hero-decor-fill-background: ${euiTheme.colors.body};
      --hero-decor-fill-lightShade: ${euiTheme.colors.lightShade};
      --hero-decor-fill-brand-primary: ${euiTheme.colors.primary};
      --hero-decor-fill-brand-accent: ${euiTheme.colors.accent};
      --hero-decor-fill-brand-success: ${euiTheme.colors.success};
      --hero-decor-fill-brand-warning: ${euiTheme.colors.warning};
      --hero-decor-fill-brand-poppy: #ff957d;

      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
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

      p {
        margin: 0;
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

      // override original header use case behavior
      .ds-dropdown-menu {
        position: absolute !important;

        &:before {
          left: ${euiTheme.size.xl}; // align caret with search input
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
    decor: {
      wrapper: css`
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        overflow: hidden;
        z-index: -1;
      `,
      decor: css`
        position: absolute;
        top: 0;
        block-size: 100%;
        inline-size: 15%;

        > svg {
          position: absolute;
        }

        @media (max-width: 996px) {
          display: none;
        }
      `,
      left: css`
        left: 0;

        > svg {
          right: 0;
        }
      `,
      right: css`
        right: 0;

        > svg {
          left: 0;
        }
      `,
    },
  };
};

export function HomepageHeader() {
  const styles = useEuiMemoizedStyles(getStyles);

  return (
    <header css={styles.hero}>
      <div css={styles.decor.wrapper}>
        <div css={[styles.decor.decor, styles.decor.left]}>
          <DecorLeft />
        </div>
        <div css={[styles.decor.decor, styles.decor.right]}>
          <DecorRight />
        </div>
      </div>
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
            <EuiButton
              href="./docs/guidelines/getting-started"
              fill
              css={styles.button}
            >
              Get started
            </EuiButton>
            <EuiLink
              href="https://github.com/elastic/eui/tree/main/packages/eui/changelogs"
              target="_blank"
            >
              What's new?
            </EuiLink>
            <EuiLink
              href="https://github.com/elastic/eui/tree/main/wiki/contributing-to-eui"
              target="_blank"
            >
              Contribute
            </EuiLink>
          </div>
        </div>

        <div css={styles.right}>
          <EuiDescriptionList aria-label="Benefits of EUI">
            {DESCRIPTION_DATA &&
              DESCRIPTION_DATA.map((description) => (
                <div key={description.title} css={styles.listItem}>
                  <EuiDescriptionListTitle>
                    {description.title}
                  </EuiDescriptionListTitle>
                  <EuiDescriptionListDescription>
                    {description.text}
                  </EuiDescriptionListDescription>
                </div>
              ))}
          </EuiDescriptionList>
        </div>
      </HomepageContainer>
    </header>
  );
}
