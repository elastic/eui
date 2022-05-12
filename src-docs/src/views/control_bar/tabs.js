import React, { useState } from 'react';

import { EuiButton, EuiControlBar, EuiText } from '../../../../src/components';

export default () => {
  const [tabContent, setTabContent] = useState('');
  const [isDisplaying, setDisplay] = useState(false);
  const [contentIsVisible, setVisibility] = useState(false);

  const closeTheHatch = () => {
    setVisibility(false);
  };

  const tabOne = () => {
    setVisibility(true);

    setTabContent(
      "Oceanic Airlines Flight 815 was a scheduled flight from Sydney, Australia to Los Angeles, California, United States, on a Boeing 777-200ER. On September 22, 2004 at 4:16 P.M., the airliner, carrying 324 passengers, deviated from its original course and disappeared over the Pacific Ocean. This is the central moment in the series that kicked off its plotline, and marked the chronological beginning of the main characters' adventures on the Island."
    );
  };

  const tabTwo = () => {
    setVisibility(true);

    setTabContent(
      'The Others, referred to by the DHARMA Initiative as the Hostiles or the Natives, and also by the tail section survivors of Oceanic Flight 815 as Them, are a group of people living on the Island who were followers of Jacob, intermediated by Richard Alpert. Jacob never showed himself to his people, and they took orders from a succession of leaders including Eloise Hawking, Charles Widmore, Benjamin Linus, and briefly, John Locke.'
    );
  };

  const toggleDisplay = () => {
    setVisibility(false);

    setDisplay(!isDisplaying);
  };

  const controls = [
    {
      controlType: 'tab',
      id: 'flight_815',
      label: 'Flight 815',
      onClick: tabOne,
    },
    {
      controlType: 'tab',
      id: 'the_others',
      label: 'The Others',
      onClick: tabTwo,
    },
    {
      controlType: 'button',
      id: 'sound_the_alarm',
      label: 'Sound the Alarm',
      onClick: () => {},
      color: 'danger',
      iconType: 'bell',
      'data-test-subj': 'look',
    },
    {
      controlType: 'button',
      id: 'close_the_hatch',
      label: 'Close the Hatch',
      fill: true,
      onClick: closeTheHatch,
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
      onClick: closeTheHatch,
      'aria-label': 'Set the Timer',
    },
  ];

  let display;

  if (isDisplaying) {
    display = (
      <EuiControlBar
        controls={controls}
        size="m"
        showContent={contentIsVisible}
        showOnMobile
      >
        {tabContent !== '' && (
          <div style={{ padding: '1rem' }}>
            <EuiText>{tabContent}</EuiText>
          </div>
        )}
      </EuiControlBar>
    );
  }

  return (
    <div>
      <EuiButton onClick={toggleDisplay}>Toggle tabs example</EuiButton>
      {display}
    </div>
  );
};
