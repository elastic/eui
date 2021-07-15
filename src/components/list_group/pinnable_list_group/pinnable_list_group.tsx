/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../../common';

import { EuiI18n } from '../../i18n';
import { EuiListGroup, EuiListGroupProps } from '../list_group';
import { EuiListGroupItemProps } from '../list_group_item';

const pinExtraAction: EuiListGroupItemProps['extraAction'] = {
  color: 'primary',
  iconType: 'pinFilled',
  iconSize: 's',
  className: 'euiPinnableListGroup__itemExtraAction',
};

const pinnedExtraAction: EuiListGroupItemProps['extraAction'] = {
  color: 'primary',
  iconType: 'pinFilled',
  iconSize: 's',
  className:
    'euiPinnableListGroup__itemExtraAction euiPinnableListGroup__itemExtraAction-pinned',
  alwaysShow: true,
};

export type EuiPinnableListGroupItemProps = EuiListGroupItemProps & {
  /**
   * Saves the pinned status and changes the visibility of the pin icon
   */
  pinned?: boolean;
  /**
   * Passing `onPinClick` to the full EuiPinnableListGroup, will make every item pinnable.
   * Set this property to `false` to turn off individual item pinnability
   */
  pinnable?: boolean;
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
  /**
   * The pin icon needs a title/aria-label for accessibility.
   * It is a function that passes the item back and must return a string `(item) => string`.
   * Default is `"Pin item"`
   */
  pinTitle?: (item: EuiPinnableListGroupItemProps) => string;
  /**
   * The unpin icon needs a title/aria-label for accessibility.
   * It is a function that passes the item back and must return a string `(item) => string`.
   * Default is `"Unpin item"`
   */
  unpinTitle?: (item: EuiPinnableListGroupItemProps) => string;
}

export const EuiPinnableListGroup: FunctionComponent<EuiPinnableListGroupProps> = ({
  className,
  listItems,
  pinTitle,
  unpinTitle,
  onPinClick,
  ...rest
}) => {
  const classes = classNames('euiPinnableListGroup', className);

  // Alter listItems object with extra props
  const getNewListItems = (
    pinExtraActionLabel: string,
    pinnedExtraActionLabel: string
  ) =>
    listItems.map((item) => {
      const { pinned, pinnable = true, ...itemProps } = item;
      // Make some declarations of props for the nav implementation
      itemProps.className = classNames(
        'euiPinnableListGroup__item',
        item.className
      );

      // Add the pinning action unless the item has it's own extra action
      if (onPinClick && !itemProps.extraAction && pinnable) {
        // Different displays for pinned vs unpinned
        if (pinned) {
          itemProps.extraAction = {
            ...pinnedExtraAction,
            title: unpinTitle ? unpinTitle(item) : pinnedExtraActionLabel,
            'aria-label': unpinTitle
              ? unpinTitle(item)
              : pinnedExtraActionLabel,
          };
        } else {
          itemProps.extraAction = {
            ...pinExtraAction,
            title: pinTitle ? pinTitle(item) : pinExtraActionLabel,
            'aria-label': pinTitle ? pinTitle(item) : pinExtraActionLabel,
          };
        }
        // Return the item on click
        itemProps.extraAction.onClick = () => onPinClick(item);
      }

      return itemProps;
    });

  return (
    <EuiI18n
      tokens={[
        'euiPinnableListGroup.pinExtraActionLabel',
        'euiPinnableListGroup.pinnedExtraActionLabel',
      ]}
      defaults={['Pin item', 'Unpin item']}>
      {([pinExtraActionLabel, pinnedExtraActionLabel]: string[]) => {
        const newListItems = getNewListItems(
          pinExtraActionLabel,
          pinnedExtraActionLabel
        );
        return (
          <EuiListGroup
            className={classes}
            listItems={newListItems}
            {...rest}
          />
        );
      }}
    </EuiI18n>
  );
};
