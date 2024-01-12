/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { EuiBadge } from '../badge';
import { EuiBadgeGroup, EuiBadgeGroupProps } from './badge_group';

const meta: Meta<EuiBadgeGroupProps> = {
  title: 'EuiBadgeGroup',
  component: EuiBadgeGroup,
  args: {
    // Component defaults
    gutterSize: 'xs',
  },
};

export default meta;
type Story = StoryObj<EuiBadgeGroupProps>;

export const Playground: Story = {
  args: {
    children: (
      <>
        <EuiBadge>Badge</EuiBadge>
        <EuiBadge>Badge</EuiBadge>
        <EuiBadge>Badge</EuiBadge>
      </>
    ),
  },
};
