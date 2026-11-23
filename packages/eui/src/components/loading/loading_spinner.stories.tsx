/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { EuiBadge } from '../badge';
import { EuiButton } from '../button';
import { EuiFlexGroup, EuiFlexItem } from '../flex';
import { EuiSpacer } from '../spacer';
import { EuiText } from '../text';

import { EuiLoadingSpinner, EuiLoadingSpinnerProps } from './loading_spinner';

const meta: Meta<EuiLoadingSpinnerProps> = {
  title: 'Display/EuiLoadingSpinner',
  component: EuiLoadingSpinner,
  args: {
    size: 'm',
  },
};

export default meta;
type Story = StoryObj<EuiLoadingSpinnerProps>;

const badgeColors = [
  'primary',
  'accent',
  'success',
  'warning',
  'danger',
] as const;

const CurrentColorExamples = () => (
  <>
    <EuiText size="xs" color="subdued">
      <p>In a badge, the ring uses the badge text color.</p>
    </EuiText>
    <EuiSpacer size="s" />
    <EuiFlexGroup gutterSize="s" alignItems="center" wrap>
      {badgeColors.map((color) => (
        <EuiFlexItem key={color} grow={false}>
          <EuiBadge color={color}>
            <EuiFlexGroup
              component="span"
              gutterSize="xs"
              alignItems="center"
              responsive={false}
            >
              <EuiFlexItem grow={false} component="span">
                <EuiLoadingSpinner size="s" />
              </EuiFlexItem>
              <EuiFlexItem grow={false} component="span">
                Syncing
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiBadge>
        </EuiFlexItem>
      ))}
    </EuiFlexGroup>

    <EuiSpacer size="l" />
    <EuiText size="xs" color="subdued">
      <p>In a loading button, the ring uses the button text color.</p>
    </EuiText>
    <EuiSpacer size="s" />
    <EuiButton isLoading fill>
      Saving
    </EuiButton>
  </>
);

export const Playground: Story = {
  render: (args) => (
    <>
      <EuiLoadingSpinner {...args} />
      <EuiSpacer size="xl" />
      <CurrentColorExamples />
    </>
  ),
};

export const CustomColor: Story = {
  args: {
    color: { border: 'pink', highlight: 'purple' },
  },
};
