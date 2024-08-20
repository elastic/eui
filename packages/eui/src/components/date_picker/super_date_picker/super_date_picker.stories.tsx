/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

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
  parameters: {
    loki: {
      // TODO: uncomment once loki CLI is fixed for portal component stories
      //   chromeSelector: LOKI_SELECTORS.portal,
    },
  },
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
  },
  args: {
    customQuickSelectPanels: [
      {
        title: 'Custom quick select panel',
        content: <CustomPanel />,
      },
    ],
  },
  // TODO: uncomment once loki CLI is fixed for portal component stories
  //   play: lokiPlayDecorator(async (context) => {
  //     const { bodyElement, step } = context;
  //     const canvas = within(bodyElement);
  //     await step('show popover on click of the quick select button', async () => {
  //       await userEvent.click(canvas.getByLabelText('Date quick select'));
  //       await waitFor(() => {
  //         expect(canvas.getByRole('dialog')).toBeVisible();
  //         expect(canvas.getByText('Custom quick select panel')).toBeVisible();
  //       });
  //     });
  //   }),
};

function CustomPanel({ applyTime }: { applyTime?: ApplyTime }) {
  function applyMyCustomTime() {
    applyTime!({ start: 'now-30d', end: 'now+7d' });
  }

  return (
    <EuiLink onClick={applyMyCustomTime}>Entire dataset timerange</EuiLink>
  );
}
