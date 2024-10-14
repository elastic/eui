/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import moment from 'moment';
import type { Meta, StoryObj } from '@storybook/react';
import { expect } from '@storybook/test';
import { within } from '../../../../.storybook/test';
import { LOKI_SELECTORS } from '../../../../.storybook/loki';
import { enableFunctionToggleControls } from '../../../../.storybook/utils';

import { EuiLink } from '../../link';
import { ApplyTime, REFRESH_UNIT_OPTIONS } from '../types';

import {
  EuiSuperDatePicker,
  EuiSuperDatePickerProps,
} from './super_date_picker';

const meta: Meta<EuiSuperDatePickerProps> = {
  title: 'Forms/EuiSuperDatePicker/EuiSuperDatePicker',
  component: EuiSuperDatePicker,
  argTypes: {
    refreshIntervalUnits: {
      control: 'radio',
      options: [undefined, ...REFRESH_UNIT_OPTIONS],
    },
  },
  args: {
    dateFormat: 'MMM D, YYYY @ HH:mm:ss.SSS',
    end: 'now',
    isAutoRefreshOnly: false,
    isDisabled: false,
    isPaused: true,
    recentlyUsedRanges: [],
    refreshInterval: 1000,
    showUpdateButton: true,
    canRoundRelativeUnits: true,
    start: 'now-15m',
    timeFormat: 'HH:mm',
    width: 'restricted',
    // set up for easier testing/QA
    compressed: false,
    isLoading: false,
    isQuickSelectOnly: false,
    commonlyUsedRanges: [{ start: 'now/d', end: 'now/d', label: 'Today' }],
    maxDate: undefined,
    minDate: undefined,
  },
};
enableFunctionToggleControls(meta, ['onTimeChange']);

export default meta;
type Story = StoryObj<EuiSuperDatePickerProps>;

export const Playground: Story = {};
enableFunctionToggleControls(Playground, [
  'onFocus',
  'onRefresh',
  'onRefreshChange',
]);

export const CustomQuickSelectPanel: Story = {
  parameters: {
    controls: {
      include: ['customQuickSelectPanels', 'onTimeChange'],
    },
    loki: {
      chromeSelector: LOKI_SELECTORS.portal,
    },
  },
  args: {
    customQuickSelectPanels: [
      {
        title: 'Custom quick select panel',
        content: <CustomPanel />,
      },
    ],
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step('show popover on click of the quick select button', async () => {
      canvas.waitForAndClick('superDatePickerToggleQuickMenuButton');
      await canvas.waitForEuiPopoverVisible();
      expect(canvas.getByText('Custom quick select panel')).toBeVisible();
    });
  },
};

export const RestrictedRange: Story = {
  parameters: {
    controls: {
      include: [
        'dateFormat',
        'start',
        'end',
        'minDate',
        'maxDate',
        'onTimeChange',
      ],
    },
    loki: {
      chromeSelector: LOKI_SELECTORS.portal,
    },
  },
  args: {
    minDate: moment('10/01/2024'),
    maxDate: moment('11/01/2024'),
  },
};

function CustomPanel({ applyTime }: { applyTime?: ApplyTime }) {
  function applyMyCustomTime() {
    applyTime!({ start: 'now-30d', end: 'now+7d' });
  }

  return (
    <EuiLink onClick={applyMyCustomTime}>Entire dataset timerange</EuiLink>
  );
}
