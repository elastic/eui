/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { enableFunctionToggleControls } from '../../../.storybook/utils';
import { VRT_SELECTORS } from '../../../.storybook/vrt';
import { EuiButton } from '../button';
import {
  EuiGlobalToastList,
  EuiGlobalToastListProps,
  Toast,
} from './global_toast_list';

const staticToasts: Toast[] = [
  {
    id: 'static-toast-1',
    title: 'Hello from Toast!',
    text: 'toast message',
    color: 'success' as const,
  },
  {
    id: 'static-toast-2',
    title: 'Warning from Toast!',
    text: 'toast message',
    color: 'warning' as const,
    iconType: 'warning',
  },
];

const meta: Meta<EuiGlobalToastListProps> = {
  title: 'Display/EuiToast/EuiGlobalToastList/EuiGlobalToastList',
  component: EuiGlobalToastList,
  argTypes: {
    role: { control: { type: 'select' }, options: ['log', 'alert'] },
    showClearAllButtonAt: { control: { type: 'number', min: 0 } },
  },
  args: {
    role: 'log',
    side: 'right',
    showClearAllButtonAt: 3,
    // stub for testing/QA
    dismissToast: () => {},
    showNotificationBadge: false,
    stacked: true,
  },
  parameters: {
    vrt: {
      selector: VRT_SELECTORS.portal,
    },
  },
};
enableFunctionToggleControls(meta, ['onClearAllToasts']);

export default meta;
type Story = StoryObj<EuiGlobalToastListProps>;

export const Playground: Story = {
  args: {
    toasts: [
      {
        id: 'static-toast-0a',
        title: 'Report saved',
        text: 'The weekly report is ready to share.',
        color: 'success',
      },
      {
        id: 'static-toast-0b',
        title: 'Index finished',
        text: 'Search finished indexing the new documents.',
        color: 'primary',
      },
      {
        id: 'static-toast-1',
        title: 'Check complete',
        text: 'Saved your changes.',
        color: 'success',
      },
      {
        id: 'static-toast-2',
        title: 'Warning from Toast!',
        text: 'Something needs attention before you continue.',
        color: 'warning',
        iconType: 'warning',
      },
      {
        id: 'static-toast-3',
        title: 'Deployment canceled',
        text: 'The last deployment was canceled before it finished.',
        color: 'danger',
      },
      {
        id: 'static-toast-4',
        title: 'Hello from Toast!',
        text: 'The newest toast stays in front. Hover the stack to read each one behind it.',
        color: 'primary',
      },
    ],

    toastLifeTimeMs: 500000,
    showNotificationBadge: true,
    stacked: true,
    onClearAllToasts: true,
  },
  render: (args) => <StatefulGlobalToastList {...args} />,
};

let toastId = 0;

const StatefulGlobalToastList = ({
  toasts,
  dismissToast,
  ...rest
}: EuiGlobalToastListProps) => {
  const [_toasts, setToasts] = useState<Toast[]>(toasts ?? []);

  const handleAddToast = () => {
    const randomToast = {
      ...staticToasts[Math.floor(Math.random() * staticToasts.length)],
      id: `toast-${toastId}`,
    };

    toastId += 1;
    setToasts((prevToasts) => [...prevToasts, randomToast]);
  };

  const handleRemoveToast = (removedToast: Toast) => {
    setToasts((prevToasts) =>
      prevToasts.filter((toast) => toast.id !== removedToast.id)
    );
  };

  return (
    <>
      <EuiButton onClick={handleAddToast}>Add toast</EuiButton>
      <EuiGlobalToastList
        toasts={_toasts}
        dismissToast={handleRemoveToast}
        {...rest}
      />
    </>
  );
};
