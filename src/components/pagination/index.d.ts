/// <reference path="../common.d.ts" />

declare module "@elastic/eui" {

  import { DOMAttributes, SFC } from 'react';


  /**
   * pagination type defs
   *
   * @see './pagination.js'
   */

  export type PageClickHandler = (pageIndex: number) => void;

  export interface EuiPaginationProps {
    pageCount?: number,
    activePage?: number,
    onPageClick?: PageClickHandler
  }

  export type EuiPagination = SFC<
    CommonProps &
    DOMAttributes<HTMLDivElement> &
    EuiPaginationProps
    >;


  /**
   * pagination button type defs
   *
   * @see './pagination_button.js'
   */

  export interface EuiPaginationButtonProps {
    isActive?: boolean,
    isPlaceholder?: boolean,
    hideOnMobile?: boolean
  }

  export type EuiPaginationButton = SFC<
    CommonProps &
    Omit<EuiButtonEmptyProps, 'size', 'color'> &
    EuiPaginationButtonProps
    >;

}
