import React, { HTMLAttributes, FunctionComponent, MouseEventHandler } from 'react';
import classNames from 'classnames';

import { toInitials } from '../../services';
import { CommonProps } from '../common';
import { EuiListGroup } from '../list_group';
import { FlyoutLinks } from './nav_drawer';

export const ATTR_SELECTOR = 'data-name';

export interface EuiNavDrawerGroupProps
  extends CommonProps, HTMLAttributes<HTMLDivElement> {
    className: string,
    listItems: Array<FlyoutLinks>,
    flyoutMenuButtonClick: (items: unknown[], title: string, item: unknown) => MouseEventHandler<HTMLButtonElement>,
    onClose: () => void,
  }

export const EuiNavDrawerGroup: FunctionComponent<EuiNavDrawerGroupProps> = ({
  className,
  listItems,
  flyoutMenuButtonClick = () => {},
  onClose = () => {},
  ...rest
}) => {
  const classes = classNames('euiNavDrawerGroup', className);

  const listItemsExists = listItems && !!listItems.length;

  // Alter listItems object with prop flyoutMenu and extra props
  const newListItems = !listItemsExists
    ? undefined
    : listItems.map(item => {
        // If the flyout menu exists, pass back the list of times and the title with the onClick handler of the item
        const { flyoutMenu, onClick, ...itemProps } = item;
        if (flyoutMenu && flyoutMenuButtonClick) {
          const items = [...flyoutMenu.listItems];
          const title = `${flyoutMenu.title}`;
          itemProps.onClick = () => flyoutMenuButtonClick(items, title, item);
          itemProps['aria-expanded'] = false;
        } else {
          itemProps.onClick = (...args: any[]) => {
            if (onClick) {
              onClick(...args);
            }
            onClose();
          };
        }

        // Make some declarations of props for the side nav implementation
        itemProps.className = classNames(
          'euiNavDrawerGroup__item',
          item.className
        );
        itemProps.size = item.size || 's';
        itemProps[ATTR_SELECTOR] = item.label;
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
