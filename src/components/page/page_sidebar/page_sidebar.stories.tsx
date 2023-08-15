/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import contentSvg from '../../../../src-docs/src/images/content.svg';
import sideBarSvg from '../../../../src-docs/src/images/side_nav.svg';

import { EuiImage } from '../../image';
import { EuiPage } from '../page';
import { EuiPageBody } from '../page_body';
import { EuiPageSection } from '../page_section';

import { EuiPageSidebar, EuiPageSidebarProps } from './page_sidebar';

const meta: Meta<EuiPageSidebarProps> = {
  title: 'EuiPageSidebar',
  component: EuiPageSidebar,
};

export default meta;
type Story = StoryObj<EuiPageSidebarProps>;

const componentDefaults: EuiPageSidebarProps = {
  paddingSize: 'm', // The component default is actually 'none', but for the purposes of easier testing in Storybook we'll set it to plain
  sticky: false,
  minWidth: 248,
  responsive: ['xs', 's'],
};

export const Playground: Story = {
  args: {
    ...componentDefaults,
  },
  render: ({ ...args }) => (
    <EuiPage>
      <EuiPageSidebar {...args}>
        {<EuiImage alt="Fake paragraph" url={sideBarSvg} size={'fullWidth'} />}
      </EuiPageSidebar>
      <EuiPageBody panelled={true}>
        <EuiPageSection>
          <EuiImage alt="Fake paragraph" url={contentSvg} size={'fullWidth'} />
        </EuiPageSection>
      </EuiPageBody>
    </EuiPage>
  ),
};
