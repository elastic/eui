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

import { EuiButton } from '../button';
import { EuiModalHeader } from './modal_header';
import { EuiModalHeaderTitle } from './modal_header_title';
import { EuiModalBody } from './modal_body';
import { EuiModalFooter } from './modal_footer';
import { EuiModal, EuiModalProps } from './modal';

const meta: Meta<EuiModalProps> = {
  title: 'Layout/EuiModal/EuiModal',
  component: EuiModal,
  argTypes: {
    // TODO: the `maxWidth` prop takes many different types (bool, string, number)
  },
  // Component defaults
  args: {
    role: 'dialog',
    maxWidth: true,
  },
};

export default meta;
type Story = StoryObj<EuiModalProps>;

const onClose = action('onClose');

const StatefulModal = (props: EuiModalProps) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      <EuiButton size="s" onClick={() => setIsOpen(!isOpen)}>
        Toggle Modal
      </EuiButton>
      {isOpen && (
        <EuiModal
          {...props}
          onClose={(...args) => {
            setIsOpen(false);
            onClose(...args);
          }}
        />
      )}
    </>
  );
};

export const Playground: Story = {
  args: {
    children: (
      <>
        <EuiModalHeader>
          <EuiModalHeaderTitle>Modal title</EuiModalHeaderTitle>
        </EuiModalHeader>

        <EuiModalBody>Modal body</EuiModalBody>

        <EuiModalFooter>
          <EuiButton onClick={onClose} fill>
            Modal footer
          </EuiButton>
        </EuiModalFooter>
      </>
    ),
  },
  render: ({ ...args }) => <StatefulModal {...args} />,
};
