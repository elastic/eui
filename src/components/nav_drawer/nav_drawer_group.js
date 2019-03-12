import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiListGroup } from '../list_group/list_group';

export const EuiNavDrawerGroup = ({ className, listItems, flyoutMenuButtonClick, ...rest }) => {
  const classes = classNames(
    'euiNavDrawerGroup',
    className
  );

  const listItemsExists = listItems && listItems.length;

  // Alter listItems object with prop flyoutMenu and extra props
  const newListItems = listItemsExists && listItems.map((item) => {
    // If the flyout menu exists, pass back the list of times and the title with the onClick handler of the item
    const { flyoutMenu, ...itemProps } = item;
    if (flyoutMenu && flyoutMenuButtonClick) {
      const items = [...flyoutMenu.listItems];
      const title = `${flyoutMenu.title}`;
      itemProps.onClick = () => flyoutMenuButtonClick(items, title);
    }

    // Make some declarations of props for the side nav implementation
    itemProps.className = classNames('euiNavDrawerGroup__item', item.className);
    itemProps.size = item.size || 's';
    itemProps['aria-label'] = item['aria-label'] || item.label;

    // And return the item with conditional `onClick` and without `flyoutMenu`
    return { ...itemProps };
  });


  return (
    <EuiListGroup className={classes} listItems={newListItems} {...rest} />
  );
};

EuiNavDrawerGroup.propTypes = {
  listItems: PropTypes.arrayOf(PropTypes.shape({
    ...EuiListGroup.propTypes.listItems[0],
    flyoutMenu: PropTypes.shape({
      title: PropTypes.string.isRequired,
      listItems: EuiListGroup.propTypes.listItems.isRequired,
    }),
  })),
  /**
   * While not normally required, it is required to pass a function for handling
   * of the flyout menu button click
   */
  flyoutMenuButtonClick: PropTypes.func,
};
