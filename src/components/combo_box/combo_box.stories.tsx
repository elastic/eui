/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { EuiComboBox, EuiComboBoxProps } from './combo_box';

const options = [
  { label: 'Item 1' },
  { label: 'Item 2' },
  { label: 'Item 3' },
  { label: 'Item 4' },
  { label: 'Item 5' },
];

const meta: Meta<EuiComboBoxProps<{}>> = {
  title: 'EuiComboBox',
  // @ts-ignore typescript shenanigans
  component: EuiComboBox,
  argTypes: {
    singleSelection: {
      control: 'radio',
      options: [false, true, 'asPlainText'],
    },
    append: { control: 'text' },
    prepend: { control: 'text' },
    // Storybook is skipping the Pick<> props from EuiComboBoxList for some annoying reason
    onCreateOption: { control: 'boolean' }, // Set to a true/false for ease of testing
    customOptionText: { control: 'text' },
    renderOption: { control: 'function' },
  },
  args: {
    // Pass options in by default for ease of testing
    options: options,
    selectedOptions: [options[0]],
    // Component defaults
    delimiter: ',',
    sortMatchesBy: 'none',
    singleSelection: false,
    noSuggestions: false,
    async: false,
    isCaseSensitive: false,
    isClearable: true,
    isDisabled: false,
    isInvalid: false,
    isLoading: false,
    autoFocus: false,
    compressed: false,
    fullWidth: false,
    onCreateOption: undefined, // Override Storybook's default callback
  },
};

export default meta;
type Story = StoryObj<EuiComboBoxProps<{}>>;

export const Playground: Story = {
  render: function Render({ singleSelection, onCreateOption, ...args }) {
    const [selectedOptions, setSelectedOptions] = useState(
      args.selectedOptions
    );
    const onChange: EuiComboBoxProps<{}>['onChange'] = (options, ...args) => {
      setSelectedOptions(options);
      action('onChange')(options, ...args);
    };
    const _onCreateOption: EuiComboBoxProps<{}>['onCreateOption'] = (
      searchValue,
      ...args
    ) => {
      const createdOption = { label: searchValue };
      setSelectedOptions((prevState) =>
        !prevState || singleSelection
          ? [createdOption]
          : [...prevState, createdOption]
      );
      action('onCreateOption')(searchValue, ...args);
    };
    return (
      <EuiComboBox
        singleSelection={
          // @ts-ignore Specific to Storybook control
          singleSelection === 'asPlainText'
            ? { asPlainText: true }
            : Boolean(singleSelection)
        }
        {...args}
        selectedOptions={selectedOptions}
        onChange={onChange}
        onCreateOption={onCreateOption ? _onCreateOption : undefined}
      />
    );
  },
};
