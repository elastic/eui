/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import {
  hideStorybookControls,
  moveStorybookControlsToCategory,
} from '../../../../.storybook/utils';
import { EuiIcon } from '../../icon';
import { EuiFieldNumber } from '../field_number';

import {
  EuiFormControlLayoutDelimited,
  EuiFormControlLayoutDelimitedProps,
} from './form_control_layout_delimited';
import { EuiFormControlLayoutProps } from './form_control_layout';

// re-declaring the component with props as the Partial<EuiFormControlLayoutProps>
// of EuiFormControlLayoutDelimitedProps is otherwise not resolved
const Component: FunctionComponent<
  EuiFormControlLayoutDelimitedProps & EuiFormControlLayoutProps
> = EuiFormControlLayoutDelimited;

const meta: Meta<EuiFormControlLayoutDelimitedProps> = {
  title: 'Forms/EuiForm/EuiFormControlLayoutDelimited',
  component: Component,
  argTypes: {
    delimiter: {
      control: 'radio',
      options: [undefined, 'icon', 'text'],
      mapping: {
        icon: <EuiIcon type="arrowRight" />,
        text: '+',
      },
    },
    append: {
      control: 'radio',
      options: [undefined, 'icon', 'text'],
      mapping: {
        icon: <EuiIcon type="faceHappy" />,
        text: 'Appended',
        undefined: undefined,
      },
    },
    prepend: {
      control: 'radio',
      options: [undefined, 'icon', 'text'],
      mapping: {
        icon: <EuiIcon type="faceHappy" />,
        text: 'Prepended',
        undefined: undefined,
      },
    },
  },
  args: {
    fullWidth: false,
    iconsPosition: 'static',
    // set up for easier testing/QA
    compressed: false,
    isDisabled: false,
    isDropdown: false,
    isInvalid: false,
    isLoading: false,
    readOnly: false,
    icon: '',
    inputId: '',
  },
};
hideStorybookControls(meta, ['aria-label']);
moveStorybookControlsToCategory(
  meta,
  [
    'append',
    'prepend',
    'isDisabled',
    'isDropdown',
    'isInvalid',
    'isLoading',
    'compressed',
    'fullWidth',
    'readOnly',
    'clear',
    'iconsPosition',
    'icon',
    'inputId',
  ],
  'EuiFormControlLayout props'
);

export default meta;
type Story = StoryObj<EuiFormControlLayoutDelimitedProps>;

export const Playground: Story = {
  args: {
    startControl: (
      <EuiFieldNumber
        controlOnly
        placeholder="0"
        aria-label="EuiFormControlLayoutDelimited demo - start control"
      />
    ),
    endControl: (
      <EuiFieldNumber
        controlOnly
        placeholder="100"
        aria-label="EuiFormControlLayoutDelimited demo - end control"
      />
    ),
  },
};
