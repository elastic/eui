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
  EuiDescriptionListDescription,
  EuiDescriptionListDescriptionProps,
} from './description_list_description';

const meta: Meta<EuiDescriptionListDescriptionProps> = {
  title:
    'Display/EuiDescriptionList/Subcomponents/EuiDescriptionListDescription',
  component: EuiDescriptionListDescription,
};
hideStorybookControls(meta, ['aria-label']);

export default meta;
type Story = StoryObj<EuiDescriptionListDescriptionProps>;

export const Playground: Story = {
  args: {
    children: 'Description list description',
  },
};
