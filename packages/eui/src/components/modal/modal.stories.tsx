/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { MouseEvent, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { EuiButton, EuiButtonEmpty } from '../button';
import { EuiFieldText, EuiForm, EuiFormRow } from '../form';

import { EuiModalHeader } from './modal_header';
import { EuiModalHeaderTitle } from './modal_header_title';
import { EuiModalBody } from './modal_body';
import { EuiModalFooter } from './modal_footer';
import { EuiModal, EuiModalProps } from './modal';
import { LOKI_SELECTORS } from '../../../.storybook/loki';

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
  parameters: {
    loki: {
      // Modal is rendered in a portal
      chromeSelector: LOKI_SELECTORS.portal,
    },
  },
};

export default meta;
type Story = StoryObj<EuiModalProps>;

const onClose = action('onClose');

export const Playground: Story = {
  args: {
    children: (
      <>
        <EuiModalHeader>
          <EuiModalHeaderTitle>Modal title</EuiModalHeaderTitle>
        </EuiModalHeader>

        <EuiModalBody>Modal body</EuiModalBody>

        <EuiModalFooter>
          <EuiButton fill>Modal footer</EuiButton>
        </EuiModalFooter>
      </>
    ),
  },
};

export const ToggleExample: Story = {
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
  render: (args) => <StatefulModal {...args} />,
};

export const InitialFocus: Story = {
  args: {
    initialFocus: '[name=popfirst]',
  },
  render: (args) => {
    const handleOnSubmit = (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      action('onSubmit')();
    };
    return (
      <StatefulModal aria-labelledby="modalTitleId" {...args}>
        <EuiModalHeader>
          <EuiModalHeaderTitle id="modalTitleId">
            Modal title
          </EuiModalHeaderTitle>
        </EuiModalHeader>

        <EuiModalBody>
          <EuiForm id="modalFormId" component="form">
            <EuiFormRow label="A text field">
              <EuiFieldText name="popfirst" />
            </EuiFormRow>
          </EuiForm>
        </EuiModalBody>

        <EuiModalFooter>
          <EuiButtonEmpty onClick={action('onCancel')}>Cancel</EuiButtonEmpty>

          <EuiButton
            type="submit"
            form="modalFormId"
            fill
            onClick={handleOnSubmit}
          >
            Save
          </EuiButton>
        </EuiModalFooter>
      </StatefulModal>
    );
  },
};

/* Story content components */

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
