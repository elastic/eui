/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { LOKI_SELECTORS } from '../../../.storybook/loki';
import { EuiI18n, EuiI18nProps, I18nTokensShape } from './i18n';
import { EuiCard } from '../card';

type Props = EuiI18nProps<any, any, string[]>;

const meta: Meta<Props> = {
  title: 'Utilities/EuiI18n',
  component: EuiI18n,
  parameters: {
    loki: {
      chromeSelector: LOKI_SELECTORS.textOnly,
    },
  },
};

export default meta;
type Story = StoryObj<Props>;

export const SingleToken: Story = {
  parameters: {
    controls: { include: ['default', 'token'] },
  },
  argTypes: {
    default: { control: { type: 'text' } },
  },
  args: {
    token: 'euiI18nBasic.basicexample',
    default:
      'This is the English copy that would be replaced by a translation defined by the euiI18nBasic.basicexample token.',
  },
};

export const Interpolation: Story = {
  parameters: {
    controls: { include: ['default', 'token', 'values'] },
  },
  args: {
    token: 'euiI18nInterpolation.clickedCount',
    default: 'Clicked on button {count} times.',
    values: { count: 3 },
  },
};

export const MultipleTokens: Story = {
  parameters: {
    controls: { include: ['defaults', 'tokens'] },
  },
  args: {
    tokens: ['euiI18n.title', 'euiI18n.description'],
    defaults: ['Card title', 'Card description'],
  },
  render: ({ tokens, defaults }: I18nTokensShape<string[]>) => (
    // eslint-disable-next-line local/i18n
    <EuiI18n tokens={tokens} defaults={defaults}>
      {([title, description]: string[]) => (
        <EuiCard title={title} description={description} />
      )}
    </EuiI18n>
  ),
};

export const MultipleTokenInterpolation: Story = {
  parameters: {
    controls: { include: ['defaults', 'tokens', 'values'] },
  },
  args: {
    tokens: ['euiI18nMulti.title', 'euiI18nMulti.description'],
    defaults: [
      'How often was the {name} cuddled?',
      'The {name} was cuddled {count} times.',
    ],
    values: { name: 'cat', count: 3 },
  },
  render: ({ tokens, defaults, values }: I18nTokensShape<string[]>) => (
    // eslint-disable-next-line local/i18n
    <EuiI18n tokens={tokens} defaults={defaults} values={values}>
      {([title, description]: string[]) => (
        <EuiCard title={title} description={description} />
      )}
    </EuiI18n>
  ),
};
