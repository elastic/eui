/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { LOKI_SELECTORS } from '../../../../.storybook/loki';
import {
  enableFunctionToggleControls,
  moveStorybookControlsToCategory,
} from '../../../../.storybook/utils';
import { EuiIcon } from '../../icon';
import { _DualRangeChangeEvent, EuiDualRangeProps } from './types';
import { EuiDualRange } from './dual_range';

const meta: Meta<EuiDualRangeProps> = {
  title: 'Forms/EuiDualRange',
  component: EuiDualRange,
  argTypes: {
    append: {
      control: 'radio',
      options: [undefined, 'icon', 'text'],
      mapping: {
        icon: <EuiIcon type="faceHappy" />,
        text: 'Appended',
        undefined: undefined,
      },
      if: { arg: 'showInput', eq: 'inputWithPopover' },
    },
    prepend: {
      control: 'radio',
      options: [undefined, 'icon', 'text'],
      mapping: {
        icon: <EuiIcon type="faceHappy" />,
        text: 'Prepended',
        undefined: undefined,
      },
      if: { arg: 'showInput', eq: 'inputWithPopover' },
    },
    showInput: {
      control: 'radio',
      options: [false, true, 'inputWithPopover'],
    },
    inputPopoverProps: {
      if: { arg: 'showInput', eq: 'inputWithPopover' },
    },
  },
  args: {
    min: 0,
    max: 100,
    step: 1,
    compressed: false,
    isLoading: false,
    showLabels: false,
    showInput: false,
    showRange: true,
    showTicks: false,
    levels: [],
    //set up for easier testin/QA
    fullWidth: false,
    isInvalid: false,
    isDraggable: false,
    // adding tickInterval value to prevent error about
    // too many ticks when enabling showTicks
    tickInterval: 10,
    minInputProps: {},
    maxInputProps: {},
    inputPopoverProps: {},
  },
};
moveStorybookControlsToCategory<EuiDualRangeProps>(
  meta,
  ['append', 'prepend', 'inputPopoverProps'],
  'Input with popover'
);

export default meta;
type Story = StoryObj<EuiDualRangeProps>;

export const Playground: Story = {
  args: {
    value: [25, 50],
  },
  render: (args) => <StatefulPlayground {...args} />,
};
enableFunctionToggleControls(Playground, ['onChange', 'onFocus', 'onBlur']);
moveStorybookControlsToCategory(
  Playground,
  [
    'showInput',
    'append',
    'prepend',
    'inputPopoverProps',
    'isInvalid',
    'isLoading',
    'minInputProps',
    'maxInputProps',
  ],
  'Input'
);
moveStorybookControlsToCategory(
  Playground,
  ['showTicks', 'compressed', 'tickInterval', 'ticks'],
  'Ticks'
);

export const Ticks: Story = {
  parameters: {
    controls: {
      include: ['ticks', 'showTicks', 'showRange', 'max', 'min', 'value'],
    },
  },
  args: {
    value: [25, 50],
    showTicks: true,
    ticks: [
      { label: '0 kilobytes', value: 0 },
      { label: '50 kilobytes', value: 50 },
      { label: '100 kilobytes', value: 100 },
    ],
  },
  render: (args) => <StatefulPlayground {...args} />,
};

export const Input: Story = {
  parameters: {
    controls: {
      include: [
        'showInput',
        'append',
        'prepend',
        'inputPopoverProps',
        'isInvalid',
        'isLoading',
        'max',
        'min',
        'value',
        'minInputProps',
        'maxInputProps',
      ],
    },
  },
  args: {
    value: [25, 50],
    showInput: true,
  },
  render: (args) => <StatefulPlayground {...args} />,
};

export const Levels: Story = {
  parameters: {
    controls: {
      include: ['levels', 'max', 'min', 'value', 'showLabels'],
    },
  },
  args: {
    value: [25, 50],
    levels: [
      { min: 0, max: 20, color: 'danger' },
      { min: 20, max: 100, color: 'success' },
    ],
    showLabels: true,
  },
  render: (args) => <StatefulPlayground {...args} />,
};

const StatefulPlayground = ({
  value,
  onChange,
  ...rest
}: EuiDualRangeProps) => {
  const [values, setValues] = useState(value);

  useEffect(() => {
    if (value) {
      setValues(value);
    }
  }, [value]);

  const handleOnChange = (
    values: EuiDualRangeProps['value'],
    isValid: boolean,
    e?: _DualRangeChangeEvent
  ) => {
    setValues(values);
    onChange?.(values, isValid, e);
  };

  return <EuiDualRange value={values} onChange={handleOnChange} {...rest} />;
};

/**
 * VRT only
 */

export const InputWithPopover: Story = {
  tags: ['vrt-only'],
  parameters: {
    loki: { chromeSelector: LOKI_SELECTORS.portal },
  },
  args: {
    showInput: 'inputWithPopover',
    min: 0,
    max: 100,
    value: [10, 80],
    // Should render ticks, levels, highlights, and tooltips in their correct positions
    showLabels: true,
    showTicks: true,
    ticks: [
      { label: '20kb', value: 20 },
      { label: '100kb', value: 100 },
    ],
    levels: [
      { min: 0, max: 20, color: 'danger' },
      { min: 20, max: 100, color: 'success' },
    ],
  },
  // Force input popover open via programmatic ref
  render: function Render(args) {
    const [ref, setRef] = useState<any>();
    useEffect(() => {
      ref?.onInputFocus();
    }, [ref]);
    return <EuiDualRange {...args} ref={setRef} />;
  },
};
