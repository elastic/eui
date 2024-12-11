/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { EuiExpression, EuiExpressionProps } from './expression';

const meta: Meta<EuiExpressionProps> = {
  title: 'Forms/EuiExpression',
  component: EuiExpression,
  args: {
    // Component defaults
    color: 'success',
    display: 'inline',
    textWrap: 'break-word',
    descriptionWidth: '20%',
    uppercase: true,
    isActive: false,
    isInvalid: false,
  },
};

export default meta;
type Story = StoryObj<EuiExpressionProps>;

export const Playground: Story = {
  args: {
    description: 'Hello',
    value: 'World',
  },
};

export const KitchenSink: Story = {
  tags: ['vrt-only'],
  render: () => (
    <>
      {/* Inline */}
      <EuiExpression description="Select" value="count(*)" onClick={() => {}} />
      <EuiExpression
        description="From"
        value="kibana_sample_data_ky_counties left"
      />
      <EuiExpression
        description="join"
        value="kibana_sample_data_ky_avl right"
        onClick={() => {}}
      />
      <EuiExpression
        description="on"
        value="left.smis = right.kytccountynmbr"
      />
      <EuiExpression
        description="group by"
        value="right.kytccountynmbr"
        onClick={() => {}}
        color="accent"
      />
      <EuiExpression description="sort by" value="count" />

      {/* Columns */}
      <EuiExpression
        display="columns"
        description="indices"
        value={
          <>
            <p>.kibana_task_manager,</p>
            <p>kibana_sample_data_ecommerce</p>
          </>
        }
        onClick={() => {}}
      />
      <EuiExpression
        display="columns"
        description="when"
        value="count()"
        isActive={true}
        onClick={() => {}}
        // Show focus state but hide the outline for VRT
        autoFocus
        css={{ outline: 'none !important' }}
      />
      <EuiExpression
        display="columns"
        description="except"
        value="kibana_sample_data_ky_counties"
        isInvalid={true}
      />
      <EuiExpression
        display="columns"
        description="join"
        descriptionWidth={50}
        value="with custom description width"
      />
    </>
  ),
};

export const HighContrast: Story = {
  ...KitchenSink,
  tags: ['vrt-only'],
  globals: { highContrastMode: true },
};
