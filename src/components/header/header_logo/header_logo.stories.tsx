/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { EuiHeader, EuiHeaderSectionItem } from '../';
import { EuiHeaderLogo, EuiHeaderLogoProps } from './header_logo';

const meta: Meta<EuiHeaderLogoProps> = {
  title: 'EuiHeaderLogo',
  component: EuiHeaderLogo,
  args: {
    // Not default props, set for demo purposes
    iconType: 'logoElastic',
    children: 'Elastic',
  },
};

export default meta;
type Story = StoryObj<EuiHeaderLogoProps>;

export const Playground: Story = {
  render: ({ ...args }) => (
    <EuiHeader position="fixed">
      <EuiHeaderSectionItem>
        <EuiHeaderLogo {...args} />
      </EuiHeaderSectionItem>
    </EuiHeader>
  ),
};

export const WithText: Story = {
  render: ({ ...args }) => (
    <EuiHeader position="fixed">
      <EuiHeaderSectionItem>
        <EuiHeaderLogo {...args} />
      </EuiHeaderSectionItem>
    </EuiHeader>
  ),
};
