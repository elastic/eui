/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import {
  EuiHeaderLogo,
  EuiHeaderSectionItemButton,
  EuiHeaderLinks,
  EuiHeaderLink,
  EuiIcon,
  EuiAvatar,
} from '../../components';

import { EuiHeader, EuiHeaderProps } from './header';

const meta: Meta<EuiHeaderProps> = {
  title: 'EuiHeader',
  component: EuiHeader,
};

export default meta;
type Story = StoryObj<EuiHeaderProps>;

export const Playground: Story = {
  args: {
    position: 'static',
    theme: 'default',
  },
};

export const Sections: Story = {
  args: {
    position: 'fixed',
    sections: [
      {
        items: [
          <EuiHeaderLogo
            iconType="logoElastic"
            href="#"
            aria-label="Go to home page"
          />,
          <EuiHeaderSectionItemButton aria-label="Spaces menu">
            <EuiAvatar type="space" name="Sales Team" size="s" />
          </EuiHeaderSectionItemButton>,
        ],
        breadcrumbs: [
          { text: 'Management', href: '#' },
          { text: 'Users', href: '#' },
          { text: 'Create' },
        ],
        breadcrumbProps: {
          'aria-label': 'Header sections breadcrumbs',
        },
      },
      {
        items: [
          <EuiHeaderLinks aria-label="App navigation dark theme example">
            <EuiHeaderLink isActive>Docs</EuiHeaderLink>
            <EuiHeaderLink>Code</EuiHeaderLink>
            <EuiHeaderLink iconType="help"> Help</EuiHeaderLink>
          </EuiHeaderLinks>,
          <EuiHeaderSectionItemButton aria-label="Account menu">
            <EuiAvatar name="John Username" size="s" />
          </EuiHeaderSectionItemButton>,
          <EuiHeaderSectionItemButton
            notification="1"
            aria-label="Apps menu with 1 new app"
          >
            <EuiIcon type="apps" size="m" />
          </EuiHeaderSectionItemButton>,
        ],
      },
    ],
  },
};
