/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
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
  Omit<HTMLAttributes<HTMLUListElement>, 'color'> & {
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
      childrenOrListItems = React.Children.map(children, (child) => {
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
