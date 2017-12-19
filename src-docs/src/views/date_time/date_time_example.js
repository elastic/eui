import React from 'react';

import { renderToHtml } from '../../services';

import {
  GuideSectionTypes,
} from '../../components';

import {
  EuiCode,
} from '../../../../src/components';

import DateTime from './date_time';
const dateTimeSource = require('!!raw-loader!./date_time');
const dateTimeHtml = renderToHtml(DateTime);

import DateWithoutSelector from './date_without_time_selector';
const dateWithoutSelectorSource = require('!!raw-loader!./date_without_time_selector');
const dateWithoutSelectorHtml = renderToHtml(DateTime);

import CalendarInline from './calendar_inline';
const calendarInlineSource = require('!!raw-loader!./calendar_inline');
const calendarInlineHtml = renderToHtml(CalendarInline);

export const DateTimeExample = {
  title: 'DateTime',
  sections: [
    {
      title: 'DateTime',
      source: [{
        type: GuideSectionTypes.JS,
        code: dateTimeSource,
      }, {
        type: GuideSectionTypes.HTML,
        code: dateTimeHtml,
      }],
      text: (
        <p>
          Description needed: how to use the <EuiCode>EuiDateTime</EuiCode> component.
        </p>
      ),
      demo: <DateTime />,
    },
    {
      title: 'DateTime without time selector',
      source: [{
        type: GuideSectionTypes.JS,
        code: dateWithoutSelectorSource,
      }, {
        type: GuideSectionTypes.HTML,
        code: dateWithoutSelectorHtml,
      }],
      text: (
        <p>
          Description needed: how to use the <EuiCode>EuiDateTime</EuiCode> component.
        </p>
      ),
      demo: <DateWithoutSelector />,
    },
    {
      title: 'Calendar',
      source: [{
        type: GuideSectionTypes.JS,
        code: calendarInlineSource,
      }, {
        type: GuideSectionTypes.HTML,
        code: calendarInlineHtml,
      }],
      text: (
        <p>
          The <EuiCode>EuiCalendar</EuiCode> component should be usable as its own inline element.
        </p>
      ),
      demo: <CalendarInline />,
    },
  ],
};
