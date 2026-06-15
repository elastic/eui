/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, waitFor, within, expect } from '@storybook/test';

import { VRT_SELECTORS, playDecorator } from '../../../.storybook/vrt';
import { EuiButton } from '../button';

import { EuiCopy, EuiCopyProps } from './copy';

const meta: Meta<EuiCopyProps> = {
  title: 'Utilities/EuiCopy',
  component: EuiCopy,
  parameters: {
    layout: 'fullscreen',
    vrt: { selector: VRT_SELECTORS.portal },
  },
  argTypes: {
    afterMessage: { control: 'text' },
    beforeMessage: { control: 'text' },
  },
  args: {
    // Component defaults
    afterMessage: 'Copied',
    beforeMessage: 'Click to copy',
  },
};

export default meta;
type Story = StoryObj<EuiCopyProps>;

export const Playground: Story = {
  args: {
    textToCopy: 'Hello world',
    children: (copy) => <EuiButton onClick={copy}>Click to copy</EuiButton>,
  },
  play: playDecorator(async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.hover(canvas.getByRole('button'));
    await waitFor(() =>
      expect(document.querySelector('[role="tooltip"]')).toBeVisible()
    );
  }),
};
