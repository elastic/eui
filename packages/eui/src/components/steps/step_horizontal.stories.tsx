/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Meta, StoryObj } from '@storybook/react';

import {
  enableFunctionToggleControls,
  hideStorybookControls,
} from '../../../.storybook/utils';
import { EuiStepHorizontal, EuiStepHorizontalProps } from './step_horizontal';

const meta: Meta<EuiStepHorizontalProps> = {
  title: 'Navigation/EuiSteps/EuiStepsHorizontal/EuiStepHorizontal',
  component: EuiStepHorizontal,
  args: {
    size: 'm',
    step: 1,
    status: 'incomplete',
    // set up for easier testing/QA
    disabled: false,
  },
};
hideStorybookControls(meta, ['aria-label']);
enableFunctionToggleControls(meta, ['onClick']);

export default meta;
type Story = StoryObj<EuiStepHorizontalProps>;

export const Playground: Story = {
  args: {
    title: 'Step 1',
    children: 'lorem ipsum',
  },
};
