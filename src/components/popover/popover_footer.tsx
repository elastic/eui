/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { HTMLAttributes, FunctionComponent } from 'react';
import classNames from 'classnames';
import { CommonProps, keysOf } from '../common';
import { PanelPaddingSize } from '../panel';

export type EuiPopoverFooterProps = FunctionComponent<
  HTMLAttributes<HTMLDivElement> &
    CommonProps & {
      /**
       * Customize the all around padding of the popover footer.
       * Leave `undefined` to inherit from the `panelPaddingSize` of the containing EuiPopover
       */
      paddingSize?: PanelPaddingSize;
    }
>;

const paddingSizeToClassNameMap = {
  none: 'euiPopoverFooter--paddingNone',
  s: 'euiPopoverFooter--paddingSmall',
  m: 'euiPopoverFooter--paddingMedium',
  l: 'euiPopoverFooter--paddingLarge',
};

export const PADDING_SIZES = keysOf(paddingSizeToClassNameMap);

export const EuiPopoverFooter: EuiPopoverFooterProps = ({
  children,
  className,
  paddingSize,
  ...rest
}) => {
  const classes = classNames(
    'euiPopoverFooter',
    paddingSize ? paddingSizeToClassNameMap[paddingSize] : null,
    className
  );

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};
