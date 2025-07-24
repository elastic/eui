/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { EuiCheckableCard, EuiCheckableCardProps } from './checkable_card';

const meta: Meta<EuiCheckableCardProps> = {
  title: 'Display/EuiCheckableCard',
  component: EuiCheckableCard,
  // NOTE: Storybook isn't correctly inheriting certain props due to the exclusive union,
  // so we have to do some manual polyfilling
  argTypes: {
    labelProps: {
      control: 'object',
      type: { name: 'object', value: { key: { name: 'string' } } },
    },
    checkableType: {
      options: ['radio', 'checkbox'],
      control: 'radio',
    },
    onChange: {
      action: 'onChange',
      type: { name: 'function', required: true },
    },
  },
  args: {
    // Component defaults
    checkableType: 'radio',
    checked: false,
    disabled: false,
    hasBorder: true,
    hasShadow: false,
  },
};

export default meta;
type Story = StoryObj<EuiCheckableCardProps>;

export const Playground: Story = {
  args: {
    id: 'id',
    label: 'Checkable option',
  },
};

export const WithNonInteractiveChildren: Story = {
  args: {
    id: 'checkable-card-non-interactive',
    label: 'Service Plan',
    children: (
      <div>
        <p>Basic plan includes:</p>
        <ul>
          <li>Up to 5 users</li>
          <li>10GB storage</li>
          <li>Email support</li>
        </ul>
        <p>Perfect for small teams getting started.</p>
      </div>
    ),
  },
};

export const WithInteractiveChildren: Story = {
  args: {
    id: 'checkable-card-interactive',
    label: 'Advanced Configuration',
    children: (
      <div>
        <p>Customize your settings:</p>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            alert('Button clicked!');
          }}
          style={{
            margin: '8px 0',
            padding: '4px 8px',
            backgroundColor: '#0066CC',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Configure Settings
        </button>
        <p>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              alert('Link clicked!');
            }}
          >
            Learn more about advanced features
          </a>
        </p>
      </div>
    ),
  },
};
