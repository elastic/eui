/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { hideStorybookControls } from '../../../.storybook/utils';
import { EuiI18n, EuiI18nProps } from './i18n';
import { EuiCard } from '../card';

type Props = EuiI18nProps<any, any, string[]>;

const meta: Meta<Props> = {
  title: 'Utilities/EuiI18n',
  component: EuiI18n,
  // Component defaults
};

export default meta;
type Story = StoryObj<Props>;

export const SingleToken: Story = {
  argTypes: {
    default: { control: { type: 'text' } },
    ...hideStorybookControls(['children', 'tokens', 'defaults']),
  },
  args: {
    token: 'euiI18nBasic.basicexample',
    default:
      'This is the English copy that would be replaced by a translation defined by the euiI18nBasic.basicexample token.',
  },
};

export const Interpolation: Story = {
  argTypes: {
    ...hideStorybookControls(['children', 'tokens', 'defaults']),
  },
  args: {
    token: 'euiI18nInterpolation.clickedCount',
    default: 'Clicked on button {count} times.',
    values: { count: 3 },
  },
};

export const MultipleTokens: Story = {
  argTypes: {
    ...hideStorybookControls(['token', 'default']),
  },
  args: {
    tokens: ['euiI18nMulti.title', 'euiI18nMulti.description'],
    defaults: ['Card title', 'Card description'],
  },
  render: ({ ...args }: Props) => (
    <EuiI18n {...args}>
      {([title, description]) => (
        <EuiCard title={title} description={description} />
      )}
    </EuiI18n>
  ),
};

export const MultipleTokenInterpolation: Story = {
  argTypes: {
    ...hideStorybookControls(['token', 'default']),
  },
  args: {
    tokens: ['euiI18nMulti.title', 'euiI18nMulti.description'],
    defaults: [
      'How often was the {name} cuddled?',
      'The {name} was cuddled {count} times.',
    ],
    values: { name: 'cat', count: 3 },
  },
  render: ({ ...args }: Props) => (
    <EuiI18n {...args}>
      {([title, description]) => (
        <EuiCard title={title} description={description} />
      )}
    </EuiI18n>
  ),
};
