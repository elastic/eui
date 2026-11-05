/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { JSX } from 'react';
import { css } from '@emotion/react';
import Link from '@docusaurus/Link';
import type { Props } from '@theme-original/TOCItems/Tree';
import { useEuiMemoizedStyles, UseEuiTheme } from '@elastic/eui';

const getStyles = ({ euiTheme }: UseEuiTheme) => {
  return {
    list: css`
      // ensure specificity to apply override
      :is(ul) li {
        margin: 0;
      }

      &:is(ul.table-of-contents) {
        padding: ${euiTheme.size.m};
        border-block-start: ${euiTheme.border.width.thin} solid
          ${euiTheme.border.color};
      }

      .tree-item__inner {
        font-size: var(--eui-font-size-s);
        line-height: var(--eui-line-height-s);
      }

      @media (min-width: 997px) {
        &:is(ul.table-of-contents) {
          padding: 0;
          border: none;
        }

        .tree-item__inner {
          display: flex;
          flex-direction: column;
          /* POC: 6px — between xs (4) and s (8) */
          padding: 6px ${euiTheme.size.m} 6px 0;
          font-size: var(--eui-font-size-s);
          line-height: var(--eui-line-height-s);
        }

        // apply the decor border only to top level tree items.
        // Keep width constant (thick) so active color change doesn't shift text.
        &.table-of-contents > li > .tree-item__inner {
          padding: ${euiTheme.size.xs} ${euiTheme.size.m};
          border-inline-start: ${euiTheme.border.width.thick} solid
            ${euiTheme.border.color};

          &:has(.table-of-contents__link--active) {
            border-inline-start-color: ${euiTheme.colors.primary};
          }
        }
      }

      .table-of-contents__link--active {
        color: ${euiTheme.colors.textPrimary};
        font-weight: ${euiTheme.font.weight.semiBold};
      }
    `,
    listChild: css`
      padding-inline-start: ${euiTheme.size.m};
    `,
    link: css`
      color: ${euiTheme.colors.textSubdued};

      &:hover {
        color: ${euiTheme.colors.textParagraph};
        text-decoration: none;
      }
    `,
  };
};

// Recursive component rendering the toc tree
function TOCItemTree({
  toc,
  className,
  linkClassName,
  isChild,
}: Props): JSX.Element | null {
  const styles = useEuiMemoizedStyles(getStyles);

  if (!toc.length) {
    return null;
  }

  return (
    <ul
      className={isChild ? undefined : className}
      css={[styles.list, isChild && styles.listChild]}
    >
      {toc.map((heading) => (
        <li key={heading.id}>
          <span className="tree-item__inner">
            <Link
              to={`#${heading.id}`}
              css={styles.link}
              className={linkClassName ?? undefined}
              // Developer provided the HTML, so assume it's safe.
              dangerouslySetInnerHTML={{ __html: heading.value }}
            />
            <TOCItemTree
              isChild
              toc={heading.children}
              className={className}
              linkClassName={linkClassName}
            />
          </span>
        </li>
      ))}
    </ul>
  );
}

// Memo only the tree root is enough
export default React.memo(TOCItemTree);
