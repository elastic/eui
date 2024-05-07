/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { faker } from '@faker-js/faker';

faker.seed(42);

import {
  enableFunctionToggleControls,
  hideStorybookControls,
} from '../../../../.storybook/utils';
import { EuiText } from '../../text';
import { EuiTabbedContent, EuiTabbedContentProps } from './tabbed_content';

const tabs = [
  {
    id: 'tab--1',
    name: 'Tab 1',
    content: (
      <EuiText>
        <h2>Tab 1</h2>
        <p>{faker.lorem.paragraph(3)}</p>
      </EuiText>
    ),
  },
  {
    id: 'tab--2',
    name: 'Tab 2',
    content: (
      <EuiText>
        <h2>Tab 2</h2>
        <p>{faker.lorem.paragraph(3)}</p>
      </EuiText>
    ),
  },
  {
    id: 'tab--3',
    name: 'Tab 3',
    content: (
      <EuiText>
        <h2>Tab 3</h2>
        <p>{faker.lorem.paragraph(3)}</p>
      </EuiText>
    ),
  },
];

const meta: Meta<EuiTabbedContentProps> = {
  title: 'Navigation/EuiTabbedContent',
  component: EuiTabbedContent,
  args: {
    autoFocus: 'initial',
    expand: false,
    size: 'm',
  },
};
enableFunctionToggleControls(meta, ['onTabClick']);
hideStorybookControls(meta, ['aria-label']);

export default meta;
type Story = StoryObj<EuiTabbedContentProps>;

export const Playground: Story = {
  args: {
    tabs,
    initialSelectedTab: tabs[0],
  },
};
