/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, useState, useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { enableFunctionToggleControls } from '../../../.storybook/utils';

import { euiPaletteColorBlind } from '../..//services';
import { EuiColorPicker, EuiColorPickerProps } from './color_picker';

const meta: Meta<EuiColorPickerProps> = {
  title: 'Forms/EuiColorPicker/EuiColorPicker',
  component: EuiColorPicker,
  argTypes: {
    color: { control: 'color' },
    append: { control: 'text' },
    prepend: { control: 'text' },
  },
  args: {
    // Component defaults
    showAlpha: false,
    disabled: false,
    readOnly: false,
    fullWidth: false,
    compressed: false,
    isClearable: false,
    isInvalid: false,
    display: 'default',
    mode: 'default',
    secondaryInputDisplay: 'none',
    swatches: euiPaletteColorBlind(),
  },
};
enableFunctionToggleControls(meta, ['onChange']);

export default meta;
type Story = StoryObj<EuiColorPickerProps>;

export const Playground: Story = {
  render: (args) => <StatefulColorPicker {...args} />,
};

export const InlineWithAllElements: Story = {
  tags: ['vrt-only'],
  args: {
    // Component defaults
    display: 'inline',
    mode: 'default',
    showAlpha: true,
    secondaryInputDisplay: 'top',
  },
};

const StatefulColorPicker: FunctionComponent<EuiColorPickerProps> = ({
  color: _color,
  format,
  onChange,
  ...args
}) => {
  const [color, setColor] = useState(_color);

  useEffect(() => {
    setColor(_color);
  }, [_color]);

  // Reset the color if hex vs rgba format changes, otherwise the output doesn't update
  useEffect(() => {
    setColor('');
  }, [format]);

  return (
    <EuiColorPicker
      {...args}
      color={color}
      format={format}
      onChange={(text, output) => {
        setColor(text);
        onChange?.(text, output);
      }}
    />
  );
};
