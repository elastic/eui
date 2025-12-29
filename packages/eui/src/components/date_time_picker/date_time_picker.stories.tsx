/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

// import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import {
  EuiDateTimePicker,
  type EuiDateTimePickerProps,
} from './date_time_picker';

const meta: Meta<EuiDateTimePickerProps> = {
  title: 'Forms/EuiDateTimePicker',
  component: EuiDateTimePicker,
  argTypes: {
    onTimeChange: { action: 'onTimeChange' },
  },
  args: {
    onTimeChange: action('onTimeChange'),
  },
};

export default meta;
type Story = StoryObj<EuiDateTimePickerProps>;

export const Playground: Story = {
  args: {
    value: 'Last 15 minutes',
    dateFormat: 'MMM D YYYY, HH:mm:ss',
  },
};
