import React, { useState } from 'react';

import { EuiPagination, EuiButtonIcon } from '../../../../src/components';

export default function() {
  const [activePage, setActivePage] = useState(0);
  const PAGE_COUNT = 10;

  const goToPage = pageNumber => {
    setActivePage(pageNumber);
  };

  const CustomButton = ({ isActive, onClick }) => (
    <EuiButtonIcon
      iconType="dot"
      color={isActive ? 'primary' : 'text'}
      onClick={onClick}
    />
  );

  return (
    <EuiPagination
      aria-label="Custom button example"
      button={CustomButton}
      pageCount={PAGE_COUNT}
      activePage={activePage}
      onPageClick={activePage => goToPage(activePage)}
    />
  );
}
