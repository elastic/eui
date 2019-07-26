import React, { Component, Fragment } from 'react';

import { EuiSuperSelect, EuiSpacer } from '../../../../src/components';

export default class extends Component {
  constructor(props) {
    super(props);

    this.options = [
      {
        value: 'option_one',
        inputDisplay: 'Option one',
        disabled: true,
        'data-test-subj': 'option one',
      },
      {
        value: 'option_two',
        inputDisplay: 'Option two',
      },
      {
        value: 'option_three',
        inputDisplay: (
          <span className="eui-textTruncate eui-displayBlock">
            Option three has a super long text and added truncation
          </span>
        ),
      },
    ];

    this.state = {
      value: this.options[1].value,
    };
  }

  onChange = value => {
    this.setState({
      value: value,
    });
  };

  render() {
    return (
      <Fragment>
        <EuiSuperSelect
          compressed
          options={this.options}
          valueOfSelected={this.state.value}
          onChange={this.onChange}
        />

        <EuiSpacer size="m" />

        <EuiSuperSelect
          compressed
          options={this.options}
          valueOfSelected={this.state.value}
          onChange={this.onChange}
          disabled
        />

        <EuiSpacer size="m" />

        <EuiSuperSelect
          compressed
          options={this.options}
          valueOfSelected={this.state.value}
          onChange={this.onChange}
          isLoading
        />

        <EuiSpacer size="m" />

        <EuiSuperSelect
          compressed
          options={this.options}
          valueOfSelected={this.state.value}
          onChange={this.onChange}
          isLoading
          disabled
        />

        <EuiSpacer size="m" />

        <EuiSuperSelect
          options={this.options}
          valueOfSelected={this.state.value}
          onChange={this.onChange}
          compressed
        />

        <EuiSpacer size="m" />

        <EuiSuperSelect
          compressed
          options={this.options}
          valueOfSelected={this.state.value}
          onChange={this.onChange}
          isInvalid
        />

        <EuiSpacer size="m" />

        <EuiSuperSelect
          compressed
          options={this.options}
          valueOfSelected={this.state.value}
          onChange={this.onChange}
          fullWidth
        />
      </Fragment>
    );
  }
}
