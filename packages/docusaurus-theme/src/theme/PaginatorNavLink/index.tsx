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
import Link from '@docusaurus/Link';
import type { Props } from '@theme-original/PaginatorNavLink';
import { useEuiMemoizedStyles, UseEuiTheme, EuiIcon } from '@elastic/eui';

const getStyles = ({ euiTheme }: UseEuiTheme) => {
  return {
    link: css`
      --ifm-pagination-nav-color-hover: ${euiTheme.colors.primary};

      border: none;
      inline-size: fit-content;
      max-inline-size: 100%;
      padding: ${euiTheme.size.s};
      transition: background-color ${euiTheme.animation.fast}
        ${euiTheme.animation.resistance};

      @media (prefers-reduced-motion: reduce) {
        transition: none;
      }

      &:hover {
        background-color: ${euiTheme.colors.lightestShade};
      }

      .pagination-nav__label {
        display: flex;
        align-items: center;
        gap: ${euiTheme.size.s};

        font-size: var(--eui-font-size-m);
        line-height: var(--eui-line-height-l);
      }

      &.pagination-nav__link--next .pagination-nav__label {
        justify-content: flex-end;
      }

      .pagination-nav__sublabel {
        margin-block-end: ${euiTheme.size.xs};
        font-size: var(--eui-font-size-s);
        line-height: var(--eui-line-height-l);
      }

      &.pagination-nav__link--prev .pagination-nav__sublabel {
        padding-inline-start: ${euiTheme.size.l}; /* 24 — align with title after chevron */
      }

      &.pagination-nav__link--next .pagination-nav__sublabel {
        padding-inline-end: ${euiTheme.size.l}; /* 24 — align with title before chevron */
      }
    `,
  };
};

export default function PaginatorNavLink(props: Props): JSX.Element {
  const { permalink, title, subLabel, isNext } = props;
  const isPrev = !isNext;
  const styles = useEuiMemoizedStyles(getStyles);

  return (
    <Link
      className={clsx(
        'pagination-nav__link',
        isNext ? 'pagination-nav__link--next' : 'pagination-nav__link--prev'
      )}
      css={styles.link}
      to={permalink}
    >
      {subLabel && <div className="pagination-nav__sublabel">{subLabel}</div>}

      <div className="pagination-nav__label">
        {isPrev && <EuiIcon type="chevronSingleLeft" />}
        {title}
        {isNext && <EuiIcon type="chevronSingleRight" />}
      </div>
    </Link>
  );
}
