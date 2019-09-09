import React from 'react';

import {
  EuiButton,
  EuiControlBar,
  EuiFlexGroup,
  EuiFlexItem,
  EuiLink,
  EuiText,
} from '../../../../src/components';
import { keyCodes } from '../../../../src/services';
import { EuiFocusTrap } from '../../../../src/components/focus_trap';

export class ControlBarWithTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contentIsVisible: false,
      isFullScreen: false,
      tabContent: '',
    };
  }

  soundTheAlarms = () => {
    alert('You clicked a button!');
  };

  closeTheHatch = () => {
    this.setState({
      contentIsVisible: false,
    });
  };

  tabOne = () => {
    this.setState({
      contentIsVisible: true,
      tabContent:
        "Oceanic Airlines Flight 815 was a scheduled flight from Sydney, Australia to Los Angeles, California, United States, on a Boeing 777-200ER. On September 22, 2004 at 4:16 P.M., the airliner, carrying 324 passengers, deviated from its original course and disappeared over the Pacific Ocean. This is the central moment in the series that kicked off its plotline, and marked the chronological beginning of the main characters' adventures on the Island.",
    });
  };

  tabTwo = () => {
    this.setState({
      contentIsVisible: true,
      tabContent:
        'The Others, referred to by the DHARMA Initiative as the Hostiles or the Natives, and also by the tail section survivors of Oceanic Flight 815 as Them, are a group of people living on the Island who were followers of Jacob, intermediated by Richard Alpert. Jacob never showed himself to his people, and they took orders from a succession of leaders including Eloise Hawking, Charles Widmore, Benjamin Linus, and briefly, John Locke.',
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
    const textLink = <EuiLink href="#">src / component / roller.tsx</EuiLink>;

    const controls = [
      {
        id: 'flight_815',
        label: 'Flight 815',
        controlType: 'tab',
        onClick: this.tabOne,
      },
      {
        id: 'the_others',
        label: 'The Others',
        controlType: 'tab',
        onClick: this.tabTwo,
      },
      {
        id: 'sound_the_alarm',
        label: 'Sound the Alarm',
        controlType: 'button',
        onClick: this.soundTheAlarms,
        color: 'danger',
        'data-test-sub': 'look',
        'aria-label': 'this is an aria label',
      },
      {
        id: 'close_the_hatch',
        label: 'Close the Hatch',
        controlType: 'button',
        onClick: this.closeTheHatch,
        classNames: 'customClassName',
        color: 'primary',
      },
      {
        controlType: 'spacer',
      },
      {
        id: 'set_the_timer',
        label: 'Set the Timer',
        controlType: 'icon',
        iconType: 'clock',
        onClick: this.closeTheHatch,
      },
      {
        id: 'some_text',
        label: textLink,
        controlType: 'text',
        onClick: null,
      },
    ];

    let fullScreenDisplay;

    if (this.state.isFullScreen) {
      fullScreenDisplay = (
        <EuiFocusTrap>
          <div
            className="guideDemo__pageOverlay"
            style={{
              padding: '2rem',
              zIndex: '20000',
            }}
            onKeyDown={this.onKeyDown}>
            <EuiFlexGroup>
              <EuiButton onClick={this.toggle.bind(this)}>
                Toggle Content Drawer
              </EuiButton>
              <EuiFlexItem grow />
              <EuiButton onClick={this.toggleFullScreen.bind(this)}>
                Close
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
          View in Full Screen
        </EuiButton>
        {fullScreenDisplay}
      </div>
    );
  }
}
