import React, {
  Component,
  Fragment,
} from 'react';

import {
  EuiDualRange,
  EuiSpacer,
} from '../../../../src/components';

import makeId from '../../../../src/components/form/form_row/make_id';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ['', ''],
    };
  }

  onChange = (value) => {
    this.setState({
      value
    });
  };

  render() {
    return (
      <Fragment>

        <EuiDualRange
          id={makeId()}
          min={-100}
          max={200}
          step={10}
          value={this.state.value}
          onChange={this.onChange}
          showLabels
        />

        <EuiSpacer size="xl" />

        <EuiDualRange
          id={makeId()}
          min={-100}
          max={200}
          step={10}
          value={this.state.value}
          onChange={this.onChange}
          showInput
        />
      </Fragment>
    );
  }
}
