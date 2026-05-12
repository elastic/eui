/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import {
  disableStorybookControls,
  enableFunctionToggleControls,
} from '../../../../.storybook/utils';
import { LOKI_SELECTORS } from '../../../../.storybook/loki';
import { EuiText } from '../../text';

import { EuiSuperSelect, EuiSuperSelectProps } from './super_select';
import { EuiFormAppend, EuiFormPrepend } from '../form_control_layout';

const options = [
  {
    value: 'option-1',
    inputDisplay: 'Option 1',
    dropdownDisplay: (
      <>
        <div>Option One</div>
        <EuiText size="xs" color="subdued">
          <p>Has a short description giving more detail to the option.</p>
        </EuiText>
      </>
    ),
  },
  {
    value: 'option-2',
    inputDisplay: 'Option 2',
    dropdownDisplay: 'Option Two',
  },
  {
    value: 'option-3',
    inputDisplay: 'Option 3',
    dropdownDisplay: 'Option Three',
  },
];

const meta: Meta<EuiSuperSelectProps> = {
  title: 'Forms/EuiSuperSelect',
  component: EuiSuperSelect,
  argTypes: {
    append: {
      control: 'radio',
      options: [undefined, 'icon', 'text'],
      mapping: {
        icon: <EuiFormAppend iconLeft="faceHappy" />,
        text: 'Appended',
        undefined: undefined,
      },
    },
    prepend: {
      control: 'radio',
      options: [undefined, 'icon', 'text'],
      mapping: {
        icon: <EuiFormPrepend iconLeft="faceHappy" />,
        text: 'Prepended',
        undefined: undefined,
      },
    },
    placeholder: { control: 'text' },
    valueOfSelected: { control: 'text' },
  },
  args: {
    fullWidth: false,
    compressed: false,
    isInvalid: false,
    isLoading: false,
    // set up for easier testing/QA
    name: '',
    placeholder: '',
    isOpen: false,
    readOnly: false,
    popoverProps: {},
  },
};
enableFunctionToggleControls(meta, ['onChange', 'onBlur', 'onFocus']);
disableStorybookControls(meta, ['buttonRef']);

export default meta;
type Story = StoryObj<EuiSuperSelectProps>;

export const Playground: Story = {
  args: {
    valueOfSelected: 'option-1',
    options,
  },
  render: (args) => <StatefulPlayground {...args} />,
};

const StatefulPlayground = ({
  valueOfSelected,
  onChange,
  ...rest
}: EuiSuperSelectProps) => {
  const [selected, setSelected] = useState(valueOfSelected ?? '');

  useEffect(() => {
    if (valueOfSelected) {
      setSelected(valueOfSelected);
    }
  }, [valueOfSelected]);

  const handleOnChange = (value: string) => {
    setSelected(value);

    onChange?.(value);
  };

  return (
    <EuiSuperSelect
      valueOfSelected={selected}
      onChange={handleOnChange}
      {...rest}
    />
  );
};

/* VRT */

export const Open: Story = {
  tags: ['vrt-only'],
  ...Playground,
  parameters: {
    loki: {
      chromeSelector: LOKI_SELECTORS.portal,
    },
  },
  args: {
    ...Playground.args,
    isOpen: true,
    options: [
      ...options,
      {
        value: 'option-4',
        inputDisplay: 'Option 4',
        dropdownDisplay: 'Option Four',
        disabled: true,
      },
      {
        value: 'option-5',
        inputDisplay: 'Option 5',
        dropdownDisplay: 'Option Five',
      },
    ],
  },
};
