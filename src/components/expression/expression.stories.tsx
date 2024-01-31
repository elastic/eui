/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { EuiExpression, EuiExpressionProps } from './expression';

const meta: Meta<EuiExpressionProps> = {
  title: 'EuiExpression',
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
