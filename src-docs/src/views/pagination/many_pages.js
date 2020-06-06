import React, { useState } from 'react';

import { EuiPagination } from '../../../../src/components';

export default function() {
  const [activePage, setActivePage] = useState(0);
  const PAGE_COUNT = 22;

  const goToPage = pageNumber => {
    setActivePage(pageNumber);
  };

  return (
    <EuiPagination
      aria-label="Many pages example"
      pageCount={PAGE_COUNT}
      activePage={activePage}
      onPageClick={activePage => goToPage(activePage)}
    />
  );
}
