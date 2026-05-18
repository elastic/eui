/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { Key, ReactNode, useState } from 'react';
import classNames from 'classnames';

import { CommonProps } from '../../common';
import { EuiButtonEmpty } from '../../button/button_empty';
import { EuiPopover, PopoverAnchorPosition } from '../../popover';
import { EuiContextMenuPanel } from '../../context_menu';
import { EuiI18n } from '../../i18n';

import { EuiTableSortMobileItem } from './table_sort_mobile_item';

interface ItemProps {
  name: ReactNode;
  key?: Key;
  onSort?: () => void;
  isSorted?: boolean;
  isSortAscending?: boolean;
}

export interface EuiTableSortMobileProps extends CommonProps {
  anchorPosition?: PopoverAnchorPosition;
  items?: ItemProps[];
}

// Aligns the button to the right even when it's the only element present
const euiTableSortMobileStyles = {
  marginInlineStart: 'auto',
  label: 'euiTableSortMobile',
};

export const EuiTableSortMobile = ({
  className,
  anchorPosition,
  items,
  ...rest
}: EuiTableSortMobileProps) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const classes = classNames('euiTableSortMobile', className);

  const onButtonClick = () => {
    setIsPopoverOpen((isOpen) => !isOpen);
  };

  const closePopover = () => {
    setIsPopoverOpen(false);
  };

  const mobileSortButton = (
    <EuiButtonEmpty
      iconType="chevronSingleDown"
      iconSide="right"
      onClick={onButtonClick}
      flush="right"
      size="xs"
    >
      <EuiI18n token="euiTableSortMobile.sorting" default="Sorting" />
    </EuiButtonEmpty>
  );

  const mobileSortPopover = (
    <EuiPopover
      button={mobileSortButton}
      isOpen={isPopoverOpen}
      closePopover={closePopover}
      anchorPosition={anchorPosition || 'downRight'}
      panelPaddingSize="none"
      {...rest}
    >
      <EuiContextMenuPanel
        style={{ minWidth: 200 }}
        items={
          items?.length
            ? items.map((item) => (
                <EuiTableSortMobileItem
                  key={item.key}
                  onSort={item.onSort}
                  isSorted={item.isSorted}
                  isSortAscending={item.isSortAscending}
                >
                  {item.name}
                </EuiTableSortMobileItem>
              ))
            : undefined
        }
      />
    </EuiPopover>
  );

  return (
    <div className={classes} css={euiTableSortMobileStyles}>
      {mobileSortPopover}
    </div>
  );
};

EuiTableSortMobile.displayName = 'EuiTableSortMobile';
