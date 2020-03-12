import React, { FunctionComponent } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../../common';

import { EuiListGroup, EuiListGroupProps } from '../list_group';
import { EuiListGroupItemProps } from '../list_group_item';

const pinExtraAction: EuiListGroupItemProps['extraAction'] = {
  color: 'primary',
  iconType: 'pinFilled',
  iconSize: 's',
  className: 'euiPinnableListGroup__itemExtraAction',
  'aria-label': 'Pin to top',
  title: 'Pin to top',
};

const pinnedExtraAction: EuiListGroupItemProps['extraAction'] = {
  color: 'primary',
  iconType: 'pinFilled',
  iconSize: 's',
  className:
    'euiPinnableListGroup__itemExtraAction euiPinnableListGroup__itemExtraAction-pinned',
  'aria-label': 'Unpin item',
  title: 'Unpin item',
  alwaysShow: true,
};

export type EuiPinnableListGroupItemProps = EuiListGroupItemProps & {
  pinned?: boolean;
};

export interface EuiPinnableListGroupProps
  extends CommonProps,
    EuiListGroupProps {
  /**
   * Extends `EuiListGroupItemProps`, at the very least, expecting a `label`.
   * See #EuiPinnableListGroupItem
   */
  listItems: EuiPinnableListGroupItemProps[];
  /**
   * Shows the pin icon and calls this function on click.
   * Returns `item: EuiPinnableListGroupItemProps`
   */
  onPinClick: (item: EuiPinnableListGroupItemProps) => void;
}

export const EuiPinnableListGroup: FunctionComponent<
  EuiPinnableListGroupProps
> = ({ className, listItems, onPinClick, ...rest }) => {
  const classes = classNames('euiPinnableListGroup', className);

  // Alter listItems object with extra props
  const newListItems = listItems.map(item => {
    const { pinned, ...itemProps } = item;
    // Make some declarations of props for the nav implementation
    itemProps.className = classNames(
      'euiPinnableListGroup__item',
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
