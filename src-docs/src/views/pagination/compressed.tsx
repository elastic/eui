import React, { useState } from 'react';

import { EuiPagination } from '../../../../src/components';

export default function () {
  const [activePage, setActivePage] = useState(0);
  const PAGE_COUNT = 24;

  return (
    <EuiPagination
      aria-label="Compressed example"
      pageCount={PAGE_COUNT}
      activePage={activePage}
      onPageClick={(activePage) => setActivePage(activePage)}
      compressed
    />
  );
}
