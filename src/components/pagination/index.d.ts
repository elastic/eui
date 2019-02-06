import { CommonProps, Omit } from '../common';
/// <reference path="../button/index.d.ts" />

import { HTMLAttributes, SFC } from 'react';

declare module '@elastic/eui' {
  /**
   * pagination type defs
   *
   * @see './pagination.js'
   */

  export type PageClickHandler = (pageIndex: number) => void;

  export interface EuiPaginationProps {
    pageCount?: number;
    activePage?: number;
    onPageClick?: PageClickHandler;
  }

  export const EuiPagination: SFC<
    CommonProps & HTMLAttributes<HTMLDivElement> & EuiPaginationProps
  >;

  /**
   * pagination button type defs
   *
   * @see './pagination_button.js'
   */

  export interface EuiPaginationButtonProps {
    isActive?: boolean;
    isPlaceholder?: boolean;
    hideOnMobile?: boolean;
  }

  export const EuiPaginationButton: SFC<
    CommonProps &
      Omit<EuiButtonEmptyProps, 'size' | 'color'> &
      EuiPaginationButtonProps
  >;
}
