/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { EuiBadge, EuiBadgeProps, COLORS } from './badge';
import { LOKI_SELECTORS, lokiPlayDecorator } from '../../../.storybook/loki';
import { EuiFlexGroup, EuiFlexItem } from '../flex';

const meta: Meta<EuiBadgeProps> = {
  title: 'Display/EuiBadge/EuiBadge',
  component: EuiBadge,
  argTypes: {
    iconType: { control: 'text' },
  },
  args: {
    // Component defaults
    iconSide: 'left',
    isDisabled: false,
    color: 'default',
  },
};

export default meta;
type Story = StoryObj<EuiBadgeProps>;

export const Playground: Story = {
  args: {
    children: 'Badge text',
    fill: true,
  },
  argTypes: {
    color: {
      control: 'select',
      options: COLORS,
    },
    fill: {
      control: 'boolean',
    },
  },
};

export const CustomColors: Story = {
  parameters: {
    controls: {
      include: ['color', 'children', 'isDisabled'],
    },
  },
  args: {
    children: 'Badge text',
    color: '#0000FF',
  },
};

const AllColorsGrid = ({ fill = true }: { fill?: boolean }) => (
  <EuiFlexGroup gutterSize="s" wrap responsive={false}>
    {COLORS.map((color) => (
      <EuiFlexItem grow={false} key={color}>
        <EuiBadge color={color} fill={fill}>
          {color}
        </EuiBadge>
      </EuiFlexItem>
    ))}
  </EuiFlexGroup>
);

export const AllColors: Story = {
  args: {},
  render: () => (
    <div>
      <div style={{ marginBottom: 12 }}>
        <strong>Filled</strong>
      </div>
      <AllColorsGrid fill />
      <div style={{ height: 16 }} />
      <div style={{ marginBottom: 12 }}>
        <strong>Light (fill=false)</strong>
      </div>
      <AllColorsGrid fill={false} />
    </div>
  ),
};

export const AllColorsVRT: Story = {
  tags: ['vrt-only'],
  parameters: {
    layout: 'fullscreen',
    loki: { chromeSelector: LOKI_SELECTORS.default },
  },
  ...AllColors,
  play: lokiPlayDecorator(async () => {}),
};
