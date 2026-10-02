/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { forwardRef, HTMLAttributes } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';
import { useEuiMemoizedStyles } from '../../services';
import { euiFlyoutHeaderStyles } from './flyout_header.styles';

export type EuiFlyoutHeaderProps = HTMLAttributes<HTMLDivElement> &
  CommonProps & {
    hasBorder?: boolean;
  };

export const EuiFlyoutHeader = forwardRef<HTMLDivElement, EuiFlyoutHeaderProps>(
  ({ children, className, hasBorder = false, ...rest }, ref) => {
    const classes = classNames('euiFlyoutHeader', className);

    const styles = useEuiMemoizedStyles(euiFlyoutHeaderStyles);
    const cssStyles = [styles.euiFlyoutHeader, hasBorder && styles.hasBorder];

    return (
      <div className={classes} css={cssStyles} {...rest} ref={ref}>
        {children}
      </div>
    );
  }
);

EuiFlyoutHeader.displayName = 'EuiFlyoutHeader';
