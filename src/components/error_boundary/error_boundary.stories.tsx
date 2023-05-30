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

const ErrorContent = () => {
  throw new Error(
    "I'm here to kick butt and chew bubblegum.\n\nAnd I'm all out of gum."
  );
};

const meta: Meta<EuiErrorBoundaryProps> = {
  title: 'EuiErrorBoundary',
  component: () => (
    <EuiErrorBoundary>
      <ErrorContent />
    </EuiErrorBoundary>
  ),
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    onError: {
      description:
        'TODO: extract prop descriptions, defaults, and types from Typescript ',
    },
  },
};

export default meta;
type Story = StoryObj<EuiErrorBoundaryProps>;

export const Default: Story = {};
