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

import React, { FunctionComponent, HTMLAttributes, CSSProperties } from 'react';
import classNames from 'classnames';

import { EuiListGroupItem, EuiListGroupItemProps } from './list_group_item';
import { CommonProps } from '../common';

type GutterSize = 'none' | 's' | 'm';
const gutterSizeToClassNameMap: { [size in GutterSize]: string } = {
  none: '',
  s: 'euiListGroup--gutterSmall',
  m: 'euiListGroup--gutterMedium',
};
export const GUTTER_SIZES = Object.keys(
  gutterSizeToClassNameMap
) as GutterSize[];

export type EuiListGroupProps = CommonProps &
  HTMLAttributes<HTMLUListElement> & {
    /**
     * Add a border to the list container
     */
    bordered?: boolean;

    /**
     * Remove container padding, stretching list items to the edges
     */
    flush?: boolean;

    /**
     * Spacing between list items
     */
    gutterSize?: GutterSize;

    /**
     * Items to display in this group. See #EuiListGroupItem
     */
    listItems?: EuiListGroupItemProps[];

    /**
     * Change the colors of all `listItems` at once
     */
    color?: EuiListGroupItemProps['color'];

    /**
     * Change the size of all `listItems` at once
     */
    size?: EuiListGroupItemProps['size'];

    /**
     * Sets the max-width of the page,
     * set to `true` to use the default size,
     * set to `false` to not restrict the width,
     * set to a number for a custom width in px,
     * set to a string for a custom width in custom measurement.
     */
    maxWidth?: boolean | number | string;

    /**
     * Display tooltips on all list items
     */
    showToolTips?: boolean;

    /**
     * Allow link text to wrap vs truncated
     */
    wrapText?: boolean;
    ariaLabelledby?: string;
  };

export const EuiListGroup: FunctionComponent<EuiListGroupProps> = ({
  children,
  className,
  listItems,
  style,
  flush = false,
  bordered = false,
  gutterSize = 's',
  wrapText = false,
  maxWidth = true,
  showToolTips = false,
  color,
  size,
  ariaLabelledby,
  ...rest
}) => {
  let newStyle: CSSProperties | undefined;
  let widthClassName;
  if (maxWidth !== true) {
    let value: CSSProperties['maxWidth'];
    if (typeof maxWidth === 'number') {
      value = `${maxWidth}px`;
    } else {
      value = typeof maxWidth === 'string' ? maxWidth : undefined;
    }

    newStyle = { ...style, maxWidth: value };
  } else if (maxWidth === true) {
    widthClassName = 'euiListGroup-maxWidthDefault';
  }

  const classes = classNames(
    'euiListGroup',
    {
      'euiListGroup-flush': flush,
      'euiListGroup-bordered': bordered,
    },
    gutterSizeToClassNameMap[gutterSize],
    widthClassName,
    className
  );

  let childrenOrListItems = null;
  if (listItems) {
    childrenOrListItems = listItems.map((item, index) => {
      return [
        <EuiListGroupItem
          key={`title-${index}`}
          showToolTip={showToolTips}
          wrapText={wrapText}
          color={color}
          size={size}
          {...item}
        />,
      ];
    });
  } else {
    if (showToolTips) {
      childrenOrListItems = React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement<Partial<EuiListGroupItemProps>>(child, {
            showToolTip: true,
          });
        }
      });
    } else {
      childrenOrListItems = children;
    }
  }

  return (
    <ul
      className={classes}
      style={newStyle || style}
      aria-labelledby={ariaLabelledby}
      {...rest}>
      {childrenOrListItems}
    </ul>
  );
};
