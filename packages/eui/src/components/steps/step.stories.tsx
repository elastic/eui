/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the "Elastic License
 * 2.0", the "GNU Affero General Public License v3.0 only", and the "Server Side
 * Public License v 1"; you may not use this file except in compliance with, at
 * your election, the "Elastic License 2.0", the "GNU Affero General Public
 * License v3.0 only", or the "Server Side Public License, v 1".
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { faker } from '@faker-js/faker';

import { hideStorybookControls } from '../../../.storybook/utils';
import { STATUS } from './step_number';
import { EuiStep, EuiStepProps } from './step';

faker.seed(42);

const meta: Meta<EuiStepProps> = {
  title: 'Navigation/EuiSteps/EuiSteps/EuiStep',
  component: EuiStep,
  argTypes: {
    status: { options: [undefined, ...STATUS] },
  },
  args: {
    headingElement: 'p',
    titleSize: 's',
    step: 1,
  },
};
hideStorybookControls(meta, ['aria-label']);

export default meta;
type Story = StoryObj<EuiStepProps>;

export const Playground: Story = {
  args: {
    title: 'Step 1',
    children: 'lorem ipsum',
  },
};

export const MultilineTitle: Story = {
  tags: ['vrt-only'],
  args: {
    title: faker.lorem.words(7),
    children: 'lorem ipsum',
  },
  render: (args) => <ComponentStep {...args} />,
};

export const MultilineTitleXXS: Story = {
  tags: ['vrt-only'],
  args: {
    title: faker.lorem.words(13),
    children: 'lorem ipsum',
    titleSize: 'xxs',
  },
  render: (args) => <ComponentStep {...args} />,
};

const ComponentStep = (props: EuiStepProps) => {
  return (
    <div css={{ width: '400px' }}>
      <EuiStep {...props} />
    </div>
  );
};
