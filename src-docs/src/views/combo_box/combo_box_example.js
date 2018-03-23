import React from 'react';

import { renderToHtml } from '../../services';

import {
  GuideSectionTypes,
} from '../../components';

import {
  EuiCode,
  EuiComboBox,
} from '../../../../src/components';

import ComboBox from './combo_box';
const comboBoxSource = require('!!raw-loader!./combo_box');
const comboBoxHtml = renderToHtml(ComboBox);

export const ComboBoxExample = {
  title: 'Combo Box',
  sections: [{
    source: [{
      type: GuideSectionTypes.JS,
      code: comboBoxSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: comboBoxHtml,
    }],
    text: (
      <p>
        Description needed: how to use the <EuiCode>EuiComboBox</EuiCode> component.
      </p>
    ),
    components: { EuiComboBox },
    demo: <ComboBox />,
  }],
};
