import React, {
  Component,
  Fragment,
} from 'react';

import {
  EuiCheckbox,
  EuiSpacer,
} from '../../../../src/components';

import makeId from '../../../../src/components/form/form_row/make_id';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: false,
    };
  }

  onChange = e => {
    this.setState({
      checked: e.target.checked,
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
          label="I am a disabled checkbox"
          checked={this.state.checked}
          onChange={this.onChange}
          disabled
        />
      </Fragment>
    );
  }
}
