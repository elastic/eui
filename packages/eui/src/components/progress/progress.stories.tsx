/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { useEuiTheme } from '../../services';
import { EuiProgress, COLORS } from './progress';
import { EuiButton } from '../button';
import { EuiFlexGroup, EuiFlexItem } from '../flex';

const meta: Meta<typeof EuiProgress> = {
  title: 'Display/EuiProgress',
  component: EuiProgress,
  decorators: [
    (Story) => (
      // Wrap in a fixed-width container to ensure a clear VRT snapshot
      <div style={{ width: 400 }}>
        <Story />
      </div>
    ),
  ],
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

/**
 * `color` accepts any valid CSS color string, including multi-stop CSS
 * gradients (e.g. `linear-gradient(...)`). Composing the gradient from
 * `useEuiTheme` tokens — as this story does by default — keeps the bar
 * aligned with light/dark mode and any future palette refresh. Edit the
 * `color` control to pass a literal gradient string instead.
 */
export const GradientColor: Story = {
  parameters: {
    controls: { include: ['color', 'size', 'value', 'max'] },
    codeSnippet: {
      resolveStoryElementOnly: true,
    },
  },
  argTypes: {
    color: { control: 'text' },
  },
  args: {
    ...Determinate.args,
    size: 'm',
    // Override the meta-level `color: 'success'` default so the render
    // function's themed-gradient fallback is what shows on first load.
    color: undefined,
  },
  render: function Render(args) {
    const { euiTheme } = useEuiTheme();
    const themedStatusGradient = `linear-gradient(90deg, ${euiTheme.colors.success}, ${euiTheme.colors.warning}, ${euiTheme.colors.danger})`;
    return <EuiProgress {...args} color={args.color || themedStatusGradient} />;
  },
};

export const DeterminateLoading: Story = {
  parameters: {
    controls: {
      include: ['label', 'value', 'valueText', 'max'],
    },
    codeSnippet: {
      resolveStoryElementOnly: true,
    },
    vrt: {
      // Stateful animated progress, value changes over time, non-deterministic
      skip: true,
    },
  },
  args: {
    label: 'Loading',
    value: 70,
    max: 100,
  },
  render: function Render(args) {
    const { value, valueText, max } = args;
    const maxValue = max ?? 100;
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

    const cleanInterval = (id: NodeJS.Timeout | undefined) => {
      if (id !== undefined) {
        clearInterval(id);
        setIntervalId(undefined);
      }
    };

    useEffect(() => {
      if (loading >= maxValue) {
        cleanInterval(intervalId);
      }
    }, [intervalId, loading, maxValue]);

    useEffect(() => {
      return () => {
        cleanInterval(intervalId);
      };
    }, []);

    const increment = () => {
      setLoading((prev: number) => {
        if (prev >= maxValue) return 0;

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
            max={maxValue}
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
