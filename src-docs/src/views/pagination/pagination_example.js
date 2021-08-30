import React from 'react';
import { Link } from 'react-router-dom';

import { GuideSectionTypes } from '../../components';

import {
  EuiCode,
  EuiPagination,
  EuiPaginationButton,
  EuiText,
  EuiCallOut,
} from '../../../../src/components';

import { paginationConfig } from './playground';

import ManyPages from './many_pages';
const manyPagesSource = require('!!raw-loader!./many_pages');
const manyPagesSnippet = `<EuiPagination
  aria-label={paginationLabel}
  pageCount={higherThan5Number}
  activePage={activePage}
  onPageClick={(activePage) => goToPage(activePage)}
/>`;

import FewPages from './few_pages';
const fewPagesSource = require('!!raw-loader!./few_pages');
const fewPagesSnippet = `<EuiPagination
  aria-label={paginationLabel}
  pageCount={lowerThan5Number}
  activePage={activePage}
  onPageClick={(activePage) => goToPage(activePage)}
/>`;

import CenteredPagination from './centered_pagination';
const centeredPaginationSource = require('!!raw-loader!./centered_pagination');
const centeredPaginationSnippet = `<EuiFlexGroup justifyContent="spaceAround">
  <EuiFlexItem grow={false}>
    <EuiPagination
      aria-label={paginationLabel}
      pageCount={pageCount}
      activePage={activePage}
      onPageClick={(activePage) => goToPage(activePage)}
    />
  </EuiFlexItem>
</EuiFlexGroup>`;

import CustomizablePagination from './customizable_pagination';
const customizablePaginationSource = require('!!raw-loader!./customizable_pagination');
const customizablePaginationSnippet = `<EuiFlexGroup justifyContent="spaceBetween" alignItems="center">
  <EuiFlexItem grow={false}>
    <EuiPopover
      button={button}
      isOpen={isPopoverOpen}
      closePopover={closePopover}>
      <EuiContextMenuPanel items={items} />
    </EuiPopover>
  </EuiFlexItem>

  <EuiFlexItem grow={false}>
    <EuiPagination
      aria-label={paginationLabel}
      pageCount={pageCount}
      activePage={activePage}
      onPageClick={(activePage) => goToPage(activePage)}
    />
  </EuiFlexItem>
</EuiFlexGroup>`;

import Compressed from './compressed';
const compressedSource = require('!!raw-loader!./compressed');
const compressedSnippet = `<EuiPagination
  aria-label={paginationLabel}
  pageCount={pageCount}
  activePage={activePage}
  onPageClick={(activePage) => goToPage(activePage)}
  compressed
/>`;

export const PaginationExample = {
  title: 'Pagination',
  intro: (
    <EuiText>
      <p>
        Some EUI components have pagination built-in, like{' '}
        <Link to="/tabular-content/tables">
          <strong>EuiBasicTable</strong>
        </Link>
        , but for custom built paginated interfaces you can use{' '}
        <strong>EuiPagination</strong> manually.
      </p>
    </EuiText>
  ),
  sections: [
    {
      title: 'Basic usage with many pages',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: manyPagesSource,
        },
      ],
      text: (
        <>
          <p>
            <strong>EuiPagination</strong> accepts a total{' '}
            <EuiCode>pageCount</EuiCode> and only shows up to 5 consecutive
            pages, with shortcuts to the first and/or last page. It also
            requires the parent component to maintain the current{' '}
            <EuiCode>activePage</EuiCode> and handle the{' '}
            <EuiCode>onPageClick</EuiCode>.
          </p>
          <EuiCallOut
            color="warning"
            iconType="accessibility"
            title={
              <>
                For accessibility, it is highly recommended to provide a
                descriptive <EuiCode>aria-label</EuiCode> for each pagination
                set.
              </>
            }
          />
        </>
      ),
      props: { EuiPagination, EuiPaginationButton },
      snippet: manyPagesSnippet,
      demo: <ManyPages />,
      playground: paginationConfig,
    },
    {
      title: 'Few pages',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: fewPagesSource,
        },
      ],
      text: (
        <p>
          The UI simplifies when we have fewer than the maximum number of
          visible pages.
        </p>
      ),
      snippet: fewPagesSnippet,
      demo: <FewPages />,
    },
    {
      title: 'Centered pagination',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: centeredPaginationSource,
        },
      ],
      text: (
        <p>
          You can use{' '}
          <Link to="/layout/flex">
            <strong>EuiFlexGroup</strong>
          </Link>{' '}
          to set up this pagination layout.
        </p>
      ),
      snippet: centeredPaginationSnippet,
      demo: <CenteredPagination />,
    },
    {
      title: 'Compressed display',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: compressedSource,
        },
      ],
      text: (
        <p>
          Use the <EuiCode>compressed</EuiCode> prop to minimize the horizontal
          footprint.
        </p>
      ),
      snippet: compressedSnippet,
      demo: <Compressed />,
    },
    {
      title: 'Customizable pagination',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: customizablePaginationSource,
        },
      ],
      text: (
        <p>
          You can use{' '}
          <Link to="/layout/flex">
            <strong>EuiFlexGroup</strong>
          </Link>{' '}
          and{' '}
          <Link to="/navigation/context-menu#with-single-panel">
            <strong>EuiContextMenu</strong>
          </Link>{' '}
          to set up this pagination layout, commonly used with{' '}
          <Link to="/tabular-content/tables">tables</Link>.
        </p>
      ),
      snippet: customizablePaginationSnippet,
      demo: <CustomizablePagination />,
    },
  ],
};
