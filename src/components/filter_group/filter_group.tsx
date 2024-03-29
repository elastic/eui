/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { HTMLAttributes, ReactNode, FunctionComponent } from 'react';
import classNames from 'classnames';

import { useEuiMemoizedStyles } from '../../services';
import { CommonProps } from '../common';

import { euiFilterGroupStyles } from './filter_group.styles';

export type EuiFilterGroupProps = HTMLAttributes<HTMLDivElement> &
  CommonProps & {
    children?: ReactNode;
    /**
     * Expand the whole bar to fill its parent's width
     */
    fullWidth?: boolean;
    /**
     *  When `true`, creates a shorter height filter group matching that of `compressed` form controls
     */
    compressed?: boolean;
  };

export const EuiFilterGroup: FunctionComponent<EuiFilterGroupProps> = ({
  children,
  className,
  fullWidth = false,
  compressed,
  ...rest
}) => {
  const styles = useEuiMemoizedStyles(euiFilterGroupStyles);
  const cssStyles = [
    styles.euiFilterGroup,
    fullWidth && styles.fullWidth,
    compressed ? styles.compressed : styles.uncompressed,
  ];

  const classes = classNames('euiFilterGroup', className);

  return (
    <div className={classes} css={cssStyles} {...rest}>
      {children}
    </div>
  );
};
