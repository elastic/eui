import React, { Component } from 'react';

import {
  EuiButton,
  EuiButtonEmpty,
  EuiFieldText,
  EuiForm,
  EuiFormRow,
  EuiModal,
  EuiModalBody,
  EuiModalFooter,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiOverlayMask,
  EuiRange,
  EuiSwitch,
  EuiCodeBlock,
} from '../../../../src/components';

import SuperSelectComplexExample from '../super_select/super_select_complex';

import makeId from '../../../../src/components/form/form_row/make_id';

export class Modal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalVisible: false,
      isSwitchChecked: true,
    };

    this.closeModal = this.closeModal.bind(this);
    this.showModal = this.showModal.bind(this);
  }

  onSwitchChange = () => {
    this.setState({
      isSwitchChecked: !this.state.isSwitchChecked,
    });
  };

  closeModal() {
    this.setState({ isModalVisible: false });
  }

  showModal() {
    this.setState({ isModalVisible: true });
  }

  render() {
    const formSample = (
      <EuiForm>
        <EuiFormRow>
          <EuiSwitch
            id={makeId()}
            name="popswitch"
            label="Isn't this modal form cool?"
            checked={this.state.isSwitchChecked}
            onChange={this.onSwitchChange}
          />
        </EuiFormRow>

        <EuiFormRow label="A text field">
          <EuiFieldText name="popfirst" />
        </EuiFormRow>

        <EuiFormRow label="Range" helpText="Some help text for the range">
          <EuiRange min={0} max={100} name="poprange" />
        </EuiFormRow>

        <EuiFormRow label="A SuperSelect field">
          <SuperSelectComplexExample />
        </EuiFormRow>

        <EuiCodeBlock language="html" paddingSize="s" isCopyable>
          {'<h1>Title</h1>'}
        </EuiCodeBlock>
      </EuiForm>
    );

    let modal;

    if (this.state.isModalVisible) {
      modal = (
        <EuiOverlayMask>
          <EuiModal onClose={this.closeModal} initialFocus="[name=popswitch]">
            <EuiModalHeader>
              <EuiModalHeaderTitle>Modal title</EuiModalHeaderTitle>
            </EuiModalHeader>

            <EuiModalBody>{formSample}</EuiModalBody>

            <EuiModalFooter>
              <EuiButtonEmpty onClick={this.closeModal}>Cancel</EuiButtonEmpty>

              <EuiButton onClick={this.closeModal} fill>
                Save
              </EuiButton>
            </EuiModalFooter>
          </EuiModal>
        </EuiOverlayMask>
      );
    }
    return (
      <div>
        <EuiButton onClick={this.showModal}>Show Modal</EuiButton>

        {modal}
      </div>
    );
  }
}
