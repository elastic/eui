/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent } from 'react';
import classNames from 'classnames';

import { useEuiMemoizedStyles } from '../../services';
import { EuiButtonIcon, EuiButtonIconPropsForButton } from '../button';
import { euiScreenReaderOnlyStyles } from '../accessibility/screen_reader_only/screen_reader_only.styles';

import { ToggleOptions } from './resizable_panel';
import { EuiResizableContainerProps } from './resizable_container';
import { euiResizableCollapseButtonStyles } from './resizable_collapse_button.styles';

export type EuiResizableCollapseButtonProps = Omit<
  EuiButtonIconPropsForButton,
  'iconType'
> & {
  /**
   * Position of the toggle button.
   * Enums based on the `direction` of the EuiResizableContainer
   */
  internalPosition?: ToggleOptions['position'];
  /**
   * Position of the toggle button.
   * Enums based on the `direction` of the EuiResizableContainer
   */
  externalPosition?: 'before' | 'after';
  /**
   * Same direction derived from EuiResizableContainer
   */
  direction?: EuiResizableContainerProps['direction'];
  isVisible?: boolean;
  isCollapsed?: boolean;
};

export const EuiResizableCollapseButton: FunctionComponent<
  EuiResizableCollapseButtonProps
> = ({
  className,
  externalPosition = 'before',
  internalPosition = 'middle',
  direction = 'horizontal',
  isVisible,
  isCollapsed,
  ...rest
}) => {
  const isHorizontal = direction === 'horizontal';
  const showOnFocus = !isCollapsed && !isVisible;

  const styles = useEuiMemoizedStyles(euiResizableCollapseButtonStyles);

  const collapsedStyles = [
    styles.collapsed.collapsed,
    styles.collapsed[direction],
    styles.collapsed[`${direction}Positions`][internalPosition],
  ];
  const collapsibleStyles = [
    styles.collapsible.collapsible,
    styles.collapsible[direction][externalPosition],
    styles.collapsible[direction][internalPosition],
  ];
  const cssStyles = [
    styles.euiResizableCollapseButton,
    showOnFocus && euiScreenReaderOnlyStyles['euiScreenReaderOnly-showOnFocus'],
    ...(isCollapsed ? collapsedStyles : collapsibleStyles),
  ];

  let COLLAPSED_ICON = '';
  let NOT_COLLAPSED_ICON = '';

  switch (externalPosition) {
    case 'before':
      COLLAPSED_ICON = isHorizontal ? 'menuLeft' : 'menuUp';
      NOT_COLLAPSED_ICON = isHorizontal ? 'menuRight' : 'menuDown';
      break;
    case 'after':
      COLLAPSED_ICON = isHorizontal ? 'menuRight' : 'menuDown';
      NOT_COLLAPSED_ICON = isHorizontal ? 'menuLeft' : 'menuUp';
      break;
  }

  const classes = classNames('euiResizableCollapseButton', className);

  return (
    <EuiButtonIcon
      display="empty"
      color="text"
      className={classes}
      css={cssStyles}
      {...rest}
      iconType={isCollapsed ? COLLAPSED_ICON : NOT_COLLAPSED_ICON}
    />
  );
};
