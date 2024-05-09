/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { hideStorybookControls } from '../../../.storybook/utils';
import { STATUS } from './step_number';
import { EuiStep, EuiStepProps } from './step';

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
