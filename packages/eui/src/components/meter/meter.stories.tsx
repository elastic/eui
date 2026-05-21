/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { euiPaletteColorBlind, useEuiTheme } from '../../services';
import { EuiMeter, COLORS, EuiMeterProps } from './meter';
import { EuiFlexGroup } from '../flex';
import { PaletteColorStop } from '../color_picker/color_palette_picker';
import { EuiText } from '../text';

const meta: Meta<EuiMeterProps> = {
  title: 'Display/EuiMeter',
  component: EuiMeter,
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
type Story = StoryObj<typeof EuiMeter>;

export const Playground: Story = {
  args: {
    label: '',
    value: 70,
    min: -50,
    max: 100,
  },
};

export const Gradient: Story = {
  args: {
    label: '',
    value: 70,
    min: -50,
    max: 100,
    palette: euiPaletteColorBlind(),
  },
};

export const KitchenSink: Story = {
  args: {
    size: 'l',
  },
  render: function Render(args) {
    const { euiTheme } = useEuiTheme();

    const severityPalette = [
      euiTheme.colors.severity.unknown,
      euiTheme.colors.severity.neutral,
      euiTheme.colors.severity.success,
      euiTheme.colors.severity.warning,
      euiTheme.colors.severity.risk,
      euiTheme.colors.severity.danger,
    ];

    const severityPaletteWithStops = [
      { stop: -100, color: severityPalette[5] },
      { stop: -50, color: severityPalette[4] },
      { stop: -15, color: severityPalette[3] },
      { stop: 0, color: severityPalette[0] },
      { stop: 5, color: severityPalette[1] },
      { stop: 25, color: severityPalette[2] },
      { stop: 50, color: severityPalette[2] },
    ] as PaletteColorStop[];

    const paletteWithHardStops = [
      { stop: -100, color: severityPalette[5] },
      { stop: 0, color: severityPalette[5] },
      { stop: 0, color: severityPalette[2] },
      { stop: 50, color: severityPalette[2] },
    ] as PaletteColorStop[];

    return (
      <EuiFlexGroup direction="column">
        <EuiFlexGroup direction="column">
          <EuiMeter {...args} min={-100} max={100} value={85} />
          <EuiMeter {...args} min={-100} max={100} value={65} />
          <EuiMeter {...args} min={-100} max={100} value={-15} />
          <EuiMeter {...args} min={-100} max={100} value={-25} />
          <EuiMeter {...args} min={-100} max={100} value={-50} />
          <EuiMeter {...args} min={-100} max={100} value={-70} />
        </EuiFlexGroup>

        <EuiText size="s">With palette (equal spacing)</EuiText>

        <EuiFlexGroup direction="column">
          <EuiMeter
            {...args}
            palette={severityPalette}
            min={-100}
            max={100}
            value={85}
          />
          <EuiMeter
            {...args}
            palette={severityPalette}
            min={-100}
            max={100}
            value={65}
          />
          <EuiMeter
            {...args}
            palette={severityPalette}
            min={-100}
            max={100}
            value={-25}
          />
          <EuiMeter
            {...args}
            palette={severityPalette}
            min={-100}
            max={100}
            value={-50}
          />
          <EuiMeter
            {...args}
            palette={severityPalette}
            min={-100}
            max={100}
            value={-75}
          />
          <EuiMeter
            {...args}
            palette={severityPalette}
            min={-100}
            max={100}
            value={-90}
          />
        </EuiFlexGroup>

        <EuiText size="s">With palette stops</EuiText>

        <EuiFlexGroup direction="column">
          <EuiMeter
            {...args}
            palette={severityPaletteWithStops}
            min={-100}
            max={50}
            value={45}
          />
          <EuiMeter
            {...args}
            palette={severityPaletteWithStops}
            min={-100}
            max={50}
            value={25}
          />
          <EuiMeter
            {...args}
            palette={severityPaletteWithStops}
            min={-100}
            max={50}
            value={-25}
          />
          <EuiMeter
            {...args}
            palette={severityPaletteWithStops}
            min={-100}
            max={50}
            value={-50}
          />
          <EuiMeter
            {...args}
            palette={severityPaletteWithStops}
            min={-100}
            max={50}
            value={-75}
          />
          <EuiMeter
            {...args}
            palette={severityPaletteWithStops}
            min={-100}
            max={50}
            value={-90}
          />
        </EuiFlexGroup>

        <EuiText size="s">With hard palette stops</EuiText>

        <EuiFlexGroup direction="column">
          <EuiMeter
            {...args}
            palette={paletteWithHardStops}
            min={-100}
            max={50}
            value={45}
          />
          <EuiMeter
            {...args}
            palette={paletteWithHardStops}
            min={-100}
            max={50}
            value={25}
          />
          <EuiMeter
            {...args}
            palette={paletteWithHardStops}
            min={-100}
            max={50}
            value={-25}
          />
          <EuiMeter
            {...args}
            palette={paletteWithHardStops}
            min={-100}
            max={50}
            value={-50}
          />
          <EuiMeter
            {...args}
            palette={paletteWithHardStops}
            min={-100}
            max={50}
            value={-75}
          />
          <EuiMeter
            {...args}
            palette={paletteWithHardStops}
            min={-100}
            max={50}
            value={-90}
          />
        </EuiFlexGroup>
      </EuiFlexGroup>
    );
  },
};
