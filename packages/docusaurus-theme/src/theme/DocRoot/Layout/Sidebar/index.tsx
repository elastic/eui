import React, { type ReactNode, useState, useCallback, JSX } from 'react';
import clsx from 'clsx';
import { css } from '@emotion/react';
import {
  prefersReducedMotion,
  ThemeClassNames,
} from '@docusaurus/theme-common';
import { useDocsSidebar } from '@docusaurus/plugin-content-docs/client';
import { useLocation } from '@docusaurus/router';
import DocSidebar from '@theme-original/DocSidebar';
import type { Props } from '@theme-original/DocRoot/Layout/Sidebar';
import ExpandButton from '@theme-original/DocRoot/Layout/Sidebar/ExpandButton';

// converted from css modules to Emotion
const styles = {
  docSidebarContainer: css`
    display: none;

    @media (min-width: 997px) {
      // ensure scrolling still works
      display: flex;
      width: var(--doc-sidebar-width);
      margin-top: calc(-1 * var(--ifm-navbar-height));
      border-right: 1px solid var(--ifm-toc-border-color);
      will-change: width;
      transition: width var(--ifm-transition-fast) ease;
      clip-path: inset(0);
    }

    .theme-doc-sidebar-menu.menu__list {
      padding-inline-end: var(--eui-size-s);
    }
  `,
  docSidebarContainerHidden: css`
    width: var(--doc-sidebar-hidden-width);
    cursor: pointer;
  `,
  sidebarViewport: css`
    top: 0;
    position: sticky;
    height: 100%;
    max-height: 100vh;
  `,
};

// Reset sidebar state when sidebar changes
// Use React key to unmount/remount the children
// See https://github.com/facebook/docusaurus/issues/3414
function ResetOnSidebarChange({ children }: { children: ReactNode }) {
  const sidebar = useDocsSidebar();
  return (
    <React.Fragment key={sidebar?.name ?? 'noSidebar'}>
      {children}
    </React.Fragment>
  );
}

export default function DocRootLayoutSidebar({
  sidebar,
  hiddenSidebarContainer,
  setHiddenSidebarContainer,
}: Props): JSX.Element {
  const { pathname } = useLocation();

  const [hiddenSidebar, setHiddenSidebar] = useState(false);
  const toggleSidebar = useCallback(() => {
    if (hiddenSidebar) {
      setHiddenSidebar(false);
    }
    // onTransitionEnd won't fire when sidebar animation is disabled
    // fixes https://github.com/facebook/docusaurus/issues/8918
    if (!hiddenSidebar && prefersReducedMotion()) {
      setHiddenSidebar(true);
    }
    setHiddenSidebarContainer((value) => !value);
  }, [setHiddenSidebarContainer, hiddenSidebar]);

  return (
    <aside
      className={clsx(
        ThemeClassNames.docs.docSidebarContainer,
        styles.docSidebarContainer.name // adding the name here to preserve the functionality of the class check further down
      )}
      css={[
        styles.docSidebarContainer,
        hiddenSidebarContainer && styles.docSidebarContainerHidden,
      ]}
      onTransitionEnd={(e) => {
        if (
          !e.currentTarget.classList.contains(styles.docSidebarContainer.name!)
        ) {
          return;
        }

        if (hiddenSidebarContainer) {
          setHiddenSidebar(true);
        }
      }}
    >
      <ResetOnSidebarChange>
        <div
          className={clsx(hiddenSidebar && 'sidebarViewportHidden')}
          css={styles.sidebarViewport}
        >
          <DocSidebar
            sidebar={sidebar}
            path={pathname}
            onCollapse={toggleSidebar}
            isHidden={hiddenSidebar}
          />
          {hiddenSidebar && <ExpandButton toggleSidebar={toggleSidebar} />}
        </div>
      </ResetOnSidebarChange>
    </aside>
  );
}
