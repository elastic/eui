import { css } from '@emotion/react';
import { UseEuiTheme } from '@elastic/eui';

export const getItemStyles = ({ euiTheme }: UseEuiTheme) => ({
  item: css`
    --ifm-breadcrumb-item-background: transparent;
    --ifm-breadcrumb-item-background-active: transparent;

    // overwrite global styles
    &.breadcrumbs__item:not(:last-child):after {
      content: none;
    }

    .breadcrumbs__link {
      padding: 0 ${euiTheme.size.m};
      font-size: var(--eui-font-size-xs);
      line-height: var(--eui-line-height-m);
    }

    a.breadcrumbs__link {
      color: ${euiTheme.colors.link};
      font-weight: ${euiTheme.font.weight.bold};
      text-decoration: underline;
    }

    &.breadcrumbs__item--active .breadcrumbs__link {
      color: ${euiTheme.colors.text};
    }
  `,
  icon: css`
    block-size: ${euiTheme.size.s};
    inline-size: ${euiTheme.size.s};
    fill: ${euiTheme.colors.text};
  `,
});
