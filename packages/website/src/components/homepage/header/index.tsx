import { css } from '@emotion/react';
import Heading from '@theme/Heading';
import NavbarSearch from '@theme/Navbar/Search';
import SearchBar from '@theme/SearchBar';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {
  EuiButton,
  EuiButtonEmpty,
  useEuiMemoizedStyles,
  UseEuiTheme,
} from '@elastic/eui';
import {
  euiFormVariables,
  // @ts-ignore - reusing form styles as we don't have access to the plugin component yet
} from '@elastic/eui/lib/components/form/form.styles';

import euiVersions from '@site/static/versions.json';

import { HomepageContainer } from '../layout';

const TITLE = 'EUI';
const SUBTITLE = 'The design system for user interfaces at Elastic.';
// Match navbar version switcher: first entry is the current/latest release
const CURRENT_VERSION = euiVersions?.euiVersions?.[0];

const getStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  const form = euiFormVariables(euiThemeContext);

  return {
    hero: css`
      --ifm-hero-background-color: transparent;
      --banner-title-font-size: 2.75rem;

      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: stretch;
      inline-size: 100%;
      /* POC: 80px — no size token between xxxxl (64) and larger */
      padding-block: 80px;

      color: ${euiTheme.colors.text};
    `,
    container: css`
      align-items: flex-start;
      justify-content: flex-start;
      margin-inline: 0;
      max-inline-size: 40rem;
      /* Match Categories panel padding; DocRoot main owns the page inset */
      padding: 0 ${euiTheme.size.l};

      @media (min-width: 997px) {
        padding: 0 ${euiTheme.size.l};
      }
    `,
    content: css`
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      inline-size: 100%;
      text-align: start;
    `,
    title: css`
      margin-block-end: ${euiTheme.size.xl};
      text-wrap: balance;
    `,
    titleRow: css`
      display: flex;
      align-items: center;
      gap: ${euiTheme.size.m};
      margin-block-end: ${euiTheme.size.base};

      > h1 {
        margin: 0;
        font-size: var(--banner-title-font-size);
        /* POC: heavier than theme bold (600) for this hero lockup only */
        font-weight: 800;
        line-height: 1;
        letter-spacing: -0.6px;
      }
    `,
    logo: css`
      display: block;
      flex-shrink: 0;
      block-size: var(--banner-title-font-size);
      inline-size: var(--banner-title-font-size);
    `,
    subtitle: css`
      margin: 0;
      font-size: var(--eui-font-size-l);
      line-height: var(--eui-line-height-l);
      color: ${euiTheme.colors.textSubdued};
      font-weight: ${euiTheme.font.weight.regular};
    `,
    search: css`
      inline-size: 100%;
      margin-block-end: ${euiTheme.size.xl};

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
        border-radius: ${euiTheme.border.radius.control};
      }

      .ds-dropdown-menu {
        position: absolute !important;
        text-align: start;

        &:before {
          left: ${euiTheme.size.xl};
        }
      }
    `,
    actions: css`
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: flex-start;
      gap: ${euiTheme.size.s};
    `,
  };
};

export function HomepageHeader() {
  const styles = useEuiMemoizedStyles(getStyles);
  const logoSrc = useBaseUrl('/images/eui_logo.svg');

  return (
    <header css={styles.hero}>
      <HomepageContainer layout="column" css={styles.container}>
        <div css={styles.content}>
          <div css={styles.title}>
            <div css={styles.titleRow}>
              <img
                src={logoSrc}
                alt=""
                css={styles.logo}
                width={44}
                height={44}
              />
              <Heading as="h1">{TITLE}</Heading>
            </div>
            <p css={styles.subtitle}>{SUBTITLE}</p>
          </div>
          <div css={styles.search}>
            <NavbarSearch>
              <SearchBar />
            </NavbarSearch>
          </div>
          <div css={styles.actions}>
            <EuiButton
              href="./docs/getting-started/setup/"
              fill
              iconType="download"
              iconSide="left"
            >
              {CURRENT_VERSION ? `Install v${CURRENT_VERSION}` : 'Install'}
            </EuiButton>
            <EuiButtonEmpty
              href="https://github.com/elastic/eui"
              target="_blank"
              color="text"
              iconType="logoGithub"
              iconSide="left"
            >
              GitHub
            </EuiButtonEmpty>
          </div>
        </div>
      </HomepageContainer>
    </header>
  );
}
