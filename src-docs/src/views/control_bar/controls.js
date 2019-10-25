import React from 'react';

import {
  EuiButton,
  EuiControlBar,
  EuiFlexGroup,
  EuiFlexItem,
  EuiText,
} from '../../../../src/components';
import { keyCodes } from '../../../../src/services';
import { EuiFocusTrap } from '../../../../src/components/focus_trap';

export class Controls extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contentIsVisible: true,
      isFullScreen: true,
      tabContent: '',
    };
  }

  soundTheAlarms = () => {
    alert('You clicked a button!');
  };

  tabOne = () => {
    this.setState({
      contentIsVisible: true,
      tabContent: 'Tab content',
    });
  };

  toggle() {
    this.setState({
      contentIsVisible: !this.state.contentIsVisible,
    });
  }

  toggleFullScreen() {
    this.setState(prevState => ({
      isFullScreen: !prevState.isFullScreen,
      contentIsVisible: false,
    }));
  }

  onKeyDown = event => {
    if (event.keyCode === keyCodes.ESCAPE) {
      event.preventDefault();
      event.stopPropagation();
      this.setState({
        isFullScreen: false,
        contentIsVisible: false,
      });
    }
  };

  render() {
    const controls = [
      {
        controlType: 'button',
        id: 'controls_button',
        label: 'Button',
        onClick: this.soundTheAlarms,
      },
      {
        controlType: 'spacer',
      },
      {
        controlType: 'icon',
        id: 'controls_icon',
        iconType: 'flag',
      },
      {
        controlType: 'divider',
      },
      {
        controlType: 'icon',
        id: 'controls_icon_button',
        iconType: 'bell',
        onClick: this.soundTheAlarms,
        color: 'primary',
      },
      {
        controlType: 'divider',
      },
      {
        controlType: 'text',
        id: 'controls_text',
        label: 'Some text',
      },
      {
        controlType: 'divider',
      },
      {
        controlType: 'tab',
        id: 'controls_tab',
        label: 'Tab',
        onClick: this.tabOne,
      },
      {
        controlType: 'spacer',
      },
      {
        controlType: 'breadcrumbs',
        id: 'controls_breadcrumbs',
        breadcrumbs: [
          {
            text: 'Breadcrumbs',
          },
          {
            text: 'Item',
          },
        ],
      },
    ];

    let fullScreenDisplay;

    if (this.state.isFullScreen) {
      fullScreenDisplay = (
        <EuiFocusTrap>
          <div className="guideDemo__pageOverlay" onKeyDown={this.onKeyDown}>
            <EuiFlexGroup>
              <EuiButton onClick={this.toggle.bind(this)}>
                Toggle content drawer
              </EuiButton>
              <EuiFlexItem grow />
              <EuiButton onClick={this.toggleFullScreen.bind(this)}>
                Close full screen
              </EuiButton>
            </EuiFlexGroup>
            <EuiControlBar
              controls={controls}
              size="m"
              showContent={this.state.contentIsVisible}
              showOnMobile>
              <div style={{ padding: '1rem' }}>
                {this.state.tabContent !== '' ? (
                  <EuiText>{this.state.tabContent}</EuiText>
                ) : (
                  <p>Look at me</p>
                )}
              </div>
            </EuiControlBar>
          </div>
        </EuiFocusTrap>
      );
    }

    return (
      <div>
        <EuiButton onClick={this.toggleFullScreen.bind(this)}>
          View in full screen
        </EuiButton>
        {fullScreenDisplay}
      </div>
    );
  }
}
