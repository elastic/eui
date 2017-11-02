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

import QueryPanel from './query_panel';
const queryPanelSource = require('!!raw-loader!./query_panel');
const queryPanelHtml = renderToHtml(QueryPanel);

export default props => (
  <GuidePage title={props.route.name}>
    <GuideSection
      title="QueryPanel"
      source={[{
        type: GuideSectionTypes.JS,
        code: queryPanelSource,
      }, {
        type: GuideSectionTypes.HTML,
        code: queryPanelHtml,
      }]}
      text={
        <p>
          This is an example pattern for how to construct a search query panel
          like you'd find in Kibana's discover. Only the first pill shows off
          the dropdown.
        </p>
      }
      demo={<QueryPanel />}
    />
  </GuidePage>
);
