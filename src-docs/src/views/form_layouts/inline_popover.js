import React, { Component } from 'react';

import {
  EuiButton,
  EuiPopover,
  EuiForm,
  EuiFormRow,
  EuiFieldText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFieldNumber,
  EuiRange,
  EuiSwitch,
} from '../../../../src/components';

import makeId from '../../../../src/components/form/form_row/make_id';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isPopoverOpen: false,
      isSwitchChecked: true,
      isPopover2Open: false,
      isSwitch2Checked: true,
    };
  }

  onSwitchChange = () => {
    this.setState({
      isSwitchChecked: !this.state.isSwitchChecked,
    });
  };

  onButtonClick = () => {
    this.setState({
      isPopoverOpen: !this.state.isPopoverOpen,
    });
  };

  closePopover = () => {
    this.setState({
      isPopoverOpen: false,
    });
  };

  onSwitch2Change = () => {
    this.setState({
      isSwitch2Checked: !this.state.isSwitch2Checked,
    });
  };

  onButton2Click = () => {
    this.setState({
      isPopover2Open: !this.state.isPopover2Open,
    });
  };

  closePopover2 = () => {
    this.setState({
      isPopover2Open: false,
    });
  };

  render() {
    const button = (
      <EuiButton
        iconSide="right"
        fill
        iconType="arrowDown"
        onClick={this.onButtonClick}>
        Inline form in a popover
      </EuiButton>
    );

    const formSample = (
      <EuiForm>
        <EuiFlexGroup>
          <EuiFlexItem grow={false} style={{ width: 100 }}>
            <EuiFormRow label="Age">
              <EuiFieldNumber max={10} placeholder={42} />
            </EuiFormRow>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiFormRow label="Full name">
              <EuiFieldText icon="user" placeholder="John Doe" />
            </EuiFormRow>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiFormRow hasEmptyLabelSpace>
              <EuiButton>Save</EuiButton>
            </EuiFormRow>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiForm>
    );

    const button2 = (
      <EuiButton
        iconSide="right"
        fill
        iconType="arrowDown"
        onClick={this.onButton2Click}>
        Vertical form in a popover
      </EuiButton>
    );

    const formSample2 = (
      <EuiForm>
        <EuiFormRow>
          <EuiSwitch
            id={makeId()}
            name="popswitch"
            label="Isn't this popover form cool?"
            checked={this.state.isSwitch2Checked}
            onChange={this.onSwitch2Change}
          />
        </EuiFormRow>

        <EuiFormRow label="A text field">
          <EuiFieldText name="popfirst" />
        </EuiFormRow>

        <EuiFormRow label="Range" helpText="Some help text for the range">
          <EuiRange min={0} max={100} name="poprange" />
        </EuiFormRow>
        <EuiButton fullWidth>Save</EuiButton>
      </EuiForm>
    );

    return (
      <div>
        <EuiPopover
          id="inlineFormPopover"
          ownFocus
          button={button}
          isOpen={this.state.isPopoverOpen}
          closePopover={this.closePopover.bind(this)}>
          <div style={{ width: 500 }}>{formSample}</div>
        </EuiPopover>
        &emsp;
        <EuiPopover
          id="formPopover"
          ownFocus
          button={button2}
          isOpen={this.state.isPopover2Open}
          closePopover={this.closePopover2.bind(this)}>
          <div style={{ width: '300px' }}>{formSample2}</div>
        </EuiPopover>
      </div>
    );
  }
}
