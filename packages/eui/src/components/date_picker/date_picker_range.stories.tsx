/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { enableFunctionToggleControls } from '../../../.storybook/utils';
import {
  EuiDatePickerRange,
  EuiDatePickerRangeProps,
} from './date_picker_range';
import { EuiDatePicker } from './date_picker';

const meta: Meta<EuiDatePickerRangeProps> = {
  title: 'Forms/EuiDatePickerRange',
  component: EuiDatePickerRange,
  args: {
    iconType: true,
    shadow: true,
    // set up for easier testing/QA
    compressed: false,
    inline: false,
    fullWidth: false,
    isCustom: false,
    readOnly: false,
    isLoading: false,
    isInvalid: false,
    disabled: false,
    append: '',
    prepend: '',
  },
};
enableFunctionToggleControls(meta, ['onFocus', 'onBlur']);

export default meta;
type Story = StoryObj<EuiDatePickerRangeProps>;

export const Playground: Story = {
  parameters: {
    controls: {
      exclude: ['children'], // not actually used
    },
  },
  args: {
    startDateControl: <EuiDatePicker />,
    endDateControl: <EuiDatePicker />,
  },
  render: (args) => <StatefulPlayground {...args} />,
};

const StatefulPlayground = ({
  startDateControl,
  endDateControl,
  ...rest
}: EuiDatePickerRangeProps) => {
  const [selectedStartDate, setSelectedStartDate] = useState<
    moment.Moment | null | undefined
  >();
  const [selectedEndDate, setSelectedEndDate] = useState<
    moment.Moment | null | undefined
  >();

  const startControl = React.cloneElement(startDateControl, {
    selected: selectedStartDate,
    onChange: setSelectedStartDate,
  });

  const endControl = React.cloneElement(endDateControl, {
    selected: selectedEndDate,
    onChange: setSelectedEndDate,
  });

  return (
    <EuiDatePickerRange
      startDateControl={startControl}
      endDateControl={endControl}
      {...rest}
    />
  );
};
