import React, {
  cloneElement,
  ReactNode,
  ReactElement,
  MouseEventHandler,
} from 'react';
import classNames from 'classnames';

import { CommonProps } from '../common';

import { EuiIcon } from '../icon';

type ItemProps = CommonProps & {
  href?: string;
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLElement>;
  children: ReactNode;
};

interface SideNavItemProps {
  isOpen?: boolean;
  isSelected?: boolean;
  isParent?: boolean;
  icon?: ReactElement;
  items?: ReactNode;
  depth?: number;
}

type ExcludeEuiSideNavItemProps<T> = Pick<
  T,
  Exclude<keyof T, keyof SideNavItemProps | 'renderItem'>
>;
type OmitEuiSideNavItemProps<T> = {
  [K in keyof ExcludeEuiSideNavItemProps<T>]: T[K]
};

interface GuaranteedRenderItemProps {
  href?: string;
  onClick?: ItemProps['onClick'];
  className: string;
  children: ReactNode;
}
export type RenderItem<T> = (
  // argument is the set of extra component props + GuaranteedRenderItemProps
  props: OmitEuiSideNavItemProps<T> & GuaranteedRenderItemProps
) => JSX.Element;

export type EuiSideNavItemProps<T> = T extends { renderItem: Function }
  ? T & { renderItem: RenderItem<T> }
  : T;

const DefaultRenderItem = ({
  href,
  onClick,
  className,
  children,
  ...rest
}: ItemProps) => {
  if (href) {
    return (
      <a className={className} href={href} onClick={onClick} {...rest}>
        {children}
      </a>
    );
  }

  if (onClick) {
    return (
      <button type="button" className={className} onClick={onClick} {...rest}>
        {children}
      </button>
    );
  }

  return (
    <div className={className} {...rest}>
      {children}
    </div>
  );
};

export function EuiSideNavItem<
  T extends ItemProps &
    SideNavItemProps & { renderItem?: (props: any) => JSX.Element }
>({
  isOpen,
  isSelected,
  isParent,
  icon,
  onClick,
  href,
  items,
  children,
  renderItem: RenderItem = DefaultRenderItem,
  depth = 0,
  ...rest
}: EuiSideNavItemProps<T>) {
  let childItems;

  if (items && isOpen) {
    childItems = <div className="euiSideNavItem__items">{items}</div>;
  }

  let buttonIcon;

  if (icon) {
    buttonIcon = cloneElement(icon, {
      className: 'euiSideNavItemButton__icon',
    });
  }

  const classes = classNames('euiSideNavItem', {
    'euiSideNavItem--root': depth === 0,
    'euiSideNavItem--rootIcon': depth === 0 && icon,
    'euiSideNavItem--trunk': depth === 1,
    'euiSideNavItem--branch': depth > 1,
    'euiSideNavItem--hasChildItems': !!childItems,
  });

  const buttonClasses = classNames('euiSideNavItemButton', {
    'euiSideNavItemButton--isClickable': onClick || href,
    'euiSideNavItemButton-isOpen': depth > 0 && isOpen && !isSelected,
    'euiSideNavItemButton-isSelected': isSelected,
  });

  let caret;

  if (depth > 0 && isParent && !isOpen && !isSelected) {
    caret = <EuiIcon type="arrowDown" color="subdued" size="s" />;
  }

  const buttonContent = (
    <span className="euiSideNavItemButton__content">
      {buttonIcon}

      <span className="euiSideNavItemButton__label">{children}</span>

      {caret}
    </span>
  );

  const renderItemProps: GuaranteedRenderItemProps = {
    href,
    onClick,
    className: buttonClasses,
    children: buttonContent,
  };
  return (
    <div className={classes}>
      <RenderItem {...renderItemProps} {...rest} />
      {childItems}
    </div>
  );
}
