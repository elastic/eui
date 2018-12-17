import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  EuiListGroupItem,
} from './list_group_item';

export const EuiListGroup = ({
  children,
  className,
  flush,
  bordered,
  listItems,
  ...rest
}) => {

  const classes = classNames(
    'euiListGroup',
    {
      'euiListGroup--flush': flush,
      'euiListGroup--bordered': bordered,
    },
    className
  );

  let childrenOrListItems = null;
  if (listItems) {
    childrenOrListItems = (
      listItems.map((item, index) => {
        return [
          <EuiListGroupItem
            key={`title-${index}`}
            label={item.label}
            href={item.href}
            linkAction={item.linkAction}
            iconType={item.iconType}
            isActive={item.isActive}
            isDisabled={item.isDisabled}
          />
        ];
      })
    );
  } else {
    childrenOrListItems = children;
  }

  return (
    <ul
      className={classes}
      {...rest}
    >
      {childrenOrListItems}
    </ul>
  );
};

EuiListGroup.propTypes = {
  listItems: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.node,
    href: PropTypes.string,
    linkAction: PropTypes.node,
    iconType: PropTypes.string,
    isActive: PropTypes.boolean,
    isDisabled: PropTypes.boolean,
  })),
  children: PropTypes.node,
  className: PropTypes.string,

  /**
   * Remove container padding, stretching list items to the edges
   */
  flush: PropTypes.bool.isRequired,

  /**
   * Add a border to the list container
   */
  bordered: PropTypes.bool.isRequired,
};

EuiListGroup.defaultProps = {
  flush: false,
  bordered: false,
};
