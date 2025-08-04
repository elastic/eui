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
import TOCCollapsible from '@theme-original/TOCCollapsible';

// converted from css modules to emotion
const tocStyles = {
  tocMobile: css`
    @media print {
      display: none;
    }
  `,
};

export default function DocItemTOCMobile(): JSX.Element {
  const { toc, frontMatter } = useDoc();
  return (
    <TOCCollapsible
      toc={toc}
      minHeadingLevel={frontMatter.toc_min_heading_level}
      maxHeadingLevel={frontMatter.toc_max_heading_level}
      className={ThemeClassNames.docs.docTocMobile}
      css={tocStyles.tocMobile}
    />
  );
}
