/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { LOKI_SELECTORS } from '../../../.storybook/loki';
import { moveStorybookControlsToCategory } from '../../../.storybook/utils';
import {
  EuiStepsHorizontal,
  EuiStepsHorizontalProps,
} from './steps_horizontal';

const meta: Meta<EuiStepsHorizontalProps> = {
  title: 'Navigation/EuiSteps/EuiStepsHorizontal/EuiStepsHorizontal',
  component: EuiStepsHorizontal,
  args: {
    size: 'm',
  },
};
moveStorybookControlsToCategory(meta, ['size'], 'EuiStepHorizontal props');

export default meta;
type Story = StoryObj<EuiStepsHorizontalProps>;

const onClick = action('onClick');

export const Playground: Story = {
  args: {
    steps: [
      {
        title: 'Step 1',
        onClick,
      },
      {
        title: 'Step 2',
        status: 'current',
        onClick,
      },
      {
        title: 'Step 3',
        status: 'complete',
        onClick,
      },
      {
        title: 'Step 4',
        status: 'incomplete',
        onClick,
      },
      {
        title: 'Step 5',
        status: 'warning',
        onClick,
      },
      {
        title: 'Step 6',
        status: 'danger',
        onClick,
      },
      {
        title: 'Step 7',
        status: 'loading',
        onClick,
      },
      {
        title: 'Step 8',
        status: 'disabled',
        onClick,
      },
    ],
  },
};
