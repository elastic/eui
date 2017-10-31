import React from 'react';

import { renderToHtml } from '../../services';

import {
  GuidePage,
  GuideSection,
  GuideSectionTypes,
} from '../../components';

import {
  EuiCode,
  EuiCallOut,
  EuiSpacer,
} from '../../../../src/components';

import ComboBox from './combo_box';
const comboBoxSource = require('!!raw-loader!./combo_box');
const comboBoxHtml = renderToHtml(ComboBox);

export default props => (
  <GuidePage title={props.route.name}>
    <EuiCallOut
      title="This is a design prototype only. Do not use."
      type="danger"
    />
    <EuiSpacer />
    <GuideSection
      title="ComboBox"
      source={[{
        type: GuideSectionTypes.JS,
        code: comboBoxSource,
      }, {
        type: GuideSectionTypes.HTML,
        code: comboBoxHtml,
      }]}
      text={
        <p>
          Design prototype of <EuiCode>ComboBox</EuiCode> component. It is not usable.
        </p>
      }
      demo={<ComboBox />}
    />
  </GuidePage>
);
