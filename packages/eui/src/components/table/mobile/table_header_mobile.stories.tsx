/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { EuiTable } from '../index';
import { EuiTableHeaderMobile } from './table_header_mobile';

type EuiTableHeaderMobileProps = typeof EuiTableHeaderMobile;

const meta: Meta<EuiTableHeaderMobileProps> = {
  title: 'Tabular Content/EuiTable/EuiTableHeaderMobile',
  component: EuiTableHeaderMobile,
  decorators: [
    (Story, { args }) => (
      <EuiTable>
        <Story {...args} />
      </EuiTable>
    ),
  ],
  argTypes: {
    responsiveBreakpoint: {
      // @ts-ignore - adding not resolved type
      type: 'boolean | EuiBreakpointSize',
      description:
        'Named breakpoint. Above this size, the header will not be rendered. Pass `false` to never render or inversely, `true` to always render the header',
      control: 'object',
    },
  },
};

export default meta;
type Story = StoryObj<EuiTableHeaderMobileProps>;

export const Playground: Story = {
  args: {
    // show component always for testing and VRT
    responsiveBreakpoint: true,
    children: 'mobile header content',
  },
};
