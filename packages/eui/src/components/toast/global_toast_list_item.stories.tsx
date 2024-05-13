/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { hideStorybookControls } from '../../../.storybook/utils';
import { EuiToast } from './toast';
import {
  EuiGlobalToastListItem,
  EuiGlobalToastListItemProps,
} from './global_toast_list_item';

const meta: Meta<EuiGlobalToastListItemProps> = {
  title: 'Display/EuiToast/EuiGlobalToastList/EuiGlobalToastListItem',
  component: EuiGlobalToastListItem,
  args: {
    isDismissed: false,
  },
};
hideStorybookControls(meta, ['aria-label']);

export default meta;
type Story = StoryObj<EuiGlobalToastListItemProps>;

export const Playground: Story = {
  args: {
    children: <EuiToast title="It's a Toast!">Lorem ipsum</EuiToast>,
  },
};
