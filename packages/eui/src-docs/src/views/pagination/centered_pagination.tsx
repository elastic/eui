import React, { useState } from 'react';

import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiPagination,
} from '../../../../src/components';

export default function () {
  const [activePage, setActivePage] = useState(0);
  const PAGE_COUNT = 15;

  return (
    <EuiFlexGroup justifyContent="spaceAround">
      <EuiFlexItem grow={false}>
        <EuiPagination
          aria-label="Centered pagination example"
          pageCount={PAGE_COUNT}
          activePage={activePage}
          onPageClick={(activePage) => setActivePage(activePage)}
        />
      </EuiFlexItem>
    </EuiFlexGroup>
  );
}
