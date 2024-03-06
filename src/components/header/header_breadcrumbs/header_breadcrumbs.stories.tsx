/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { EuiBreadcrumbsProps } from '../../breadcrumbs';
import { EuiHeaderBreadcrumbs } from './header_breadcrumbs';

const meta: Meta<EuiBreadcrumbsProps> = {
  title: 'EuiHeaderBreadcrumbs',
  component: EuiHeaderBreadcrumbs,
  args: {
    // Component defaults
    type: 'application',
    max: 4,
    truncate: true,
    responsive: { xs: 1, s: 2, m: 4 },
    lastBreadcrumbIsCurrentPage: true,
  },
};

export default meta;
type Story = StoryObj<EuiBreadcrumbsProps>;

export const Playground: Story = {
  args: {
    breadcrumbs: [
      {
        text: 'Breadcrumb 1',
        href: '#',
      },
      {
        text: 'Breadcrumb 2',
        href: '#',
      },
      {
        text: 'Current',
        href: '#',
      },
    ],
  },
};
