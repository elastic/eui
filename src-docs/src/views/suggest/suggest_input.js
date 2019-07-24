import React, { Component } from 'react';

import { EuiSpacer, EuiSuggestInput } from '../../../../src/components';

const statusList = ['notYetSaved', 'saved', 'noNewChanges', 'isLoading'];

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
      <div>
        {statusList.map(item => (
          <div>
            <EuiSuggestInput
              onChange={this.onChange}
              value={this.state.value}
              status={item}
              label={'KQL'}
            />
            <EuiSpacer size="m" />
          </div>
        ))}
      </div>
    );
  }
}
