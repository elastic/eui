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
      color: ${euiTheme.colors.textSubdued};
      font-size: var(--eui-font-size-s);
      line-height: var(--eui-line-height-s);
      font-weight: ${euiTheme.font.weight.regular};
      border-radius: ${euiTheme.border.radius.control};
      /* 4px 8px — tighter vertical than category collapsible inset */
      padding: ${euiTheme.size.xs} ${euiTheme.size.s};

      &:hover {
        color: ${euiTheme.colors.textSubdued};
        background-color: ${euiTheme.colors.backgroundBaseInteractiveHover};
      }
    }

    .menu__link--active:not(.menu__link--sublist) {
      color: ${euiTheme.colors.textHeading};
      font-weight: ${euiTheme.font.weight.semiBold};
      background-color: ${euiTheme.colors.backgroundLightText};
    }
  `,
  // Leaves at levels 1–2 sit beside categories — match group title weight/color.
  // Level 3+ stay subdued so nested page lists read as children.
  menuListItemGroupLevel: css`
    .menu__link {
      color: ${euiTheme.colors.textParagraph};
      font-weight: ${euiTheme.font.weight.semiBold};

      &:hover {
        color: ${euiTheme.colors.textParagraph};
      }
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
      css={[
        styles.menuListItem,
        level <= 2 && styles.menuListItemGroupLevel,
      ]}
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
