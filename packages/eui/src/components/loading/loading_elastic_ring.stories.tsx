/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { EuiButton } from '../button';
import { EuiSpacer } from '../spacer';

import {
  EuiLoadingElasticRing,
  EuiLoadingElasticRingProps,
  MODES,
  SIZES,
} from './loading_elastic_ring';

const meta: Meta<EuiLoadingElasticRingProps> = {
  title: 'Display/EuiLoadingElasticRing',
  component: EuiLoadingElasticRing,
  argTypes: {
    mode: { control: 'select', options: [...MODES] },
    size: { control: 'select', options: [...SIZES] },
  },
  args: {
    mode: 'sweep',
    loading: true,
    size: 'xl',
  },
};

export default meta;
type Story = StoryObj<EuiLoadingElasticRingProps>;

export const Playground: Story = {};

export const ToggleLoading: Story = {
  render: function Render(args) {
    const [loading, setLoading] = useState(true);
    return (
      <>
        <EuiButton size="s" onClick={() => setLoading((v) => !v)}>
          {loading ? 'Pause' : 'Play'}
        </EuiButton>
        <EuiSpacer size="m" />
        <EuiLoadingElasticRing {...args} loading={loading} />
      </>
    );
  },
};
