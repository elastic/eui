import React, { useState } from 'react';

import {
  EuiModal,
  EuiModalBody,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiFieldText,
  EuiSpacer,
} from '../../../../src/components';
import { keys } from '../../../../src/services';

import { ModalExample } from './modal_example_container';

const ConflictModal = (props) => {
  const [inputValue, setInputValue] = useState('');

  const updateInputValue = (e) => {
    setInputValue(e.target.value);
  };
  const clearInputValueOnEscape = (event) => {
    if (event.key === keys.ESCAPE) {
      setInputValue('');
      event.stopPropagation();
    }
  };

  return (
    <EuiModal onClose={props.onClose} style={{ width: '800px' }}>
      <EuiModalHeader>
        <EuiModalHeaderTitle>
          <h1>Example modal</h1>
        </EuiModalHeaderTitle>
      </EuiModalHeader>
      <EuiModalBody>
        <EuiFieldText
          value={inputValue}
          onChange={updateInputValue}
          onKeyDown={clearInputValueOnEscape}
        />
        <EuiSpacer size="s" />
        <p>While typing in this field, ESC will clear the field.</p>
        <EuiSpacer size="l" />
        <p>
          Otherwise, the event bubbles up to the window and ESC closes the
          modal.
        </p>
      </EuiModalBody>
    </EuiModal>
  );
};

export const WindowEventConflict = () => (
  <ModalExample
    modal={ConflictModal}
    buttonText="Open Modal with Conflicting Listener"
  />
);
