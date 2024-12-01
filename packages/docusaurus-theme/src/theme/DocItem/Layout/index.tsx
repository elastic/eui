/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { JSX } from 'react';
import { EuiHorizontalRule } from '@elastic/eui';
import { css } from '@emotion/react';
import { useWindowSize } from '@docusaurus/theme-common';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import DocItemPaginator from '@theme-original/DocItem/Paginator';
import ContentVisibility from '@theme-original/ContentVisibility';
import DocVersionBanner from '@theme-original/DocVersionBanner';
import DocVersionBadge from '@theme-original/DocVersionBadge';
import * as Props from '@theme-original/DocItem/Layout';

import DocBreadcrumbs from '../../DocBreadcrumbs';
import DocItemTOCMobile from '../TOC/Mobile';
import DocItemTOCDesktop from '../TOC/Desktop';
import DocItemContent from '../Content';
import DocItemFooter from '../Footer';

// converted from css modules to emotion
const styles = {
  docItemContainer: css`
    & header + *,
    & article > *:first-child {
      margin-top: 0;
    }
  `,
  docItemRow: css`
    justify-content: center;
  `,
  docItemCol: css`
    @media (min-width: 997px) {
      max-width: 830px;
    }
  `,
};

/**
 * Decide if the toc should be rendered, on mobile or desktop viewports
 */
function useDocTOC() {
  const { frontMatter, toc } = useDoc();
  const windowSize = useWindowSize();

  const hidden = frontMatter.hide_table_of_contents ?? false;
  const canRender = !hidden && toc.length > 0;

  const mobile = canRender ? <DocItemTOCMobile /> : undefined;

  const desktop =
    canRender && (windowSize === 'desktop' || windowSize === 'ssr') ? (
      <DocItemTOCDesktop />
    ) : undefined;

  return {
    hidden,
    mobile,
    desktop,
  };
}

export default function DocItemLayout({ children }: typeof Props): JSX.Element {
  const docTOC = useDocTOC();
  const { metadata } = useDoc();

  return (
    <div className="row" css={styles.docItemRow}>
      <div className="col" css={styles.docItemCol}>
        <ContentVisibility metadata={metadata} />
        <DocVersionBanner />
        <div css={styles.docItemContainer}>
          <article>
            <DocBreadcrumbs />
            <DocVersionBadge />
            {docTOC.mobile}
            <DocItemContent>{children}</DocItemContent>
            <DocItemFooter />
          </article>
          <EuiHorizontalRule margin="xl" />
          <DocItemPaginator />
        </div>
      </div>
      {docTOC.desktop && <div className="col col--3">{docTOC.desktop}</div>}
    </div>
  );
}
