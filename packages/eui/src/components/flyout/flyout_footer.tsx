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
import { euiFlyoutFooterStyles } from './flyout_footer.styles';

export type EuiFlyoutFooterProps = HTMLAttributes<HTMLDivElement> & CommonProps;

export const EuiFlyoutFooter = forwardRef<HTMLDivElement, EuiFlyoutFooterProps>(
  ({ children, className, ...rest }, ref) => {
    const classes = classNames('euiFlyoutFooter', className);

    const styles = useEuiMemoizedStyles(euiFlyoutFooterStyles);

    return (
      <div className={classes} css={styles.euiFlyoutFooter} {...rest} ref={ref}>
        {children}
      </div>
    );
  }
);

EuiFlyoutFooter.displayName = 'EuiFlyoutFooter';
