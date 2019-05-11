import React from 'react';

import { renderToHtml } from '../../services';

import {
  GuideSectionTypes,
} from '../../components';

import {
  EuiCode,
  EuiCodeBlock,
  EuiLink,
  EuiDatePicker,
  EuiDatePickerRange,
  EuiSuperDatePicker,
  EuiSuperUpdateButton,
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

import Classes from './classes';
const classesSource = require('!!raw-loader!./classes');
const classesHtml = renderToHtml(Classes);

import OpenToDate from './open_to_date';
const openToDateSource = require('!!raw-loader!./open_to_date');
const openToDateHtml = renderToHtml(OpenToDate);

import CustomInput from './custom_input';
const customInputSource = require('!!raw-loader!./custom_input');
const customInputHtml = renderToHtml(CustomInput);

import Utc from './utc';
const utcSource = require('!!raw-loader!./utc');
const utcHtml = renderToHtml(Utc);

import SuperDatePicker from './super_date_picker';
const superDatePickerSource = require('!!raw-loader!./super_date_picker');
const superDatePickerHtml = renderToHtml(SuperDatePicker);

export const DatePickerExample = {
  title: 'Date Picker',
  sections: [{
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
    title: 'Date picker states',
    source: [{
      type: GuideSectionTypes.JS,
      code: statesSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: statesHtml,
    }],
    text: (
      <p>
        Examples of how the input can appear within a form. This should match our
        other form styles.
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
        Two props control time selection. <EuiCode>showTimeSelect</EuiCode> will make
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
        <EuiCode>timeFormat</EuiCode>, and <EuiCode>dateFormat</EuiCode> props.
        The latter will take any <EuiCode>moment()</EuiCode> notation. Check{' '}
        <a href="https://en.wikipedia.org/wiki/Date_format_by_country">Date format by country</a>
        {' '}for formatting examples.
      </p>
    ),
    demo: <Locale />,
  }, {
    title: 'Date picker range',
    source: [{
      type: GuideSectionTypes.JS,
      code: rangeSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: rangeHtml,
    }],
    text: (
      <p>
        By passing <EuiCode>startDate</EuiCode> and <EuiCode>endDate</EuiCode> props
        you can provide styling the range in between two dates. To further style the
        group as a single control, use <EuiCode>EuiDatePickerRange</EuiCode> and pass
        the date picker controls into
        the <EuiCode>startDateControl</EuiCode> and <EuiCode>endDateControl</EuiCode> props.
      </p>
    ),
    demo: <Range />,
    props: { EuiDatePickerRange },
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
        must fall into. You can also use the <EuiCode>excludeDates</EuiCode> and
        <EuiCode>excludeTimes</EuiCode> property to disallow a specific array
        of items from selection.
      </p>
    ),
    demo: <MinMax />,
  }, {
    title: 'Open to a specific date',
    source: [{
      type: GuideSectionTypes.JS,
      code: openToDateSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: openToDateHtml,
    }],
    text: (
      <p>
        Use <EuiCode>openToDate</EuiCode> to default selection to a specific date.
      </p>
    ),
    demo: <OpenToDate />,
  }, {
    title: 'Custom input',
    source: [{
      type: GuideSectionTypes.JS,
      code: customInputSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: customInputHtml,
    }],
    text: (
      <p>
        Use <EuiCode>customInput</EuiCode> to pass a custom input to trigger your calendar.
      </p>
    ),
    demo: <CustomInput />,
  }, {
    title: 'UTC offsets',
    source: [{
      type: GuideSectionTypes.JS,
      code: utcSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: utcHtml,
    }],
    text: (
      <p>
        Use <EuiCode>utcOffset</EuiCode> to apply an offset to the datetime.
      </p>
    ),
    demo: <Utc />,
  }, {
    title: 'Date picker inline',
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
  }, {
    title: 'Custom classes',
    source: [{
      type: GuideSectionTypes.JS,
      code: classesSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: classesHtml,
    }],
    text: (
      <div>
        <p>
            Custom classes can be passed to various bits of the calendar and input.
        </p>
        <ul>
          <li><EuiCode>className</EuiCode> will pass onto the input.</li>
          <li><EuiCode>calendarClassName</EuiCode> will pass onto the calendar itself.</li>
          <li><EuiCode>dayClassName</EuiCode> will pass onto specificed days.</li>
        </ul>
      </div>
    ),
    demo: <Classes />,
  }, {
    title: 'Super date picker',
    source: [{
      type: GuideSectionTypes.JS,
      code: superDatePickerSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: superDatePickerHtml,
    }],
    text: (
      <div>
        <p>
          <EuiCode>start</EuiCode> and <EuiCode>end</EuiCode> date times are passed as strings
          in either datemath format (e.g.: now, now-15m, now-15m/m)
          or as absolute date in the format <EuiCode>YYYY-MM-DDTHH:mm:ss.sssZ</EuiCode>.
          Use <EuiLink href="https://github.com/elastic/datemath-js">datemath</EuiLink>{' '}
          to convert start and end strings into moment objects.
        </p>
        <EuiCodeBlock paddingSize="none" isCopyable>
          {`
import dateMath from '@elastic/datemath';

const startMoment = dateMath.parse(start);
// dateMath.parse is inconsistent with unparsable strings.
// Sometimes undefined is returned, other times an invalid moment is returned
if (!startMoment || !startMoment.isValid()) {
  throw new Error('Unable to parse start string');
}

// Pass roundUp when parsing end string
const endMoment = dateMath.parse(end, { roundUp: true });
if (!endMoment || !endMoment.isValid()) {
  throw new Error('Unable to parse end string');
}
          `}
        </EuiCodeBlock>
        <p>
          <EuiCode>onTimeChange</EuiCode> will be immediately invoked when{' '}
          <EuiCode>start</EuiCode> and <EuiCode>end</EuiCode> change from interactions with{' '}
          <strong> Quick select</strong>, <strong>Commonly used</strong>, or <strong>Recently used date ranges</strong>{' '}
          since these interactions set both <EuiCode>start</EuiCode> and <EuiCode>end</EuiCode> in a single event.
        </p>
        <p>
          <EuiCode>onTimeChange</EuiCode> will <strong>not</strong> be invoked when
          <EuiCode>start</EuiCode> and <EuiCode>end</EuiCode> change from interactions with{' '}
          <strong>Absolute</strong>, <strong>Relative</strong>, and <strong>Now</strong> tabs.{' '}
          <EuiCode>onTimeChange</EuiCode> will be invoked when the user clicks the <strong>Update</strong> button.
          This gives users the ability to set both <EuiCode>start</EuiCode> and <EuiCode>end</EuiCode>{' '}
          before triggering <EuiCode>onTimeChange</EuiCode>.
          Set <EuiCode>showUpdateButton</EuiCode> to <EuiCode>false</EuiCode>{' '}
          to immediately invoke <EuiCode>onTimeChange</EuiCode>{' '}
          for all <EuiCode>start</EuiCode> and <EuiCode>end</EuiCode> changes.
        </p>
        <p>
          Set <EuiCode>isAutoRefreshOnly</EuiCode> to <EuiCode>true </EuiCode> to limit the component to only display auto refresh content.
          This is useful in cases where there is no time data but auto-refresh configuration is still desired.
        </p>
      </div>
    ),
    demo: <SuperDatePicker />,
    props: { EuiSuperDatePicker, EuiSuperUpdateButton },
  }],
};
