import React from 'react';

import { renderToHtml } from '../../services';

import {
  GuideSectionTypes,
} from '../../components';

import {
  EuiCode,
  EuiBasicTable,
} from '../../../../src/components';

import FullFeatured from './full_featured';
const fullFeaturedSource = require('!!raw-loader!./full_featured');
const fullFeaturedHtml = renderToHtml(FullFeatured);

import RenderingColumns from './rendering_columns';
const renderingColumnsSource = require('!!raw-loader!./rendering_columns');
const renderingColumnsHtml = renderToHtml(RenderingColumns);

export const BasicTableExample = {
  title: 'BasicTable',
  sections: [
    {
      title: 'Sorting, pagination, and row-selection',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: fullFeaturedSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: fullFeaturedHtml,
        }
      ],
      props: { EuiBasicTable },
      demo: <FullFeatured />
    }, {
      title: 'Rendering columns',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: renderingColumnsSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: renderingColumnsHtml,
        }
      ],
      text: (
        <div>
          <p>
           You can specify a <EuiCode>dataType</EuiCode> property on your column definitions
           to choose a default format with which to render a column&rsquo;s cells.
          </p>

          <p>
            If you want to customize how columns are rendered, you can specify a
            <EuiCode>render</EuiCode> property on the column definitions to
            customize the content of a column&rsquo;s cells.
          </p>
        </div>
      ),
      props: { EuiBasicTable },
      demo: <RenderingColumns />
    },
  ]
};
