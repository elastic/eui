/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { MutableRefObject, useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { css } from '@emotion/react';

import {
  disableStorybookControls,
  enableFunctionToggleControls,
  moveStorybookControlsToCategory,
} from '../../../.storybook/utils';
import { LOKI_SELECTORS } from '../../../.storybook/loki';
import { EuiFieldText } from '../form';
import { EuiButton } from '../button';
import { EuiInputPopover, EuiInputPopoverProps } from './input_popover';

const meta: Meta<EuiInputPopoverProps> = {
  title: 'Layout/EuiInputPopover',
  component: EuiInputPopover,
  parameters: {
    loki: { chromeSelector: LOKI_SELECTORS.portal },
  },
  argTypes: {
    offset: {
      control: 'number',
      table: { type: { summary: 'number' }, defaultValue: { summary: '2' } },
    },
  },
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
    panelClassName: '',
    popoverScreenReaderText: '',
  },
};
moveStorybookControlsToCategory(
  meta,
  [
    'attachToAnchor',
    'buffer',
    'closePopover',
    'disableFocusTrap',
    'display',
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
    input: (
      <EuiFieldText
        placeholder="Focus me to toggle an input popover"
        aria-label="Popover attached to input element"
      />
    ),
  },
  render: (args) => <StatefulInputPopover {...args} />,
};
enableFunctionToggleControls(Playground, [
  'closePopover',
  'onPanelResize',
  'onPositionChange',
]);

const StatefulInputPopover = ({
  children,
  input,
  closePopover,
  isOpen: _isOpen,
  ...rest
}: EuiInputPopoverProps) => {
  const panelRef: MutableRefObject<HTMLElement | null> = useRef(null);

  const [isOpen, setOpen] = useState(_isOpen);

  const setPanelRef = (node: HTMLElement | null) => {
    setTimeout(() => {
      panelRef.current = node;
    });
  };

  const handleOnClose = () => {
    setOpen(false);
    closePopover?.();
  };

  const connectedInput = React.isValidElement(input)
    ? React.cloneElement(input, {
        ...input.props,
        onFocus: (e: React.FocusEvent) => {
          if (
            (e.relatedTarget != null &&
              !panelRef.current?.contains(e.relatedTarget)) ||
            (e.relatedTarget == null && !panelRef.current)
          ) {
            setOpen(true);
          }
        },
      })
    : input;

  return (
    <EuiInputPopover
      isOpen={isOpen}
      closePopover={handleOnClose}
      input={connectedInput}
      panelRef={setPanelRef}
      {...rest}
    >
      {children}
    </EuiInputPopover>
  );
};

export const AnchorPosition: Story = {
  parameters: {
    controls: { include: ['anchorPosition', 'panelMinWidth'] },
  },
  args: {
    children: 'Popover content',
    isOpen: true,
    panelMinWidth: 500,
  },
  render: (args) => (
    <div css={{ display: 'flex', justifyContent: 'center' }}>
      <StatefulInputPopover {...args} />
    </div>
  ),
};

export const InteractiveChildren: Story = {
  parameters: {
    controls: { include: ['ownFocus', 'disableFocusTrap'] },
    loki: {
      skip: true,
    },
  },
  args: {
    input: (
      <EuiFieldText
        placeholder="Focus me to toggle an input popover"
        aria-label="Popover attached to input element"
      />
    ),
  },
  render: (args) => (
    <>
      <StatefulInputPopover {...args}>
        <div
          css={({ euiTheme }) => css`
            display: flex;
            flex-direction: column;
            gap: ${euiTheme.size.s};
          `}
        >
          <EuiButton>First button</EuiButton>
          <EuiButton>Second button</EuiButton>
          <EuiButton>Third button</EuiButton>
        </div>
      </StatefulInputPopover>
    </>
  ),
};
