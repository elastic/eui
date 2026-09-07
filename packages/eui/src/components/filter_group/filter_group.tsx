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
  FunctionComponent,
  useMemo,
} from 'react';
import classNames from 'classnames';

import { useEuiMemoizedStyles } from '../../services';
import { CommonProps } from '../common';

import { euiFilterGroupStyles } from './filter_group.styles';
import { EuiFilterGroupContext } from './filter_group_context';

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
    /**
     * Visual display variant:
     * - `'regular'`: subdued toggle state
     * - `'highlighted'`: highlighted toggle state
     * @default 'regular'
     */
    display?: 'regular' | 'highlighted';
    /**
     * Shows dividers between buttons.
     * @default true
     */
    showDividers?: boolean;
  };

/**
 * @see {@link https://eui.elastic.co/docs/components/navigation/buttons/filter-group/|EuiFilterGroup documentation}
 */
export const EuiFilterGroup: FunctionComponent<EuiFilterGroupProps> = ({
  children,
  className,
  fullWidth = false,
  compressed,
  display = 'regular',
  showDividers = true,
  ...rest
}) => {
  const styles = useEuiMemoizedStyles(euiFilterGroupStyles);
  const cssStyles = [
    styles.euiFilterGroup,
    fullWidth && styles.fullWidth,
    compressed ? styles.compressed : styles.uncompressed,
  ];

  const classes = classNames('euiFilterGroup', className);

  const contextValue = useMemo(
    () => ({ compressed, display, showDividers }),
    [compressed, display, showDividers]
  );

  return (
    <EuiFilterGroupContext.Provider value={contextValue}>
      <div
        className={classes}
        css={cssStyles}
        {...rest}
        data-display={display}
        data-dividers={showDividers || undefined}
      >
        {children}
      </div>
    </EuiFilterGroupContext.Provider>
  );
};
