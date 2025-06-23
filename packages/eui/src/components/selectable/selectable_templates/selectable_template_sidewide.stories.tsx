/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { LOKI_SELECTORS } from '../../../../.storybook/loki';

import { EuiButton } from '../../button';
import {
  EuiSelectableTemplateSitewide,
  EuiSelectableTemplateSitewideProps,
} from './selectable_template_sitewide';
import type { EuiSelectableTemplateSitewideOption } from './selectable_template_sitewide_option';

const options: EuiSelectableTemplateSitewideOption[] = [
  {
    label: 'Welcome dashboards',
    icon: { type: 'logoKibana' },
    avatar: { name: 'Default Space' },
    meta: [
      {
        text: 'Dashboard',
        type: 'application',
        highlightSearchString: true,
      },
    ],
    url: 'welcome-dashboards',
  },
  {
    label: 'SIEM',
    icon: { type: 'logoSecurity' },
    meta: [
      {
        text: 'personal-databoard',
        type: 'deployment',
      },
    ],
    space: 'Hello World',
  },
  {
    label: 'Dev tools',
    url: 'dev-tools-console',
    icon: { type: 'wrench' },
    meta: [
      {
        text: 'Management application',
        type: 'application',
      },
    ],
  },
  {
    label: 'My support tickets',
    icon: { type: 'help' },
    meta: [
      {
        text: 'Support',
        type: 'platform',
      },
    ],
  },
];

const meta: Meta<EuiSelectableTemplateSitewideProps> = {
  title: 'Templates/EuiSelectableTemplateSitewide',
  component: EuiSelectableTemplateSitewide,
  argTypes: {
    popoverButton: {
      control: 'boolean',
      mapping: {
        true: <EuiButton>Toggle popover</EuiButton>,
        false: undefined,
      },
    },
    popoverTitle: {
      control: 'boolean',
      mapping: {
        true: <span>I am a Title</span>,
        false: undefined,
      },
    },
    popoverFooter: {
      control: 'boolean',
      mapping: {
        true: <span>I am a Footer</span>,
        false: undefined,
      },
    },
  },
  args: {
    colorModes: {
      search: 'default',
      popover: 'default',
    },
  },
};

export default meta;
type Story = StoryObj<EuiSelectableTemplateSitewideProps>;

export const Playground: Story = {
  args: {
    options,
    // set up for easier testing/QA
    // @ts-ignore - using testing control types
    popoverButton: false,
    popoverTitle: false,
    popoverFooter: false,
    popoverButtonBreakpoints: ['xs', 's', 'm', 'l', 'xl'],
  },
};

export const VRT: Story = {
  tags: ['vrt-only'],
  args: {
    options,
    popoverProps: { isOpen: true },
  },
  parameters: {
    // the options is rendered in an options portal
    loki: { chromeSelector: LOKI_SELECTORS.portal },
  },
};
