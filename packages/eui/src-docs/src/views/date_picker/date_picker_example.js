import React from 'react';

import { GuideSectionTypes } from '../../components';

import {
  EuiCallOut,
  EuiCode,
  EuiLink,
  EuiDatePicker,
  EuiDatePickerRange,
} from '../../../../src/components';

import DatePicker from './date_picker';
const datePickerSource = require('!!raw-loader!./date_picker');

import States from './states';
const statesSource = require('!!raw-loader!./states');

import Locale from './locale';
const localeSource = require('!!raw-loader!./locale');

import Time from './time_select';
const timeSource = require('!!raw-loader!./time_select');

import Inline from './inline';
const inlineSource = require('!!raw-loader!./inline');

import Range from './range';
const rangeSource = require('!!raw-loader!./range');

import RangeRestricted from './range_restricted';
const rangeRestrictedSource = require('!!raw-loader!./range_restricted');

import MinMax from './min_max';
const minMaxSource = require('!!raw-loader!./min_max');

import Classes from './classes';
const classesSource = require('!!raw-loader!./classes');

import OpenToDate from './open_to_date';
const openToDateSource = require('!!raw-loader!./open_to_date');

import CustomInput from './custom_input';
const customInputSource = require('!!raw-loader!./custom_input');

import Utc from './utc';
const utcSource = require('!!raw-loader!./utc');

const datePickerSnippet =
  '<EuiDatePicker selected={startDate} onChange={handleChange} />';

const statesSnippet = [
  `<EuiDatePicker
  selected={startDate}
  onChange={handleChange}
  onClear={onClear}
  placeholder="Clearable"
/>
`,
  `<EuiDatePicker
  isInvalid
  selected={startDate}
  onChange={handleChange}
  placeholder="Example of an error"
/>
`,
];

const timeSnippet = [
  `<EuiDatePicker
  showTimeSelect
  selected={startDate}
  onChange={handleChange}
/>
`,
  `<EuiDatePicker
  showTimeSelect
  showTimeSelectOnly
  selected={startDate}
  onChange={handleChange}
/>
`,
  `<EuiDatePicker
  showTimeSelect
  showTimeSelectOnly
  selected={startDate}
  onChange={handleChange}
  injectTimes={[times]}
/>
`,
];

const localeSnippet = `<EuiDatePicker
  showTimeSelect
  selected={startDate}
  onChange={handleChange}
  dateFormat="DD-MM-YYYY HH:mm"
  timeFormat="HH:mm"
  locale="de-de"
/>`;

const rangeSnippet = `<EuiDatePickerRange
  startDateControl={
    <EuiDatePicker
      selected={startDate}
      onChange={handleChange}
      startDate={startDate}
      endDate={endDate}
      isInvalid={isInvalid}
      showTimeSelect
    />
  }
  endDateControl={
    <EuiDatePicker
      selected={endDate}
      onChange={handleChange}
      startDate={startDate}
      endDate={endDate}
      isInvalid={isInvalid}
      showTimeSelect
    />
  }
/>`;

const minMaxSnippet = [
  `<EuiDatePicker
  showTimeSelect
  selected={startDate}
  onChange={handleChange}
  minDate={minDate}
  maxDate={maxDate}
  minTime={minTime}
  maxTime={maxTime}
/>
`,
  `<EuiDatePicker
  showTimeSelect
  showTimeSelectOnly
  selected={startDate}
  onChange={handleChange}
  excludeDates={[excludeDates]}
  excludeTimes={[excludeTimes]}
/>
`,
  `<EuiDatePicker
  showTimeSelect
  showTimeSelectOnly
  selected={startDate}
  onChange={handleChange}
  filterDate={filterDate}
/>
`,
];

const openToDateSnippet = `<EuiDatePicker
  selected={startDate}
  onChange={handleChange}
  openToDate={openToDate}
/>`;

const customInputSnippet = `<EuiDatePicker
  selected={startDate}
  onChange={handleChange}
  customInput={customInput}
/>`;

const utcSnippet = `<EuiDatePicker
  selected={startDate}
  onChange={handleChange}
  customInput={customInput}
/>`;

const inlineSnippet = [
  `<EuiDatePicker
  selected={startDate}
  onChange={handleChange}
  inline
  shadow={false}
/>`,
  `<EuiDatePickerRange
  inline
  startDateControl={<EuiDatePicker />}
  endDateControl={<EuiDatePicker />}
/>`,
];

const classesSnippet = `<EuiDatePicker
  selected={startDate}
  onChange={handleChange}
  className="customClassName"
/>`;

