/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
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
        ownFocus
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
              ? items.map(item => {
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
