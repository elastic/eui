/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { useEffect, useState, JSX } from 'react';
import { css } from '@emotion/react';
import { useDocsSidebar } from '@docusaurus/plugin-content-docs/client';
import useIsBrowser from '@docusaurus/useIsBrowser';
import BackToTopButton from '@theme-original/BackToTopButton';
import type { Props } from '@theme-original/DocRoot/Layout';
import DocRootLayoutSidebar from '@theme-original/DocRoot/Layout/Sidebar';

import DocRootLayoutMain from './Main';

// converted from css modules to Emotion
const styles = {
  docRoot: css`
    display: flex;
    width: 100%;
  `,
  docsWrapper: css`
    display: flex;
    flex: 1 0 auto;
  `,
};

export default function DocRootLayout({ children }: Props): JSX.Element {
  const isBrowser = useIsBrowser();
  const sidebar = useDocsSidebar();
  const [hiddenSidebarContainer, setHiddenSidebarContainer] = useState(false);

  // Replicate browser hash scroll behavior to trigger it after the MDX content
  // is rendered. Timeout = 0 should do the job here just fine as the effect
  // will get executed at next render cycle when all elements are (hopefully)
  // already in the DOM.
  useEffect(() => {
    if (!isBrowser) {
      return;
    }

    if (window.location.hash) {
      setTimeout(() => {
        const element = document.getElementById(
          window.location.hash.substring(1)
        );
        element?.scrollIntoView(true);
      }, 100);
    }
  }, [isBrowser]);

  return (
    <div css={styles.docsWrapper}>
      <BackToTopButton />
      <div css={styles.docRoot}>
        {sidebar && (
          <DocRootLayoutSidebar
            sidebar={sidebar.items}
            hiddenSidebarContainer={hiddenSidebarContainer}
            setHiddenSidebarContainer={setHiddenSidebarContainer}
          />
        )}
        <DocRootLayoutMain hiddenSidebarContainer={hiddenSidebarContainer}>
          {children}
        </DocRootLayoutMain>
      </div>
    </div>
  );
}
