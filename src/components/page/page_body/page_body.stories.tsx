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
import { EuiImage } from '../../image';
import { EuiPage } from '../page';
import { EuiPageSection } from '..//page_section';

import { EuiPageBody, EuiPageBodyProps } from './page_body';

const meta: Meta<EuiPageBodyProps> = {
  title: 'EuiPageBody',
  component: EuiPageBody,
};

export default meta;
type Story = StoryObj<EuiPageBodyProps>;

const componentDefaults: EuiPageBodyProps = {
  panelled: true,
  restrictWidth: false,
  paddingSize: 'none',
  component: 'main', // This is not a component default, but for the purposes of easier testing in the DOM in Storybook we'll set it to section
};

export const Playground: Story = {
  args: {
    ...componentDefaults,
  },
  render: ({ ...args }) => (
    <EuiPage>
      <EuiPageBody {...args}>
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
