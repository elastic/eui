import React, { useState } from 'react';
import {
  EuiText,
  EuiResizableContainer,
  EuiPagination,
} from '../../../../src/components';
import { fake } from 'faker';

const text = (
  <>
    <p>{fake('{{lorem.paragraphs}}')}</p>
    <p>{fake('{{lorem.paragraphs}}')}</p>
    <p>{fake('{{lorem.paragraphs}}')}</p>
  </>
);

const Pagination = () => {
  const [activePage, setActivePage] = useState(0);
  const PAGE_COUNT = 22;

  const goToPage = (pageNumber) => {
    setActivePage(pageNumber);
  };

  return (
    <EuiPagination
      aria-label="Many pages example"
      pageCount={PAGE_COUNT}
      activePage={activePage}
      onPageClick={(activePage) => goToPage(activePage)}
    />
  );
};

export default () => (
  <EuiResizableContainer style={{ height: '200px' }}>
    {(EuiResizablePanel, EuiResizableButton) => (
      <>
        <EuiResizablePanel initialSize={50} minSize="30%">
          <Pagination />
          <EuiText>
            <div>{text}</div>
            <a href="">Hello world</a>
          </EuiText>
        </EuiResizablePanel>

        <EuiResizableButton />

        <EuiResizablePanel initialSize={50} minSize="200px">
          <Pagination />
          <EuiText>{text}</EuiText>
        </EuiResizablePanel>
      </>
    )}
  </EuiResizableContainer>
);
