import React, { useEffect, useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { useLocation } from 'react-router-dom';
import { css } from '@emotion/css';

import { EuiButtonIcon, useEuiTheme, logicalCSS } from '../../../../src';

export const useHeadingAnchorLinks = () => {
  const { pathname } = useLocation();
  const { euiTheme } = useEuiTheme();

  const [headingNodes, setHeadingNodes] = useState<Element[]>([]);

  // Find all heading nodes with an `id` attribute on page load/change
  useEffect(() => {
    const content = document.querySelector('main');
    if (!content) return;

    const headingsWithIds = content.querySelectorAll(
      'h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]'
    );
    if (!headingsWithIds.length) return;

    // Filter out headings inside component examples (e.g. EuiSideNav, EuiCollapsibleNav)
    const documentationHeadings = Array.from(headingsWithIds).filter(
      (item) => !item.parentElement?.closest('[data-eui-docs-example]')
    );

    setHeadingNodes(documentationHeadings);
  }, [pathname]);

  // Portal a link icon to each heading node that allows users
  // to quickly get/copy the heading anchor link
  const anchorLinks = useMemo(
    () => (
      <>
        {headingNodes.map((heading) => {
          const headingCss = css`
            &:hover [data-anchor-link] {
              opacity: 1;
            }
          `;
          const linkCss = css`
            opacity: 0;
            ${logicalCSS('margin-left', euiTheme.size.s)}

            &:hover,
                &:focus {
              opacity: 1;
            }
          `;

          heading.classList.add(headingCss);

          return createPortal(
            <EuiButtonIcon
              data-anchor-link
              iconType="link"
              color="text"
              size="xs"
              className={linkCss}
              aria-label="Go to heading anchor link"
              href={`#${pathname}#${heading.id}`}
            />,
            heading
          );
        })}
      </>
    ),
    [headingNodes] // eslint-disable-line react-hooks/exhaustive-deps
  );

  return anchorLinks;
};
