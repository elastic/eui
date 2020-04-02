import React, { useState } from 'react';

import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiPagination,
} from '../../../../src/components';

export default function() {
  const [activePage, setActivePage] = useState(0);
  const PAGE_COUNT = 10;

  const goToPage = pageNumber => {
    setActivePage(pageNumber);
  };

  return (
    <EuiFlexGroup justifyContent="spaceAround">
      <EuiFlexItem grow={false}>
        <EuiPagination
          pageCount={PAGE_COUNT}
          activePage={activePage}
          onPageClick={activePage => goToPage(activePage)}
        />
      </EuiFlexItem>
    </EuiFlexGroup>
  );
}
