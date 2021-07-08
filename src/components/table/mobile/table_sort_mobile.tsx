/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { Component, ReactNode, Key } from 'react';
import classNames from 'classnames';

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

export interface EuiTableSortMobileProps {
  className?: string;
  anchorPosition?: PopoverAnchorPosition;
  items?: ItemProps[];
}

interface State {
  isPopoverOpen: boolean;
}

export class EuiTableSortMobile extends Component<
  EuiTableSortMobileProps,
  State
> {
  state = {
    isPopoverOpen: false,
  };

  onButtonClick = () => {
    this.setState({
      isPopoverOpen: !this.state.isPopoverOpen,
    });
  };

  closePopover = () => {
    this.setState({
      isPopoverOpen: false,
    });
  };

  render() {
    const { className, anchorPosition, items, ...rest } = this.props;

    const classes = classNames('euiTableSortMobile', className);

    const mobileSortButton = (
      <EuiButtonEmpty
        iconType="arrowDown"
        iconSide="right"
        onClick={this.onButtonClick.bind(this)}
        flush="right"
        size="xs">
        <EuiI18n token="euiTableSortMobile.sorting" default="Sorting" />
      </EuiButtonEmpty>
    );

    const mobileSortPopover = (
      <EuiPopover
        button={mobileSortButton}
        isOpen={this.state.isPopoverOpen}
        closePopover={this.closePopover}
        anchorPosition={anchorPosition || 'downRight'}
        panelPaddingSize="none"
        {...rest}>
        <EuiContextMenuPanel
          style={{ minWidth: 200 }}
          items={
            items && items.length
              ? items.map((item) => {
                  return (
                    <EuiTableSortMobileItem
                      key={item.key}
                      onSort={item.onSort}
                      isSorted={item.isSorted}
                      isSortAscending={item.isSortAscending}>
                      {item.name}
                    </EuiTableSortMobileItem>
                  );
                })
              : undefined
          }
          watchedItemProps={['isSorted', 'isSortAscending']}
        />
      </EuiPopover>
    );

    return <div className={classes}>{mobileSortPopover}</div>;
  }
}
