/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { EuiProgress, COLORS } from './progress';
import { EuiButton } from '../button';
import { EuiFlexGroup, EuiFlexItem } from '../flex';

const meta: Meta<typeof EuiProgress> = {
  title: 'Display/EuiProgress',
  component: EuiProgress,
  argTypes: {
    color: { control: 'select', options: [...COLORS] },
    // for quicker/easier QA
    label: { control: 'text' },
    value: { control: 'number' },
    valueText: {
      control: 'radio',
      options: ['custom', 'true', 'false'],
      mapping: {
        custom: 'steps',
        true: true,
        false: false,
      },
    },
  },
  args: {
    color: 'success',
    size: 'm',
    position: 'static',
    valueText: false,
  },
};

export default meta;
type Story = StoryObj<typeof EuiProgress>;

export const Determinate: Story = {
  args: {
    label: '',
    value: 70,
    max: 100,
  },
};

export const Indeterminate: Story = {
  parameters: {
    controls: { include: ['color', 'position', 'size', 'aria-label'] },
  },
};

export const HighContrast: Story = {
  tags: ['vrt-only'],
  globals: { highContrastMode: true },
  args: {
    ...Determinate.args,
    size: 'xs',
    color: 'primary',
  },
  render: (args) => <EuiProgress {...args} />,
};

export const DeterminateLoading: Story = {
  parameters: {
    controls: {
      include: ['label', 'value', 'valueText', 'max'],
    },
    codeSnippet: {
      resolveStoryElementOnly: true,
    },
    loki: {
      skip: true,
    },
  },
  args: {
    label: 'Loading',
    value: 70,
    max: 100,
  },
  render: function Render(args) {
    const { value, valueText } = args;
    const hasCustomValueText = valueText === 'steps';

    const [loading, setLoading] = useState<number>(
      typeof value === 'number'
        ? value
        : typeof value === 'string'
        ? parseInt(value)
        : 0
    );
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | undefined>(
      undefined
    );

    useEffect(() => {
      if (loading >= 100 && intervalId !== null) {
        clearInterval(intervalId);
        setIntervalId(undefined);
      }
    }, [intervalId, loading]);

    const increment = () => {
      setLoading((prev: number) => {
        if (prev >= 100) return 0;

        return prev + 10;
      });
    };

    const startLoading = () => {
      if (loading === 0 && intervalId === undefined) {
        const _intervalId = setInterval(() => increment(), 1000);

        setIntervalId(_intervalId);
      } else {
        setLoading(0);
        clearInterval(intervalId);
        setIntervalId(undefined);
      }
    };

    return (
      <EuiFlexGroup>
        <EuiFlexItem grow={false}>
          <EuiButton onClick={startLoading}>
            {loading === 0 ? 'Start' : 'Reset'}
          </EuiButton>
        </EuiFlexItem>
        <EuiFlexItem>
          {/* casting due to ExclusiveUnion complexity */}
          <EuiProgress
            {...(args as typeof EuiProgress)}
            value={loading}
            valueText={
              hasCustomValueText ? `${loading} ${valueText}` : valueText
            }
          />
        </EuiFlexItem>
      </EuiFlexGroup>
    );
  },
};
