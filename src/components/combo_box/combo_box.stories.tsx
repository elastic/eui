/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Meta, StoryObj } from '@storybook/react';
import React, { useCallback, useState } from 'react';

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
  args: {
    options: options,
    selectedOptions: [options[0]],
    singleSelection: false,
  },
  argTypes: {
    singleSelection: {
      control: 'radio',
      options: [false, true, 'asPlainText'],
    },
    append: { control: 'text' },
    prepend: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<EuiComboBoxProps<{}>>;

export const Playground: Story = {
  // The render function is a component, eslint just doesn't know it
  /* eslint-disable react-hooks/rules-of-hooks */
  render: ({ singleSelection, ...args }) => {
    const [selectedOptions, setSelectedOptions] = useState(
      args.selectedOptions
    );
    const onChange = useCallback((newOptions: any[]) => {
      setSelectedOptions(newOptions);
    }, []);
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
      />
    );
  },
};
