import React, { Component } from 'react';

import {
  EuiButtonEmpty,
  EuiIcon,
  EuiSpacer,
  EuiSuggestInput,
} from '../../../../src/components';

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
    const hashtag = (
      <EuiButtonEmpty iconType="arrowDown" iconSide="right">
        <EuiIcon type="number" />
      </EuiButtonEmpty>
    );

    return (
      <div>
        {statusList.map((item, index) => (
          <div>
            <EuiSuggestInput
              onChange={this.onChange}
              value={this.state.value}
              key={index}
              status={item}
              action={hashtag}
              label={'KQL'}
            />
            <EuiSpacer size="m" />
          </div>
        ))}
      </div>
    );
  }
}
