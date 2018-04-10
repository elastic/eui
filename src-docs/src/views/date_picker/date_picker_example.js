import React from 'react';

import { renderToHtml } from '../../services';

import {
  GuideSectionTypes,
} from '../../components';

import {
  EuiCode,
  EuiLink,
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

import Time from './time_select';
const timeSource = require('!!raw-loader!./time_select');
const timeHtml = renderToHtml(Time);

import Inline from './inline';
const inlineSource = require('!!raw-loader!./inline');
const inlineHtml = renderToHtml(Inline);

import Range from './range';
const rangeSource = require('!!raw-loader!./range');
const rangeHtml = renderToHtml(Range);

import MinMax from './min_max';
const minMaxSource = require('!!raw-loader!./min_max');
const minMaxHtml = renderToHtml(MinMax);

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
        At its most bare the <EuiCode>EuiDatePicker</EuiCode> only requires
        props for <EuiCode>selected</EuiCode> and <EuiCode>onChange</EuiCode>.
        It depends on <EuiLink href="https://momentjs.com/docs/">moment</EuiLink> for
        all of its formatting.
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
    title: 'Time selection',
    source: [{
      type: GuideSectionTypes.JS,
      code: timeSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: timeHtml,
    }],
    text: (
      <p>
        Two props control time selction. <EuiCode>showTimeSelect</EuiCode> will make
        time selection appear next to the calendar
        and <EuiCode>showTimeSelectOnly</EuiCode> will exclude the calendar and
        make the time selection the only thing you see. Make sure to adjust
        your <EuiCode>dateFormat</EuiCode> and <EuiCode>timeFormat</EuiCode> values
        to match.
      </p>
    ),
    demo: <Time />,
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
        The later will take any <EuiCode>moment()</EuiCode> notation. Check{' '}
        <a href="https://en.wikipedia.org/wiki/Date_format_by_country">Date format by country</a>
        {' '}for formatting examples.
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
    title: 'Only allow specific dates and times',
    source: [{
      type: GuideSectionTypes.JS,
      code: minMaxSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: minMaxHtml,
    }],
    text: (
      <p>
        Use  the <EuiCode>minDate</EuiCode>,
        <EuiCode>maxDate</EuiCode>,
        <EuiCode>minTime</EuiCode>,
        and <EuiCode>maxTime</EuiCode>
        props to specify specific ranges the <EuiCode>selected</EuiCode> code must
        must fall into.
      </p>
    ),
    demo: <MinMax />,
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
        Use the <EuiCode>inline</EuiCode> prop to display the date picker directly
        in the page. If you do not need the shadows / popover effect to the date picker
        then also apply the <EuiCode>shadow=false</EuiCode> prop as shown in the second
        example.
      </p>
    ),
    demo: <Inline />,
  }],
};
