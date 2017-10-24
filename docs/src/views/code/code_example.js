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

import Code from './code';
const codeSource = require('!!raw-loader!./code');
const codeHtml = renderToHtml(Code);

export default props => (
  <GuidePage title={props.route.name}>
    <GuideSection
      title="Code"
      source={[{
        type: GuideSectionTypes.JS,
        code: codeSource,
      }, {
        type: GuideSectionTypes.HTML,
        code: codeHtml,
      }]}
      text={
        <p>
          Description needed: how to use the <EuiCode>Code</EuiCode> component.
        </p>
      }
      demo={
        <Code />
      }
    />
  </GuidePage>
);
