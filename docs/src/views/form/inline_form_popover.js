import React, {
  Component,
} from 'react';

import {
  EuiButton,
  EuiPopover,
  EuiForm,
  EuiFormRow,
  EuiFieldText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFieldNumber,

} from '../../../../src/components';

function makeId() {
  return Math.random().toString(36).substr(2, 5);
}

const idPrefix = makeId();

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isPopoverOpen: false,
      isSwitchChecked: true,
    };
  }

  onSwitchChange = () => {
    this.setState({
      isSwitchChecked: !this.state.isSwitchChecked,
    });
  }

  onButtonClick = () => {
    this.setState({
      isPopoverOpen: !this.state.isPopoverOpen,
    });
  }

  closePopover = () => {
    this.setState({
      isPopoverOpen: false,
    });
  }

  render() {
    const button = (
      <EuiButton
        iconSide="right"
        fill
        iconType="arrowDown"
        onClick={this.onButtonClick}
      >
        Form in a popover
      </EuiButton>
    );

    const formSample = (
      <EuiForm>
        <EuiFlexGroup>
          <EuiFlexItem grow={false} style={{ width: 100 }}>
            <EuiFormRow label="Age"  id={idPrefix}>
              <EuiFieldNumber max={10} placeholder={42} />
            </EuiFormRow>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiFormRow label="Full name" id={idPrefix}>
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

    return (
      <EuiPopover
        ownFocus
        button={button}
        isOpen={this.state.isPopoverOpen}
        closePopover={this.closePopover.bind(this)}
      >
        <div style={{ width: 500, padding: 16 }}>
          {formSample}
        </div>
      </EuiPopover>
    );
  }
}
