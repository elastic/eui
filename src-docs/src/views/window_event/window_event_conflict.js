import React from 'react';

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

class ConflictModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: '',
    };
  }

  updateInputValue = e => this.setState({ inputValue: e.target.value });

  clearInputValueOnEscape = e => {
    if (e.key === 'Escape') {
      this.setState({ inputValue: '' });
      e.stopPropagation();
    }
  };

  render() {
    return (
      <EuiOverlayMask>
        <EuiModal onClose={this.props.onClose} style={{ width: '800px' }}>
          <EuiModalHeader>
            <EuiModalHeaderTitle>Example modal</EuiModalHeaderTitle>
          </EuiModalHeader>
          <EuiModalBody>
            <EuiFieldText
              value={this.state.inputValue}
              onChange={this.updateInputValue}
              onKeyDown={this.clearInputValueOnEscape}
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
  }
}

export const WindowEventConflict = () => (
  <ModalExample
    modal={ConflictModal}
    buttonText="Open Modal with Conflicting Listener"
  />
);
