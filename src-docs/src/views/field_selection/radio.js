import React, {
  Component,
} from 'react';

import {
  EuiRadio,
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
      <EuiRadio
        id={makeId()}
        label="I am a radio"
        checked={this.state.checked}
        onChange={this.onChange}
      />
    );
  }
}
