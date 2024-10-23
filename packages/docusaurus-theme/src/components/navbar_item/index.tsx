import React, { useContext } from 'react';
import clsx from 'clsx';
import { css } from '@emotion/react';
import useIsBrowser from '@docusaurus/useIsBrowser';
import {
  CommonProps,
  EuiIcon,
  ExclusiveUnion,
  IconType,
  PropsForAnchor,
  PropsForButton,
  useEuiMemoizedStyles,
  UseEuiTheme,
} from '@elastic/eui';
import { AppThemeContext } from '../theme_context';

type SharedProps = {
  icon: IconType;
  showLabel?: boolean;
  isMenuItem?: boolean;
} & CommonProps;

type Props = ExclusiveUnion<
  PropsForAnchor<SharedProps>,
  PropsForButton<SharedProps>
>;

// converted from css modules to Emotion
export const getStyles = ({ euiTheme }: UseEuiTheme) => ({
  item: css`
    display: flex;
    align-items: center;

    -webkit-tap-highlight-color: transparent;
    transition: background var(--ifm-transition-fast);

    &:hover {
      background-color: var(--ifm-color-emphasis-200);
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

    @media (min-width: 997px) {
      justify-content: center;
      width: ${euiTheme.size.xl};
      height: ${euiTheme.size.xl};
      border-radius: 50%;
    }
  `,
  darkMode: css`
    &:hover {
      background-color: var(--ifm-color-gray-800);
      color: currentColor;
    }
  `,
  disabled: css`
    cursor: not-allowed;
  `,
  title: css`
    @media (min-width: 997px) {
      display: none;
    }
  `,
});

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
  } = props;

  const isBrowser = useIsBrowser();
  const { colorMode } = useContext(AppThemeContext);

  const isDarkMode = colorMode === 'dark';

  const styles = useEuiMemoizedStyles(getStyles);
  const cssStyles = [
    styles.item,
    isMenuItem ? styles.menuItem : styles.navItem,
    !isBrowser && styles.disabled,
    isDarkMode && styles.darkMode,
  ];

  const content = showLabel ? (
    <>
      <EuiIcon type={icon} />
      <span css={styles.title}>{title}</span>
    </>
  ) : (
    <EuiIcon type={icon} />
  );

  if (isAnchorClick(onClick, href)) {
    return (
      <a
        href={href}
        target={target ?? '_blank'}
        title={title}
        className={clsx('clean-btn', className)}
        css={cssStyles}
        onClick={onClick}
        aria-label={title}
        aria-live="polite"
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      disabled={!isBrowser}
      className={clsx('clean-btn', className)}
      css={cssStyles}
      onClick={onClick}
      title={title}
      aria-label={title}
      aria-live="polite"
    >
      {content}
    </button>
  );
};
