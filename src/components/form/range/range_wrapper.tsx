/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { HTMLAttributes, forwardRef } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../../common';
import { useFormContext } from '../eui_form_context';

import { useEuiTheme } from '../../../services';
import { euiRangeWrapperStyles } from './range_wrapper.styles';

export interface EuiRangeWrapperProps
  extends CommonProps,
    HTMLAttributes<HTMLDivElement> {
  /**
   * Expand to fill 100% of the parent.
   * Defaults to `fullWidth` prop of `<EuiForm>`.
   * @default false
   */
  fullWidth?: boolean;
  compressed?: boolean;
}

export const EuiRangeWrapper = forwardRef<HTMLDivElement, EuiRangeWrapperProps>(
  (props, ref) => {
    const { defaultFullWidth } = useFormContext();
    const {
      children,
      className,
      fullWidth = defaultFullWidth,
      compressed,
      ...rest
    } = props;

    const classes = classNames('euiRangeWrapper', className);

    const euiTheme = useEuiTheme();
    const styles = euiRangeWrapperStyles(euiTheme);
    const cssStyles = [
      styles.euiRangeWrapper,
      !compressed && styles.regular,
      compressed && styles.compressed,
      fullWidth && styles.fullWidth,
    ];

    return (
      <div className={classes} css={cssStyles} ref={ref} {...rest}>
        {children}
      </div>
    );
  }
);

EuiRangeWrapper.displayName = 'EuiRangeWrapper';
