/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { LOKI_SELECTORS } from '../../../.storybook/loki';
import { EuiI18nNumber, EuiI18nNumberProps } from './i18n_number';
import { EuiText } from '../text';

const meta: Meta<EuiI18nNumberProps> = {
  title: 'Utilities/EuiI18nNumber',
  component: EuiI18nNumber,
  parameters: {
    loki: {
      chromeSelector: LOKI_SELECTORS.textOnly,
    },
  },
};

export default meta;
type Story = StoryObj<EuiI18nNumberProps>;

export const SingleValue: Story = {
  parameters: {
    controls: { include: ['value'] },
  },
  args: {
    value: 99,
  },
  render: (args: EuiI18nNumberProps) => (
    <EuiText>
      <span>Formatted number:</span> <EuiI18nNumber {...args} />
    </EuiText>
  ),
};

export const MultipleValues: Story = {
  parameters: {
    controls: { include: ['values'] },
  },
  args: {
    values: [0, 1, 2],
    children: (values: ReactNode[]) => (
      <>
        {values.map((value, index) => (
          <EuiText key={index}>
            <span>Formatted number: {value}</span>
          </EuiText>
        ))}
      </>
    ),
  },
};
