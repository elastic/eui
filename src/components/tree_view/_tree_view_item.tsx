/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  FunctionComponent,
  PropsWithChildren,
  HTMLAttributes,
  ReactNode,
  Ref,
  memo,
} from 'react';
import classNames from 'classnames';

import { useEuiTheme } from '../../services';
import { CommonProps } from '../common';
import { EuiIcon } from '../icon';

import { EuiTreeViewProps } from './tree_view';
import { euiTreeViewItemStyles } from './_tree_view_item.styles';

type EuiTreeViewItemProps = HTMLAttributes<HTMLButtonElement> &
  CommonProps &
  PropsWithChildren & {
    id: string;
    label: ReactNode;
    icon?: ReactNode;
    hasArrow?: boolean;
    isActive?: boolean;
    isExpanded?: boolean;
    display?: EuiTreeViewProps['display'];
    buttonRef?: Ref<HTMLButtonElement>;
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
    const euiTheme = useEuiTheme();
    const styles = euiTreeViewItemStyles(euiTheme);

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
