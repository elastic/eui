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
        border-top: ${euiTheme.border.width.thin} solid ${euiTheme.border.color};
      }

      .tree-item__inner {
        font-size: var(--eui-font-size-s);
        line-height: var(--eui-line-height-l);
      }

      @media (min-width: 997px) {
        &:is(ul.table-of-contents) {
          padding: 0;
          border: none;
        }

        .tree-item__inner {
          display: flex;
          flex-direction: column;
          padding: ${euiTheme.size.s} ${euiTheme.size.m} ${euiTheme.size.s} 0;
          font-size: var(--eui-font-size-xs);
          line-height: var(--eui-line-height-xxs);
        }

        // apply the decor border only to top level tree items
        &.table-of-contents > li > .tree-item__inner {
          padding: ${euiTheme.size.s} ${euiTheme.size.m};
          border-left: ${euiTheme.border.width.thick} solid
            ${euiTheme.border.color};

          &:has(.table-of-contents__link--active) {
            border-left-color: ${euiTheme.colors.link};
          }
        }
      }

      .table-of-contents__link--active {
        color: ${euiTheme.colors.link};
      }
    `,
    listChild: css`
      padding-inline-start: ${euiTheme.size.m};
    `,
    link: css`
      color: ${euiTheme.colors.textParagraph};
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
