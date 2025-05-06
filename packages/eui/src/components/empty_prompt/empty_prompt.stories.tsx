/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import illustration from './images/illustration.svg';
import { EuiButton, EuiButtonEmpty } from '../button';
import { EuiTitle } from '../title';
import { EuiLink } from '../link';
import { EuiImage } from '../image';
import { EuiPageTemplate } from '../page_template';

import { EuiEmptyPrompt, EuiEmptyPromptProps } from './empty_prompt';

const meta: Meta<EuiEmptyPromptProps> = {
  title: 'Display/EuiEmptyPrompt',
  component: EuiEmptyPrompt,
  args: {
    // Component defaults
    titleSize: 'm',
    paddingSize: 'l',
    color: 'plain', // Default is actually 'transparent', but for the purposes of easier testing in Storybook we'll set it to plain
    layout: 'vertical',
    hasBorder: false,
    hasShadow: false,
  },
};

export default meta;
type Story = StoryObj<EuiEmptyPromptProps>;

export const Playground: Story = {
  args: {
    title: <h2>Start adding cases</h2>,
    iconType: 'logoSecurity',
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
    layout: 'horizontal',
    icon: <EuiImage size="fullWidth" src={illustration} alt="" />,
    body: (
      <>
        <p>
          There are no visualizations to display. This tool allows you to create
          a wide range of charts, graphs, maps, and other graphics.
        </p>
        <p>
          The visualizations you create can be easily shared with your peers.
        </p>
      </>
    ),
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
  },
};

export const HighContrast: Story = {
  tags: ['vrt-only'],
  globals: { highContrastMode: true },
  args: Playground.args,
};

export const HighContrastTransparent: Story = {
  tags: ['vrt-only'],
  globals: { highContrastMode: true },
  args: {
    ...Playground.args,
    color: 'transparent',
  },
};
