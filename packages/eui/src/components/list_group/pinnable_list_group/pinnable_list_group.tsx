/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, useMemo } from 'react';
import classNames from 'classnames';

import { useEuiMemoizedStyles } from '../../../services';
import { CommonProps } from '../../common';
import { useEuiI18n } from '../../i18n';

import { EuiListGroup, EuiListGroupProps } from '../list_group';
import { EuiListGroupItemProps } from '../list_group_item';
import { euiPinnableListGroupItemExtraActionStyles } from './pinnable_list_group.styles';

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
   * See #EuiPinnableListGroupItemProps
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

export const EuiPinnableListGroup: FunctionComponent<
  EuiPinnableListGroupProps
> = ({ className, listItems, pinTitle, unpinTitle, onPinClick, ...rest }) => {
  const classes = classNames('euiPinnableListGroup', className);
  const styles = useEuiMemoizedStyles(
    euiPinnableListGroupItemExtraActionStyles
  );

  const pinExtraActionLabel = useEuiI18n(
    'euiPinnableListGroup.pinExtraActionLabel',
    'Pin item'
  );
  const pinnedExtraActionLabel = useEuiI18n(
    'euiPinnableListGroup.pinnedExtraActionLabel',
    'Unpin item'
  );

  // Alter listItems object with extra props
  const pinnableListItems = useMemo(() => {
    return listItems.map((item) => {
      const { pinned, pinnable = true, ...itemProps } = item;
      // Make some declarations of props for the nav implementation
      itemProps.className = classNames(
        'euiPinnableListGroup__item',
        item.className
      );

      // Add the pinning action unless the item has its own extra action
      if (pinnable && !itemProps.extraAction) {
        // Different displays for pinned vs unpinned
        const sharedProps: EuiListGroupItemProps['extraAction'] = {
          iconType: 'pinFilled',
          iconSize: 's',
          css: [
            styles.euiPinnableListGroup__itemExtraAction,
            pinned && styles.pinned,
          ],
        };
        if (pinned) {
          const title = unpinTitle ? unpinTitle(item) : pinnedExtraActionLabel;

          itemProps.extraAction = {
            ...sharedProps,
            alwaysShow: true,
            'aria-label': title,
            title,
          };
        } else {
          const title = pinTitle ? pinTitle(item) : pinExtraActionLabel;

          itemProps.extraAction = {
            ...sharedProps,
            'aria-label': title,
            title,
          };
        }
        // Return the item on click
        itemProps.extraAction.onClick = () => onPinClick(item);
      }

      return itemProps;
    });
  }, [
    listItems,
    pinTitle,
    pinExtraActionLabel,
    unpinTitle,
    pinnedExtraActionLabel,
    onPinClick,
    styles,
  ]);

  return (
    <EuiListGroup className={classes} listItems={pinnableListItems} {...rest} />
  );
};
