import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiListGroup } from '../list_group/list_group';

export const EuiNavDrawerGroup = ({ className, listItems, flyoutMenuButtonClick, ...rest }) => {
  const classes = classNames(
    'euiNavDrawerGroup',
    className
  );

  // Create handlers if flyoutMenu exists
  const newListItems = listItems.map((item) => {
    // If the flyout menu exists, pass back the list of times and the title with the onClick handler of the item
    if (item.flyoutMenu && flyoutMenuButtonClick) {
      const items = [...item.flyoutMenu.listItems];
      const title = `${item.flyoutMenu.title}`;
      item.onClick = () => flyoutMenuButtonClick(items, title);
    }

    // Then remove the flyoutMenu key
    delete item.flyoutMenu;

    // And return the item
    return item;
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
  })).isRequired,
  /**
   * While not normally required, it is required to pass a function for handling
   * of the flyout menu button click
   */
  flyoutMenuButtonClick: PropTypes.func,
};
