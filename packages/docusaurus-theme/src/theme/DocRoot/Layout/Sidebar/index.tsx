/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

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
import { useEuiMemoizedStyles, UseEuiTheme } from '@elastic/eui';

const getStyles = ({ euiTheme }: UseEuiTheme) => {
  const offset = euiTheme.size.m;

  return {
    docSidebarContainer: css`
      display: none;

      @media (min-width: 997px) {
        display: flex;
        flex-direction: column;
        width: var(--doc-sidebar-width);
        margin-top: calc(-1 * var(--ifm-navbar-height));
        padding-block-start: calc(var(--ifm-navbar-height) + ${offset});
        padding-block-end: ${offset};
        padding-inline: ${offset};
        background: transparent;
        border: none;
        border-inline-end: ${euiTheme.border.width.thin} solid
          ${euiTheme.border.color};
        will-change: width;
        transition: width var(--ifm-transition-fast) ease;

        .menu {
          --ifm-menu-link-padding-vertical: ${euiTheme.size.s};
          overflow-x: visible;
          scrollbar-gutter: auto;
        }

        @supports (scrollbar-gutter: stable) {
          .menu {
            scrollbar-gutter: auto;
          }
        }

        .menu__list .menu__list {
          flex: 0 0 auto;
          width: 100%;
          max-width: 100%;
          box-sizing: border-box;
        }
      }
    `,
    docSidebarContainerHidden: css`
      width: var(--doc-sidebar-hidden-width);
      cursor: pointer;
    `,
    sidebarViewport: css`
      top: calc(var(--ifm-navbar-height) + ${offset});
      position: sticky;
      display: flex;
      flex-direction: column;
      height: calc(100vh - var(--ifm-navbar-height) - ${offset} * 2);
      max-height: calc(100vh - var(--ifm-navbar-height) - ${offset} * 2);
      /* Title is fixed; menu inside Content scrolls */
      overflow: hidden;

      /*
        Classic DocSidebar Desktop CSS module sets
        width: var(--doc-sidebar-width) on its root — same as the aside —
        so it overflows our panel padding and clips active items on the right.
       */
      & > div {
        display: flex;
        flex-direction: column;
        width: 100%;
        max-width: 100%;
        height: 100%;
        min-height: 0;
        padding-top: 0;
        box-sizing: border-box;
      }
    `,
  };
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
  const styles = useEuiMemoizedStyles(getStyles);

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
        styles.docSidebarContainer.name
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
