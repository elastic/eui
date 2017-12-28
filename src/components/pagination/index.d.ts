declare module "@elastic/eui" {

  import { ReactNode } from 'react';

  export interface EuiPaginationProps {
    className?: string,
    pageCount?: number,
    activePage?: number,
    onPageClick?: (pageIndex: number) => void
  }
  export class EuiPagination extends React.Component<EuiPaginationProps, {}>{}


  export interface EuiPaginationButtonProps {
    children?: ReactNode,
    className?: string,
    isActive?: boolean,
    isPlaceholder?: boolean,
    hideOnMobile?: boolean
  }
  export class EuiPaginationButton extends React.Component<EuiPaginationButtonProps, {}>{}
}
