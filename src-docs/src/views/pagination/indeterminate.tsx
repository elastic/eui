import React, { useState } from 'react';

import { EuiPagination } from '../../../../src/components';

export default function () {
  const [activePage, setActivePage] = useState(0);

  return (
    <EuiPagination
      aria-label="Indeterminate example"
      pageCount={0}
      activePage={activePage}
      onPageClick={(activePage) => setActivePage(activePage)}
    />
  );
}
