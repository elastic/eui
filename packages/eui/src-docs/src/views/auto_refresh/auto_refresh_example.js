import React from 'react';
import { Link } from 'react-router-dom';

import { GuideSectionTypes } from '../../components';

import {
  EuiAutoRefresh,
  EuiAutoRefreshButton,
  EuiRefreshInterval,
  EuiCode,
} from '../../../../src/components';

import {
  autoRefreshConfig,
  autoRefreshButtonConfig,
  refreshIntervalConfig,
} from './playground';

import AutoRefreshButton from './auto_refresh_button';
const autoRefreshButtonSource = require('!!raw-loader!./auto_refresh_button');
import AutoRefreshInput from './auto_refresh_input';
const autoRefreshInputSource = require('!!raw-loader!./auto_refresh_input');
import AutoRefreshInterval from './auto_refresh_interval';
const autoRefreshIntervalSource = require('!!raw-loader!./auto_refresh_interval');

export const AutoRefreshExample = {
  title: 'Auto refresh',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: autoRefreshInputSource,
        },
      ],
      text: (
        <p>
          This is a component that is used by the{' '}
          <Link to="/templates/super-date-picker">
            <strong>EuiSuperDatePicker</strong>
          </Link>{' '}
          component to create an automatic refresh configuration. It merely
          provides a common UI pattern but the actual refresh counter is
          maintained by you. It <EuiCode>isPaused</EuiCode> by default and the{' '}
          <EuiCode>refreshInterval</EuiCode> is set in milliseconds.
        </p>
      ),
      demo: <AutoRefreshInput />,
      props: { EuiAutoRefresh },
      playground: autoRefreshConfig,
    },
    {
      title: 'Auto refresh button',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: autoRefreshButtonSource,
        },
      ],
      text: (
        <p>
          If you&apos;re looking for a more compact version, you can use{' '}
          <strong>EuiAutoRefreshButton</strong>, which is the same button that
          is appended to <strong>EuiSuperDatePicker</strong>. For even more
          compactness, add{' '}
          <EuiCode language="tsx">{'shortHand={true}'}</EuiCode> to reduce the
          active unit to a single letter.
        </p>
      ),
      demo: <AutoRefreshButton />,
      props: { EuiAutoRefreshButton },
      playground: autoRefreshButtonConfig,
    },
    {
      title: 'Refresh interval',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: autoRefreshIntervalSource,
        },
      ],
      text: (
        <p>
          For even more customizablity, you can use the{' '}
          <strong>EuiRefreshInterval</strong> component which simply provides
          the form inputs.
        </p>
      ),
      demo: <AutoRefreshInterval />,
      props: { EuiRefreshInterval },
      playground: refreshIntervalConfig,
    },
  ],
};
