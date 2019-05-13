import React, { Component, Fragment } from 'react';

import { EuiCheckbox, EuiSpacer } from '../../../../src/components';

import makeId from '../../../../src/components/form/form_row/make_id';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: false,
      indeterminate: true,
    };
  }

  onChange = e => {
    this.setState({
      checked: e.target.checked,
    });
  };

  onChangeIndeterminate = () => {
    this.setState({
      indeterminate: !this.state.indeterminate,
    });
  };

  render() {
    return (
      <Fragment>
        <EuiCheckbox
          id={makeId()}
          label="I am a checkbox"
          checked={this.state.checked}
          onChange={this.onChange}
        />

        <EuiSpacer size="m" />

        <EuiCheckbox
          id={makeId()}
          label="I am an indeterminate checkbox"
          indeterminate={this.state.indeterminate}
          onChange={this.onChangeIndeterminate}
        />

        <EuiSpacer size="m" />

        <EuiCheckbox
          id={makeId()}
          label="I am a disabled checkbox"
          checked={this.state.checked}
          onChange={this.onChange}
          disabled
        />

        <EuiSpacer size="m" />

        <EuiCheckbox
          id={makeId()}
          label="I am a compressed checkbox"
          checked={this.state.checked}
          onChange={this.onChange}
          compressed
        />
      </Fragment>
    );
  }
}
