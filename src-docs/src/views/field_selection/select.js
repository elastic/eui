import React, {
  Component,
} from 'react';

import {
  EuiSelect,
} from '../../../../src/components';

import makeId from '../../../../src/components/form/form_row/make_id';

export default class extends Component {
  constructor(props) {
    super(props);

    this.options = [
      { value: 'option_one', text: 'Option one' },
      { value: 'option_two', text: 'Option two' },
      { value: 'option_three', text: 'Option three' },
    ];

    this.state = {
      value: this.options[1].value,
    };
  }

  onChange = e => {
    this.setState({
      value: e.target.value,
    });
  };

  render() {
    return (
      <EuiSelect
        options={this.options}
        value={this.state.value}
        onChange={this.onChange}
      />
    );
  }
}
