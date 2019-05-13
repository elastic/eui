import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  EuiCode,
  EuiPagination,
  EuiPaginationButton,
} from '../../../../src/components';

import ManyPages from './many_pages';
const manyPagesSource = require('!!raw-loader!./many_pages');
const manyPagesnHtml = renderToHtml(ManyPages);

import FewPages from './few_pages';
const fewPagesSource = require('!!raw-loader!./few_pages');
const fewPagesnHtml = renderToHtml(FewPages);

import CenteredPagination from './centered_pagination';
const centeredPaginationSource = require('!!raw-loader!./centered_pagination');
const centeredPaginationHtml = renderToHtml(CenteredPagination);

import CustomizablePagination from './customizable_pagination';
const customizablePaginationSource = require('!!raw-loader!./customizable_pagination');
const customizablePaginationHtml = renderToHtml(CustomizablePagination);

import Compressed from './compressed';
const compressedSource = require('!!raw-loader!./compressed');
const compressedHtml = renderToHtml(Compressed);

export const PaginationExample = {
  title: 'Pagination',
  sections: [
    {
      title: 'Many pages',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: manyPagesSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: manyPagesnHtml,
        },
      ],
      text: (
        <p>
          We only show at most 5 consecutive pages, with shortcuts to the first
          and/or last page.
        </p>
      ),
      props: { EuiPagination, EuiPaginationButton },
      demo: <ManyPages />,
    },
    {
      title: 'Few pages',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: fewPagesSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: fewPagesnHtml,
        },
      ],
      text: (
        <p>
          The UI simplifies when we have fewer than the maximum number of
          visible pages.
        </p>
      ),
      demo: <FewPages />,
    },
    {
      title: 'Centered pagination',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: centeredPaginationSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: centeredPaginationHtml,
        },
      ],
      text: (
        <p>
          You can use <EuiCode>FlexGroup</EuiCode> to set up this pagination
          layout.
        </p>
      ),
      demo: <CenteredPagination />,
    },
    {
      title: 'Compressed display',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: compressedSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: compressedHtml,
        },
      ],
      text: (
        <p>
          Use the <EuiCode>compressed</EuiCode> prop to minimize the horizontal
          footprint.
        </p>
      ),
      demo: <Compressed />,
    },
    {
      title: 'Customizable pagination',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: customizablePaginationSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: customizablePaginationHtml,
        },
      ],
      text: (
        <p>
          You can use <EuiCode>FlexGroup</EuiCode> to set up this pagination
          layout, commonly used with Tables.
        </p>
      ),
      demo: <CustomizablePagination />,
    },
  ],
};
