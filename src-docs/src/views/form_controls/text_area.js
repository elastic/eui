import React, {
  Component,
  Fragment,
} from 'react';

import {
  EuiTextArea,
  EuiSpacer,
} from '../../../../src/components';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
    };
  }

  onChange = e => {
    this.setState({
      value: e.target.value,
    });
  };

  render() {
    return (
      <Fragment>
        <EuiTextArea
          placeholder="Placeholder text"
          value={this.state.value}
          onChange={this.onChange}
        />

        <EuiSpacer size="m" />

        <EuiTextArea
          placeholder="Disabled"
          value={this.state.value}
          onChange={this.onChange}
          disabled
        />

        <EuiSpacer size="m" />

        <EuiTextArea
          placeholder="Read-only"
          value={this.state.value}
          onChange={this.onChange}
          readOnly
        />
      </Fragment>
    );
  }
}
