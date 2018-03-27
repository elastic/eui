import React, {
  Component,
  Fragment,
} from 'react';

import {
  EuiSwitch,
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
        <EuiSwitch
          id={makeId()}
          label="I am a switch"
          checked={this.state.checked}
          onChange={this.onChange}
        />

        <EuiSpacer size="m" />

        <EuiSwitch
          id={makeId()}
          label="I am a disabled switch"
          checked={this.state.checked}
          onChange={this.onChange}
          disabled
        />
      </Fragment>
    );
  }
}
