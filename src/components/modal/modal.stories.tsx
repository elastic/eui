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

import { useGeneratedHtmlId } from '../../services';
import { EuiButton, EuiButtonEmpty } from '../button';
import {
  EuiFieldText,
  EuiForm,
  EuiFormProps,
  EuiFormRow,
  EuiSwitch,
} from '../form';

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

export const InitialFocus: Story = {
  args: {
    initialFocus: '[name=popswitch]',
  },
  render: (args) => <StatefulFormModal {...args} />,
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

const StatefulFormModal = (props: EuiModalProps) => {
  const { children, ...rest } = props;
  const [isOpen, setIsOpen] = useState(true);
  const modalFormId = useGeneratedHtmlId({ prefix: 'modalForm' });
  const modalTitleId = useGeneratedHtmlId();

  const handleOnClose = () => setIsOpen(false);

  return (
    <>
      <EuiButton size="s" onClick={() => setIsOpen(!isOpen)}>
        Toggle Modal
      </EuiButton>
      {isOpen && (
        <EuiModal
          {...rest}
          onClose={(...args) => {
            setIsOpen(false);
            onClose(...args);
          }}
        >
          <EuiModalHeader>
            <EuiModalHeaderTitle id={modalTitleId}>
              Modal title
            </EuiModalHeaderTitle>
          </EuiModalHeader>

          <EuiModalBody>
            <ExampleForm id={modalFormId} />
          </EuiModalBody>

          <EuiModalFooter>
            <EuiButtonEmpty onClick={handleOnClose}>Cancel</EuiButtonEmpty>

            <EuiButton
              type="submit"
              form={modalFormId}
              onClick={handleOnClose}
              fill
            >
              Save
            </EuiButton>
          </EuiModalFooter>
        </EuiModal>
      )}
    </>
  );
};

const ExampleForm = ({ id }: Partial<EuiFormProps>) => {
  const modalFormSwitchId = useGeneratedHtmlId({ prefix: 'modalFormSwitch' });

  const [isSwitchChecked, setIsSwitchChecked] = useState(true);
  const onSwitchChange = () =>
    setIsSwitchChecked((isSwitchChecked) => !isSwitchChecked);

  return (
    <EuiForm id={id} component="form">
      <EuiFormRow>
        <EuiSwitch
          id={modalFormSwitchId}
          name="popswitch"
          label="Cool modal form"
          checked={isSwitchChecked}
          onChange={onSwitchChange}
        />
      </EuiFormRow>

      <EuiFormRow label="A text field">
        <EuiFieldText name="popfirst" />
      </EuiFormRow>
    </EuiForm>
  );
};
