/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  HTMLAttributes,
  ReactNode,
  ReactElement,
  MouseEventHandler,
  useState,
  useEffect,
  useCallback,
  JSX,
} from 'react';
import classNames from 'classnames';

import { useEuiMemoizedStyles, getSecureRelForTarget } from '../../services';
import { validateHref } from '../../services/security/href_validator';
import { CommonProps } from '../common';
import { EuiInnerText } from '../inner_text';
import { EuiIcon } from '../icon';

import {
  euiSideNavItemStyles,
  euiSideNavItemButtonStyles,
} from './side_nav_item.styles';

/**
 * The props that are exposed to, or altered for, the consumer
 * for use in the object of items in `EuiSideNav`
 * can be found in the `side_nave_types.ts` file.
 */

export type _EuiSideNavItemButtonProps = CommonProps & {
  /**
   * Is an optional string to be passed as the navigation item's `href` prop,
   * and by default it will force rendering of the item as an `<a>`
   */
  href?: string;
  target?: string;
  rel?: string;
  /**
   * Callback function to be passed as the navigation item's `onClick` prop,
   * and by default it will force rendering of the item as a `<button>` instead of a link
   */
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLElement>;
  children: ReactNode;
  disabled?: boolean;
};

export interface _EuiSideNavItemProps {
  /**
   * React node which will be rendered as a small icon to the
   * left of the navigation item text
   */
  icon?: ReactElement;
  /**
   * If set to true it will render the item in a visible
   * "selected" state, and will force all ancestor navigation items
   * to render in an "open" state
   */
  isSelected?: boolean;
  /**
   * Enhances the whole item's section (including nested items) with
   * a slight background and bold top item
   */
  emphasize?: boolean;
  /**
   * Restrict the item's text length to a single line
   */
  truncate?: boolean;
  /**
   * Passed to the actual `.euiSideNavItemButton` element
   */
  buttonClassName?: string;
  /**
   * className, css, and style are passed to the parent wrapper, not the button
   */
  style?: HTMLAttributes<HTMLDivElement>['style'];
  // Exposed as different prop type to consumer
  items?: ReactNode;
  // Not exposed to consumer
  isOpen?: boolean;
  isParent?: boolean;
  depth?: number;
  childrenOnly?: boolean;
}

type ExcludeEuiSideNavItemProps<T> = Pick<
  T,
  Exclude<keyof T, keyof _EuiSideNavItemProps | 'renderItem'>
>;
type OmitEuiSideNavItemProps<T> = {
  [K in keyof ExcludeEuiSideNavItemProps<T>]: T[K];
};

export type RenderItem<T> = (
  // argument is the set of extra component props + _EuiSideNavItemButtonProps
  props: OmitEuiSideNavItemProps<T> & _EuiSideNavItemButtonProps
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
  disabled,
  ...rest
}: _EuiSideNavItemButtonProps) => {
  if (href && !disabled) {
    const secureRel = getSecureRelForTarget({ href, rel, target });
    return (
      <a
        className={className}
        href={href}
        target={target}
        rel={secureRel}
        onClick={onClick}
        {...rest}
      >
        {children}
      </a>
    );
  }

  if (onClick || disabled) {
    return (
      <button
        type="button"
        className={className}
        onClick={onClick}
        disabled={disabled}
        {...rest}
      >
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

export const EuiSideNavItem = <
  T extends _EuiSideNavItemButtonProps &
    _EuiSideNavItemProps & { renderItem?: (props: any) => JSX.Element }
>({
  isOpen,
  isSelected,
  isParent,
  icon,
  onClick,
  href: _href,
  rel,
  target,
  items,
  children,
  renderItem: RenderItem = DefaultRenderItem,
  depth = 0,
  className,
  css,
  style,
  truncate = true,
  emphasize,
  buttonClassName,
  childrenOnly,
  ...rest
}: EuiSideNavItemProps<T>) => {
  const isHrefValid = !_href || validateHref(_href);
  const href = isHrefValid ? _href : '';

  // Forcing accordion style item if not linked, but has children
  const [itemIsOpen, setItemIsOpen] = useState(isOpen);
  useEffect(() => {
    setItemIsOpen(isOpen);
  }, [isOpen]);

  const toggleItemOpen = useCallback(() => {
    setItemIsOpen((isOpen) => !isOpen);
  }, []);

  const isRoot = depth === 0;
  const isTrunk = depth === 1;
  const isBranch = depth > 1;
  const hasCaret = depth > 0 && childrenOnly;
  const hasChildItems = items && itemIsOpen;

  const classes = classNames(
    'euiSideNavItem',
    {
      'euiSideNavItem--root': isRoot,
      'euiSideNavItem--trunk': isTrunk,
      'euiSideNavItem--branch': isBranch,
      'euiSideNavItem--emphasized': emphasize,
      'euiSideNavItem-hasChildItems': hasChildItems,
    },
    className
  );
  const styles = useEuiMemoizedStyles(euiSideNavItemStyles);
  const cssStyles = [
    styles.euiSideNavItem,
    isRoot && styles.root,
    isTrunk && styles.trunk,
    isBranch && styles.branch,
    emphasize && styles.emphasized,
    css,
  ];
  const itemsStyles = hasChildItems && [
    styles.items.euiSideNavItem__items,
    isRoot && icon && styles.items.rootWithIcon,
    isTrunk && styles.items.trunk,
    isBranch && styles.items.branch,
  ];

  const buttonClasses = classNames(
    'euiSideNavItemButton',
    {
      'euiSideNavItemButton-isOpen': depth > 0 && itemIsOpen && !isSelected,
      'euiSideNavItemButton-isSelected': isSelected,
    },
    buttonClassName
  );
  const buttonStyles = useEuiMemoizedStyles(euiSideNavItemButtonStyles);
  const buttonCssStyles = [
    buttonStyles.euiSideNavItemButton,
    isSelected && buttonStyles.selected,
    emphasize && buttonStyles.emphasized,
    isRoot && buttonStyles.root,
    isTrunk && buttonStyles.trunk,
    isBranch && buttonStyles.branch,
  ];
  const labelCssStyles = [
    buttonStyles.label.euiSideNavItemButton__label,
    isRoot && buttonStyles.label.root,
  ];

  return (
    <div css={cssStyles} className={classes} style={style}>
      <RenderItem
        css={buttonCssStyles}
        className={buttonClasses}
        href={href}
        rel={rel}
        target={target}
        onClick={childrenOnly ? toggleItemOpen : onClick}
        {...rest}
      >
        <span
          css={buttonStyles.euiSideNavItemButton__content}
          className="euiSideNavItemButton__content"
        >
          {icon}

          <EuiInnerText>
            {(ref, innerText) => (
              <span
                ref={ref}
                title={truncate ? innerText : undefined}
                css={labelCssStyles}
                className={classNames('euiSideNavItemButton__label', {
                  'eui-textTruncate': truncate,
                })}
              >
                {children}
              </span>
            )}
          </EuiInnerText>

          {hasCaret && (
            <EuiIcon type={itemIsOpen ? 'arrowDown' : 'arrowRight'} size="s" />
          )}
        </span>
      </RenderItem>

      {hasChildItems && (
        <div css={itemsStyles} className="euiSideNavItem__items">
          {items}
        </div>
      )}
    </div>
  );
};
