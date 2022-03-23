/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { shallow } from 'enzyme';
import { testCustomHook } from '../../../test/test_custom_hook.test_helper';

import { useI18nTimeOptions, RenderI18nTimeOptions } from './time_options';

describe('useI18nTimeOptions', () => {
  it('returns a series of time options constants/arrays/objects with i18n strings', () => {
    const { return: timeOptions } = testCustomHook(useI18nTimeOptions);

    expect(timeOptions).toMatchInlineSnapshot(`
      Object {
        "commonDurationRanges": Array [
          Object {
            "end": "now/d",
            "label": "Today",
            "start": "now/d",
          },
          Object {
            "end": "now/w",
            "label": "This week",
            "start": "now/w",
          },
          Object {
            "end": "now/M",
            "label": "This month",
            "start": "now/M",
          },
          Object {
            "end": "now/y",
            "label": "This year",
            "start": "now/y",
          },
          Object {
            "end": "now-1d/d",
            "label": "Yesterday",
            "start": "now-1d/d",
          },
          Object {
            "end": "now",
            "label": "Week to date",
            "start": "now/w",
          },
          Object {
            "end": "now",
            "label": "Month to date",
            "start": "now/M",
          },
          Object {
            "end": "now",
            "label": "Year to date",
            "start": "now/y",
          },
        ],
        "refreshUnitsOptions": Array [
          Object {
            "text": "seconds",
            "value": "s",
          },
          Object {
            "text": "minutes",
            "value": "m",
          },
          Object {
            "text": "hours",
            "value": "h",
          },
        ],
        "refreshUnitsShorthand": Object {
          "d": "d",
          "h": "h",
          "m": "m",
          "s": "s",
        },
        "relativeOptions": Array [
          Object {
            "text": "Seconds ago",
            "value": "s",
          },
          Object {
            "text": "Minutes ago",
            "value": "m",
          },
          Object {
            "text": "Hours ago",
            "value": "h",
          },
          Object {
            "text": "Days ago",
            "value": "d",
          },
          Object {
            "text": "Weeks ago",
            "value": "w",
          },
          Object {
            "text": "Months ago",
            "value": "M",
          },
          Object {
            "text": "Years ago",
            "value": "y",
          },
          Object {
            "text": "Seconds from now",
            "value": "s+",
          },
          Object {
            "text": "Minutes from now",
            "value": "m+",
          },
          Object {
            "text": "Hours from now",
            "value": "h+",
          },
          Object {
            "text": "Days from now",
            "value": "d+",
          },
          Object {
            "text": "Weeks from now",
            "value": "w+",
          },
          Object {
            "text": "Months from now",
            "value": "M+",
          },
          Object {
            "text": "Years from now",
            "value": "y+",
          },
        ],
        "timeTenseOptions": Array [
          Object {
            "text": "Last",
            "value": "last",
          },
          Object {
            "text": "Next",
            "value": "next",
          },
        ],
        "timeUnits": Object {
          "M": "month",
          "d": "day",
          "h": "hour",
          "m": "minute",
          "s": "second",
          "w": "week",
          "y": "year",
        },
        "timeUnitsOptions": Array [
          Object {
            "text": "seconds",
            "value": "s",
          },
          Object {
            "text": "minutes",
            "value": "m",
          },
          Object {
            "text": "hours",
            "value": "h",
          },
          Object {
            "text": "days",
            "value": "d",
          },
          Object {
            "text": "weeks",
            "value": "w",
          },
          Object {
            "text": "months",
            "value": "M",
          },
          Object {
            "text": "years",
            "value": "y",
          },
        ],
        "timeUnitsPlural": Object {
          "M": "months",
          "d": "days",
          "h": "hours",
          "m": "minutes",
          "s": "seconds",
          "w": "weeks",
          "y": "years",
        },
      }
    `);
  });
});

describe('RenderI18nTimeOptions', () => {
  it('is a render function that passes the underlying children timeOptions as an arg', () => {
    const component = shallow(
      <RenderI18nTimeOptions>
        {({ timeUnits }) => <>{timeUnits.m}</>}
      </RenderI18nTimeOptions>
    );

    expect(component).toMatchInlineSnapshot(`
      <Fragment>
        minute
      </Fragment>
    `);
  });
});
