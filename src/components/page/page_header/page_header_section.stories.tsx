/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { EuiTitle } from '../../title';
import {
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiPageHeaderSectionProps,
} from '../page_header';

const meta: Meta<EuiPageHeaderSectionProps> = {
  title: 'EuiPageHeaderSection',
  component: EuiPageHeaderSection,
};

export default meta;
type Story = StoryObj<EuiPageHeaderSectionProps>;

export const Playground: Story = {
  render: ({ ...args }) => (
    <EuiPageHeader bottomBorder={true}>
      <EuiPageHeaderSection {...args}>
        <EuiTitle size="l">
          <h1>Page title</h1>
        </EuiTitle>
      </EuiPageHeaderSection>
      <EuiPageHeaderSection {...args}>Page abilities</EuiPageHeaderSection>
    </EuiPageHeader>
  ),
};
