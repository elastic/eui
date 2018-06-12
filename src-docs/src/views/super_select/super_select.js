import React, {
  Component,
  Fragment,
} from 'react';

import {
  EuiSuperSelect,
  EuiSpacer,
  EuiText,
  EuiIcon,
} from '../../../../src/components';

export default class extends Component {
  constructor(props) {
    super(props);

    this.options = [
      {
        value: 'option_one',
        inputDisplay: 'Option one',
        dropdownDisplay: (
          <Fragment>
            <strong>Option one</strong>
            <EuiSpacer size="xs" />
            <EuiText size="s" color="subdued">
              <p className="euiTextColor--subdued">Has a short description giving more detail to the option.</p>
            </EuiText>
          </Fragment>
        ),
      },
      {
        value: 'option_two',
        inputDisplay: (
          <span>
            <EuiIcon type="alert" /> Option two
          </span>
        ),
        dropdownDisplay: (
          <Fragment>
            <strong>Option two</strong>
            <EuiSpacer size="xs" />
            <EuiText size="s" color="subdued">
              <p className="euiTextColor--subdued">Has a short description giving more detail to the option.</p>
            </EuiText>
          </Fragment>
        ),
      },
      {
        value: 'option_three',
        inputDisplay: 'Option three has a super long text to see if it will truncate or what',
        dropdownDisplay: (
          <Fragment>
            <strong>Option three</strong>
            <EuiSpacer size="xs" />
            <EuiText size="s" color="subdued">
              <p className="euiTextColor--subdued">Has a short description giving more detail to the option.</p>
            </EuiText>
          </Fragment>
        ),
      },
    ];

    this.state = {
      value: this.options[1].value,
    };
  }

  onChange = (value) => {
    this.setState({
      value: value,
    });
  };

  render() {
    return (
      <Fragment>
        <EuiSuperSelect
          options={this.options}
          valueOfSelected={this.state.value}
          onChange={this.onChange}
          hasDividers
          aria-label="Use aria labels when no actual label is in use"
        />

        <EuiSpacer size="m" />

        <EuiSuperSelect
          options={this.options}
          valueOfSelected={this.state.value}
          onChange={this.onChange}
          disabled
          aria-label="Use aria labels when no actual label is in use"
        />

        <EuiSpacer size="m" />

        <EuiSuperSelect
          options={this.options}
          valueOfSelected={this.state.value}
          onChange={this.onChange}
          isLoading
          aria-label="Use aria labels when no actual label is in use"
        />

        <EuiSpacer size="m" />

        <EuiSuperSelect
          options={this.options}
          valueOfSelected={this.state.value}
          onChange={this.onChange}
          isLoading
          disabled
          aria-label="Use aria labels when no actual label is in use"
        />

        <EuiSpacer size="m" />

        <EuiSuperSelect
          options={this.options}
          valueOfSelected={this.state.value}
          onChange={this.onChange}
          compressed
        />
      </Fragment>
    );
  }
}
