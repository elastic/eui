/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React, {
  cloneElement,
  ReactNode,
  ReactElement,
  MouseEventHandler,
} from 'react';
import classNames from 'classnames';

import { CommonProps } from '../common';

import { EuiIcon } from '../icon';

import { getSecureRelForTarget } from '../../services';

type ItemProps = CommonProps & {
  href?: string;
  target?: string;
  rel?: string;
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
  target?: string;
  rel?: string;
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
  target,
  rel,
  onClick,
  className,
  children,
  ...rest
}: ItemProps) => {
  if (href) {
    const secureRel = getSecureRelForTarget({ href, rel, target });
    return (
      <a
        className={className}
        href={href}
        target={target}
        rel={secureRel}
        onClick={onClick}
        {...rest}>
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
  rel,
  target,
  items,
  children,
  renderItem: RenderItem = DefaultRenderItem,
  depth = 0,
  className,
  ...rest
}: EuiSideNavItemProps<T>) {
  let childItems;

  if (items && isOpen) {
    childItems = <div className="euiSideNavItem__items">{items}</div>;
  }

  let buttonIcon;

  if (icon) {
    buttonIcon = cloneElement(icon, {
      className: classNames('euiSideNavItemButton__icon', icon.props.className),
    });
  }

  const classes = classNames(
    'euiSideNavItem',
    {
      'euiSideNavItem--root': depth === 0,
      'euiSideNavItem--rootIcon': depth === 0 && icon,
      'euiSideNavItem--trunk': depth === 1,
      'euiSideNavItem--branch': depth > 1,
      'euiSideNavItem--hasChildItems': !!childItems,
    },
    className
  );

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
    rel,
    target,
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
