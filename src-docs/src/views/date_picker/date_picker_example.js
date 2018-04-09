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

import Inline from './inline';
const inlineSource = require('!!raw-loader!./inline');
const inlineHtml = renderToHtml(Inline);

import Range from './range';
const rangeSource = require('!!raw-loader!./range');
const rangeHtml = renderToHtml(Range);

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
  }, {
    title: 'Datepicker range',
    source: [{
      type: GuideSectionTypes.JS,
      code: rangeSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: rangeHtml,
    }],
    text: (
      <p>
        The passed icon needs to come from our list of svg icons. Can be flipped {
          // eslint-disable-next-line react/no-unescaped-entities
        } to the other side by passing <EuiCode>iconSide="right"</EuiCode>.
      </p>
    ),
    demo: <Range />,
  }, {
    title: 'Datepicker inline',
    source: [{
      type: GuideSectionTypes.JS,
      code: inlineSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: inlineHtml,
    }],
    text: (
      <p>
        The passed icon needs to come from our list of svg icons. Can be flipped {
          // eslint-disable-next-line react/no-unescaped-entities
        } to the other side by passing <EuiCode>iconSide="right"</EuiCode>.
      </p>
    ),
    demo: <Inline />,
  }],
};
