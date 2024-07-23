import React, { useState } from 'react';
import { css } from '@emotion/react';
import { useDocsSidebar } from '@docusaurus/theme-common/internal';
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
  const sidebar = useDocsSidebar();
  const [hiddenSidebarContainer, setHiddenSidebarContainer] = useState(false);
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
