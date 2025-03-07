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

      border: ${euiTheme.border.thin};

      .pagination-nav__label {
        display: flex;
        align-items: center;

        font-size: var(--eui-font-size-m);
        line-height: var(--eui-line-height-l);
      }

      &.pagination-nav__link--next .pagination-nav__label {
        justify-content: flex-end;
      }

      .pagination-nav__label::before,
      .pagination-nav__label::after {
        content: '';
      }

      .pagination-nav__sublabel {
        margin-block-end: ${euiTheme.size.xs};
        font-size: var(--eui-font-size-s);
        line-height: var(--eui-line-height-l);
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
        {isPrev && <EuiIcon type="arrowLeft" />}
        {title}
        {isNext && <EuiIcon type="arrowRight" />}
      </div>
    </Link>
  );
}
