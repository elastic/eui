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
import { EuiCode } from '../../code';
import { EuiSpacer } from '../../spacer';

import { EuiValidatableControl } from './validatable_control';

type EuiValidatableControlProps = typeof EuiValidatableControl;

const meta: Meta<EuiValidatableControlProps> = {
  title: 'Forms/EuiValidatableControl',
  component: EuiValidatableControl,
  parameters: {
    loki: {
      // there are no visual features for this component,
      // it only adds attributes in the DOM
      skip: true,
    },
  },
  decorators: [
    (Story, { args }) => (
      <>
        <p>
          Inspect the DOM to see that the input will be enhanced with{' '}
          <EuiCode>aria-invalid="true"</EuiCode> when{' '}
          <EuiCode>isInValid=true</EuiCode>
        </p>
        <EuiSpacer size="s" />
        <Story {...args} />
      </>
    ),
  ],
  argTypes: {
    children: {
      type: {
        // @ts-ignore - name is required; overwrite type to match props type
        name: 'ReactElement',
        required: true,
      },
    },
  },
  args: {
    isInvalid: false,
  },
};
hideStorybookControls(meta, ['aria-label']);

export default meta;
type Story = StoryObj<EuiValidatableControlProps>;

export const Playground: Story = {
  args: {
    children: <input type="text" />,
  },
};
