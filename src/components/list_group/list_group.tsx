import React, { FunctionComponent, HTMLAttributes, CSSProperties } from 'react';
import classNames from 'classnames';

import { EuiListGroupItem, EuiListGroupItemProps } from './list_group_item';
import { CommonProps } from '../common';

type EuiListGroupProps = CommonProps &
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
     * Items to display in this group
     */
    listItems?: EuiListGroupItemProps[];

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
     * Allow link text to wrap
     */
    wrapText?: boolean;
  };

export const EuiListGroup: FunctionComponent<EuiListGroupProps> = ({
  children,
  className,
  listItems,
  style,
  flush = false,
  bordered = false,
  wrapText = false,
  maxWidth = true,
  showToolTips = false,
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
    <ul className={classes} style={newStyle || style} {...rest}>
      {childrenOrListItems}
    </ul>
  );
};
