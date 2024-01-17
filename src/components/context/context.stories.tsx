/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { useEuiI18n, EuiI18n, EuiI18nNumber } from '../i18n';

import { EuiContext, EuiContextProps, EuiI18nConsumer } from './context';

const meta: Meta<EuiContextProps> = {
  title: 'EuiContext',
  component: EuiContext,
};

export default meta;
type Story = StoryObj<EuiContextProps>;

const mappings = {
  fr: {
    'euiContext.stories.greeting': 'Salutations, {name}!',
    'euiContext.stories.name': 'Jean Dupont',
    'euiContext.stories.guestNo': 'Vous êtes invité #',
  },
};

/* eslint-disable local/i18n */
const ContextConsumer = () => {
  const name = useEuiI18n('euiContext.stories.name', 'John Doe');
  return (
    <EuiI18nConsumer>
      {({ locale }) => (
        <div lang={locale}>
          <EuiI18n
            token="euiContext.stories.greeting"
            default="Welcome, {name}!"
            values={{
              name: <strong>{name}</strong>,
            }}
          />
          <p>
            <EuiI18n
              token="euiContext.stories.guestNo"
              default="You are guest #"
            />
            <EuiI18nNumber value={1582394} />
          </p>
        </div>
      )}
    </EuiI18nConsumer>
  );
};

export const Playground: Story = {
  args: {
    children: <ContextConsumer />,
    i18n: {
      locale: 'fr',
      mapping: mappings.fr,
      formatNumber: (value) => new Intl.NumberFormat('fr').format(value),
    },
  },
};

// TODO: Story with example that swaps between default English and FR mappings
// TODO: `render` example, `formatDateTime` example

// TODO: Should this component be renamed `EuiI18nContext`,
// in light of the new existing EuiProvider component?
