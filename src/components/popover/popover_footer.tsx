/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { HTMLAttributes, FunctionComponent } from 'react';
import classNames from 'classnames';
import { EuiPaddingSize, useEuiPaddingCSS } from '../../global_styling';
import { useEuiTheme } from '../../services';
import { CommonProps } from '../common';
import { euiPopoverFooterStyles } from './popover_footer.styles';

export type EuiPopoverFooterProps = FunctionComponent<
  HTMLAttributes<HTMLDivElement> &
    CommonProps & {
      /**
       * Customize the all around padding of the popover footer.
       * Leave `undefined` to inherit from the `panelPaddingSize` of the containing EuiPopover
       */
      paddingSize?: EuiPaddingSize;
    }
>;

export const EuiPopoverFooter: EuiPopoverFooterProps = ({
  children,
  className,
  paddingSize,
  ...rest
}) => {
  const euiTheme = useEuiTheme();
  const styles = euiPopoverFooterStyles(euiTheme);
  const paddingStyles = useEuiPaddingCSS();
  const cssStyles = [
    styles.euiPopoverFooter,
    paddingSize && paddingStyles[paddingSize],
  ];

  const classes = classNames(
    'euiPopoverFooter',
    // The following class is necessary to makeup for the panel padding
    paddingSize ? `euiPopoverFooter--padding-${paddingSize}` : null,
    className
  );

  return (
    <div css={cssStyles} className={classes} {...rest}>
      {children}
    </div>
  );
};
