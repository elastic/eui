import { CommonProps, Omit } from '../common';
/// <reference path="../button/index.d.ts" />

import { HTMLAttributes, FunctionComponent } from 'react';

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

  export const EuiPagination: FunctionComponent<
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

  export const EuiPaginationButton: FunctionComponent<
    CommonProps &
      Omit<EuiButtonEmptyProps, 'size' | 'color'> &
      EuiPaginationButtonProps
  >;
}
