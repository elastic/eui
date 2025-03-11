/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { JSX } from 'react';
import { css } from '@emotion/react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useIsBrowser from '@docusaurus/useIsBrowser';
import Layout from '@theme/Layout';
import { useEuiMemoizedStyles, UseEuiTheme } from '@elastic/eui';

import { HomepageHeader } from '../components/homepage/header';
import { HomepageUsers } from '../components/homepage/users';
import { HomepageHighlights } from '../components/homepage/highlights';
import { HomepageBanner } from '../components/homepage/banner';

const getStyles = ({ euiTheme }: UseEuiTheme) => ({
  main: css`
    h1 {
      font-size: 3.43rem;
      line-height: 1.2;
    }

    h2 {
      font-size: var(--eui-font-size-xxl);
      line-height: 1.2;
    }

    h3 {
      font-size: var(--eui-font-size-m);
      line-height: 1.5;
    }

    h4 {
      font-size: var(--eui-font-size-s);
      line-height: 1.5;
    }

    h5,
    h6 {
      font-size: var(--eui-font-size-xs);
      line-height: 1.5;
    }

    margin-block-end: ${euiTheme.size.l};
  `,
});

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const isBrowser = useIsBrowser();
  const styles = useEuiMemoizedStyles(getStyles);

  return (
    <>
      {isBrowser && <HomepageBanner />}
      <Layout title={siteConfig.title} description={siteConfig.tagline}>
        <main css={styles.main}>
          <HomepageHeader />

          <HomepageHighlights />

          <HomepageUsers />
        </main>
      </Layout>
    </>
  );
}
