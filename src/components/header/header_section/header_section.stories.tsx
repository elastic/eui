/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { EuiHeader } from '../header';
import { EuiHeaderSection, EuiHeaderSectionProps } from './header_section';

const meta: Meta<EuiHeaderSectionProps> = {
  title: 'EuiHeaderSection',
  component: EuiHeaderSection,
};

export default meta;
type Story = StoryObj<EuiHeaderSectionProps>;

export const Playground: Story = {
  render: ({ ...args }) => (
    <EuiHeader position="fixed">
      <EuiHeaderSection {...args}>Hello world</EuiHeaderSection>
    </EuiHeader>
  ),
};
