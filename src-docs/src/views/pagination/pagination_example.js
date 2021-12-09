import React from 'react';
import { Link } from 'react-router-dom';

import { GuideSectionTypes } from '../../components';

import {
  EuiCode,
  EuiPagination,
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

import Compressed from './compressed';
const compressedSource = require('!!raw-loader!./compressed');
const compressedSnippet = [
  `<EuiPagination
  aria-label={paginationLabel}
  pageCount={pageCount}
  activePage={activePage}
  onPageClick={(activePage) => goToPage(activePage)}
  compressed
/>`,
  `<EuiPagination
  aria-label={paginationLabel}
  pageCount={pageCount}
  activePage={activePage}
  onPageClick={(activePage) => goToPage(activePage)}
  responsive={['xs']}
/>`,
];

import Indeterminate from './indeterminate';
const indeterminateSource = require('!!raw-loader!./indeterminate');
const indeterminateSnippet = `<EuiPagination
  aria-label={paginationLabel}
  pageCount={0}
  activePage={activePage}
  onPageClick={(activePage) => goToPage(activePage)}
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
      props: { EuiPagination },
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
      props: { EuiPagination },
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
          to center the pagination in a layout.
        </p>
      ),
      snippet: centeredPaginationSnippet,
      demo: <CenteredPagination />,
    },
    {
      title: 'Compressed and responsive',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: compressedSource,
        },
      ],
      text: (
        <>
          <p>
            Use the <EuiCode>compressed</EuiCode> prop to minimize the
            horizontal footprint. This will replace the numbered buttons with
            static numbers and rely on the first, last, next and previous icon
            buttons to navigate.
          </p>
          <p>
            This is also the same display that will occur when{' '}
            <EuiCode>responsive</EuiCode> is <strong>not</strong>{' '}
            <EuiCode>false</EuiCode>. You can adjust the responsiveness by
            supplying an array of{' '}
            <Link to="/theming/breakpoints">named breakpoints</Link> to{' '}
            <EuiCode>responsive</EuiCode>. The default is{' '}
            <EuiCode>{"['xs', 's']"}</EuiCode>.
          </p>
        </>
      ),
      snippet: compressedSnippet,
      demo: <Compressed />,
      props: { EuiPagination },
    },
    {
      title: 'Indeterminate page count',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: indeterminateSource,
        },
      ],
      text: (
        <p>
          If the total number of pages cannot be accurately determined, you can
          pass <EuiCode>0</EuiCode> as the <EuiCode>pageCount</EuiCode>. This
          will remove the button numbers and rely solely on the arrow icon
          buttons for navigation. Without a total page count, the last page
          button will pass back <EuiCode>-1</EuiCode> for the{' '}
          <EuiCode>activePage</EuiCode>.
        </p>
      ),
      snippet: indeterminateSnippet,
      demo: <Indeterminate />,
      props: { EuiPagination },
    },
    {
      title: 'Customizable pagination',
      source: [
        {
          type: GuideSectionTypes.TSX,
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
      demo: <CustomizablePagination />,
      props: { EuiPagination },
    },
  ],
};
