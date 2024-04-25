/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Meta, StoryObj } from '@storybook/react';

import {
  disableStorybookControls,
  enableFunctionToggleControls,
  hideStorybookControls,
  moveStorybookControlsToCategory,
} from '../../../.storybook/utils';
import {
  EuiPaginationButton,
  EuiPaginationButtonProps,
} from './pagination_button';

const meta: Meta<EuiPaginationButtonProps> = {
  title: 'Navigation/EuiPagination/EuiPaginationButton',
  component: EuiPaginationButton,
  argTypes: {
    iconType: { control: 'text' },
    target: { control: 'text' },
  },
};
enableFunctionToggleControls(meta, ['onClick']);
moveStorybookControlsToCategory(
  meta,
  [
    'buttonRef',
    'contentProps',
    'color',
    'flush',
    'href',
    'iconSide',
    'iconSize',
    'iconType',
    'isActive',
    'isDisabled',
    'isLoading',
    'isSelected',
    'onClick',
    'rel',
    'size',
    'target',
    'textProps',
    'type',
  ],
  'EuiButtonEmpty props'
);
disableStorybookControls(meta, ['buttonRef']);
hideStorybookControls(meta, ['aria-label']);

export default meta;
type Story = StoryObj<EuiPaginationButtonProps>;

export const Playground: Story = {
  args: {
    pageIndex: 0,
    isActive: false,
    isDisabled: false,
    isSelected: false,
    isLoading: false,
  },
};
