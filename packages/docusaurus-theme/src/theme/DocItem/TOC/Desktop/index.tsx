/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { JSX } from 'react';
import { css } from '@emotion/react';
import { ThemeClassNames } from '@docusaurus/theme-common';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import TOC from '@theme-original/TOC';
import { useEuiMemoizedStyles, UseEuiTheme } from '@elastic/eui';

const getStyles = ({ euiTheme }: UseEuiTheme) => {
  // Match floating navbar inset (Navbar/Layout) + breathing room under the bar
  const inset = euiTheme.size.m;
  const gap = euiTheme.size.l;

  return {
    toc: css`
      /* Overrides classic TOC sticky top that ignores the inset navbar */
      top: calc(var(--ifm-navbar-height) + ${inset} + ${gap});
      max-height: calc(
        100vh - var(--ifm-navbar-height) - ${inset} - ${gap} - ${inset}
      );
    `,
  };
};

export default function DocItemTOCDesktop(): JSX.Element {
  const { toc, frontMatter } = useDoc();
  const styles = useEuiMemoizedStyles(getStyles);

  return (
    <TOC
      toc={toc}
      minHeadingLevel={frontMatter.toc_min_heading_level}
      maxHeadingLevel={frontMatter.toc_max_heading_level}
      className={ThemeClassNames.docs.docTocDesktop}
      css={styles.toc}
    />
  );
}
