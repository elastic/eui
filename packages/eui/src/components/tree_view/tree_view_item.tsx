/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  FunctionComponent,
  HTMLAttributes,
  ReactNode,
  Ref,
  memo,
} from 'react';
import classNames from 'classnames';

import { useEuiMemoizedStyles } from '../../services';
import { CommonProps } from '../common';
import { EuiIcon } from '../icon';

import { EuiTreeViewProps } from './tree_view';
import { euiTreeViewItemStyles } from './tree_view_item.styles';

export type EuiTreeViewItemProps = Omit<
  HTMLAttributes<HTMLButtonElement>,
  'id' | 'children'
> &
  CommonProps & {
    /**
     * Required for `aria-controls` accessibility
     */
    id: string;
    /**
     * The main button content
     */
    label: ReactNode;
    /**
     * Used to render nested `EuiTreeView`s
     */
    children?: ReactNode;
    /**
     * Optional icon to render. Pass, e.g., `<EuiIcon />` or `<EuiToken />`
     */
    icon?: ReactNode;
    /**
     * Renders an arrow if `children` exists. Otherwise renders a blank icon
     */
    hasArrow?: boolean;
    /**
     * Adds a targetable modifier class
     */
    isActive?: boolean;
    /**
     * Sets the `aria-expanded` attribute
     */
    isExpanded?: boolean;
    /**
     * Determines default or compressed display
     */
    display?: EuiTreeViewProps['display'];
    buttonRef?: Ref<HTMLButtonElement>;
    /**
     * Optional extra props to pass to the wrapping `<li>`
     */
    wrapperProps?: HTMLAttributes<HTMLLIElement>;
  };

export const EuiTreeViewItem: FunctionComponent<EuiTreeViewItemProps> = memo(
  ({
    id,
    label,
    className,
    children,
    display = 'default',
    icon,
    hasArrow,
    isActive,
    isExpanded,
    buttonRef,
    wrapperProps,
    ...rest
  }) => {
    const styles = useEuiMemoizedStyles(euiTreeViewItemStyles);

    const wrapperClasses = classNames(
      'euiTreeView__node',
      { 'euiTreeView__node--expanded': isExpanded },
      wrapperProps?.className
    );
    const wrapperStyles = [
      styles.li.euiTreeView__node,
      styles.li[display],
      isExpanded && styles.li.expanded,
    ];

    const buttonClasses = classNames('euiTreeView__nodeInner', className, {
      'euiTreeView__node--active': isActive,
    });
    const buttonStyles = [
      styles.button.euiTreeView__nodeInner,
      styles.button[display],
    ];

    const iconStyles = [
      styles.icon.euiTreeView__iconWrapper,
      styles.icon[display],
    ];

    return (
      <li {...wrapperProps} css={wrapperStyles} className={wrapperClasses}>
        <button
          id={id}
          css={buttonStyles}
          className={buttonClasses}
          aria-expanded={isExpanded}
          ref={buttonRef}
          {...rest}
        >
          {hasArrow &&
            (!!children ? (
              <EuiIcon
                className="euiTreeView__expansionArrow"
                size={display === 'compressed' ? 's' : 'm'}
                type={isExpanded ? 'arrowDown' : 'arrowRight'}
              />
            ) : (
              <span
                css={iconStyles}
                className="euiTreeView__arrowPlaceholder"
              />
            ))}
          {icon && (
            <span css={iconStyles} className="euiTreeView__iconWrapper">
              {icon}
            </span>
          )}
          <span className="euiTreeView__nodeLabel eui-textTruncate">
            {label}
          </span>
        </button>
        {children}
      </li>
    );
  }
);
EuiTreeViewItem.displayName = 'EuiTreeViewItem';
