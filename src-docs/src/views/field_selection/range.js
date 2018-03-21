import React, {
  Component,
} from 'react';

import {
  EuiRange,
} from '../../../../src/components';

import makeId from '../../../../src/components/form/form_row/make_id';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '120',
    };
  }

  onChange = e => {
    this.setState({
      value: e.target.value,
    });
  };

  render() {
    return (
      <EuiRange
        id={makeId()}
        min={100}
        max={200}
        value={this.state.value}
        onChange={this.onChange}
      />
    );
  }
}
