/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { hideStorybookControls } from '../../../../.storybook/utils';

import { EuiIcon } from '../../icon';
import { EuiFieldText } from '../field_text';

import {
  EuiFormControlLayout,
  EuiFormControlLayoutProps,
} from './form_control_layout';

const meta: Meta<EuiFormControlLayoutProps> = {
  title: 'Forms/EuiForm/EuiFormControlLayout',
  component: EuiFormControlLayout,
  argTypes: {
    append: {
      control: 'radio',
      options: [undefined, 'icon', 'text'],
      mapping: {
        icon: <EuiIcon type="faceHappy" />,
        text: 'Appened',
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
    iconsPosition: 'absolute',
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

export default meta;
type Story = StoryObj<EuiFormControlLayoutProps>;

export const Playground: Story = {
  args: {
    children: (
      <EuiFieldText
        fullWidth
        controlOnly
        aria-label="Use aria labels when no actual label is in use"
      />
    ),
  },
};

export const IconShape: Story = {
  parameters: {
    controls: {
      include: ['icon', 'isInvalid', 'isLoading', 'iconsPosition', 'clear'],
    },
  },
  args: {
    children: (
      <EuiFieldText
        fullWidth
        controlOnly
        aria-label="Use aria labels when no actual label is in use"
      />
    ),
    icon: {
      type: 'faceHappy',
      side: 'right',
    },
    clear: {
      size: 'm',
    },
  },
};
