import React, { Component } from 'react';

import {
  EuiBadge,
  EuiButton,
  EuiFocusTrap,
  EuiPanel,
  EuiSpacer,
  EuiText,
} from '../../../../src/components';

import FormExample from '../form_layouts/form_compressed';

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
        <EuiBadge>Trap is {isDisabled ? 'disabled' : 'enabled'}</EuiBadge>
        <EuiSpacer size="s" />
        <EuiFocusTrap disabled={isDisabled}>
          <EuiPanel>
            <FormExample />

            <EuiSpacer size="m" />

            <EuiButton onClick={this.toggleDisabled}>
              {`${!isDisabled ? 'Disable' : 'Enable'} Focus Trap`}
            </EuiButton>
          </EuiPanel>
        </EuiFocusTrap>

        <EuiSpacer size="l" />

        <EuiText>
          The button below is not focusable by keyboard as long as the focus
          trap is enabled.
        </EuiText>

        <EuiButton onClick={() => alert('External event triggered')}>
          External Focusable Element
        </EuiButton>
      </div>
    );
  }
}
