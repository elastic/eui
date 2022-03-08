/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  FunctionComponent,
  useState,
  useMemo,
  useCallback,
} from 'react';

import { EuiButtonEmpty } from '../../button';
import { EuiContextMenuItem, EuiContextMenuPanel } from '../../context_menu';
import { EuiFlexGroup, EuiFlexItem } from '../../flex';
import { EuiPagination, EuiPaginationProps } from '../../pagination';
import { EuiPopover } from '../../popover';
import { EuiI18n } from '../../i18n';

export type PageChangeHandler = EuiPaginationProps['onPageClick'];
export type ItemsPerPageChangeHandler = (pageSize: number) => void;

export interface EuiTablePaginationProps
  extends Omit<EuiPaginationProps, 'onPageClick'> {
  /**
   * Option to completely hide the "Rows per page" selector.
   */
  showPerPageOptions?: boolean;
  /**
   * Current selection for "Rows per page".
   * Pass `0` as to display the selected "Show all" option and hide the pagination.
   */
  itemsPerPage?: number;
  /**
   * Custom array of options for "Rows per page".
   * Pass `0` as one of option to create a "Show all" option.
   */
  itemsPerPageOptions?: number[];
  /**
   * Click handler that passes back selected `pageSize` number
   */
  onChangeItemsPerPage?: ItemsPerPageChangeHandler;
  onChangePage?: PageChangeHandler;
  /**
   * Requires the `id` of the table being controlled
   */
  'aria-controls'?: string;
  'aria-label'?: string;
}

export const EuiTablePagination: FunctionComponent<EuiTablePaginationProps> = ({
  activePage,
  itemsPerPage = 50,
  itemsPerPageOptions = [10, 20, 50, 100],
  showPerPageOptions = true,
  onChangeItemsPerPage = () => {},
  onChangePage,
  pageCount,
  ...rest
}) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const togglePopover = useCallback(() => {
    setIsPopoverOpen((isOpen) => !isOpen);
  }, []);

  const closePopover = useCallback(() => {
    setIsPopoverOpen(false);
  }, []);

  const button = (
    <EuiButtonEmpty
      size="xs"
      color="text"
      iconType="arrowDown"
      iconSide="right"
      data-test-subj="tablePaginationPopoverButton"
      onClick={togglePopover}
    >
      {itemsPerPage === 0 ? (
        <EuiI18n
          token="euiTablePagination.showingAll"
          default="Showing all rows"
        />
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

  const items = useMemo(
    () =>
      itemsPerPageOptions.map((itemsPerPageOption) => (
        <EuiContextMenuItem
          key={itemsPerPageOption}
          icon={itemsPerPageOption === itemsPerPage ? 'check' : 'empty'}
          onClick={() => {
            closePopover();
            onChangeItemsPerPage(itemsPerPageOption);
          }}
          data-test-subj={`tablePagination-${itemsPerPageOption}-rows`}
        >
          {itemsPerPageOption === 0 ? (
            <EuiI18n
              token="euiTablePagination.rowsPerPageOptionShowAllRows"
              default="Show all rows"
            />
          ) : (
            <EuiI18n
              token="euiTablePagination.rowsPerPageOption"
              values={{ rowsPerPage: itemsPerPageOption }}
              default="{rowsPerPage} rows"
            />
          )}
        </EuiContextMenuItem>
      )),
    [itemsPerPageOptions, itemsPerPage, onChangeItemsPerPage, closePopover]
  );

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
      wrap
      gutterSize="s"
      className="eui-xScroll"
    >
      <EuiFlexItem grow={false}>
        {showPerPageOptions && itemsPerPagePopover}
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
