import React from 'react';

import { renderToHtml } from '../../services';

import {
  GuidePage,
  GuideSection,
  GuideSectionTypes,
} from '../../components';

import LifeCycle from './ilm';
const lifeCycleSource = require('!!raw-loader!./ilm');
const lifeCycleHtml = renderToHtml(LifeCycle);

export default props => (
  <GuidePage title={props.route.name}>
    <GuideSection
      title={props.route.name}
      source={[{
        type: GuideSectionTypes.JS,
        code: lifeCycleSource,
      }, {
        type: GuideSectionTypes.HTML,
        code: lifeCycleHtml,
      }]}
      demo={
        <LifeCycle />
      }
    />
  </GuidePage>
);
