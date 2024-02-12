/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { disableStorybookControls } from '../../../.storybook/utils';

import { EuiButton } from '../button';
import { EuiCollapsibleNav, EuiCollapsibleNavProps } from './collapsible_nav';

const meta: Meta<EuiCollapsibleNavProps> = {
  title: 'EuiCollapsibleNav',
  component: EuiCollapsibleNav,
  argTypes: {
    ...disableStorybookControls(['button']),
    as: { options: ['nav', 'div'], control: 'radio' },
    maxWidth: { control: 'number' }, // TODO: also accepts bool | string
  },
  args: {
    // Component defaults
    as: 'nav',
    side: 'left',
    size: 320,
    paddingSize: 'none',
    pushAnimation: false,
    pushMinBreakpoint: 'l',
    isDocked: false,
    dockedBreakpoint: 'l',
    showButtonIfDocked: false,
    closeButtonPosition: 'outside',
    hideCloseButton: false,
    includeFixedHeadersInFocusTrap: true,
    outsideClickCloses: true,
    ownFocus: true,
  },
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
      onClose={(...args) => {
        setIsOpen(false);
        action('onClose')(...args);
      }}
    />
  );
};

export const Playground: Story = {
  render: ({ ...args }) => <StatefulCollapsibleNav {...args} />,
  args: {
    children: 'Collapsible nav content',
    isOpen: true,
  },
};
