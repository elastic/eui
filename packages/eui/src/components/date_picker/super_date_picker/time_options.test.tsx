/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the "Elastic License
 * 2.0", the "GNU Affero General Public License v3.0 only", and the "Server Side
 * Public License v 1"; you may not use this file except in compliance with, at
 * your election, the "Elastic License 2.0", the "GNU Affero General Public
 * License v3.0 only", or the "Server Side Public License, v 1".
 */

import React from 'react';
import { render, renderHook } from '../../../test/rtl';

import { useI18nTimeOptions, RenderI18nTimeOptions } from './time_options';

describe('useI18nTimeOptions', () => {
  it('returns a series of time options constants/arrays/objects with i18n strings', () => {
    const timeOptions = renderHook(useI18nTimeOptions).result.current;

    expect(timeOptions).toMatchInlineSnapshot(`
      {
        "commonDurationRanges": [
          {
            "end": "now/d",
            "label": "Today",
            "start": "now/d",
          },
          {
            "end": "now/w",
            "label": "This week",
            "start": "now/w",
          },
          {
            "end": "now/M",
            "label": "This month",
            "start": "now/M",
          },
          {
            "end": "now/y",
            "label": "This year",
            "start": "now/y",
          },
          {
            "end": "now-1d/d",
            "label": "Yesterday",
            "start": "now-1d/d",
          },
          {
            "end": "now",
            "label": "Week to date",
            "start": "now/w",
          },
          {
            "end": "now",
            "label": "Month to date",
            "start": "now/M",
          },
          {
            "end": "now",
            "label": "Year to date",
            "start": "now/y",
          },
        ],
        "refreshUnitsOptions": [
          {
            "text": "Seconds",
            "value": "s",
          },
          {
            "text": "Minutes",
            "value": "m",
          },
          {
            "text": "Hours",
            "value": "h",
          },
        ],
        "relativeOptions": [
          {
            "text": "Seconds ago",
            "value": "s",
          },
          {
            "text": "Minutes ago",
            "value": "m",
          },
          {
            "text": "Hours ago",
            "value": "h",
          },
          {
            "text": "Days ago",
            "value": "d",
          },
          {
            "text": "Weeks ago",
            "value": "w",
          },
          {
            "text": "Months ago",
            "value": "M",
          },
          {
            "text": "Years ago",
            "value": "y",
          },
          {
            "text": "Seconds from now",
            "value": "s+",
          },
          {
            "text": "Minutes from now",
            "value": "m+",
          },
          {
            "text": "Hours from now",
            "value": "h+",
          },
          {
            "text": "Days from now",
            "value": "d+",
          },
          {
            "text": "Weeks from now",
            "value": "w+",
          },
          {
            "text": "Months from now",
            "value": "M+",
          },
          {
            "text": "Years from now",
            "value": "y+",
          },
        ],
        "relativeRoundingLabels": {
          "M": "Round to the month",
          "d": "Round to the day",
          "h": "Round to the hour",
          "m": "Round to the minute",
          "s": "Round to the second",
          "w": "Round to the week",
          "y": "Round to the year",
        },
        "timeTenseOptions": [
          {
            "text": "Last",
            "value": "last",
          },
          {
            "text": "Next",
            "value": "next",
          },
        ],
        "timeUnitsOptions": [
          {
            "text": "Seconds",
            "value": "s",
          },
          {
            "text": "Minutes",
            "value": "m",
          },
          {
            "text": "Hours",
            "value": "h",
          },
          {
            "text": "Days",
            "value": "d",
          },
          {
            "text": "Weeks",
            "value": "w",
          },
          {
            "text": "Months",
            "value": "M",
          },
          {
            "text": "Years",
            "value": "y",
          },
        ],
      }
    `);
  });
});

describe('RenderI18nTimeOptions', () => {
  it('is a render function that passes the underlying children timeOptions as an arg', () => {
    const { container } = render(
      <RenderI18nTimeOptions>
        {({ timeUnitsOptions }) => <>{timeUnitsOptions[0].text}</>}
      </RenderI18nTimeOptions>
    );

    expect(container.firstChild).toMatchInlineSnapshot(`Seconds`);
  });
});
