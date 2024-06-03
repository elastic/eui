/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, HTMLAttributes } from 'react';
import classNames from 'classnames';

import { useEuiMemoizedStyles } from '../../../services';
import { CommonProps } from '../../common';

import type { EuiTableProps } from '../table';
import { useIsEuiTableResponsive } from './responsive_context';
import { euiTableHeaderMobileStyles } from './table_header_mobile.styles';

export const EuiTableHeaderMobile: FunctionComponent<
  CommonProps &
    HTMLAttributes<HTMLDivElement> &
    Pick<EuiTableProps, 'responsiveBreakpoint'>
> = ({ children, className, responsiveBreakpoint, ...rest }) => {
  const isResponsive = useIsEuiTableResponsive(responsiveBreakpoint);
  const styles = useEuiMemoizedStyles(euiTableHeaderMobileStyles);
  const classes = classNames('euiTableHeaderMobile', className);

  return isResponsive ? (
    <div className={classes} css={styles.euiTableHeaderMobile} {...rest}>
      {children}
    </div>
  ) : null;
};
