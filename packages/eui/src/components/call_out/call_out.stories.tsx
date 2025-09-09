/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { EuiButton } from '../button';
import { EuiCallOut, EuiCallOutProps } from './call_out';

const meta: Meta<EuiCallOutProps> = {
  title: 'Display/EuiCallOut',
  component: EuiCallOut,
  argTypes: {
    iconType: { control: 'text' },
  },
  args: {
    // Component defaults
    color: 'primary',
    heading: 'p',
    size: 'm',
  },
};

export default meta;
type Story = StoryObj<EuiCallOutProps>;

export const Playground: Story = {
  args: {
    title: 'Callout title',
    children: 'Callout text',
  },
};

export const AnnounceOnMount: Story = {
  parameters: {
    controls: {
      include: ['children', 'announceOnMount'],
    },
    loki: {
      skip: true,
    },
  },
  args: {
    title: 'Callout title',
    children: 'Callout text',
    announceOnMount: true,
  },
  render: function Render() {
    const [isShown, setShown] = useState(false);

    return (
      <>
        <EuiButton onClick={() => setShown(!isShown)}>Toggle CallOut</EuiButton>
        {isShown && (
          <EuiCallOut title="Callout title" announceOnMount>
            Callout text
          </EuiCallOut>
        )}
      </>
    );
  },
};
