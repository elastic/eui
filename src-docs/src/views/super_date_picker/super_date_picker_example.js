import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  EuiCode,
  EuiCodeBlock,
  EuiIcon,
  EuiLink,
  EuiSuperDatePicker,
} from '../../../../src/components';

import SuperDatePicker from './super_date_picker';
const superDatePickerSource = require('!!raw-loader!./super_date_picker');
const superDatePickerHtml = renderToHtml(SuperDatePicker);

import SuperDatePickerConfig from './super_date_picker_config';
const superDatePickerConfigSource = require('!!raw-loader!./super_date_picker_config');
const superDatePickerConfigHtml = renderToHtml(SuperDatePicker);

import SuperDatePickerCustomQuickSelect from './super_date_picker_custom_quick_select';
const superDatePickerCustomQuickSelectSource = require('!!raw-loader!./super_date_picker_custom_quick_select');
const superDatePickerCustomQuickSelectHtml = renderToHtml(SuperDatePicker);

const superDatePickerSnippet = `<EuiSuperDatePicker
  onTimeChange={this.onTimeChange}
/>
`;

const superDatePickerCustomQuickSelectSnippet = `customQuickSelectPanels = [
  {
    title: 'My custom panel',
    content: <MyCustomQuickSelectPanel />,
  },
];

<EuiSuperDatePicker
  onTimeChange={this.onTimeChange}
  customQuickSelectPanels={customQuickSelectPanels}
/>
`;

export const SuperDatePickerExample = {
  title: 'Super date picker',
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
            <strong>EuiSuperDatePicker</strong> is a date picker that supports
            relative and absolute dates. It offers a convenient{' '}
            <strong>Quick select menu</strong>{' '}
            <EuiIcon type="calendar" color="primary" /> which includes{' '}
            <strong>Commonly used dates</strong>,{' '}
            <strong>Recently used date ranges</strong> and{' '}
            <strong>Set refresh</strong> features.
          </p>
          <p>
            Pass <EuiCode>start</EuiCode> and <EuiCode>end</EuiCode> date times
            as strings in either datemath format (e.g.: <EuiCode>now</EuiCode>,{' '}
            <EuiCode>now-15m</EuiCode>, <EuiCode>now-15m/m</EuiCode>) or as
            absolute date in the format{' '}
            <EuiCode>YYYY-MM-DDTHH:mm:ss.SSSZ</EuiCode>. Use{' '}
            <EuiLink href="https://github.com/elastic/datemath-js">
              datemath
            </EuiLink>{' '}
            to convert start and end strings into moment objects.
          </p>
          <EuiCodeBlock language="js" isCopyable>
            {`import dateMath from '@elastic/datemath';

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
}`}
          </EuiCodeBlock>
        </div>
      ),
      props: { EuiSuperDatePicker },
      snippet: superDatePickerSnippet,
      demo: <SuperDatePicker />,
    },
    {
      title: 'Configurations',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: superDatePickerConfigSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: superDatePickerConfigHtml,
        },
      ],
      text: (
        <div>
          <p>
            When <EuiCode>start</EuiCode> and <EuiCode>end</EuiCode> change from
            interactions with <strong> Quick select</strong>,{' '}
            <strong>Commonly used</strong>, or{' '}
            <strong>Recently used date ranges</strong>,
            <EuiCode>onTimeChange</EuiCode> will be immediately invoked. This is
            because these interactions set both <EuiCode>start</EuiCode> and{' '}
            <EuiCode>end</EuiCode> in a single event.
          </p>
          <p>
            When <EuiCode>start</EuiCode> and <EuiCode>end</EuiCode> change from
            interactions with <strong>Absolute</strong>,{' '}
            <strong>Relative</strong>, and <strong>Now</strong> tabs,
            <EuiCode>onTimeChange</EuiCode> will <strong>not</strong> be
            invoked. In these cases,<EuiCode>onTimeChange</EuiCode> will be
            invoked when the user clicks the <strong>Update</strong> button.
            This gives users the ability to set both <EuiCode>start</EuiCode>{' '}
            and <EuiCode>end</EuiCode> before triggering{' '}
            <EuiCode>onTimeChange</EuiCode>. Set{' '}
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
      demo: <SuperDatePickerConfig />,
    },
    {
      title: 'Custom quick select panel',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: superDatePickerCustomQuickSelectSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: superDatePickerCustomQuickSelectHtml,
        },
      ],
      text: (
        <div>
          <p>
            <strong>EuiSuperDatePicker</strong>&apos;s quick select menu also
            supports <strong>custom panels</strong>. These panels can have their
            own title and perform custom actions on the date picker.
          </p>
        </div>
      ),
      snippet: superDatePickerCustomQuickSelectSnippet,
      demo: <SuperDatePickerCustomQuickSelect />,
    },
  ],
};
