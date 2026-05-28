/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { EuiFlexGroup } from '../flex';
import {
  EuiNotificationIcon,
  EuiNotificationIconProps,
} from './notification_icon';
import { EuiSpacer } from '../spacer';

const meta: Meta<EuiNotificationIconProps> = {
  title: 'Internal/EuiNotificationIcon',
  component: EuiNotificationIcon,
  args: {
    size: 'm',
  },
};

export default meta;
type Story = StoryObj<EuiNotificationIconProps>;

export const Playground: Story = {
  tags: ['vrt-only'],
  args: {
    type: 'info',
  },
};

export const KitchenSink: Story = {
  tags: ['vrt-only'],
  parameters: {
    controls: {
      include: [],
    },
  },
  render: function Render(_args) {
    return (
      <>
        <EuiFlexGroup gutterSize="m" alignItems="center">
          <EuiNotificationIcon type="info" size="m" />
          <EuiNotificationIcon type="success" size="m" />
          <EuiNotificationIcon type="warning" size="m" />
          <EuiNotificationIcon type="error" size="m" />
        </EuiFlexGroup>
        <EuiSpacer size="m" />
        <EuiFlexGroup gutterSize="m" alignItems="center">
          <EuiNotificationIcon type="info" size="l" />
          <EuiNotificationIcon type="success" size="l" />
          <EuiNotificationIcon type="warning" size="l" />
          <EuiNotificationIcon type="error" size="l" />
        </EuiFlexGroup>
      </>
    );
  },
};
