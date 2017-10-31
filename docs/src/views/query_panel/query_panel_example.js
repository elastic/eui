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
          Description needed: how to use the <EuiCode>QueryPanel</EuiCode> component.
        </p>
      }
      demo={<QueryPanel />}
    />
  </GuidePage>
);
