/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, PropsWithChildren } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { EuiHeader, EuiHeaderSection } from '../../header';
import { EuiPageTemplate } from '../../page_template';

import { EuiCollapsibleNavBeta, EuiCollapsibleNavBetaProps } from '../';
import {
  EuiCollapsibleNavGroup,
  EuiCollapsibleNavGroupProps,
} from './collapsible_nav_group';

const meta: Meta<EuiCollapsibleNavGroupProps> = {
  title: 'EuiCollapsibleNavBeta.Group',
  component: EuiCollapsibleNavGroup,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    title: 'Elastic',
    icon: 'logoElastic',
    items: [
      { title: 'Get started', href: '#' },
      { title: 'Dashboards', href: '#' },
      {
        title: 'Explore',
        items: [
          { title: 'Hello', href: '#' },
          { title: 'World', href: '#' },
        ],
      },
    ],
  },
  argTypes: {
    wrapperProps: { control: 'object' },
  },
};
export default meta;
type Story = StoryObj<EuiCollapsibleNavGroupProps>;

const CollapsibleNavTemplate: FunctionComponent<
  PropsWithChildren & Partial<EuiCollapsibleNavBetaProps>
> = ({ children, ...props }) => {
  return (
    <>
      <EuiHeader position="fixed">
        <EuiHeaderSection>
          <EuiCollapsibleNavBeta {...props}>
            <EuiCollapsibleNavBeta.Body>{children}</EuiCollapsibleNavBeta.Body>
          </EuiCollapsibleNavBeta>
        </EuiHeaderSection>
      </EuiHeader>
      <EuiPageTemplate>
        <EuiPageTemplate.Section>Hello world</EuiPageTemplate.Section>
      </EuiPageTemplate>
    </>
  );
};

export const Playground: Story = {
  render: ({ ...args }) => (
    <CollapsibleNavTemplate>
      <EuiCollapsibleNavBeta.Group {...args} />
    </CollapsibleNavTemplate>
  ),
  args: {
    wrapperProps: { 'data-test-subj': 'test' },
  },
};

export const EdgeCaseTesting: Story = {
  render: ({ ...args }) => (
    <CollapsibleNavTemplate initialIsCollapsed={true}>
      <EuiCollapsibleNavBeta.Item href="#" title="Test" icon="faceHappy" />
      <EuiCollapsibleNavBeta.Item href="#" title="Test" icon="faceSad" />
      <EuiCollapsibleNavBeta.Group {...args} />
      <EuiCollapsibleNavBeta.Item href="#" title="Test" icon="faceHappy" />
      <EuiCollapsibleNavBeta.Item href="#" title="Test" icon="faceSad" />
      <EuiCollapsibleNavBeta.Group {...args} />
    </CollapsibleNavTemplate>
  ),
};
