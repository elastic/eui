import React from 'react';

import { renderToHtml } from '../../services';

import {
  GuidePage,
  GuideSection,
  GuideSectionTypes,
} from '../../components';

import Watches from './watches';
const watchesSource = require('!!raw-loader!./watches');
const watchesHtml = renderToHtml(Watches);

export default props => (
  <GuidePage title={props.route.name}>
    <GuideSection
      title={props.route.name}
      source={[{
        type: GuideSectionTypes.JS,
        code: watchesSource,
      }, {
        type: GuideSectionTypes.HTML,
        code: watchesHtml,
      }]}
      demo={
        <Watches />
      }
    />
  </GuidePage>
);
