/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent } from 'react';
import classNames from 'classnames';

import { EuiButtonIcon, EuiButtonIconPropsForButton } from '../button';
import { ToggleOptions } from './resizable_panel';
import { EuiResizableContainerProps } from './resizable_container';

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
  /**
   *
   */
  isVisible?: boolean;
  isCollapsed?: boolean;
};

export const EuiResizableCollapseButton: FunctionComponent<EuiResizableCollapseButtonProps> = ({
  className,
  externalPosition,
  internalPosition = 'middle',
  direction = 'horizontal',
  isVisible,
  isCollapsed,
  ...rest
}) => {
  const isHorizontal = direction === 'horizontal';

  const classes = classNames(
    'euiResizableToggleButton',
    `euiResizableToggleButton--${direction}`,
    `euiResizableToggleButton--${externalPosition}`,
    `euiResizableToggleButton--${internalPosition}`,
    {
      'euiResizableToggleButton-isVisible': isVisible,
      'euiResizableToggleButton-isCollapsed': isCollapsed,
    },
    className
  );

  // Default to simiple grab icon in case there is no externalPosition specified
  let COLLAPSED_ICON = isHorizontal ? 'grab' : 'grabHorizontal';
  let NOT_COLLAPSED_ICON = isHorizontal ? 'grab' : 'grabHorizontal';

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

  return (
    <EuiButtonIcon
      display={isCollapsed ? 'empty' : 'fill'}
      color={isCollapsed ? 'text' : 'ghost'}
      {...rest}
      className={classes}
      iconType={isCollapsed ? COLLAPSED_ICON : NOT_COLLAPSED_ICON}
    />
  );
};
