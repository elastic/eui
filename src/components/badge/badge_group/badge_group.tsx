/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { forwardRef, HTMLAttributes, Ref, ReactNode } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../../common';
import { useEuiTheme } from '../../../services';

import { euiBadgeGroupStyles } from './badge_group.styles';

export const GUTTER_SIZES = ['none', 'xs', 's'] as const;
type BadgeGroupGutterSize = (typeof GUTTER_SIZES)[number];

export interface EuiBadgeGroupProps {
  /**
   * Space between badges
   */
  gutterSize?: BadgeGroupGutterSize;
  /**
   * Should be a list of `EuiBadge`s, but can also be any other element
   */
  children?: ReactNode;
}

export const EuiBadgeGroup = forwardRef<
  HTMLDivElement,
  CommonProps & HTMLAttributes<HTMLDivElement> & EuiBadgeGroupProps
>(
  (
    { children, className, gutterSize = 'xs', ...rest },
    ref: Ref<HTMLDivElement>
  ) => {
    const euiTheme = useEuiTheme();

    const styles = euiBadgeGroupStyles(euiTheme);
    const cssStyles = [styles.euiBadgeGroup, styles[gutterSize]];

    const classes = classNames('euiBadgeGroup', className);

    return (
      <div css={cssStyles} className={classes} ref={ref} {...rest}>
        {children}
      </div>
    );
  }
);

EuiBadgeGroup.displayName = 'EuiBadgeGroup';
