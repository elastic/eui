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
  parameters: {
    controls: {
      exclude: ['data-test-subj'],
    },
  },
};

export default meta;
type Story = StoryObj<EuiEmptyPromptProps>;

export const Playground: Story = {
  args: {
    title: <h2>Start adding cases</h2>,
    layout: 'horizontal',
    iconType: 'logoSecurity',
    hasBorder: false,
    hasShadow: false,
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

export const MultipleActions: Story = {
  render: ({ ...args }) => (
    <EuiEmptyPrompt
      title={<h2>Upgrade your license to use Machine Learning</h2>}
      actions={[
        <EuiButton color="primary" fill>
          Upgrade
        </EuiButton>,
        <EuiButtonEmpty color="primary">Start a trial</EuiButtonEmpty>,
      ]}
      {...args}
    />
  ),
  args: {
    title: <h2>Upgrade your license to use Machine Learning</h2>,
    actions: [
      <EuiButton color="primary" fill>
        Upgrade
      </EuiButton>,
      <EuiButtonEmpty color="primary">Start a trial</EuiButtonEmpty>,
    ],
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
    color: 'plain',
    layout: 'horizontal',
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
