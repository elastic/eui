import React from 'react';

import {
  EuiButton,
  EuiControlBar,
  EuiFlexGroup,
} from '../../../../src/components';
import { keyCodes } from '../../../../src/services';
import { EuiFocusTrap } from '../../../../src/components/focus_trap';

export class ControlBarMobile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contentIsVisible: false,
      isFullScreen: false,
      tabContent: '',
    };
  }

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
        id: 'icon',
        controlType: 'icon',
        label: 'folder',
        iconType: 'folderClosed',
        className: 'eui-hideFor--m eui-hideFor--l eui-hideFor--xl',
      },
      {
        id: 'current_file_path',
        label: 'breadcrumbs',
        controlType: 'breadcrumbs',
        responsive: true,
        className: 'eui-hideFor--s eui-hideFor--xs',
        breadcrumbs: [
          {
            text: 'src',
          },
          {
            text: 'components',
          },
        ],
      },
      {
        controlType: 'spacer',
      },
      {
        id: 'github_icon',
        controlType: 'icon',
        iconType: 'logoGithub',
      },
      {
        id: 'github_text',
        controlType: 'text',
        label: 'Open in Github',
      },
    ];

    let fullScreenDisplay;

    if (this.state.isFullScreen) {
      fullScreenDisplay = (
        <EuiFocusTrap>
          <div className="guideDemo__pageOverlay" onKeyDown={this.onKeyDown}>
            <EuiFlexGroup>
              <EuiButton onClick={this.toggleFullScreen.bind(this)}>
                Close
              </EuiButton>
            </EuiFlexGroup>
            <EuiControlBar
              controls={controls}
              showContent={this.state.contentIsVisible}
              showOnMobile
            />
          </div>
        </EuiFocusTrap>
      );
    }

    return (
      <div>
        <EuiButton onClick={this.toggleFullScreen.bind(this)}>
          View mobile example
        </EuiButton>
        {fullScreenDisplay}
      </div>
    );
  }
}
