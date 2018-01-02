/// <reference path="../../common.d.ts" />

declare module "@elastic/eui" {

  import { SFC } from 'react';

  /**
   * table pagination type defs
   *
   * @see './table_pagination.js'
   */


  export type PageChangeHandler = (pageIndex: number) => void;
  export type ItemsPerPageChangeHandler = (pageSize: number) => void;

  export interface EuiTablePaginationProps {
    activePage?: number,
    itemsPerPage?: number,
    itemsPerPageOptions?: number[],
    onChangeItemsPerPage?: ItemsPerPageChangeHandler,
    onChangePage?: PageChangeHandler,
    pageCount?: number
  }

  export type EuiTablePagination = SFC<EuiTablePaginationProps>;

}
