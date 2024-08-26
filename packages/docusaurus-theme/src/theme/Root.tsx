/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import {
  FunctionComponent,
  PropsWithChildren,
  useEffect,
  useState,
} from 'react';
import Head from '@docusaurus/Head';
import { Props } from '@theme/Root';
import { css, Global } from '@emotion/react';
import { useEuiTheme } from '@elastic/eui';
import '@elastic/eui/dist/eui_theme_light.css';

import { AppThemeProvider } from '../components/theme_context';
import { getGlobalStyles } from './Root.styles';
import { getResetStyles } from './reset.styles';

const styles = {
  root: css`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  `,
};

const _Root: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  const euiTheme = useEuiTheme();
  const globalStyles = getGlobalStyles(euiTheme);
  const resetStyles = getResetStyles(euiTheme);

  // NOTE: This is a temp. solution
  // Emotion styles are loaded dynamically on client in contrast
  // to Docusaurus' SSR content. By rendering the content only
  // after mount we can prevent some quite noticeable style updates
  // and layout shifts. The drawback is that the page initially loads blank.
  // TODO: remove this once we have an approach to inject HTML server-side
  useEffect(() => {
    if (!mounted) {
      setMounted(true);
    }
  }, []);

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300..700&family=Roboto+Mono:ital,wght@0,400..700;1,400..700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Global styles={[resetStyles, globalStyles]} />
      <div style={!mounted ? { display: 'none' } : undefined} css={styles.root}>
        {children}
      </div>
    </>
  );
};

// Wrap docusaurus root component with <EuiProvider>
// See https://docusaurus.io/docs/swizzling#wrapper-your-site-with-root
const Root = ({ children }: Props) => {
  return (
    <AppThemeProvider>
      <_Root>{children}</_Root>
    </AppThemeProvider>
  );
};

export default Root;
