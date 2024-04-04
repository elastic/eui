/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { enableFunctionToggleControls } from '../../../.storybook/utils';
import { EuiPagination, EuiPaginationProps } from './pagination';

const meta: Meta<EuiPaginationProps> = {
  title: 'Navigation/EuiPagination/EuiPagination',
  component: EuiPagination,
  args: {
    activePage: 0,
    pageCount: 1,
    responsive: ['xs', 's'],
    compressed: false,
  },
};
enableFunctionToggleControls(meta, ['onPageClick']);

export default meta;
type Story = StoryObj<EuiPaginationProps>;

export const Playground: Story = {
  args: {
    activePage: 5,
    pageCount: 10,
  },
};
