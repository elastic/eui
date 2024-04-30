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
  EuiPaginationButtonArrow,
  Props as EuiPaginationButtonArrowProps,
} from './pagination_button_arrow';

const meta: Meta<EuiPaginationButtonArrowProps> = {
  title: 'Navigation/EuiPagination/EuiPaginationButtonArrow',
  component: EuiPaginationButtonArrow,
};
enableFunctionToggleControls(meta, ['onClick']);
moveStorybookControlsToCategory(meta, ['buttonRef'], 'EuiButtonEmpty props');
disableStorybookControls(meta, ['buttonRef']);
hideStorybookControls(meta, ['aria-label']);

export default meta;
type Story = StoryObj<EuiPaginationButtonArrowProps>;

export const Playground: Story = {
  args: {
    type: 'next',
    disabled: false,
  },
};
