import React, { Fragment } from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  EuiAccordion,
  EuiCode,
  EuiCodeBlock,
  EuiSpacer,
  commonDurationRanges,
} from '../../../../src/components';

import PrettyDuration from './pretty_duration';
const prettyDurationSource = require('!!raw-loader!./pretty_duration');
const prettyDurationHtml = renderToHtml(PrettyDuration);
const prettyDurationSnippet = [
  `let example = {
    start: '2018-01-17T18:57:57.149Z',
    end: '2018-01-17T20:00:00.000Z',
    quickRanges: [],
    dateFormat: 'MMMM Do YYYY, HH:mm:ss.SSS',
}
<EuiText>
   <p>{prettyDuration(example.start, example.end, example.quickRanges, example.dateFormat)}</p>
</EuiText>`,
  `let example = {
    start: '2018-01-17T18:57:57.149Z',
    end: 'now-2h',
    quickRanges: [],
    dateFormat: 'MMMM Do YYYY @ HH:mm:ss.SSS',
}
<EuiText>
   <p>{prettyDuration(example.start, example.end, example.quickRanges, example.dateFormat)}</p>
</EuiText>`,
  `let example = {
    start: 'now-17m',
    end: 'now-1m',
    quickRanges: [],
    dateFormat: 'MMMM Do YYYY @ HH:mm:ss.SSS',
}
<EuiText>
   <p>{prettyDuration(example.start, example.end, example.quickRanges, example.dateFormat)}</p>
</EuiText>`,
  `let example = {
    start: 'now-15m',
    end: 'now',
    quickRanges: [
      {
        start: 'now-15m',
        end: 'now',
        label: 'quick range 15 minutes custom display',
      },
    ],
    dateFormat: 'MMMM Do YYYY, HH:mm:ss.SSS',
  }
<EuiText>
   <p>{prettyDuration(example.start, example.end, example.quickRanges, example.dateFormat)}</p>
</EuiText>`,
];

export const PrettyDurationExample = {
  title: 'Pretty duration',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: prettyDurationSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: prettyDurationHtml,
        },
      ],
      text: (
        <Fragment>
          <p>
            Use <EuiCode>prettyDuration</EuiCode> to convert a start and end
            date string to a human-friendly format.
          </p>

          <p>
            Start and end values for the duration are passed as the first and
            second arguments, respectively. These can be timestamps (
            <EuiCode>2018-01-17T18:57:57.149Z</EuiCode>) or relative times (
            <EuiCode>now-15m</EuiCode>).
          </p>

          <p>
            An array of quick range values is passed as the third argument.
            These are used to pretty format custom ranges. EUI exports
            <EuiCode>commonDurationRanges</EuiCode> which can be passed here.
          </p>

          <EuiAccordion
            id="commonDurationRanges"
            buttonContent="Show commonDurationRanges definition">
            <EuiCodeBlock>
              {JSON.stringify(commonDurationRanges, null, 2)}
            </EuiCodeBlock>
          </EuiAccordion>

          <EuiSpacer />

          <p>
            The output date/time format is specified by the fourth argument.
          </p>
        </Fragment>
      ),
      snippet: prettyDurationSnippet,
      demo: <PrettyDuration />,
    },
  ],
};
