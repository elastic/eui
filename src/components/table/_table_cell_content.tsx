/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, HTMLAttributes } from 'react';
import { CommonProps } from '../common';
import classNames from 'classnames';

import { LEFT_ALIGNMENT } from '../../services';

import type { EuiTableRowCellProps } from './table_row_cell';
import { useEuiTableIsResponsive } from './mobile/responsive_context';
import { euiTableCellContentStyles as styles } from './_table_cell_content.styles';

export type EuiTableCellContentProps = CommonProps &
  HTMLAttributes<HTMLDivElement> &
  Pick<EuiTableRowCellProps, 'align'>;

export const EuiTableCellContent: FunctionComponent<
  EuiTableCellContentProps
> = ({
  children,
  className,
  align = LEFT_ALIGNMENT,
  ...rest
}) => {
  const isResponsive = useEuiTableIsResponsive();

  const cssStyles = [
    styles.euiTableCellContent,
    !isResponsive && styles[align], // On mobile, always align cells to the left
  ];

  const classes = classNames('euiTableCellContent', className);

  return (
    <div css={cssStyles} className={classes} {...rest}>
      {/* TODO: __text children */}
      {children}
    </div>
  );
};
