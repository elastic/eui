import React, { FunctionComponent } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../../common';

import { EuiListGroup } from '../../list_group';
import { EuiListGroupProps } from '../../list_group/list_group';
import { EuiListGroupItemProps } from '../../list_group/list_group_item';

const pinExtraAction: EuiListGroupItemProps['extraAction'] = {
  color: 'primary',
  iconType: 'pinFilled',
  iconSize: 's',
  className: 'euiCollapsibleNavList__itemExtraAction',
  'aria-label': 'Pin to top',
  title: 'Pin to top',
};

const pinnedExtraAction: EuiListGroupItemProps['extraAction'] = {
  color: 'primary',
  iconType: 'pinFilled',
  iconSize: 's',
  className:
    'euiCollapsibleNavList__itemExtraAction euiCollapsibleNavList__itemExtraAction-pinned',
  'aria-label': 'Unpin item',
  title: 'Unpin item',
  alwaysShow: true,
};

export type EuiCollapsibleNavListItemProps = EuiListGroupItemProps & {
  pinned?: boolean;
};

export interface EuiCollapsibleNavListProps
  extends CommonProps,
    EuiListGroupProps {
  /**
   * Extends `EuiListGroupItemProps`, at the very least, expecting a `label`.
   * See #EuiCollapsibleNavListItem
   */
  listItems: EuiCollapsibleNavListItemProps[];
  /**
   * Allows the pinnin icon to show and calls this function on click
   */
  onPinClick?: (item: EuiCollapsibleNavListItemProps) => void;
}

export const EuiCollapsibleNavList: FunctionComponent<
  EuiCollapsibleNavListProps
> = ({ className, listItems, onPinClick, ...rest }) => {
  const classes = classNames('euiCollapsibleNavList', className);

  // Alter listItems object with extra props
  const newListItems = listItems.map(item => {
    const { pinned, ...itemProps } = item;
    // Make some declarations of props for the nav implementation
    itemProps.className = classNames(
      'euiCollapsibleNavList__item',
      item.className
    );
    itemProps.size = item.size || 's';

    // Add the pinning action unless the item has it's own extra action
    if (onPinClick && !itemProps.extraAction) {
      // Different displays for pinned vs unpinned
      if (pinned) {
        itemProps.extraAction = { ...pinnedExtraAction };
      } else {
        itemProps.extraAction = { ...pinExtraAction };
      }
      // Return the item on click
      itemProps.extraAction.onClick = () => onPinClick({ ...item });
    }

    return { ...itemProps };
  });

  return (
    <EuiListGroup className={classes} listItems={newListItems} {...rest} />
  );
};
