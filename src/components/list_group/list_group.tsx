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
import { useEuiTheme, cloneElementWithCss } from '../../services';
import { logicalStyle } from '../../global_styling';

import { euiListGroupStyles } from './list_group.styles';

export const GUTTER_SIZES = ['none', 's', 'm'] as const;
export type EuiListGroupGutterSize = (typeof GUTTER_SIZES)[number];

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
    gutterSize?: EuiListGroupGutterSize;

    /**
     * Items to display in this group. See #EuiListGroupItem
     */
    listItems?: EuiListGroupItemProps[];

    /**
     * Change the colors of all `listItems` at once
     * @default text
     */
    color?: EuiListGroupItemProps['color'];

    /**
     * Change the size of all `listItems` at once
     * @default m
     */
    size?: EuiListGroupItemProps['size'];

    /**
     * Sets the max-width of the page.
     * Set to `true` to use the default size,
     * set to `false` to not restrict the width,
     * or set to a number/string for a custom CSS width/measurement.
     */
    maxWidth?: boolean | CSSProperties['maxWidth'];

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
  let newStyle = style;

  if (maxWidth && maxWidth !== true) {
    newStyle = { ...newStyle, ...logicalStyle('max-width', maxWidth) };
  }

  const classes = classNames('euiListGroup', className);

  const euiTheme = useEuiTheme();
  const styles = euiListGroupStyles(euiTheme);

  const cssStyles = [
    styles.euiListGroup,
    styles[gutterSize],
    flush && styles.flush,
    bordered && styles.bordered,
    maxWidth === true && styles.maxWidthDefault,
  ];

  let childrenOrListItems = null;

  if (listItems) {
    childrenOrListItems = listItems.map((item, index) => {
      return [
        <EuiListGroupItem
          key={`title-${index}`}
          showToolTip={showToolTips}
          wrapText={wrapText}
          // we're passing the parent `color` and `size` down to the children
          // so that they can inherit it if they don't have one
          color={color}
          size={size}
          {...item}
        />,
      ];
    });
  } else {
    const showToolTipObj = showToolTips && { showToolTip: true };

    childrenOrListItems = React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        return cloneElementWithCss(child, {
          // we're passing the parent `color` and `size` down to the children
          // so that they can inherit it if they don't have one
          color: color,
          size: size,
          ...showToolTipObj,
          ...child.props,
        });
      }
    });
  }

  return (
    <ul
      className={classes}
      css={cssStyles}
      style={newStyle}
      aria-labelledby={ariaLabelledby}
      {...rest}
    >
      {childrenOrListItems}
    </ul>
  );
};
