import React from 'react';

import { renderToHtml } from '../../services';

import {
  GuidePage,
  GuideSection,
  GuideSectionTypes,
} from '../../components';

import {
  EuiCallOut,
  EuiSpacer,
  EuiButton,
  EuiCode,
} from '../../../../src/components';

import TooltipExamples from './examples';
const examplesSource = require('!!raw-loader!./examples');
const examplesHtml = renderToHtml(TooltipExamples);

export default props => (
  <GuidePage title={props.route.name}>
    <EuiCallOut
      title="Work in progress"
      color="warning"
    >
      <p>
        This component is still undergoing active development, and its interface and implementation
        are both subject to change.
      </p>
    </EuiCallOut>

    <EuiSpacer size="l" />

    <GuideSection
      title="Tooltip"
      source={[{
        type: GuideSectionTypes.JS,
        code: examplesSource,
      }, {
        type: GuideSectionTypes.HTML,
        code: examplesHtml,
      }]}
      demo={
        <div style={{ width: 320 }}>
          <TooltipExamples />
        </div>
      }
    />
  </GuidePage>
);
