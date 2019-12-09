import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  EuiCode,
  EuiCodeBlock,
  EuiLink,
  EuiSuperDatePicker,
} from '../../../../src/components';

// import Suggest from './suggest';
// const suggestSource = require('!!raw-loader!./suggest');
// const suggestHtml = renderToHtml(Suggest);

import SuperDatePicker from './super_date_picker';
const superDatePickerSource = require('!!raw-loader!./super_date_picker');
const superDatePickerHtml = renderToHtml(SuperDatePicker);

// import SavedQueries from './saved_queries';
// const savedQueriesSource = require('!!raw-loader!./saved_queries');
// const savedQueriesHtml = renderToHtml(SavedQueries);

// import SuggestItem from './suggest_item';
// const suggestItemSource = require('!!raw-loader!./suggest_item');
// const suggestItemHtml = renderToHtml(SuggestItem);
const suggestItemSnippet = [
  `<EuiSuggestItem
  type={sampleItem.type}
  label={sampleItem.label}
  description={sampleItem.description}
/>
`,
  `<EuiSuggestItem
  type={sampleItem.type}
  label={sampleItem.label}
  description={sampleItem.description}
  labelDisplay="expand"
/>`,
];

const suggestSnippet = [
  `<EuiSuggest
  status={this.state.status}
  tooltipContent={this.state.tooltipContent}
  onInputChange={this.getInputValue}
  onItemClick={this.onItemClick}
  suggestions={[
    {
      type: { iconType: 'kqlField', color: 'tint4' },
      label: 'Field sample',
      description: 'This is the description',
    },
    {
      type: { iconType: 'kqlValue', color: 'tint0' },
      label: 'Value sample',
      description: 'This is the description',
    },
  ]}
/>`,
];

export const SuperDatePickerExample = {
  title: 'SuperDatePicker',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: superDatePickerSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: superDatePickerHtml,
        },
      ],
      text: (
        <div>
          <p>
            <EuiCode>start</EuiCode> and <EuiCode>end</EuiCode> date times are
            passed as strings in either datemath format (e.g.: now, now-15m,
            now-15m/m) or as absolute date in the format{' '}
            <EuiCode>YYYY-MM-DDTHH:mm:ss.SSSZ</EuiCode>. Use{' '}
            <EuiLink href="https://github.com/elastic/datemath-js">
              datemath
            </EuiLink>{' '}
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
            <EuiCode>start</EuiCode> and <EuiCode>end</EuiCode> change from
            interactions with <strong> Quick select</strong>,{' '}
            <strong>Commonly used</strong>, or{' '}
            <strong>Recently used date ranges</strong> since these interactions
            set both <EuiCode>start</EuiCode> and <EuiCode>end</EuiCode> in a
            single event.
          </p>
          <p>
            <EuiCode>onTimeChange</EuiCode> will <strong>not</strong> be invoked
            when
            <EuiCode>start</EuiCode> and <EuiCode>end</EuiCode> change from
            interactions with <strong>Absolute</strong>,{' '}
            <strong>Relative</strong>, and <strong>Now</strong> tabs.{' '}
            <EuiCode>onTimeChange</EuiCode> will be invoked when the user clicks
            the <strong>Update</strong> button. This gives users the ability to
            set both <EuiCode>start</EuiCode> and <EuiCode>end</EuiCode> before
            triggering <EuiCode>onTimeChange</EuiCode>. Set{' '}
            <EuiCode>showUpdateButton</EuiCode> to <EuiCode>false</EuiCode> to
            immediately invoke <EuiCode>onTimeChange</EuiCode> for all{' '}
            <EuiCode>start</EuiCode> and <EuiCode>end</EuiCode> changes.
          </p>
          <p>
            Set <EuiCode>isAutoRefreshOnly</EuiCode> to <EuiCode>true </EuiCode>{' '}
            to limit the component to only display auto refresh content. This is
            useful in cases where there is no time data but auto-refresh
            configuration is still desired.
          </p>
        </div>
      ),
      props: { EuiSuperDatePicker },
      // snippet: suggestSnippet,
      demo: <SuperDatePicker />,
    },
  ],
};
