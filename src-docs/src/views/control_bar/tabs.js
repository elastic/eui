import React from 'react';

import { EuiButton, EuiControlBar, EuiText } from '../../../../src/components';

export class ControlBarWithTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contentIsVisible: false,
      isDisplaying: false,
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

  toggleDisplay = () => {
    this.setState(prevState => ({
      isDisplaying: !prevState.isDisplaying,
      contentIsVisible: false,
    }));
  };

  render() {
    const controls = [
      {
        controlType: 'tab',
        id: 'flight_815',
        label: 'Flight 815',
        onClick: this.tabOne,
      },
      {
        controlType: 'tab',
        id: 'the_others',
        label: 'The Others',
        onClick: this.tabTwo,
      },
      {
        controlType: 'button',
        id: 'sound_the_alarm',
        label: 'Sound the Alarm',
        onClick: this.soundTheAlarms,
        color: 'danger',
        iconType: 'bell',
        'data-test-subj': 'look',
      },
      {
        controlType: 'button',
        id: 'close_the_hatch',
        label: 'Close the Hatch',
        onClick: this.closeTheHatch,
        className: 'customClassName',
        color: 'primary',
      },
      {
        controlType: 'spacer',
      },
      {
        controlType: 'icon',
        id: 'set_the_timer',
        iconType: 'clock',
        onClick: this.closeTheHatch,
        'aria-label': 'Set the Timer',
      },
    ];

    let display;

    if (this.state.isDisplaying) {
      display = (
        <EuiControlBar
          controls={controls}
          size="m"
          showContent={this.state.contentIsVisible}
          showOnMobile>
          {this.state.tabContent !== '' && (
            <div style={{ padding: '1rem' }}>
              <EuiText>{this.state.tabContent}</EuiText>
            </div>
          )}
        </EuiControlBar>
      );
    }

    return (
      <div>
        <EuiButton onClick={this.toggleDisplay}>Toggle tabs example</EuiButton>
        {display}
      </div>
    );
  }
}
