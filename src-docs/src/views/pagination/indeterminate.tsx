import React, { useState } from 'react';

import { EuiPagination } from '../../../../src/components';

export default function () {
  const [activePage, setActivePage] = useState(0);
  const PAGE_COUNT = 0;

  return (
    <EuiPagination
      aria-label="Indeterminate example"
      pageCount={PAGE_COUNT}
      activePage={activePage}
      onPageClick={(activePage) => setActivePage(activePage)}
      compressed
    />
  );
}
