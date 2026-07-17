/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { useContext } from 'react';
import { css } from '@emotion/react';
import useIsBrowser from '@docusaurus/useIsBrowser';
import {
  CommonProps,
  EuiIcon,
  EuiToolTip,
  ExclusiveUnion,
  IconType,
  PropsForAnchor,
  PropsForButton,
  useEuiMemoizedStyles,
  UseEuiTheme,
} from '@elastic/eui';

import { AppThemeContext } from '../theme_context';
import { getNavbarBreakpoint } from '../../theme/Navbar/breakpoint';

type SharedProps = {
  icon: IconType;
  showLabel?: boolean;
  isMenuItem?: boolean;
  isSelected?: boolean;
} & CommonProps;

type Props = ExclusiveUnion<
  PropsForAnchor<SharedProps>,
  PropsForButton<SharedProps>
>;

// converted from css modules to Emotion
export const getStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  const { desktopMediaQuery } = getNavbarBreakpoint(euiThemeContext);

  return {
    item: css`
      display: flex;
      align-items: center;
      flex-shrink: 0;

      -webkit-tap-highlight-color: transparent;
      transition: background var(--ifm-transition-fast);

      &:hover {
        background-color: ${euiTheme.components.buttons.backgroundTextHover};
        color: currentColor;
      }
    `,
    navItem: css`
      justify-content: center;
      width: ${euiTheme.size.xl};
      height: ${euiTheme.size.xl};
      border-radius: 50%;
    `,
    menuItem: css`
      justify-content: flex-start;
      gap: ${euiTheme.size.s};

      ${desktopMediaQuery} {
        justify-content: center;
        width: ${euiTheme.size.xl};
        height: ${euiTheme.size.xl};
        border-radius: 50%;
      }
    `,
    darkMode: css`
      &:hover {
        color: currentColor;
      }
    `,
    disabled: css`
      cursor: not-allowed;
    `,
    selected: css`
      background-color: ${euiTheme.colors.backgroundFilledText};
      color: ${euiTheme.colors.textInverse};
    `,
    title: css`
      ${desktopMediaQuery} {
        display: none;
      }
    `,
    tooltipAnchor: css`
      display: inline-flex;
    `,
  };
};

// using a type guard to ensure proper typing from ExclusiveUnion
const isAnchorClick = (
  onClick: Props['onClick'],
  href: Props['href']
): onClick is PropsForAnchor<SharedProps>['onClick'] => href != null;

export const NavbarItem = (props: Props) => {
  const {
    className,
    title,
    icon,
    onClick,
    href,
    target,
    showLabel,
    isMenuItem = true,
    isSelected,
    css,
  } = props;

  const isBrowser = useIsBrowser();
  const { colorMode } = useContext(AppThemeContext);

  const isDarkMode = colorMode === 'dark';

  const styles = useEuiMemoizedStyles(getStyles);
  const cssStyles = [
    styles.item,
    isMenuItem ? styles.menuItem : styles.navItem,
    !isBrowser && styles.disabled,
    isSelected && styles.selected,
    isDarkMode && styles.darkMode,
    css,
  ];

  const content = showLabel ? (
    <>
      <EuiIcon type={icon} />
      <span css={styles.title}>{title}</span>
    </>
  ) : (
    <EuiIcon type={icon} />
  );

  const control = isAnchorClick(onClick, href) ? (
    <a
      href={href}
      target={target ?? '_blank'}
      className={className}
      css={cssStyles}
      onClick={onClick}
      aria-label={title}
      aria-live="polite"
    >
      {content}
    </a>
  ) : (
    <button
      type="button"
      disabled={!isBrowser}
      className={className}
      css={cssStyles}
      onClick={onClick}
      aria-label={title}
      aria-live="polite"
      aria-pressed={isSelected != null ? isSelected : undefined}
    >
      {content}
    </button>
  );

  if (!title) {
    return control;
  }

  return (
    <EuiToolTip
      content={title}
      disableScreenReaderOutput
      repositionOnScroll
      anchorProps={{ css: styles.tooltipAnchor }}
    >
      {control}
    </EuiToolTip>
  );
};
