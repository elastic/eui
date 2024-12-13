/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { moveStorybookControlsToCategory } from '../../../.storybook/utils';
import { EuiStepInterface } from './step';
import { EuiSteps, EuiStepsProps } from './steps';

const steps: EuiStepInterface[] = [
  {
    title: 'Step 1',
    children: 'lorem ipsum',
  },
  {
    title: 'Step 2',
    children: 'lorem ipsum',
    status: 'current',
  },
  {
    title: 'Step 3',
    children: 'lorem ipsum',
    status: 'complete',
  },
  {
    title: 'Step 4',
    children: 'lorem ipsum',
    status: 'incomplete',
  },
  {
    title: 'Step 5',
    children: 'lorem ipsum',
    status: 'warning',
  },
  {
    title: 'Step 6',
    children: 'lorem ipsum',
    status: 'danger',
  },
  {
    title: 'Step 7',
    children: 'lorem ipsum',
    status: 'loading',
  },
  {
    title: 'Step 8',
    children: 'lorem ipsum',
    status: 'disabled',
  },
];

const meta: Meta<EuiStepsProps> = {
  title: 'Navigation/EuiSteps/EuiSteps',
  component: EuiSteps,
  args: {
    firstStepNumber: 1,
    headingElement: 'p',
    titleSize: 's',
  },
};
moveStorybookControlsToCategory(
  meta,
  ['headingElement', 'titleSize'],
  'EuiStep props'
);

export default meta;
type Story = StoryObj<EuiStepsProps>;

export const Playground: Story = {
  args: {
    steps,
  },
};

export const UnorderedSteps: Story = {
  tags: ['vrt-only'],
  parameters: {
    controls: {
      include: ['steps', 'titleSize'],
    },
  },
  args: {
    steps,
    titleSize: 'xxs',
  },
};

export const HighContrast: Story = {
  ...Playground,
  tags: ['vrt-only'],
  globals: { highContrastMode: true },
};
