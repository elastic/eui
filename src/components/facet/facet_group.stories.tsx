/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { EuiFacetButton } from './facet_button';
import { EuiFacetGroup, EuiFacetGroupProps } from './facet_group';

const meta: Meta<EuiFacetGroupProps> = {
  title: 'EuiFacetGroup',
  component: EuiFacetGroup,
  args: {
    // Component defaults
    layout: 'vertical',
    gutterSize: 'm',
  },
};

export default meta;
type Story = StoryObj<EuiFacetGroupProps>;

const childButton = <EuiFacetButton quantity={1}>Facet button</EuiFacetButton>;

export const Playground: Story = {
  args: {
    children: (
      <>
        {childButton}
        {childButton}
        {childButton}
      </>
    ),
  },
};
