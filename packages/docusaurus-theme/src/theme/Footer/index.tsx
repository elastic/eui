/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import {
  EuiText,
  UseEuiTheme,
  EuiThemeProvider,
  useEuiMemoizedStyles,
} from '@elastic/eui';
import { useThemeConfig } from '@docusaurus/theme-common';
import { euiLinkStyles } from '@elastic/eui/es/components/link/link.styles';

const getFooterStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  return {
    root: css`
      background: ${euiTheme.colors
        .backgroundBaseSubdued}; // Color not available in EUI
      padding: ${euiTheme.size.l};
      text-align: center;
    `,
    text: css`
      line-height: var(--eui-line-height-s);

      a {
        ${euiLinkStyles(euiThemeContext).euiLink}
        ${euiLinkStyles(euiThemeContext).primary}
      }
    `,
    heart: css`
      color: ${euiTheme.colors.accent};
    `,
  };
};

const _Footer = () => {
  const styles = useEuiMemoizedStyles(getFooterStyles);
  const { footer } = useThemeConfig();

  return (
    <footer css={styles.root}>
      <EuiText
        textAlign="center"
        size="s"
        css={styles.text}
        dangerouslySetInnerHTML={{ __html: footer?.copyright ?? '' }}
      />
    </footer>
  );
};

const Footer = () => {
  return (
    <EuiThemeProvider colorMode="dark">
      <_Footer />
    </EuiThemeProvider>
  );
};

export default Footer;
