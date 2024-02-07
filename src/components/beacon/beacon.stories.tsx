/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { EuiBeacon, EuiBeaconProps } from './beacon';

const meta: Meta<EuiBeaconProps> = {
  title: 'EuiBeacon',
  component: EuiBeacon,
  args: {
    // Component defaults
    color: 'success',
    size: 12,
  },
};

export default meta;
type Story = StoryObj<EuiBeaconProps>;

export const Playground: Story = {};
