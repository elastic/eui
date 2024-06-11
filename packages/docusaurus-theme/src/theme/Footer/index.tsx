import { css } from '@emotion/react';
import { EuiText, EuiLink, UseEuiTheme, EuiThemeProvider, useEuiMemoizedStyles } from '@elastic/eui';

const ELASTIC_LICENSE_URL = "https://github.com/elastic/eui/blob/main/licenses/ELASTIC-LICENSE-2.0.md";
const SSPL_LICENSE_URL = "https://github.com/elastic/eui/blob/main/licenses/SSPL-LICENSE.md";

const getFooterStyles = ({ euiTheme }: UseEuiTheme) => {
  return {
    root: css`
      background: #1C1E23; // Color not available in EUI
      border-radius: ${euiTheme.size.s} ${euiTheme.size.s} 0 0;
      padding: ${euiTheme.size.l};
      text-align: center;
    `,
    heart: css`
      color: ${euiTheme.colors.accent};
    `,
  };
};

const Footer = () => {
  const styles = useEuiMemoizedStyles(getFooterStyles);

  return (
    <EuiThemeProvider colorMode="inverse">
      <footer css={styles.root}>
        <EuiText textAlign="center" size="s">
          EUI is dual-licensed under {' '}
          <EuiLink href={ELASTIC_LICENSE_URL}>
            Elastic License 2.0
          </EuiLink>
          {' and '}
          <EuiLink href={SSPL_LICENSE_URL}>
            Server Side Public License, v 1
          </EuiLink>
          {' | '}
          Crafted with <span role="img" aria-label="love" css={styles.heart}>❤</span> by{' '}
          <EuiLink href="https://elastic.co">
            Elastic
          </EuiLink>
        </EuiText>
      </footer>
    </EuiThemeProvider>
  );
};

export default Footer;
