/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { EuiFlexGroup } from '../../flex';
import { EuiSkeletonText } from '../../skeleton';
import { EuiPageSection, EuiPageSectionProps } from '../page_section';

const meta: Meta<EuiPageSectionProps> = {
  title: 'EuiPageSection',
  component: EuiPageSection,
  argTypes: {
    bottomBorder: { control: 'select', options: [true, false, 'extended'] },
  },
};

export default meta;
type Story = StoryObj<EuiPageSectionProps>;

const componentDefaults: EuiPageSectionProps = {
  restrictWidth: false,
  color: 'plain', // The component default is actually 'transparent', but for the purposes of easier testing in Storybook we'll set it to plain
  paddingSize: 'l',
  alignment: 'top',
  grow: false,
  component: 'section', // This is not a component default, but for the purposes of easier testing in the DOM in Storybook we'll set it to section
};

export const Playground: Story = {
  args: componentDefaults,
  render: ({ ...args }) => (
    // Block size demos the grow prop
    <EuiFlexGroup direction="column" css={{ blockSize: '100vh' }}>
      <EuiPageSection css={{ blockSize: '50vh' }} {...args}>
        <EuiSkeletonText
          lines={3}
          size="m"
          isLoading={true}
          contentAriaLabel="Page sidebar mock text"
          css={{ inlineSize: '50vw', maxWidth: '100%', display: 'block' }} // This demos the alignment prop
        />
      </EuiPageSection>
    </EuiFlexGroup>
  ),
};
