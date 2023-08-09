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

import { EuiButton, EuiButtonEmpty } from '../button';
import { EuiTitle } from '../title';
import { EuiLink } from '../link';
import { EuiImage } from '../image';
import { EuiPageTemplate } from '../page_template';
import illustration from '../../../src-docs/src/images/empty-prompt/illustration.svg';

const meta: Meta<EuiEmptyPromptProps> = {
  title: 'EuiEmptyPrompt',
  component: EuiEmptyPrompt,
  argTypes: {
    element: { control: 'text' },
    body: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<EuiEmptyPromptProps>;

const componentDefaults: EuiEmptyPromptProps = {
  titleSize: 'm',
  paddingSize: 'l',
  color: 'plain',
  layout: 'vertical',
};

export const Playground: Story = {
  args: {
    title: <h2>Start adding cases</h2>,
    iconType: 'logoSecurity',
    hasBorder: false,
    hasShadow: false,
    body: 'Add a new case or change your filter settings.', // Should be wrapped in a `<p>` in production usage, but using a string makes this easier to edit in Storybook controls
    actions: [
      <EuiButton color="primary" fill>
        Upgrade
      </EuiButton>,
      <EuiButtonEmpty color="primary">Start a trial</EuiButtonEmpty>,
    ],
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
    ...componentDefaults,
  },
};

export const PageTemplate: Story = {
  render: ({ ...args }) => (
    <EuiPageTemplate minHeight="0">
      <EuiPageTemplate.EmptyPrompt {...args} />
    </EuiPageTemplate>
  ),
  args: {
    title: <h2>Create your first visualization</h2>,
    icon: <EuiImage size="fullWidth" src={illustration} alt="" />,
    // Body should be wrapped in a `<p>` in production usage, but using a string makes this easier to edit in Storybook controls
    body: 'There are no visualizations to display. This tool allows you to create a wide range of charts, graphs, maps, and other graphics. The visualizations you create can be easily shared with your peers.',
    actions: (
      <EuiButton color="primary" fill>
        Create visualization
      </EuiButton>
    ),
    footer: (
      <>
        <EuiTitle size="xxs">
          <span>Want to learn more?</span>
        </EuiTitle>{' '}
        <EuiLink href="#" target="_blank">
          Read the docs
        </EuiLink>
      </>
    ),
    ...componentDefaults,
  },
};
