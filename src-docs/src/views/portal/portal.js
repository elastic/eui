import React, { Component } from 'react';

import { EuiPortal, EuiButton, EuiBottomBar } from '../../../../src/components';

export class Portal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isPortalVisible: false,
    };

    this.togglePortal = this.togglePortal.bind(this);
  }

  togglePortal() {
    this.setState(prevState => ({
      isPortalVisible: !prevState.isPortalVisible,
    }));
  }

  render() {
    let portal;

    if (this.state.isPortalVisible) {
      portal = (
        <EuiPortal>
          <EuiBottomBar>
            <p>
              This element is appended to the body in the DOM if you inspect
            </p>
          </EuiBottomBar>
        </EuiPortal>
      );
    }
    return (
      <div>
        <EuiButton onClick={this.togglePortal}>Toggle portal</EuiButton>

        {portal}
      </div>
    );
  }
}
