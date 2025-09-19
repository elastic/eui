/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import moment from 'moment';

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
    'data-test-subj': 'my-date-range-picker',
  },
};

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
enableFunctionToggleControls(Playground, ['onFocus', 'onBlur']);

export const Inline: Story = {
  parameters: {
    controls: {
      include: [
        'inline',
        'shadow',
        'disabled',
        'readOnly',
        'isInvalid',
        'isLoading',
      ],
    },
  },
  args: {
    startDateControl: (
      <EuiDatePicker showTimeSelect={true} selected={moment('01/01/1970')} />
    ),
    endDateControl: (
      <EuiDatePicker showTimeSelect={true} selected={moment('01/07/1970')} />
    ),
    inline: true,
  },
  render: (args) => <StatefulPlayground {...args} />,
};

export const RestrictedSelection: Story = {
  parameters: {
    controls: {
      include: [],
    },
  },
  args: {
    startDateControl: (
      <EuiDatePicker
        selected={moment('01/01/1970')}
        maxDate={moment('01/04/1970')}
        highlightDates={[moment('12/30/1969')]}
      />
    ),
    endDateControl: (
      <EuiDatePicker
        selected={moment('01/07/1970')}
        maxDate={moment('01/04/1970')}
      />
    ),
    inline: true,
  },
  render: (args) => <StatefulPlayground {...args} />,
};

/**
 * VRT only stories
 */

export const FullWidth: Story = {
  tags: ['vrt-only'],
  args: {
    startDateControl: <EuiDatePicker />,
    endDateControl: <EuiDatePicker />,
    fullWidth: true,
  },
  render: (args) => <StatefulPlayground {...args} />,
};

export const HighContrast: Story = {
  ...RestrictedSelection,
  tags: ['vrt-only'],
  globals: { highContrastMode: true },
};

/**
 * Helpers
 */

const StatefulPlayground = ({
  startDateControl,
  endDateControl,
  ...rest
}: EuiDatePickerRangeProps) => {
  const [selectedStartDate, setSelectedStartDate] = useState<moment.Moment>(
    startDateControl?.props.selected ?? moment('01/01/1970')
  );
  const [selectedEndDate, setSelectedEndDate] = useState<moment.Moment>(
    endDateControl?.props.selected ?? moment('01/07/1970')
  );

  const startControl =
    startDateControl &&
    React.cloneElement(startDateControl, {
      selected: selectedStartDate,
      onChange: setSelectedStartDate,
      startDate: selectedStartDate,
      endDate: selectedEndDate,
    });
  const endControl =
    endDateControl &&
    React.cloneElement(endDateControl, {
      selected: selectedEndDate,
      onChange: setSelectedEndDate,
      startDate: selectedStartDate,
      endDate: selectedEndDate,
    });

  return (
    <EuiDatePickerRange
      startDateControl={startControl}
      endDateControl={endControl}
      {...rest}
    />
  );
};
