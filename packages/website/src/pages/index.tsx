/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import { useEuiMemoizedStyles, UseEuiTheme } from '@elastic/eui';

import { HomepageHeader } from '../components/homepage/header';
import { HomepageUsers } from '../components/homepage/users';
import { HomepageHighlights } from '../components/homepage/highlights';

const getStyles = ({ euiTheme }: UseEuiTheme) => ({
  main: css`
    --ifm-h2-font-size: var(--eui-font-size-xxl);

    margin-block-end: ${euiTheme.size.l};
  `,
});

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const styles = useEuiMemoizedStyles(getStyles);

  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <main css={styles.main}>
        <HomepageHeader />

        <HomepageHighlights />

        <HomepageUsers />
      </main>
    </Layout>
  );
}
