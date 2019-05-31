import { FunctionComponent } from 'react';

declare module '@elastic/eui' {
  /**
   * table pagination type defs
   *
   * @see './table_pagination.js'
   */

  export type PageChangeHandler = (pageIndex: number) => void;
  export type ItemsPerPageChangeHandler = (pageSize: number) => void;

  export interface EuiTablePaginationProps {
    activePage?: number;
    itemsPerPage?: number;
    itemsPerPageOptions?: number[];
    onChangeItemsPerPage?: ItemsPerPageChangeHandler;
    onChangePage?: PageChangeHandler;
    pageCount?: number;
  }

  export const EuiTablePagination: FunctionComponent<EuiTablePaginationProps>;
}
