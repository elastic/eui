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
import { EuiHeaderSection } from './header_section';
import {
  EuiHeaderSectionItem,
  EuiHeaderSectionItemProps,
} from './header_section_item';

const meta: Meta<EuiHeaderSectionItemProps> = {
  title: 'EuiHeaderSectionItem',
  component: EuiHeaderSectionItem,
};

export default meta;
type Story = StoryObj<EuiHeaderSectionItemProps>;

export const Playground: Story = {
  render: ({ ...args }) => (
    <EuiHeader position="fixed">
      <EuiHeaderSection>
        <EuiHeaderSectionItem {...args}>Hello</EuiHeaderSectionItem>
      </EuiHeaderSection>
      <EuiHeaderSection>
        <EuiHeaderSectionItem {...args}>World</EuiHeaderSectionItem>
      </EuiHeaderSection>
    </EuiHeader>
  ),
};
