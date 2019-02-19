import React, { Component } from 'react';

import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiFormRow,
  EuiFieldText,
  EuiFieldEmpty,
} from '../../../../src/components/';

export default class InlineFieldEmptyExample extends Component {
  state = {
    firstNumber: 0,
    secondNumber: 0
  }

  render() {
    return (
      <EuiFlexGroup style={{ maxWidth: 600 }}>
        <EuiFlexItem>
          <EuiFormRow label="First number" helpText="I am helpful help text!">
            <EuiFieldText onBlur={(e)=>this.setState({ firstNumber: parseInt(e.target.value) })} />
          </EuiFormRow>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiFormRow label="Second number">
            <EuiFieldText onBlur={(e)=>this.setState({ secondNumber: parseInt(e.target.value) })} />
          </EuiFormRow>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiFormRow label="Result">
            <EuiFieldEmpty>
              {this.state.firstNumber * this.state.secondNumber}
            </EuiFieldEmpty>
          </EuiFormRow>
        </EuiFlexItem>
      </EuiFlexGroup>
    );
  }
}
