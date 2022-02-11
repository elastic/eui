import React, { useState } from 'react';

import { EuiTablePagination } from '../../../../src';

export default () => {
  const totalEntries = 1250;
  const [activePage, setActivePage] = useState(0);
  const [rowSize, setRowSize] = useState<number | 'all'>(50);
  const [pageCount, setPageCount] = useState(Math.ceil(totalEntries / 50));

  const goToPage = (pageNumber: number) => setActivePage(pageNumber);
  const changeItemsPerPage = (pageSize: number | 'all') => {
    const pageCount =
      pageSize === 'all' ? 1 : Math.ceil(totalEntries / pageSize);
    setPageCount(pageCount);
    setRowSize(pageSize);
    setActivePage(0);
  };

  return (
    <EuiTablePagination
      aria-label="Table pagination example"
      pageCount={pageCount}
      activePage={activePage}
      onChangePage={goToPage}
      itemsPerPage={rowSize}
      onChangeItemsPerPage={changeItemsPerPage}
      itemsPerPageOptions={[10, 20, 'all']}
    />
  );
};
