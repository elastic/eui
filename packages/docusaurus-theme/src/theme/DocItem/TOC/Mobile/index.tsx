import { JSX } from 'react';
import { css } from '@emotion/react';
import { ThemeClassNames } from '@docusaurus/theme-common';
import { useDoc } from '@docusaurus/plugin-content-docs/client';

import TOCCollapsible from '@theme-original/TOCCollapsible';

// converted from css modules to emotion
const tocStyles = {
  tocMobile: css`
    @media (min-width: 997px) {
      /* Prevent hydration FOUC, as the mobile TOC needs to be server-rendered */
      display: none;
    }

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
