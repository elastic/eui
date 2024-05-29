/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { enableFunctionToggleControls } from '../../../../.storybook/utils';
import { REFRESH_UNIT_OPTIONS } from '../types';

import { EuiAutoRefresh, EuiAutoRefreshProps } from './auto_refresh';

const meta: Meta<EuiAutoRefreshProps> = {
  title: 'Forms/EuiAutoRefresh/EuiAutoRefresh',
  component: EuiAutoRefresh,
  parameters: {
    loki: {
      // TODO: uncomment once loki CLI is fixed for portal component stories
      //   chromeSelector: LOKI_SELECTORS.portal,
    },
  },
  argTypes: {
    intervalUnits: {
      control: 'radio',
      options: [undefined, ...REFRESH_UNIT_OPTIONS],
    },
  },
  args: {
    isPaused: true,
    refreshInterval: 1000,
    minInterval: 0,
    readOnly: true,
    isDisabled: false,
  },
};
enableFunctionToggleControls(meta, ['onRefreshChange']);

export default meta;
type Story = StoryObj<EuiAutoRefreshProps>;

export const Playground: Story = {
  // TODO: uncomment once loki CLI is fixed for portal component stories
  //   play: lokiPlayDecorator(async (context) => {
  //     const { bodyElement, step } = context;
  //     const canvas = within(bodyElement);
  //     await step('show popover on click of the input', async () => {
  //       await userEvent.click(canvas.getByLabelText('Auto refresh'));
  //       await waitFor(() => {
  //         expect(canvas.getByRole('dialog')).toBeVisible();
  //       });
  //     });
  //   }),
};
