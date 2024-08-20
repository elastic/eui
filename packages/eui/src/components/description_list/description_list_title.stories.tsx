/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { hideStorybookControls } from '../../../.storybook/utils';
import {
  EuiDescriptionListTitle,
  EuiDescriptionListTitleProps,
} from './description_list_title';

const meta: Meta<EuiDescriptionListTitleProps> = {
  title: 'Display/EuiDescriptionList/Subcomponents/EuiDescriptionListTitle',
  component: EuiDescriptionListTitle,
};
hideStorybookControls(meta, ['aria-label']);

export default meta;
type Story = StoryObj<EuiDescriptionListTitleProps>;

export const Playground: Story = {
  args: {
    children: 'Description list title',
  },
};
