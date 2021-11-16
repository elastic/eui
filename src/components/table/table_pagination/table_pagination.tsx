/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, useState } from 'react';

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
  'aria-label'?: string;
}

export const EuiTablePagination: FunctionComponent<EuiTablePaginationProps> = ({
  activePage,
  itemsPerPage = 50,
  itemsPerPageOptions = [10, 20, 50, 100],
  hidePerPageOptions = false,
  onChangeItemsPerPage = () => {},
  onChangePage,
  pageCount,
  ...rest
}) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const onButtonClick = () => {
    setIsPopoverOpen((isOpen) => !isOpen);
  };

  const closePopover = () => {
    setIsPopoverOpen(false);
  };

  const button = (
    <EuiButtonEmpty
      size="xs"
      color="text"
      iconType="arrowDown"
      iconSide="right"
      data-test-subj="tablePaginationPopoverButton"
      onClick={onButtonClick}
    >
      {itemsPerPage === 0 ? (
        <EuiI18n token="euiTablePagination.showingAll" default="Showing all" />
      ) : (
        <>
          <EuiI18n
            token="euiTablePagination.rowsPerPage"
            default="Rows per page"
          />
          : {itemsPerPage}
        </>
      )}
    </EuiButtonEmpty>
  );

  const items = itemsPerPageOptions.map((itemsPerPageOption) => {
    return itemsPerPageOption === 0 ? (
      <EuiContextMenuItem
        key={itemsPerPageOption}
        icon={itemsPerPageOption === itemsPerPage ? 'check' : 'empty'}
        onClick={() => {
          closePopover();
          onChangeItemsPerPage(itemsPerPageOption);
        }}
        data-test-subj={`tablePagination-${'all'}-rows`}
      >
        <EuiI18n
          token="euiTablePagination.rowsPerPageOptionShowAll"
          default="Show all"
        />
      </EuiContextMenuItem>
    ) : (
      <EuiContextMenuItem
        key={itemsPerPageOption}
        icon={itemsPerPageOption === itemsPerPage ? 'check' : 'empty'}
        onClick={() => {
          closePopover();
          onChangeItemsPerPage(itemsPerPageOption);
        }}
        data-test-subj={`tablePagination-${itemsPerPageOption}-rows`}
      >
        <EuiI18n
          token="euiTablePagination.rowsPerPageOption"
          values={{ rowsPerPage: itemsPerPageOption }}
          default="{rowsPerPage} rows"
        />
      </EuiContextMenuItem>
    );
  });

  const itemsPerPagePopover = (
    <EuiPopover
      button={button}
      isOpen={isPopoverOpen}
      closePopover={closePopover}
      panelPaddingSize="none"
      anchorPosition="upRight"
    >
      <EuiContextMenuPanel items={items} />
    </EuiPopover>
  );

  return (
    <EuiFlexGroup
      justifyContent="spaceBetween"
      alignItems="center"
      responsive={false}
    >
      <EuiFlexItem grow={false}>
        {hidePerPageOptions ? null : itemsPerPagePopover}
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        {itemsPerPage > 0 && (
          <EuiPagination
            pageCount={pageCount}
            activePage={activePage}
            onPageClick={onChangePage}
            {...rest}
          />
        )}
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};
