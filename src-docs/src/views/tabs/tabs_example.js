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

import Tabs from './tabs';
const tabsSource = require('!!raw-loader!./tabs');
const tabsHtml = renderToHtml(Tabs);

export default props => (
  <GuidePage title={props.route.name}>
    <GuideSection
      title="Tabs"
      source={[{
        type: GuideSectionTypes.JS,
        code: tabsSource,
      }, {
        type: GuideSectionTypes.HTML,
        code: tabsHtml,
      }]}
      text={
        <p>
          <EuiCode>EuiTabs</EuiCode> allow a <EuiCode>size</EuiCode> prop. In general
          you should always use the default size, but in rare cases (like putting tabs
          within a popover of other small menu) it is OK to use the smaller sizing.
        </p>
      }
      demo={
        <Tabs />
      }
    />
  </GuidePage>
);
