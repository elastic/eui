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

import React, { Component } from 'react';

import { EuiButtonEmpty } from '../../button';
import { EuiContextMenuItem, EuiContextMenuPanel } from '../../context_menu';
import { EuiFlexGroup, EuiFlexItem } from '../../flex';
import { EuiPagination } from '../../pagination';
import { EuiPopover } from '../../popover';
import { EuiI18n } from '../../i18n';

export type PageChangeHandler = (pageIndex: number) => void;
export type ItemsPerPageChangeHandler = (pageSize: number) => void;

export interface EuiTablePaginationProps {
  activePage?: number;
  hidePerPageOptions?: boolean;
  itemsPerPage?: number;
  itemsPerPageOptions?: number[];
  onChangeItemsPerPage?: ItemsPerPageChangeHandler;
  onChangePage?: PageChangeHandler;
  pageCount?: number;
  /**
   * id of the table being controlled
   */
  'aria-controls'?: string;
}

interface State {
  isPopoverOpen: boolean;
}

export class EuiTablePagination extends Component<
  EuiTablePaginationProps,
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
    const {
      activePage,
      itemsPerPage = 50,
      itemsPerPageOptions = [10, 20, 50, 100],
      hidePerPageOptions = false,
      onChangeItemsPerPage = () => {},
      onChangePage,
      pageCount,
      ...rest
    } = this.props;

    const button = (
      <EuiButtonEmpty
        size="xs"
        color="text"
        iconType="arrowDown"
        iconSide="right"
        data-test-subj="tablePaginationPopoverButton"
        onClick={this.onButtonClick}>
        <EuiI18n
          token="euiTablePagination.rowsPerPage"
          default="Rows per page"
        />
        : {itemsPerPage}
      </EuiButtonEmpty>
    );

    const items = itemsPerPageOptions.map((itemsPerPageOption) => (
      <EuiContextMenuItem
        key={itemsPerPageOption}
        icon={itemsPerPageOption === itemsPerPage ? 'check' : 'empty'}
        onClick={() => {
          this.closePopover();
          onChangeItemsPerPage(itemsPerPageOption);
        }}
        data-test-subj={`tablePagination-${itemsPerPageOption}-rows`}>
        <EuiI18n
          token="euiTablePagination.rowsPerPageOption"
          values={{ rowsPerPage: itemsPerPageOption }}
          default="{rowsPerPage} rows"
        />
      </EuiContextMenuItem>
    ));

    const itemsPerPagePopover = (
      <EuiPopover
        button={button}
        isOpen={this.state.isPopoverOpen}
        closePopover={this.closePopover}
        panelPaddingSize="none"
        anchorPosition="upRight">
        <EuiContextMenuPanel items={items} />
      </EuiPopover>
    );

    return (
      <EuiFlexGroup
        justifyContent="spaceBetween"
        alignItems="center"
        responsive={false}>
        <EuiFlexItem grow={false}>
          {hidePerPageOptions ? null : itemsPerPagePopover}
        </EuiFlexItem>

        <EuiFlexItem grow={false}>
          <EuiPagination
            pageCount={pageCount}
            activePage={activePage}
            onPageClick={onChangePage}
            {...rest}
          />
        </EuiFlexItem>
      </EuiFlexGroup>
    );
  }
}
