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
import { EuiPageHeader } from '../page_header';
import { EuiPageSection, EuiPageSectionProps } from '../page_section';

const meta: Meta<EuiPageSectionProps> = {
  title: 'EuiPageSection',
  component: EuiPageSection,
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
  args: {
    ...componentDefaults,
  },
  render: ({ ...args }) => (
    <>
      <EuiPageHeader
        paddingSize="l"
        bottomBorder="extended"
        pageTitle="Page title"
        description="This is the page description"
      />
      <EuiPageSection {...args}>Secondary content</EuiPageSection>
      <EuiPageSection {...args}>
        <EuiImage alt="Fake paragraph" url={contentSvg} size={'fullWidth'} />
      </EuiPageSection>
    </>
  ),
};
