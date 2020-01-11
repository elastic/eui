import React, { Component, Fragment } from 'react';

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
  EuiSuperSelect,
  EuiSpacer,
  EuiText,
} from '../../../../src/components';

import makeId from '../../../../src/components/form/form_row/make_id';

export class Modal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalVisible: false,
      isSwitchChecked: true,
      value: 'option_one',
    };

    this.closeModal = this.closeModal.bind(this);
    this.showModal = this.showModal.bind(this);

    this.options = [
      {
        value: 'option_one',
        inputDisplay: 'Option one',
        dropdownDisplay: (
          <Fragment>
            <strong>Option one</strong>
            <EuiText size="s" color="subdued">
              <p className="euiTextColor--subdued">
                Has a short description giving more detail to the option.
              </p>
            </EuiText>
          </Fragment>
        ),
      },
      {
        value: 'option_two',
        inputDisplay: 'Option two',
        dropdownDisplay: (
          <Fragment>
            <strong>Option two</strong>
            <EuiText size="s" color="subdued">
              <p className="euiTextColor--subdued">
                Has a short description giving more detail to the option.
              </p>
            </EuiText>
          </Fragment>
        ),
      },
      {
        value: 'option_three',
        inputDisplay: 'Option three',
        dropdownDisplay: (
          <Fragment>
            <strong>Option three</strong>
            <EuiText size="s" color="subdued">
              <p className="euiTextColor--subdued">
                Has a short description giving more detail to the option.
              </p>
            </EuiText>
          </Fragment>
        ),
      },
    ];
  }

  onSwitchChange = () => {
    this.setState({
      isSwitchChecked: !this.state.isSwitchChecked,
    });
  };

  onSelectChange = value => {
    this.setState({ value });
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
          <EuiSuperSelect
            options={this.options}
            valueOfSelected={this.state.value}
            onChange={this.onChange}
            itemLayoutAlign="top"
            hasDividers
          />
        </EuiFormRow>

        <EuiSpacer />

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
