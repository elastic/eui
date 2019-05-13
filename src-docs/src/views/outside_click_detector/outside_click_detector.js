import React, { Component } from 'react';

import {
  EuiButton,
  EuiOutsideClickDetector,
  EuiSpacer,
} from '../../../../src/components';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDisabled: false,
    };
  }

  toggleDisabled = () => {
    this.setState(prevState => ({
      isDisabled: !prevState.isDisabled,
    }));
  };

  render() {
    const { isDisabled } = this.state;

    return (
      <div>
        <EuiOutsideClickDetector
          onOutsideClick={() => {
            window.alert('Clicked outside');
          }}
          isDisabled={isDisabled}>
          <div style={{ width: '300px' }}>
            {isDisabled
              ? 'This detector is disabled, so clicking outside will do nothing.'
              : 'Clicking inside here will do nothing, but clicking outside will trigger an alert.'}
          </div>
        </EuiOutsideClickDetector>

        <EuiSpacer size="l" />

        <EuiButton onClick={this.toggleDisabled}>
          {isDisabled ? 'Enable' : 'Disable'} the detector
        </EuiButton>
      </div>
    );
  }
}
