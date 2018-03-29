import React from 'react';

import { renderToHtml } from '../../services';

import {
  GuideSectionTypes,
} from '../../components';

import {
  EuiCode,
  EuiDatePicker,
} from '../../../../src/components';

import DatePicker from './date_picker';
const datePickerSource = require('!!raw-loader!./date_picker');
const datePickerHtml = renderToHtml(DatePicker);

export const DatePickerExample = {
  title: 'DatePicker',
  sections: [{
    title: 'DatePicker',
    source: [{
      type: GuideSectionTypes.JS,
      code: datePickerSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: datePickerHtml,
    }],
    text: (
      <p>
        Description needed: how to use the <EuiCode>EuiDatePicker</EuiCode> component.
      </p>
    ),
    components: { EuiDatePicker },
    demo: <DatePicker />,
  }],
};
