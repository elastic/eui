/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import type { Meta, StoryObj } from '@storybook/react';

import {
  disableStorybookControls,
  enableFunctionToggleControls,
} from '../../../.storybook/utils';
import { EuiButton } from '../button';
import { EuiFlexGroup } from '../flex';
import { EuiText } from '../text';

import { EuiPopoverTitle } from './popover_title';
import { EuiPopoverFooter } from './popover_footer';
import { EuiPopover, EuiPopoverProps } from './popover';

const meta: Meta<EuiPopoverProps> = {
  title: 'Layout/EuiPopover/EuiPopover',
  component: EuiPopover,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    isOpen: false,
    ownFocus: true,
    panelPaddingSize: 'm',
    buffer: 16,
    hasArrow: true,
    anchorPosition: 'downCenter',
    display: 'inline-block',
    repositionToCrossAxis: true,
    repositionOnScroll: false,
    // adding defaults for quicker/easier QA
    arrowChildren: '',
    attachToAnchor: false,
    panelClassName: '',
    popoverScreenReaderText: '',
  },
  argTypes: {
    buffer: { control: 'number' }, // For ease of QA
  },
};
disableStorybookControls(meta, ['panelRef', 'popoverRef', 'closePopover']);

export default meta;
type Story = StoryObj<EuiPopoverProps>;

export const Playground: Story = {
  args: {
    children: 'This is a popover',
    button: 'popover trigger',
    isOpen: true,
  },
  render: (args) => <StatefulPopover {...args} />,
};
enableFunctionToggleControls(Playground, ['onPositionChange']);

const StatefulPopover = ({
  button,
  closePopover,
  isOpen: _isOpen,
  ...rest
}: EuiPopoverProps) => {
  const [isOpen, setOpen] = useState(_isOpen);

  useEffect(() => {
    setOpen(_isOpen);
  }, [_isOpen]);

  const handleOnClose = () => {
    setOpen(false);
    closePopover?.();
  };

  const trigger = (
    <EuiButton onClick={() => setOpen(!isOpen)}>
      {button || 'trigger'}
    </EuiButton>
  );

  return (
    <EuiFlexGroup
      alignItems="center"
      justifyContent="center"
      css={css`
        block-size: 100vh;
      `}
    >
      <EuiPopover
        isOpen={isOpen}
        button={trigger}
        closePopover={handleOnClose}
        {...rest}
      />
    </EuiFlexGroup>
  );
};

export const PanelPaddingSize: Story = {
  parameters: {
    controls: { include: ['panelPaddingSize'] },
  },
  args: {
    children: (
      <>
        <EuiPopoverTitle>Popover title</EuiPopoverTitle>
        <EuiText>
          Panel padding size will cascade down to its child{' '}
          <strong>EuiPopoverTitle</strong> and <strong>EuiPopoverFooter</strong>
        </EuiText>
        <EuiPopoverFooter>Popover footer</EuiPopoverFooter>
      </>
    ),
    button: 'popover trigger',
    isOpen: true,
  },
  render: (args) => <StatefulPopover {...args} />,
};
