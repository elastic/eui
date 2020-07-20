import React, { useState } from 'react';

import {
  EuiSwitch,
  EuiDescriptionList,
  EuiSpacer,
} from '../../../../src/components';

import { EuiWindowEvent } from '../../../../src/services';

export const MousePosition = () => {
  const [tracking, setTracking] = useState(false);
  const [coordinates, setCoordinates] = useState({});

  const onSwitchChange = () => {
    setTracking(!tracking);
  };

  const onMouseMove = ({ clientX, clientY }) => {
    setCoordinates({ clientX, clientY });
  };

  const listItems = [
    {
      title: 'Position X',
      description: coordinates.clientX || '??',
    },
    {
      title: 'Position Y',
      description: coordinates.clientY || '??',
    },
  ];
  return (
    <div>
      <EuiSwitch
        label="Track mouse position"
        checked={tracking}
        onChange={onSwitchChange}
      />
      {tracking ? (
        <EuiWindowEvent event="mousemove" handler={onMouseMove} />
      ) : null}
      <EuiSpacer size="l" />
      <EuiDescriptionList listItems={listItems} />
      <EuiSpacer size="xxl" />
    </div>
  );
};
