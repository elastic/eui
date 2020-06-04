import React from 'react';
import { Link } from 'react-router-dom';

import { renderToHtml } from '../../services';

import { GuidePage, GuideSection, GuideSectionTypes } from '../../components';

import TextScaling from './text_scaling';
const textScalingSource = require('!!raw-loader!./text_scaling');
const textScalingHtml = renderToHtml(TextScaling);

export default props => (
  <GuidePage title={props.title}>
    <GuideSection
      source={[
        {
          type: GuideSectionTypes.JS,
          code: textScalingSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: textScalingHtml,
        },
      ]}
      text={
        <p>
          This demo shows off{' '}
          <Link to="/display/text">
            <strong>EuiText</strong>
          </Link>{' '}
          scaling in both the default and small sizes. The goal is that the
          bottom of every text line should hit one of the 8px or 7px grid lines.
          This is for development only. Do not copy this code into a production
          environment.
        </p>
      }
      demo={<TextScaling />}
    />
  </GuidePage>
);
