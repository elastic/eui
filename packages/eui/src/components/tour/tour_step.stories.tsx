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
  disableStorybookControls,
  enableFunctionToggleControls,
} from '../../../.storybook/utils';
import { EuiFlexGroup } from '../flex';
import { EuiButtonIcon } from '../button';
import { EuiTourStep, EuiTourStepProps } from './tour_step';

const meta: Meta<EuiTourStepProps> = {
  title: 'Display/EuiTour/EuiTourStep',
  component: EuiTourStep,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story, { args }) => (
      <EuiFlexGroup
        alignItems="center"
        justifyContent="center"
        css={{
          blockSize: '100vh',
        }}
      >
        <Story {...args} />
      </EuiFlexGroup>
    ),
  ],
  argTypes: {
    content: { control: 'text' },
    title: { control: 'text' },
    subtitle: { control: 'text' },
  },
  args: {
    anchorPosition: 'leftUp',
    isStepOpen: false,
    minWidth: 300,
    maxWidth: 600,
    step: 1,
    decoration: 'beacon',
    // set up for easier testing/QA
    subtitle: '',
  },
};
enableFunctionToggleControls(meta, ['onFinish']);
disableStorybookControls(meta, ['closePopover']);

export default meta;
type Story = StoryObj<EuiTourStepProps>;

export const Playground: Story = {
  args: {
    title: 'Welcome!',
    content: 'Tour step content',
    isStepOpen: true,
    stepsTotal: 3,
    children: <EuiButtonIcon iconType="question" />,
  },
};