export const DatePickerExample = {
  title: 'Date picker',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: datePickerSource,
        },
      ],
      text: (
        <p>
          At its most bare the <strong>EuiDatePicker</strong> only requires
          props for <EuiCode>selected</EuiCode> and <EuiCode>onChange</EuiCode>.
          It depends on{' '}
          <EuiLink href="https://momentjs.com/docs/">moment</EuiLink> for all of
          its formatting.
        </p>
      ),
      components: { EuiDatePicker },
      snippet: datePickerSnippet,
      demo: <DatePicker />,
      props: { EuiDatePicker },
    },
    {
      title: 'Date picker states',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: statesSource,
        },
      ],
      text: (
        <p>
          Examples of how the input can appear within a form. This should match
          our other form styles.
        </p>
      ),
      snippet: statesSnippet,
      demo: <States />,
    },
    {
      title: 'Time selection',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: timeSource,
        },
      ],
      text: (
        <p>
          Two props control time selection. <EuiCode>showTimeSelect</EuiCode>{' '}
          will make time selection appear next to the calendar and{' '}
          <EuiCode>showTimeSelectOnly</EuiCode> will exclude the calendar and
          make the time selection the only thing you see. Make sure to adjust
          your <EuiCode>dateFormat</EuiCode> and <EuiCode>timeFormat</EuiCode>{' '}
          values to match.
        </p>
      ),
      snippet: timeSnippet,
      demo: <Time />,
    },
    {
      title: 'Locale',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: localeSource,
        },
      ],
      text: (
        <>
          <p>
            Locale formatting is achieved by using the <EuiCode>locale</EuiCode>
            ,<EuiCode>timeFormat</EuiCode>, and <EuiCode>dateFormat</EuiCode>{' '}
            props. The latter will take any <EuiCode>moment()</EuiCode>{' '}
            notation. Check{' '}
            <a href="https://en.wikipedia.org/wiki/Date_format_by_country">
              Date format by country
            </a>{' '}
            for formatting examples.
          </p>
          <EuiCallOut color="warning">
            Moment will try to load the locale on demand when it is used.
            Bundlers that do not support dynamic require statements will need to
            explicitly import the locale, e.g.{' '}
            <EuiCode>{"import 'moment/locale/zh-cn'"}</EuiCode>. See the below
            demo JS for examples.
          </EuiCallOut>
        </>
      ),
      snippet: localeSnippet,
      demo: <Locale />,
    },
    {
      title: 'Date picker range',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: rangeSource,
        },
      ],
      text: (
        <p>
          To create a single date range control, use{' '}
          <strong>EuiDatePickerRange</strong> and pass individual{' '}
          <strong>EuiDatePicker</strong> components into the{' '}
          <EuiCode>startDateControl</EuiCode> and{' '}
          <EuiCode>endDateControl</EuiCode> props. You can control the state of
          both inputs as direct props on <strong>EuiDatePickerRange</strong> as
          well as control each individually. Date specific props need to applied
          to the individual components.
        </p>
      ),
      demo: <Range />,
      snippet: rangeSnippet,
      props: { EuiDatePickerRange },
    },
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: rangeRestrictedSource,
        },
      ],
      text: (
        <>
          <h3>
            Dynamic <EuiCode>minDate</EuiCode> and <EuiCode>maxDate</EuiCode>
          </h3>
          <p>
            By using <EuiCode>minDate</EuiCode> and <EuiCode>maxDate</EuiCode>,
            and updating the values based on <EuiCode>startDate</EuiCode> and{' '}
            <EuiCode>endDate</EuiCode>, users get immediate feedback on what
            range values are allowed.
          </p>
        </>
      ),
      demo: <RangeRestricted />,
      props: { EuiDatePickerRange },
    },
    {
      title: 'Only allow specific dates and times',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: minMaxSource,
        },
      ],
      text: (
        <p>
          Use the <EuiCode>minDate</EuiCode>,<EuiCode>maxDate</EuiCode>,
          <EuiCode>minTime</EuiCode>, and <EuiCode>maxTime</EuiCode>
          props to specify specific ranges the <EuiCode>selected</EuiCode> code
          must must fall into. You can also use the{' '}
          <EuiCode>excludeDates</EuiCode> and
          <EuiCode>excludeTimes</EuiCode> property to disallow a specific array
          of items from selection.
        </p>
      ),
      snippet: minMaxSnippet,
      demo: <MinMax />,
    },
    {
      title: 'Open to a specific date',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: openToDateSource,
        },
      ],
      text: (
        <p>
          Use <EuiCode>openToDate</EuiCode> to default selection to a specific
          date.
        </p>
      ),
      snippet: openToDateSnippet,
      demo: <OpenToDate />,
    },
    {
      title: 'Custom input',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: customInputSource,
        },
      ],
      text: (
        <p>
          Use <EuiCode>customInput</EuiCode> to pass a custom input to trigger
          your calendar.
        </p>
      ),
      snippet: customInputSnippet,
      demo: <CustomInput />,
    },
    {
      title: 'UTC offsets',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: utcSource,
        },
      ],
      text: (
        <p>
          Use <EuiCode>utcOffset</EuiCode> to apply an offset to the datetime.
        </p>
      ),
      snippet: utcSnippet,
      demo: <Utc />,
    },
    {
      title: 'Date picker inline',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: inlineSource,
        },
      ],
      text: (
        <p>
          Use the <EuiCode>inline</EuiCode> prop to display the date picker
          directly in the page instead of inside a popover. This prop works for
          both <strong>EuiDatePicker</strong> as well as{' '}
          <strong>EuiDatePickerRange</strong>. If you do not need the default
          inline shadow effect, apply the{' '}
          <EuiCode language="js">{'shadow={false}'}</EuiCode> prop.
        </p>
      ),
      snippet: inlineSnippet,
      demo: <Inline />,
    },
    {
      title: 'Custom classes',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: classesSource,
        },
      ],
      text: (
        <>
          <p>
            Custom classes can be passed to various bits of the calendar and
            input.
          </p>
          <ul>
            <li>
              <EuiCode>className</EuiCode> will pass onto the input.
            </li>
            <li>
              <EuiCode>calendarClassName</EuiCode> will pass onto the calendar
              itself.
            </li>
            <li>
              <EuiCode>dayClassName</EuiCode> will pass onto specificed days.
            </li>
            <li>
              <EuiCode>popperClassName</EuiCode> will pass onto the popover.
            </li>
          </ul>
        </>
      ),
      snippet: classesSnippet,
      demo: <Classes />,
    },
  ],
};
