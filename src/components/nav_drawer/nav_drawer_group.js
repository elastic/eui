import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiListGroup } from '../list_group/list_group';
import { toInitials } from '../../services';

export const EuiNavDrawerGroup = ({
  className,
  listItems,
  flyoutMenuButtonClick,
  ...rest
}) => {
  const classes = classNames('euiNavDrawerGroup', className);

  const listItemsExists = listItems && !!listItems.length;

  // Alter listItems object with prop flyoutMenu and extra props
  const newListItems = !listItemsExists
    ? undefined
    : listItems.map(item => {
        // If the flyout menu exists, pass back the list of times and the title with the onClick handler of the item
        const { flyoutMenu, ...itemProps } = item;
        if (flyoutMenu && flyoutMenuButtonClick) {
          const items = [...flyoutMenu.listItems];
          const title = `${flyoutMenu.title}`;
          itemProps.onClick = () => flyoutMenuButtonClick(items, title);
        }

        // Make some declarations of props for the side nav implementation
        itemProps.className = classNames(
          'euiNavDrawerGroup__item',
          item.className
        );
        itemProps.size = item.size || 's';
        itemProps['aria-label'] = item['aria-label'] || item.label;

        // Add an avatar in place of non-existent icons
        const itemProvidesIcon = !!item.iconType || !!item.icon;
        if (!itemProvidesIcon) {
          itemProps.icon = (
            <span className="euiNavDrawerGroup__itemDefaultIcon">
              {toInitials(item.label)}
            </span>
          );
        }

        // And return the item with conditional `onClick` and without `flyoutMenu`
        return { ...itemProps };
      });

  return (
    <EuiListGroup className={classes} listItems={newListItems} {...rest} />
  );
};

EuiNavDrawerGroup.propTypes = {
  listItems: PropTypes.arrayOf(
    PropTypes.shape({
      ...EuiListGroup.propTypes.listItems[0],
      flyoutMenu: PropTypes.shape({
        title: PropTypes.string.isRequired,
        listItems: EuiListGroup.propTypes.listItems.isRequired,
      }),
    })
  ),
  /**
   * While not normally required, it is required to pass a function for handling
   * of the flyout menu button click
   */
  flyoutMenuButtonClick: PropTypes.func,
};
