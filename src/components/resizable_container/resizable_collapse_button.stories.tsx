/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { hideStorybookControls } from '../../../.storybook/utils';

import { EuiPanel } from '../panel';
import { EuiResizableContainer } from './resizable_container';
import {
  EuiResizableCollapseButton,
  EuiResizableCollapseButtonProps,
} from './resizable_collapse_button';

const meta: Meta<EuiResizableCollapseButtonProps> = {
  title: 'EuiResizableCollapseButton',
  component: EuiResizableCollapseButton,
  args: {
    isVisible: true,
    // Component defaults
    direction: 'horizontal',
    externalPosition: 'before',
    internalPosition: 'middle',
    isCollapsed: false,
  },
};

export default meta;
type Story = StoryObj<EuiResizableCollapseButtonProps>;

export const Playground: Story = {
  render: ({ isCollapsed, direction, ...args }) => (
    <EuiPanel
      paddingSize="none"
      css={({ euiTheme: { size } }) => ({
        position: 'relative',
        inlineSize: isCollapsed && direction === 'horizontal' ? size.l : 200,
        blockSize: isCollapsed && direction === 'vertical' ? size.l : 200,
      })}
    >
      <EuiResizableCollapseButton
        isCollapsed={isCollapsed}
        direction={direction}
        {...args}
      />
    </EuiPanel>
  ),
};

export const ProductionUsage: Story = {
  // Not testable via `EuiResizableContainer`, so hide these props from the controls
  argTypes: hideStorybookControls<EuiResizableCollapseButtonProps>([
    'externalPosition',
    'isVisible',
    'isCollapsed',
  ]),
  render: ({ direction, internalPosition }) => (
    <EuiResizableContainer direction={direction} css={{ blockSize: 500 }}>
      {(EuiResizablePanel, EuiResizableButton) => (
        <>
          <EuiResizablePanel
            mode={['collapsible', { position: internalPosition }]}
            initialSize={20}
            minSize="10%"
          >
            <span>Lorem ipsum dolor sit amet</span>
          </EuiResizablePanel>

          <EuiResizableButton />

          <EuiResizablePanel mode="main" initialSize={60} minSize="100px">
            <EuiPanel css={{ blockSize: '100%' }}>
              Lorem ipsum dolor sit amet
            </EuiPanel>
          </EuiResizablePanel>

          <EuiResizableButton />

          <EuiResizablePanel
            mode={['collapsible', { position: internalPosition }]}
            initialSize={20}
            minSize="10%"
          >
            <span>Lorem ipsum dolor sit amet</span>
          </EuiResizablePanel>
        </>
      )}
    </EuiResizableContainer>
  ),
};
