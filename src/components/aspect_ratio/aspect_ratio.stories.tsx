/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { disableStorybookControls } from '../../../.storybook/utils';

import { EuiAspectRatio, EuiAspectRatioProps } from './aspect_ratio';

const meta: Meta<EuiAspectRatioProps> = {
  title: 'EuiAspectRatio',
  component: EuiAspectRatio,
};

export default meta;
type Story = StoryObj<EuiAspectRatioProps>;

export const Playground: Story = {
  args: {
    height: 9,
    width: 16,
    maxWidth: '100%',
    children: (
      <div
        style={{
          backgroundColor: 'gray',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        Resize the demo window
      </div>
    ),
  },
  argTypes: disableStorybookControls(['children']),
};
