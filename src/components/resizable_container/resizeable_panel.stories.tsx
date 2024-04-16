/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import {
  disableStorybookControls,
  moveStorybookControlsToCategory,
} from '../../../.storybook/utils';
import { EuiResizableContainer } from './resizable_container';
import { EuiResizablePanel, EuiResizablePanelProps } from './resizable_panel';
import { css } from '@emotion/react';

const meta: Meta<EuiResizablePanelProps> = {
  title: 'Layout/EuiResizableContainer/EuiResizablePanel',
  component: EuiResizablePanel,
  argTypes: {
    mode: {
      control: 'radio',
      description:
        'For use with collapsible panels. Will only be applied when used within EuiResizableContainer. View EuiResizableContainer stories for an example.',
      options: [undefined, 'collapsible', 'main', 'custom'],
    },
  },
  args: {
    minSize: '0px',
    scrollable: true,
    hasShadow: false,
    borderRadius: 'none',
    color: 'transparent',
    paddingSize: 'm',
    wrapperPadding: 'none',
    // for quicker/easier QA
    grow: false,
    hasBorder: false,
  },
};
disableStorybookControls(meta, ['panelRef']);
moveStorybookControlsToCategory(
  meta,
  [
    'color',
    'borderRadius',
    'grow',
    'hasBorder',
    'hasShadow',
    'paddingSize',
    'panelRef',
  ],
  'EuiPanel props'
);

export default meta;
type Story = StoryObj<EuiResizablePanelProps>;

export const Playground: Story = {
  args: {
    children:
      'Autem vitae quibusdam iure aspernatur nobis. Illo dicta debitis aperiam. Assumenda dicta saepe corrupti tempora.',
    initialSize: 100,
  },
  render: ({ mode, children, ...rest }) => {
    const placeholderMode =
      mode === 'collapsible'
        ? 'main'
        : mode === 'main'
        ? 'collapsible'
        : 'custom';
    return (
      <EuiResizableContainer>
        {(EuiResizablePanel, EuiResizableButton) => (
          <>
            <EuiResizablePanel {...rest} mode={mode}>
              {children}
            </EuiResizablePanel>
            <EuiResizableButton />
            {/* NOTE: using the second panel only to ensure functionality, visually not required  */}
            <EuiResizablePanel
              css={css`
                display: none;
              `}
              {...rest}
              mode={placeholderMode}
              size={0}
            >
              {children}
            </EuiResizablePanel>
          </>
        )}
      </EuiResizableContainer>
    );
  },
};
