/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { HTMLAttributes, FunctionComponent, useContext } from 'react';
import classNames from 'classnames';
import { EuiPaddingSize, useEuiPaddingCSS } from '../../global_styling';
import { useEuiTheme } from '../../services';
import { CommonProps } from '../common';
import { euiPopoverTitleStyles } from './popover_title.styles';
import { EuiPopoverPanelContext } from './popover_panel/_popover_panel';

export type EuiPopoverTitleProps = FunctionComponent<
  HTMLAttributes<HTMLDivElement> &
    CommonProps & {
      /**
       * Customize the all around padding of the popover title.
       * Leave `undefined` to inherit from the `panelPaddingSize` of the containing EuiPopover
       */
      paddingSize?: EuiPaddingSize;
    }
>;

export const EuiPopoverTitle: EuiPopoverTitleProps = ({
  children,
  className,
  paddingSize,
  ...rest
}) => {
  const { paddingSize: panelPadding } = useContext(EuiPopoverPanelContext);
  const euiTheme = useEuiTheme();
  const styles = euiPopoverTitleStyles(euiTheme);
  const paddingStyles = useEuiPaddingCSS();
  const cssStyles = [
    styles.euiPopoverTitle,
    styles.panelPaddingSizes[panelPadding],
    // If a paddingSize is not directly provided, inherit from the EuiPopoverPanel
    paddingStyles[paddingSize || panelPadding],
  ];

  const classes = classNames('euiPopoverTitle', className);

  return (
    <div css={cssStyles} className={classes} {...rest}>
      {children}
    </div>
  );
};
