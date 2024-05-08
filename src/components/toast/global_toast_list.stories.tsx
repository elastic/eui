/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { enableFunctionToggleControls } from '../../../.storybook/utils';
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
  args: {
    side: 'right',
    // stub for testing/QA
    dismissToast: () => {},
  },
};
enableFunctionToggleControls(meta, ['onClearAllToasts']);

export default meta;
type Story = StoryObj<EuiGlobalToastListProps>;

export const Playground: Story = {
  args: {
    toasts: [staticToasts[0]],
    toastLifeTimeMs: 15000,
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
