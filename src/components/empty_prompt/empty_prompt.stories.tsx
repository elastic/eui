/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { EuiEmptyPrompt, EuiEmptyPromptProps } from './empty_prompt';

import { EuiButton } from '../button';
import { EuiTitle } from '../title';
import { EuiLink } from '../link';

const meta: Meta<EuiEmptyPromptProps> = {
  title: 'EuiEmptyPrompt',
  component: EuiEmptyPrompt,
  parameters: {
    controls: {
      exclude: ['data-test-subj'],
    },
  },
  args: {},
};

export default meta;
type Story = StoryObj<EuiEmptyPromptProps>;

export const Playground: Story = {
  args: {
    layout: 'horizontal',
    iconType: 'logoSecurity',
    hasBorder: false,
    hasShadow: false,
    title: 'Empty Prompt',
    body: <p>Add a new case or change your filter settings.</p>,
    actions: (
      <EuiButton color="primary" fill>
        Add a case
      </EuiButton>
    ),
    footer: (
      <>
        <EuiTitle size="xxs">
          <h3>Want to learn more?</h3>
        </EuiTitle>
        <EuiLink href="#" target="_blank">
          Read the docs
        </EuiLink>
      </>
    ),
  },
};
