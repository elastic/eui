import React, { Component } from 'react';

import { EuiSuperSelect } from '../../../../src/components';
import { DisplayToggles } from '../form_controls/display_toggles';

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
      /* DisplayToggles wrapper for Docs only */
      <DisplayToggles>
        <EuiSuperSelect
          options={this.options}
          valueOfSelected={this.state.value}
          onChange={this.onChange}
        />
      </DisplayToggles>
    );
  }
}
