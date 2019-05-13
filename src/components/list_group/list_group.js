import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiListGroupItem } from './list_group_item';

export const EuiListGroup = ({
  children,
  className,
  flush,
  bordered,
  wrapText,
  listItems,
  maxWidth,
  style,
  showToolTips,
  ...rest
}) => {
  let newStyle;
  let widthClassName;
  if (maxWidth !== true) {
    const value = typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth;
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
        return React.cloneElement(child, {
          showToolTip: true,
        });
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

EuiListGroup.propTypes = {
  listItems: PropTypes.arrayOf(PropTypes.shape(EuiListGroupItem.propTypes)),
  children: PropTypes.node,
  className: PropTypes.string,

  /**
   * Remove container padding, stretching list items to the edges
   */
  flush: PropTypes.bool,

  /**
   * Add a border to the list container
   */
  bordered: PropTypes.bool,

  /**
   * Allow link text to wrap
   */
  wrapText: PropTypes.bool,

  /**
   * Display tooltips on all list items
   */
  showToolTips: PropTypes.bool,

  /**
   * Sets the max-width of the page,
   * set to `true` to use the default size,
   * set to `false` to not restrict the width,
   * set to a number for a custom width in px,
   * set to a string for a custom width in custom measurement.
   */
  maxWidth: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
    PropTypes.string,
  ]),
};

EuiListGroup.defaultProps = {
  flush: false,
  bordered: false,
  wrapText: false,
  maxWidth: true,
  showToolTips: false,
};
