/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import {
  disableStorybookControls,
  enableFunctionToggleControls,
} from '../../../.storybook/utils';
import { LOKI_SELECTORS } from '../../../.storybook/loki';
import {
  EuiDatePicker,
  EuiDatePickerProps,
  euiDatePickerDefaultDateFormat,
  euiDatePickerDefaultTimeFormat,
} from './date_picker';

const meta: Meta<EuiDatePickerProps> = {
  title: 'Forms/EuiDatePicker',
  component: EuiDatePicker,
  parameters: {
    loki: {
      // EuiDatePicker highlights the current day using `moment()` date
      // which causes snapshots to differ every day. To fix that we would need
      // to add another prop to react-datepicker and expose it through
      // EuiDatePicker
      skip: true,
      chromeSelector: LOKI_SELECTORS.portal,
    },
  },
  argTypes: {
    iconType: { control: 'text' },
    popperProps: {
      description:
        'Allows customizing the underlying EuiPopover component, of type `Partial<EuiPopoverProps>`',
    },
    filterDate: {
      control: 'function',
      // @ts-ignore - overwriting to match jsdoc info
      type: '(date: moment.Moment) => boolean',
    },
    maxDate: {
      control: 'object',
      description: 'The max date accepted (in moment format) as a selection',
      // @ts-ignore - overwriting to match jsdoc info
      type: 'Moment',
    },
    maxTime: {
      control: 'object',
      description: 'The max time accepted (in moment format) as a selection',
      // @ts-ignore - overwriting to match jsdoc info
      type: 'Moment',
    },
    minDate: {
      control: 'object',
      description: 'The min date accepted (in moment format) as a selection',
      // @ts-ignore - overwriting to match jsdoc info
      type: 'Moment',
    },
    minTime: {
      control: 'object',
      description: 'The min time accepted (in moment format) as a selection',
      // @ts-ignore - overwriting to match jsdoc info
      type: 'Moment',
    },
    selected: {
      description: 'The selected datetime',
      // @ts-ignore - overwriting to match jsdoc info
      type: 'moment.Moment | null',
    },
    openToDate: {
      control: 'object',
      // @ts-ignore - overwriting to match jsdoc info
      type: 'Moment',
    },
    onChange: {
      //   control: 'boolean',
      // @ts-ignore - overwriting to match jsdoc info
      type: '(date: moment.Moment | null, event?: React.SyntheticEvent<any>) => void',
    },
    utcOffset: { control: 'number' },
  },
  args: {
    adjustDateOnChange: true,
    dateFormat: euiDatePickerDefaultDateFormat,
    fullWidth: false,
    popoverPlacement: 'downLeft',
    shadow: true,
    shouldCloseOnSelect: true,
    showIcon: true,
    showTimeSelect: false,
    timeFormat: euiDatePickerDefaultTimeFormat,
    // set up for easier testing/QA
    compressed: false,
    inline: false,
    controlOnly: false,
    iconType: '',
    isInvalid: false,
    isLoading: false,
    placeholder: '',
    // manually adding non-resolved prop types (extended from react-date-picker)
    calendarClassName: '',
    customInput: undefined,
    disabled: false,
    excludeDates: undefined,
    filterDate: () => true,
    injectTimes: undefined,
    locale: '',
    maxDate: undefined,
    maxTime: undefined,
    minDate: undefined,
    minTime: undefined,
    popperClassName: '',
    readOnly: false,
    selected: null,
    utcOffset: undefined,
  },
};
disableStorybookControls(meta, ['inputRef']);
enableFunctionToggleControls(meta, ['onClear', 'onChange']);

export default meta;
type Story = StoryObj<EuiDatePickerProps>;

export const Playground: Story = {
  args: {
    // NOTE: loki play interactions won't work in CLI somehow
    // TODO: exchange with loki play() interactions once fixed
    autoFocus: true,
  },
  render: (args) => <StatefulDatePicker {...args} />,
};

const StatefulDatePicker = ({
  selected,
  onChange,
  ...rest
}: EuiDatePickerProps) => {
  const [selectedDate, setSelectedDate] = useState<
    moment.Moment | null | undefined
  >(selected);

  const handleOnChange = (date: moment.Moment | null) => {
    setSelectedDate(date);
    onChange?.(date);
  };

  return (
    <EuiDatePicker
      selected={selectedDate}
      onChange={handleOnChange}
      {...rest}
    />
  );
};
