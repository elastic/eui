import React, { FunctionComponent, ReactNode } from 'react';
import classNames from 'classnames';

import { EuiListGroup, EuiListGroupProps } from '../list_group/list_group';
import { EuiListGroupItemProps } from '../list_group/list_group_item';
import { toInitials } from '../../services';

export const ATTR_SELECTOR = 'data-name';

export type FlyoutMenuItem = EuiListGroupItemProps & {
  'data-name'?: ReactNode | ReactNode[];
  flyoutMenu?: {
    title: string;
    listItems: FlyoutMenuItem[];
  };
  label: string;
};

export interface EuiNavDrawerGroupProps extends EuiListGroupProps {
  listItems?: FlyoutMenuItem[];

  /**
   * While not normally required, it is required to pass a function for handling
   * of the flyout menu button click
   */
  flyoutMenuButtonClick?: (
    links: FlyoutMenuItem[],
    title: string,
    item: FlyoutMenuItem
  ) => void;

  /**
   * Passthrough function to be called when the flyout is closing
   * @see `EuiNavDrawer`
   */
  onClose?: () => void;
}

export const EuiNavDrawerGroup: FunctionComponent<EuiNavDrawerGroupProps> = ({
  className,
  listItems,
  flyoutMenuButtonClick,
  onClose = () => {},
  ...rest
}) => {
  // Alter listItems object with prop flyoutMenu and extra props
  const newListItems = !(listItems && !!listItems.length)
    ? undefined
    : listItems.map(item => {
        // If the flyout menu exists, pass back the list of times and the title with the onClick handler of the item
        const { flyoutMenu, ...itemProps } = item;
        if (flyoutMenu && flyoutMenuButtonClick) {
          const items = [...flyoutMenu.listItems];
          const title = `${flyoutMenu.title}`;
          itemProps.onClick = () => {
            flyoutMenuButtonClick(items, title, item);
          };
          itemProps['aria-expanded'] = false;
        } else {
          itemProps.onClick = event => {
            if (item.onClick) {
              item.onClick(event);
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
    <EuiListGroup
      className={classNames('euiNavDrawerGroup', className)}
      listItems={newListItems}
      {...rest}
    />
  );
};
