/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import contentSvg from '../../../src-docs/src/images/content.svg';
import sideNavSvg from '../../../src-docs/src/images/side_nav.svg';

import { EuiImage } from '../image';
import { EuiPageSidebar } from './page_sidebar';
import { EuiPageBody } from './page_body';
import { EuiPageSection } from './page_section';
import { EuiPage, EuiPageProps } from './page';

const meta: Meta<EuiPageProps> = {
  title: 'EuiPage',
  component: EuiPage,
};

export default meta;
type Story = StoryObj<EuiPageProps>;

const componentDefaults: EuiPageProps = {
  paddingSize: 'none',
  grow: true,
  direction: 'row',
  restrictWidth: false,
};

export const Playground: Story = {
  args: {
    ...componentDefaults,
  },
  render: ({ ...args }) => (
    <EuiPage {...args}>
      <EuiPageSidebar paddingSize="l">
        <EuiImage alt="Fake paragraph" url={sideNavSvg} />
      </EuiPageSidebar>
      <EuiPageBody paddingSize="none" panelled={true}>
        <EuiPageSection>
          {
            <EuiImage
              alt="Fake paragraph"
              url={contentSvg}
              size={'fullWidth'}
            />
          }
        </EuiPageSection>
      </EuiPageBody>
    </EuiPage>
  ),
};
