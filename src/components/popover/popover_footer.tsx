/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
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
