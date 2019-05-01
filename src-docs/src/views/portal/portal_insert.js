import React, { Component } from 'react';

import { EuiPortal, EuiButton } from '../../../../src/components';
import { EuiSpacer } from '../../../../src/components/spacer/spacer';

export class PortalInsert extends Component {
  constructor(props) {
    super(props);

    this.buttonRef = null;

    this.state = {
      isPortalVisible: false,
    };
  }

  setButtonRef = node => (this.buttonRef = node);

  togglePortal = () => {
    this.setState(prevState => ({
      isPortalVisible: !prevState.isPortalVisible,
    }));
  };

  render() {
    let portal;

    if (this.state.isPortalVisible) {
      portal = (
        <EuiPortal insert={{ sibling: this.buttonRef, position: 'after' }}>
          <EuiSpacer />
          <p>This element is appended immediately after the button.</p>
        </EuiPortal>
      );
    }
    return (
      <div>
        <EuiButton onClick={this.togglePortal} buttonRef={this.setButtonRef}>
          Toggle portal
        </EuiButton>
        {portal}
      </div>
    );
  }
}
