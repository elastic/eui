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

import Health from './health';
const healthSource = require('!!raw-loader!./health');
const healthHtml = renderToHtml(Health);

export default props => (
  <GuidePage title={props.route.name}>
    <GuideSection
      title="Health"
      source={[{
        type: GuideSectionTypes.JS,
        code: healthSource,
      }, {
        type: GuideSectionTypes.HTML,
        code: healthHtml,
      }]}
      text={
        <p>
          Description needed: how to use the <EuiCode>Health</EuiCode> component.
        </p>
      }
      demo={<Health />}
    />
  </GuidePage>
);
