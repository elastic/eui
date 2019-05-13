import React, { Component } from 'react';

import {
  EuiIcon,
  EuiHeaderSectionItemButton,
  EuiKeyPadMenu,
  EuiKeyPadMenuItem,
  EuiPopover,
} from '../../../../src/components';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };
  }

  onMenuButtonClick = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  closeMenu = () => {
    this.setState({
      isOpen: false,
    });
  };

  render() {
    const button = (
      <EuiHeaderSectionItemButton
        aria-controls="keyPadMenu"
        aria-expanded={this.state.isOpen}
        aria-haspopup="true"
        aria-label="Apps menu"
        onClick={this.onMenuButtonClick}>
        <EuiIcon type="apps" size="m" />
      </EuiHeaderSectionItemButton>
    );

    return (
      <EuiPopover
        id="headerAppMenu"
        ownFocus
        button={button}
        isOpen={this.state.isOpen}
        anchorPosition="downRight"
        closePopover={this.closeMenu}>
        <EuiKeyPadMenu id="keyPadMenu" style={{ width: 288 }}>
          <EuiKeyPadMenuItem label="Discover" href="#">
            <EuiIcon type="discoverApp" size="l" />
          </EuiKeyPadMenuItem>

          <EuiKeyPadMenuItem label="Dashboard" href="#">
            <EuiIcon type="dashboardApp" size="l" />
          </EuiKeyPadMenuItem>

          <EuiKeyPadMenuItem label="Dev Tools" href="#">
            <EuiIcon type="devToolsApp" size="l" />
          </EuiKeyPadMenuItem>

          <EuiKeyPadMenuItem label="Machine Learning" href="#">
            <EuiIcon type="machineLearningApp" size="l" />
          </EuiKeyPadMenuItem>

          <EuiKeyPadMenuItem label="Graph" href="#">
            <EuiIcon type="graphApp" size="l" />
          </EuiKeyPadMenuItem>

          <EuiKeyPadMenuItem label="Visualize" href="#">
            <EuiIcon type="visualizeApp" size="l" />
          </EuiKeyPadMenuItem>

          <EuiKeyPadMenuItem label="Timelion" href="#">
            <EuiIcon type="timelionApp" size="l" />
          </EuiKeyPadMenuItem>
        </EuiKeyPadMenu>
      </EuiPopover>
    );
  }
}
