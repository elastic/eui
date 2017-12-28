declare module "@elastic/eui" {

  export interface EuiTablePaginationProps {
    activePage?: number,
    itemsPerPage?: number,
    itemsPerPageOptions?: number[],
    onChangeItemsPerPage?: (pageSize: number) => void,
    onChangePage?: (pageIndex: number) => void,
    pageCount?: number
  }
  export class EuiTablePagination extends React.Component<EuiTablePaginationProps, {}>{}

}
