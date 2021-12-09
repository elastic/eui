import React, { useState } from 'react';

import { EuiPagination } from '../../../../src';

export default function () {
  const [activePage, setActivePage] = useState(0);
  const PAGE_COUNT = 4;

  return (
    <EuiPagination
      aria-label="Few pages example"
      pageCount={PAGE_COUNT}
      activePage={activePage}
      onPageClick={(activePage) => setActivePage(activePage)}
    />
  );
}
