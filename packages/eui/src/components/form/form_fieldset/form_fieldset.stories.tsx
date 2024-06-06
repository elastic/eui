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

import { EuiSpacer } from '../../spacer';
import { EuiSwitch } from '../switch';

import { EuiFormFieldset, EuiFormFieldsetProps } from './form_fieldset';

const meta: Meta<EuiFormFieldsetProps> = {
  title: 'Forms/EuiForm/EuiFormFieldset',
  component: EuiFormFieldset,
};
hideStorybookControls(meta, ['aria-label']);

export default meta;
type Story = StoryObj<EuiFormFieldsetProps>;

export const Playground: Story = {
  args: {
    legend: {
      children: 'form legend',
      display: 'visible',
      compressed: false,
    },
    children: (
      <>
        <EuiSwitch label="Switch 1" onChange={() => {}} checked={false} />
        <EuiSpacer size="s" />
        <EuiSwitch label="Switch 2" onChange={() => {}} checked={true} />
      </>
    ),
  },
};
