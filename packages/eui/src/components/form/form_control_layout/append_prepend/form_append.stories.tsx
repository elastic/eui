/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import {
  hideStorybookControls,
  enableFunctionToggleControls,
} from '../../../../../.storybook/utils';

import { EuiFieldText } from '../../field_text';
import { EuiNotificationBadge } from '../../../badge';
import { EuiFormAppend, type EuiFormAppendProps } from './form_append_prepend';

const meta: Meta<EuiFormAppendProps> = {
  title: 'Forms/EuiForm/EuiFormControlLayout/Subcomponents/EuiFormAppend',
  component: EuiFormAppend,
  argTypes: {
    label: { control: 'text' },
    iconLeft: { control: 'text' },
    iconRight: { control: 'text' },
    children: {
      control: 'radio',
      options: [undefined, 'badge', 'text'],
      mapping: {
        badge: <EuiNotificationBadge>1</EuiNotificationBadge>,
        text: 'Content',
        undefined: undefined,
      },
    },
    isDisabled: { control: 'boolean' },
  },
  args: {
    inputId: '',
    element: 'div',
    compressed: false,
    label: '',
    iconLeft: '',
    iconRight: '',
    children: undefined,
    // @ts-expect-error - ignore exclusive union
    isDisabled: false,
  },
};
hideStorybookControls(meta, ['aria-label']);
enableFunctionToggleControls(meta, ['onClick']);

export default meta;
type Story = StoryObj<EuiFormAppendProps>;

export const Playground: Story = {
  args: {
    label: 'Append',
    // @ts-expect-error - onClick is optional but the toggle is enabled
    onClick: false,
  },
  render: ({ compressed, inputId, ...args }: EuiFormAppendProps) => {
    const textFieldProps = {
      compressed,
      id: inputId,
    };

    return (
      <EuiFieldText
        {...textFieldProps}
        append={<EuiFormAppend compressed={compressed} {...args} />}
      />
    );
  },
};
