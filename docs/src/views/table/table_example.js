import React from 'react';
import { renderToHtml } from '../../services';

import {
  GuidePage,
  GuideSection,
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

export default props => (
  <GuidePage title={props.route.name}>
    <GuideSection
      title="Table"
      source={[{
        type: GuideSectionTypes.HTML,
        code: tableHtml,
      }, {
        type: GuideSectionTypes.JS,
        code: tableSource,
      }]}
      text={
        <p>
          <EuiCode>EuiTable</EuiCode>. This example has sortable headers which respond to mouse
          interaction and exhibit the desired behavior, and selectable rows.
        </p>
      }
      demo={
        <Table />
      }
    />

    <GuideSection
      title="Compressed"
      source={[{
        type: GuideSectionTypes.HTML,
        code: compressedHtml,
      }, {
        type: GuideSectionTypes.JS,
        code: compressedSource,
      }]}
      text={
        <p>Use the <EuiCode>compressed</EuiCode> prop to lower the font size and padding.</p>
      }
      demo={
        <Compressed />
      }
    />
  </GuidePage>
);
