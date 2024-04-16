/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { EuiText } from '../text';
import { EuiSpacer, EuiSpacerProps } from './spacer';

const meta: Meta<EuiSpacerProps> = {
  title: 'Layout/EuiSpacer',
  component: EuiSpacer,
  decorators: [
    (Story) => (
      <>
        <EuiText>
          <p>Observe the space created between this and the next text block.</p>
        </EuiText>
        <div
          css={({ euiTheme }) => ({
            backgroundColor: euiTheme.colors.lightShade,
          })}
        >
          <Story />
        </div>
        <EuiText>
          <p>
            Observe the space created between this and the previous text block.
          </p>
        </EuiText>
      </>
    ),
  ],
  args: {
    size: 'l',
  },
};

export default meta;
type Story = StoryObj<EuiSpacerProps>;

export const Playground: Story = {};
