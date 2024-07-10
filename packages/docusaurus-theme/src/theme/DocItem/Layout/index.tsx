import React from 'react';
import { css } from '@emotion/react';
import { useWindowSize } from '@docusaurus/theme-common';
import { useDoc } from '@docusaurus/theme-common/internal';
import DocItemPaginator from '@theme-original/DocItem/Paginator';
import Unlisted from '@theme-original/Unlisted';
import * as Props from '@theme-original/DocItem/Layout';
import { EuiHorizontalRule } from '@elastic/eui';

import DocVersionBanner from '../../DocVersionBanner';
import DocVersionBadge from '../../DocVersionBadge';
import DocBreadcrumbs from '../../DocBreadcrumbs';
import DocItemContent from '../Content';
import DocItemTOCMobile from '../TOC/Mobile';
import DocItemTOCDesktop from '../TOC/Desktop';
import DocItemFooter from '../Footer';

// converted from css modules to emotion
const layoutStyles = {
  docItemContainer: css`
    max-width: 764px;
    margin: auto;

    & header + *,
    & article > *:first-child {
      margin-top: 0;
    }
  `,
  docItemCol: css`
    @media (min-width: 997px) {
      max-width: 75% !important;
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
  const {
    metadata: { unlisted },
  } = useDoc();
  return (
    <div className="row">
      <div className="col" css={layoutStyles.docItemCol}>
        {unlisted && <Unlisted />}
        <DocVersionBanner />
        <div css={layoutStyles.docItemContainer}>
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
