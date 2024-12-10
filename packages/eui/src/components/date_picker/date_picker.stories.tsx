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
import { fireEvent, waitFor } from '@storybook/test';
import { within } from '../../../.storybook/test';
import { LOKI_SELECTORS } from '../../../.storybook/loki';
import {
  disableStorybookControls,
  enableFunctionToggleControls,
} from '../../../.storybook/utils';

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
      control: false, // Storybook doesn't have a function control type
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
    append: '',
    prepend: '',
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
  // Open the datepicker automatically for Loki VRT
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step('show popover on click', async () => {
      await waitFor(async () => {
        await fireEvent.click(canvas.getByRole('textbox'));
      });
      await canvas.waitForEuiPopoverVisible();
    });
  },
};
disableStorybookControls(meta, ['inputRef']);
enableFunctionToggleControls(meta, ['onClear', 'onChange']);

export default meta;
type Story = StoryObj<EuiDatePickerProps>;

export const Playground: Story = {
  parameters: {
    codeSnippet: {
      args: {
        selected: "#{moment('Tue Mar 19 2024 18:54:51 GMT+0100')}",
      },
    },
  },
  args: {
    // setting a selected date to ensure VRT does not
    // automatically updated based on the current date
    selected: moment('Tue Mar 19 2024 18:54:51 GMT+0100'),
  },
  render: (args) => <StatefulDatePicker {...args} />,
};

export const TimeSelect: Story = {
  parameters: {
    controls: {
      include: [
        'showTimeSelect',
        'showTimeSelectOnly',
        'timeFormat',
        'timeIntervals',
        'includeTimes',
        'excludeTimes',
        'injectTimes',
        'minTime',
        'maxTime',
      ],
    },
  },
  args: {
    showTimeSelect: true,
    showTimeSelectOnly: false,
    selected: moment('01/01/1970').hours(23).minutes(0),
    excludeTimes: [moment('01/01/1970').hours(23).minutes(30)],
    injectTimes: [moment('01/01/1970').hours(23).minutes(59)],
    timeIntervals: 30,
  },
};

export const TimeSelectOnly: Story = {
  tags: ['vrt-only'],
  args: { ...TimeSelect.args, showTimeSelectOnly: true },
};

export const RestrictedDaySelect: Story = {
  parameters: {
    controls: {
      include: [
        'minDate',
        'maxDate',
        'includeDates',
        'excludeDates',
        'filterDate',
        'highlightDates',
      ],
    },
  },
  args: {
    selected: moment('01/02/1970'),
    maxDate: moment('01/01/1970'),
    minDate: moment('12/31/1969'),
  },
};

export const HighContrast: Story = {
  tags: ['vrt-only'],
  globals: { highContrastMode: true },
  args: {
    ...TimeSelect.args,
    ...RestrictedDaySelect.args,
    selected: moment('01/02/1970').hours(23).minutes(0),
  },
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
