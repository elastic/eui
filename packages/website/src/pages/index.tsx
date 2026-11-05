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
import Layout from '@theme/Layout';
import {
  EuiHorizontalRule,
  useEuiMemoizedStyles,
  UseEuiTheme,
} from '@elastic/eui';

import { HomepageAmbientBg } from '../components/homepage/ambient_bg';
import { HomepageDocLayout } from '../components/homepage/doc_layout';
import { HomepageHeader } from '../components/homepage/header';
import { HomepageUsers } from '../components/homepage/users';

const getStyles = ({ euiTheme }: UseEuiTheme) => ({
  content: css`
    /* Sit above the fixed main-column ambient canvas */
    position: relative;
    z-index: 1;

    h1 {
      font-size: 3.43rem;
      line-height: 1.2;
    }

    /* Skip EuiTitle so size props (e.g. Categories) wire through */
    h2:not(.euiTitle) {
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
    inline-size: 100%;
  `,
});

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const styles = useEuiMemoizedStyles(getStyles);

  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <HomepageDocLayout>
        <HomepageAmbientBg />
        <div css={styles.content}>
          <HomepageHeader />
          <EuiHorizontalRule margin="xl" />
          <HomepageUsers />
        </div>
      </HomepageDocLayout>
    </Layout>
  );
}
