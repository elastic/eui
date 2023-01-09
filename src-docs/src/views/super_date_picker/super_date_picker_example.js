import React from 'react';
import { Link } from 'react-router-dom';

import { GuideSectionTypes } from '../../components';

import {
  EuiCode,
  EuiCodeBlock,
  EuiIcon,
  EuiLink,
  EuiText,
  EuiSuperDatePicker,
} from '../../../../src/components';

import { EuiSuperUpdateButtonProps } from './props';
import { superDatePickerConfig, superUpdateButtonConfig } from './playground';

import SuperDatePicker from './super_date_picker';
const superDatePickerSource = require('!!raw-loader!./super_date_picker');

import SuperDatePickerConfig from './super_date_picker_config';
const superDatePickerConfigSource = require('!!raw-loader!./super_date_picker_config');

import SuperDatePickerWidthExample from './super_date_picker_width_example';
const superDatePickerWidthSource = require('!!raw-loader!./super_date_picker_width');

import SuperDatePickerCustomQuickSelect from './super_date_picker_custom_quick_select';
const superDatePickerCustomQuickSelectSource = require('!!raw-loader!./super_date_picker_custom_quick_select');

import SuperDatePickerCustomQuickSelectRender from './super_date_picker_custom_quick_select_render';

import AutoRefresh from './auto_refresh';
const autoRefreshSource = require('!!raw-loader!./auto_refresh');
import AutoRefreshOnly from './auto_refresh_only';
const autoRefreshOnlySource = require('!!raw-loader!./auto_refresh_only');

import SuperDatePickerPattern from './super_date_picker_pattern';
const superDatePickerPatternSource = require('!!raw-loader!./super_date_picker_pattern');

const superDatePickerSnippet = `<EuiSuperDatePicker
  onTimeChange={onTimeChange}
  start="now-30m"
  end="now"
/>`;

const superDatePickerCustomQuickSelectSnippet = `<EuiSuperDatePicker
  onTimeChange={onTimeChange}
  recentlyUsedRanges={[
    end: ShortDate,
    start: ShortDate,
    label?: string,
  ]}
  customQuickSelectPanels={[
    {
      title: string,
      content: ReactElement,
    },
  ]}
/>
`;

