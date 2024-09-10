/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Meta, StoryObj } from '@storybook/react';
import { fireEvent, waitFor } from '@storybook/test';
import { within } from '../../../../.storybook/test';
import { LOKI_SELECTORS } from '../../../../.storybook/loki';
import { enableFunctionToggleControls } from '../../../../.storybook/utils';

import { REFRESH_UNIT_OPTIONS } from '../types';
import { EuiAutoRefresh, EuiAutoRefreshProps } from './auto_refresh';

const meta: Meta<EuiAutoRefreshProps> = {
  title: 'Forms/EuiAutoRefresh/EuiAutoRefresh',
  component: EuiAutoRefresh,
  parameters: {
    loki: {
      chromeSelector: LOKI_SELECTORS.portal,
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
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step('show popover on click', async () => {
      await waitFor(async () => {
        await fireEvent.click(canvas.getByLabelText('Auto refresh'));
      });
      await canvas.waitForEuiPopoverVisible();
    });
  },
};
