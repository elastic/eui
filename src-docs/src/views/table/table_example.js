import React from 'react';
import { renderToHtml } from '../../services';

import {
  GuideSectionTypes,
} from '../../components';

import {
  EuiCode,
} from '../../../../src/components';

import Table from './table';
const tableSource = require('!!raw-loader!./table');
const tableHtml = renderToHtml(Table);

import Compressed from './compressed';
const compressedSource = require('!!raw-loader!./compressed');
const compressedHtml = renderToHtml(Compressed);

export const TableExample = {
  title: 'Table',
  sections: [{
    title: 'Table',
    source: [{
      type: GuideSectionTypes.HTML,
      code: tableHtml,
    }, {
      type: GuideSectionTypes.JS,
      code: tableSource,
    }],
    text: (
      <p>
        This example has sortable headers which respond to mouse
        interaction and exhibit the desired behavior, and selectable rows. You can apply
        the <EuiCode>truncateText</EuiCode> prop to cells to enforce a single-line behavior and truncate their contents, or set
        the <EuiCode>textOnly</EuiCode> prop to <EuiCode>false</EuiCode> if they contain
        overflowing content like popovers.
      </p>
    ),
    demo: <Table />,
  }, {
    title: 'Compressed',
    source: [{
      type: GuideSectionTypes.HTML,
      code: compressedHtml,
    }, {
      type: GuideSectionTypes.JS,
      code: compressedSource,
    }],
    text: (
      <p>Use the <EuiCode>compressed</EuiCode> prop to lower the font size and padding.</p>
    ),
    demo: <Compressed />,
  }],
};
