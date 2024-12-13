/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { EuiErrorBoundary, EuiErrorBoundaryProps } from './error_boundary';

const meta: Meta<EuiErrorBoundaryProps> = {
  title: 'Utilities/EuiErrorBoundary',
  component: EuiErrorBoundary,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<EuiErrorBoundaryProps>;

const ErrorContent = () => {
  const err = new Error(
    "I'm here to kick butt and chew bubblegum.\n\nAnd I'm all out of gum."
  );
  err.stack = 'Stack trace';

  throw err;
};

export const Playground: Story = {
  args: {
    children: <ErrorContent />,
    onError: console.log,
  },
};

export const HighContrast: Story = {
  ...Playground,
  tags: ['vrt-only'],
  globals: { highContrastMode: true },
};
