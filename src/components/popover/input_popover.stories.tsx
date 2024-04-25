/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import {
  disableStorybookControls,
  enableFunctionToggleControls,
  moveStorybookControlsToCategory,
} from '../../../.storybook/utils';
import { EuiFieldText } from '../form';
import { EuiInputPopover, EuiInputPopoverProps } from './input_popover';

const meta: Meta<EuiInputPopoverProps> = {
  title: 'Layout/EuiInputPopover',
  component: EuiInputPopover,
  args: {
    anchorPosition: 'downLeft',
    attachToAnchor: true,
    repositionToCrossAxis: false,
    display: 'block',
    panelPaddingSize: 's',
    closeOnScroll: false,
    ownFocus: false,
    disableFocusTrap: false,
    fullWidth: false,
    panelMinWidth: 0,
    offset: undefined,
    buffer: undefined,
    hasDragDrop: false,
    panelClassName: '',
    popoverScreenReaderText: '',
  },
};
enableFunctionToggleControls(meta, [
  'closePopover',
  'onPanelResize',
  'onPositionChange',
]);
moveStorybookControlsToCategory(
  meta,
  [
    'attachToAnchor',
    'buffer',
    'closePopover',
    'disableFocusTrap',
    'display',
    'hasDragDrop',
    'isOpen',
    'offset',
    'onPositionChange',
    'ownFocus',
    'panelClassName',
    'panelPaddingSize',
    'popoverScreenReaderText',
    'repositionToCrossAxis',
  ],
  'EuiPopover props'
);
disableStorybookControls(meta, ['input', 'inputRef']);

export default meta;
type Story = StoryObj<EuiInputPopoverProps>;

export const Playground: Story = {
  args: {
    children: 'Popover content',
    isOpen: true,
  },
  render: (args) => <StatefulInputPopover {...args} />,
};

const StatefulInputPopover = ({
  children,
  input,
  closePopover,
  isOpen: _isOpen,
  ...rest
}: EuiInputPopoverProps) => {
  const [isOpen, setOpen] = useState(_isOpen);

  const handleOnClose = () => {
    setOpen(false);
    closePopover?.();
  };

  return (
    <EuiInputPopover
      isOpen={isOpen}
      closePopover={handleOnClose}
      input={
        <EuiFieldText
          onFocus={() => setOpen(true)}
          placeholder="Focus me to toggle an input popover"
          aria-label="Popover attached to input element"
        />
      }
      {...rest}
    >
      {children}
    </EuiInputPopover>
  );
};
