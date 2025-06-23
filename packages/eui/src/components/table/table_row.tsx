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
  KeyboardEvent,
  KeyboardEventHandler,
  MouseEventHandler,
} from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';
import { keys, useEuiMemoizedStyles } from '../../services';

import { useEuiTableIsResponsive } from './mobile/responsive_context';
import { euiTableRowStyles } from './table_row.styles';

export interface EuiTableRowProps {
  /**
   * Indicates if the table has a single column of checkboxes for selecting
   * rows (used for mobile styling)
   */
  hasSelection?: boolean;
  /**
   * Indicates that the current row's checkbox is selectable / not disabled
   */
  isSelectable?: boolean;
  /**
   * Indicates the current row has been selected
   */
  isSelected?: boolean;
  /**
   * Indicates if the table has a dedicated column for actions
   * (used for mobile styling and desktop action hover behavior)
   */
  hasActions?: boolean | 'custom';
  /**
   * Indicates if the row will have an expanded row
   */
  isExpandable?: boolean;
  /**
   * Indicates if the row will be the expanded row
   */
  isExpandedRow?: boolean;
  onClick?: MouseEventHandler<HTMLTableRowElement> &
    KeyboardEventHandler<HTMLTableRowElement>;
}

type Props = CommonProps &
  HTMLAttributes<HTMLTableRowElement> &
  EuiTableRowProps;

export const EuiTableRow: FunctionComponent<Props> = ({
  children,
  className,
  hasSelection,
  isSelected,
  isSelectable,
  hasActions,
  isExpandedRow,
  isExpandable,
  onClick,
  ...rest
}) => {
  const isResponsive = useEuiTableIsResponsive();
  const styles = useEuiMemoizedStyles(euiTableRowStyles);
  const cssStyles = isResponsive
    ? [
        styles.euiTableRow,
        styles.mobile.mobile,
        isSelected && styles.mobile.selected,
        isExpandedRow && styles.mobile.expanded,
        (hasActions === true || isExpandable || isExpandedRow) &&
          styles.mobile.hasRightColumn,
        hasSelection && styles.mobile.hasLeftColumn,
      ]
    : [
        styles.euiTableRow,
        styles.desktop.desktop,
        onClick && styles.desktop.clickable,
        isSelected && styles.desktop.selected,
        isExpandedRow && styles.desktop.expanded,
        isExpandedRow && hasSelection && styles.desktop.checkboxOffset,
      ];

  const classes = classNames('euiTableRow', className, {
    'euiTableRow-isSelectable': isSelectable,
    'euiTableRow-isSelected': isSelected,
    'euiTableRow-hasActions': hasActions,
    'euiTableRow-isExpandedRow': isExpandedRow,
    'euiTableRow-isExpandable': isExpandable,
    'euiTableRow-isClickable': onClick,
  });

  if (!onClick) {
    return (
      <tr css={cssStyles} className={classes} {...rest}>
        {children}
      </tr>
    );
  }

  const onKeyDown = (event: KeyboardEvent<HTMLTableRowElement>) => {
    // Prevent a scroll from occurring if the user has hit space.
    if (event.key === keys.SPACE) event.preventDefault();
  };

  const onKeyUp = (event: KeyboardEvent<HTMLTableRowElement>) => {
    // Support keyboard accessibility by emulating mouse click on ENTER or SPACE keypress.
    if (event.key === keys.ENTER || event.key === keys.SPACE) {
      onClick(event);
    }
  };

  return (
    <tr
      css={cssStyles}
      className={classes}
      onClick={onClick}
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
      tabIndex={0}
      {...rest}
    >
      {children}
    </tr>
  );
};
