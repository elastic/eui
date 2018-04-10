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

import States from './states';
const statesSource = require('!!raw-loader!./states');
const statesHtml = renderToHtml(States);

import Locale from './locale';
const localeSource = require('!!raw-loader!./locale');
const localeHtml = renderToHtml(Locale);

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
    props: { EuiDatePicker },
  }, {
    title: 'Datepicker states',
    source: [{
      type: GuideSectionTypes.JS,
      code: statesSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: statesHtml,
    }],
    text: (
      <p>
        The passed icon needs to come from our list of svg icons. Can be flipped {
          // eslint-disable-next-line react/no-unescaped-entities
        } to the other side by passing <EuiCode>iconSide="right"</EuiCode>.
      </p>
    ),
    demo: <States />,
  }, {
    title: 'Locale',
    source: [{
      type: GuideSectionTypes.JS,
      code: localeSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: localeHtml,
    }],
    text: (
      <p>
        Locale formatting is achieved by using the <EuiCode>locale</EuiCode>,
        <EuiCode>timeFormat</EuiCode> and <EuiCode>dateFormat</EuiCode> props.
        The later will take any <EuiCode>moment()</EuiCode> notation. Check
        <a href="https://en.wikipedia.org/wiki/Date_format_by_country">Date format by country</a>
        for formatting examples.
      </p>
    ),
    demo: <Locale />,
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
