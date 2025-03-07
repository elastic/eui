import { JSX } from 'react';
import clsx from 'clsx';
import { css } from '@emotion/react';
import { ThemeClassNames } from '@docusaurus/theme-common';
import { isActiveSidebarItem } from '@docusaurus/plugin-content-docs/client';
import Link from '@docusaurus/Link';
import isInternalUrl from '@docusaurus/isInternalUrl';
import IconExternalLink from '@theme-original/Icon/ExternalLink';
import type { Props } from '@theme-original/DocSidebarItem/Link';
import { useEuiMemoizedStyles, UseEuiTheme } from '@elastic/eui';

// converted from css modules to Emotion
const getStyles = ({ euiTheme }: UseEuiTheme) => ({
  menuListItem: css`
    .menu__link {
      color: ${euiTheme.colors.text};
      font-size: var(--eui-font-size-s);
      line-height: var(--eui-line-height-s);

      @media (min-width: 997px) {
        font-size: var(--eui-font-size-xs);
        line-height: var(--eui-line-height-xs);
      }
    }

    .menu__link--active {
      border-radius: ${euiTheme.border.radius.small};
      color: ${euiTheme.colors.primary};
      font-weight: ${euiTheme.font.weight.bold};
    }
  `,
  menuExternalLink: css`
    align-items: center;
  `,
});

export default function DocSidebarItemLink({
  item,
  onItemClick,
  activePath,
  level,
  index,
  ...props
}: Props): JSX.Element {
  const { href, label, className, autoAddBaseUrl } = item;
  const isActive = isActiveSidebarItem(item, activePath);
  const isInternalLink = isInternalUrl(href);

  const styles = useEuiMemoizedStyles(getStyles);

  return (
    <li
      className={clsx(
        ThemeClassNames.docs.docSidebarItemLink,
        ThemeClassNames.docs.docSidebarItemLinkLevel(level),
        'menu__list-item',
        className
      )}
      key={label}
      css={styles.menuListItem}
    >
      <Link
        className={clsx(
          'menu__link',
          !isInternalLink && styles.menuExternalLink,
          {
            'menu__link--active': isActive,
          }
        )}
        autoAddBaseUrl={autoAddBaseUrl}
        aria-current={isActive ? 'page' : undefined}
        to={href}
        {...(isInternalLink && {
          onClick: onItemClick ? () => onItemClick(item) : undefined,
        })}
        {...props}
      >
        {label}
        {!isInternalLink && <IconExternalLink />}
      </Link>
    </li>
  );
}
