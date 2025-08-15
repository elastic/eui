/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { JSX } from 'react';
import clsx from 'clsx';
import { css } from '@emotion/react';
import { useDocsSidebar } from '@docusaurus/plugin-content-docs/client';
import type { Props } from '@theme-original/DocRoot/Layout/Main';

// converted from css modules to Emotion
const styles = {
  docMainContainer: css`
    display: flex;
    width: 100%;

    @media (min-width: 997px) {
      flex-grow: 1;
      max-width: calc(100% - var(--doc-sidebar-width));
    }
  `,
  docMainContainerEnhanced: css`
    @media (min-width: 997px) {
      max-width: calc(100% - var(--doc-sidebar-hidden-width));
    }
  `,
  docItemWrapperEnhanced: css`
    @media (min-width: 997px) {
      max-width: calc(
        var(--ifm-container-width) + var(--doc-sidebar-width)
      ) !important;
    }
  `,
};

export default function DocRootLayoutMain({
  hiddenSidebarContainer,
  children,
}: Props): JSX.Element {
  const sidebar = useDocsSidebar();
  return (
    <main
      className={clsx(styles.docMainContainer)}
      css={[
        styles.docMainContainer,
        (hiddenSidebarContainer || !sidebar) && styles.docMainContainerEnhanced,
      ]}
    >
      <div
        className="container padding-top--md padding-bottom--lg"
        css={[hiddenSidebarContainer && styles.docItemWrapperEnhanced]}
      >
        {children}
      </div>
    </main>
  );
}
