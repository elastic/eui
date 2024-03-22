/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { EuiLoadingLogo, EuiLoadingLogoProps } from './loading_logo';

const meta: Meta<EuiLoadingLogoProps> = {
  title: 'Display/EuiLoadingLogo',
  component: EuiLoadingLogo,
  argTypes: {
    logo: { control: { type: 'text' } },
  },
  args: {
    size: 'm',
    logo: 'logoKibana',
  },
};

export default meta;
type Story = StoryObj<EuiLoadingLogoProps>;

export const Playground: Story = {};
