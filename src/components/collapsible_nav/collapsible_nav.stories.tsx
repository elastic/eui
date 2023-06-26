/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

import { EuiButton } from '../button';
import { EuiCollapsibleNav, EuiCollapsibleNavProps } from './collapsible_nav';

const meta: Meta<EuiCollapsibleNavProps> = {
  title: 'EuiCollapsibleNav',
  component: EuiCollapsibleNav,
  // TODO: Improve props inherited from EuiFlyout, ideally through
  // a DRY import from `flyout.stories.tsx` once that's created
};

export default meta;
type Story = StoryObj<EuiCollapsibleNavProps>;

const StatefulCollapsibleNav = (props: Partial<EuiCollapsibleNavProps>) => {
  const [isOpen, setIsOpen] = useState(props.isOpen);
  return (
    <EuiCollapsibleNav
      {...props}
      isOpen={isOpen}
      button={
        <EuiButton onClick={() => setIsOpen((isOpen) => !isOpen)}>
          Toggle nav
        </EuiButton>
      }
      onClose={() => setIsOpen(false)}
    />
  );
};

export const Playground: Story = {
  render: ({ ...args }) => <StatefulCollapsibleNav {...args} />,
  args: {
    children: 'Collapsible nav content',
    isOpen: true,
    isDocked: false,
    dockedBreakpoint: 'l',
    showButtonIfDocked: false,
    size: 240,
  },
};
