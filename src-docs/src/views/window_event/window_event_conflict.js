import React, { useState } from 'react';

import {
  EuiModal,
  EuiModalBody,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiOverlayMask,
  EuiFieldText,
  EuiSpacer,
} from '../../../../src/components';

import { ModalExample } from './modal_example_container';

const ConflictModal = props => {
  const [inputValue, setInputValue] = useState('');

  const updateInputValue = e => {
    setInputValue(e.target.value);
  };
  const clearInputValueOnEscape = e => {
    if (e.key === 'Escape') {
      setInputValue('');
      e.stopPropagation();
    }
  };

  return (
    <EuiOverlayMask>
      <EuiModal onClose={props.onClose} style={{ width: '800px' }}>
        <EuiModalHeader>
          <EuiModalHeaderTitle>Example modal</EuiModalHeaderTitle>
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
    </EuiOverlayMask>
  );
};

export const WindowEventConflict = () => (
  <ModalExample
    modal={ConflictModal}
    buttonText="Open Modal with Conflicting Listener"
  />
);
