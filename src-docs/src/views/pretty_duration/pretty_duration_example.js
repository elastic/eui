import React, { Fragment } from 'react';

import { GuideSectionTypes } from '../../components';

import {
  EuiAccordion,
  EuiCode,
  EuiCodeBlock,
} from '../../../../src/components';

import { RenderI18nTimeOptions } from '../../../../src/components/date_picker/super_date_picker/time_options';

import PrettyDuration from './pretty_duration';
const prettyDurationSource = require('!!raw-loader!./pretty_duration');

export const PrettyDurationExample = {
  title: 'Pretty duration',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: prettyDurationSource,
        },
      ],
      text: (
        <Fragment>
          <p>
            Use the <EuiCode>{'<PrettyDuration />'}</EuiCode> component (for JSX
            display) or <EuiCode>usePrettyDuration()</EuiCode> hook (for
            attribute strings) to convert a start and end date string to a
            human-friendly format. Both utilities take the following props:
          </p>

          <ul>
            <li>
              <p>
                <EuiCode>timeFrom</EuiCode> and <EuiCode>timeTo</EuiCode> accept
                start and end date values for the duration. These can be
                timestamps (<EuiCode>2018-01-17T18:57:57.149Z</EuiCode>) or
                relative times (<EuiCode>now-15m</EuiCode>).
              </p>
            </li>

            <li>
              <p>
                <EuiCode>dateFormat</EuiCode> specifies the output date/time
                format.
              </p>
            </li>

            <li>
              <p>
                <EuiCode>quickRanges</EuiCode> optionally accepts an array of
                quick range values that are used to pretty format custom ranges.
                If no custom quick ranges are passed, EUI will default to a set
                of common duration ranges defined below.
              </p>
              <EuiAccordion
                id="commonDurationRanges"
                buttonContent="Show default common duration ranges"
              >
                <EuiCodeBlock>
                  <RenderI18nTimeOptions>
                    {({ commonDurationRanges }) =>
                      JSON.stringify(commonDurationRanges, null, 2)
                    }
                  </RenderI18nTimeOptions>
                </EuiCodeBlock>
              </EuiAccordion>
            </li>
          </ul>
        </Fragment>
      ),
      demo: <PrettyDuration />,
    },
  ],
};
