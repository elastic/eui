import React, { Fragment } from 'react';

import {
  EuiSpacer,
  EuiCodeBlock,
  EuiText,
  usePrettyDuration,
} from '../../../../src/components';

const examples = [
  {
    start: '2018-01-17T18:57:57.149Z',
    end: '2018-01-17T20:00:00.000Z',
    quickRanges: [],
    dateFormat: 'MMMM Do YYYY, HH:mm:ss.SSS',
  },
  {
    start: '2018-01-17T18:57:57.149Z',
    end: '2018-01-17T20:00:00.000Z',
    quickRanges: [],
    dateFormat: 'MMMM Do YYYY @ HH:mm:ss.SSS',
  },
  {
    start: '2018-01-17T18:57:57.149Z',
    end: 'now-2h',
    quickRanges: [],
    dateFormat: 'MMMM Do YYYY @ HH:mm:ss.SSS',
  },
  {
    start: 'now-17m',
    end: 'now',
    quickRanges: [],
    dateFormat: 'MMMM Do YYYY @ HH:mm:ss.SSS',
  },
  {
    start: 'now-17m',
    end: 'now-1m',
    quickRanges: [],
    dateFormat: 'MMMM Do YYYY @ HH:mm:ss.SSS',
  },
  {
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
  },
  {
    // Example that will use a default common quick range label
    start: 'now/w',
    end: 'now',
    dateFormat: 'MMMM Do YYYY, HH:mm:ss.SSS',
  },
];

export default function prettyDurationExample() {
  return (
    <Fragment>
      {examples.map(({ start, end, quickRanges, dateFormat }, idx) => (
        <div key={idx}>
          <EuiCodeBlock
            paddingSize="s"
            isCopyable
            language="js"
          >{`<PrettyDuration
  timeFrom="${start}"
  timeTo="${end}"
  dateFormat="${dateFormat}"
  quickRanges={${JSON.stringify(quickRanges)}}
/>

usePrettyDuration({
  timeFrom: '${start}',
  timeTo: '${end}',
  dateFormat: '${dateFormat}',
  quickRanges: ${JSON.stringify(quickRanges)},
})`}</EuiCodeBlock>

          <EuiSpacer size="s" />

          <EuiText>
            <p>
              {usePrettyDuration({
                timeFrom: start,
                timeTo: end,
                quickRanges,
                dateFormat,
              })}
            </p>
          </EuiText>

          <EuiSpacer size="xl" />
        </div>
      ))}
    </Fragment>
  );
}