export const SuperDatePickerExample = {
  title: 'Super date picker',
  intro: (
    <EuiText grow={false}>
      <p>
        <strong>EuiSuperDatePicker</strong> is a complex date picker that
        supports relative and absolute dates. It offers a convenient{' '}
        <EuiIcon type="calendar" color="primary" />{' '}
        <strong>Quick select menu</strong> which includes{' '}
        <strong>Commonly used dates</strong>,{' '}
        <strong>Recently used date ranges</strong> and{' '}
        <strong>Auto refresh</strong> features.
      </p>
    </EuiText>
  ),
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.TSX,
          code: superDatePickerSource,
        },
      ],
      text: (
        <>
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
        </>
      ),
      props: { EuiSuperDatePicker },
      snippet: superDatePickerSnippet,
      demo: <SuperDatePicker />,
      playground: superDatePickerConfig,
    },
    {
      title: 'Update button',
      source: [
        {
          type: GuideSectionTypes.TSX,
          code: superDatePickerConfigSource,
        },
      ],
      text: (
        <>
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
          <h3>More configurations</h3>
          <p>
            Instead of hiding completely, you can reduce the footprint of the
            update button to just an icon with{' '}
            <EuiCode>{'showUpdateButton="iconOnly"'}</EuiCode>. You can further
            configure the button using <EuiCode>updateButtonProps</EuiCode>,
            like setting the <EuiCode>fill</EuiCode> to <EuiCode>false</EuiCode>
            .
          </p>
        </>
      ),
      demo: <SuperDatePickerConfig />,
      props: { EuiSuperDatePicker, EuiSuperUpdateButtonProps },
      playground: superUpdateButtonConfig,
      snippet: `<EuiSuperDatePicker
  onTimeChange={onTimeChange}
  start="now-30m"
  end="now"
  showUpdateButton={false}
/>`,
    },
    {
      title: 'Quick select panels',
      source: [
        {
          type: GuideSectionTypes.TSX,
          code: superDatePickerCustomQuickSelectSource,
        },
      ],
      text: (
        <>
          <p>
            <strong>EuiSuperDatePicker</strong>&apos;s quick select menu
            provides the user with single-click options for quick selection with
            the following panels.
          </p>
          <ul>
            <li>
              <EuiCode>commonlyUsedRanges</EuiCode>: A default set of common
              date ranges is automatically provided but can be overridden with
              this prop.
            </li>
            <li>
              <EuiCode>recentlyUsedRanges</EuiCode>: Store the users previously
              submitted time ranges and pass them back to date picker with this
              props. It&apos;s best to limit this list to around 10 items.
            </li>
            <li>
              <EuiCode>customQuickSelectPanels</EuiCode>: Accepts an array of
              panel objects as{' '}
              <EuiCode language="tsx">
                {'{ title: string, content: ReactElement }'}
              </EuiCode>
              .
            </li>
          </ul>
          <p>
            You can also reduce the <strong>EuiSuperDatePicker</strong> to
            display <strong>just</strong> the quick select button and dropdown
            by passing{' '}
            <EuiCode language="tsx">{'isQuickSelectOnly={true}'}</EuiCode>. Be
            sure you display the rendered time period elsewhere in your
            interface.
          </p>
        </>
      ),
      snippet: superDatePickerCustomQuickSelectSnippet,
      demo: <SuperDatePickerCustomQuickSelect />,
    },
    {
      text: (
        <>
          <h3 id="quickselect-custom-rendering">Custom rendering</h3>
          <p>
            You can optionally pass the{' '}
            <EuiCode>customQuickSelectRender</EuiCode> prop that passes default
            panels as arguments and allows you to re-order panels, omit certain
            panels entirely, or pass in your own fully custom content.
          </p>
        </>
      ),
      demo: <SuperDatePickerCustomQuickSelectRender />,
    },
    {
      title: 'Sizing',
      source: [
        {
          type: GuideSectionTypes.TSX,
          code: superDatePickerWidthSource,
        },
      ],
      text: (
        <>
          <p>
            By default the <EuiCode>width</EuiCode> of the{' '}
            <strong>EuiSuperDatePicker</strong> is set to{' '}
            <EuiCode>{"'restricted'"}</EuiCode> which sets the size to a
            reasonable max-width necessary to display full start and end date
            strings.
          </p>
          <p>
            You can adjust the <EuiCode>width</EuiCode> by passing:
          </p>
          <ul>
            <li>
              <EuiCode>{"'full'"}</EuiCode> to expand the width to 100% of the
              parent
            </li>
            <li>
              <EuiCode>{"'auto'"}</EuiCode> to grow and shrink as the contents
              does
            </li>
          </ul>
          <p>
            The <strong>EuiSuperDatePicker</strong> also supports the{' '}
            <EuiCode>compressed</EuiCode> form control option.
          </p>
        </>
      ),
      demo: <SuperDatePickerWidthExample />,
      props: { EuiSuperDatePicker },
    },
    {
      title: 'Auto refresh',
      source: [
        {
          type: GuideSectionTypes.TSX,
          code: autoRefreshSource,
        },
      ],
      text: (
        <p>
          By supplying a callback function to <EuiCode>onRefreshChange</EuiCode>
          , the <strong>EuiSuperDatePicker</strong> will display the{' '}
          <EuiCode>refreshInterval</EuiCode> configuration UI in the{' '}
          <EuiIcon type="calendar" color="primary" />{' '}
          <strong>Quick select menu</strong>.
        </p>
      ),
      demo: <AutoRefresh />,
      props: { EuiSuperDatePicker },
    },
    {
      source: [
        {
          type: GuideSectionTypes.TSX,
          code: autoRefreshOnlySource,
        },
      ],
      text: (
        <>
          <p>
            Set <EuiCode>isAutoRefreshOnly</EuiCode> to <EuiCode>true </EuiCode>{' '}
            to limit the component to only display auto refresh content. This is
            useful in cases where there is no time data but auto-refresh
            configuration is still desired.
          </p>
          <p>
            However, since this is still the full{' '}
            <strong>EuiSuperDatePicker</strong> component it requires other
            props that may not be necessary for the refresh only UI. In this
            case, you can use the{' '}
            <Link to="/forms/auto-refresh">
              <strong>EuiAutoRefresh</strong>
            </Link>{' '}
            component directly. You will just need to manage the refresh counter
            yourself.
          </p>
        </>
      ),
      demo: <AutoRefreshOnly />,
      props: { EuiSuperDatePicker },
    },
    {
      title: 'Elastic pattern with KQL',
      source: [
        {
          type: GuideSectionTypes.TSX,
          code: superDatePickerPatternSource,
        },
      ],
      text: (
        <p>
          The following is a demo pattern of how to layout the{' '}
          <strong>EuiSuperDatePicker</strong> alongside Elastic&apos;s KQL
          search bar using{' '}
          <Link to="/forms/suggest">
            <strong>EuiSuggest</strong>
          </Link>{' '}
          and shrinking to fit when the search bar is in focus.
        </p>
      ),
      demo: <SuperDatePickerPattern />,
      dempPanelProps: { color: 'subdued' },
    },
  ],
};
