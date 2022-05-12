import React, { useState } from 'react';

import {
  EuiColorStops,
  EuiFormRow,
  EuiRange,
  EuiFlexGroup,
  EuiFlexItem,
  EuiButtonEmpty,
  EuiPopover,
} from '../../../../src/components';

import { useColorStopsState } from '../../../../src/services';

export default () => {
  const [standardColorStops, setStandardColorStops] = useColorStopsState(true);
  const [
    randomColorStops,
    setRandomColorStops,
    addRandomColor,
  ] = useColorStopsState(true);
  const [fixedColorStops, setFixedColorStops] = useColorStopsState(true);
  const [steppedColorStops, setSteppedColorStops] = useColorStopsState(true);
  const [value, setValue] = useState(10);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const [extendedColorStops, setExtendedColorStops] = useState([
    {
      stop: 100,
      color: '#54B399',
    },
    {
      stop: 250,
      color: '#D36086',
    },
    {
      stop: 350,
      color: '#9170B8',
    },
  ]);

  const handleExtendedChange = (colorStops) => {
    setExtendedColorStops(colorStops);
  };

  const [emptyColorStops, setEmptyColorStops] = useState([]);

  const handleEmptyChange = (colorStops) => {
    setEmptyColorStops(colorStops);
  };

  const onButtonClick = () =>
    setIsPopoverOpen((isPopoverOpen) => !isPopoverOpen);
  const closePopover = () => setIsPopoverOpen(false);

  const button = (
    <EuiButtonEmpty
      onClick={onButtonClick}
      iconType="controlsVertical"
      aria-label="Open settings"
      color="text"
      size="xs"
    >
      Steps
    </EuiButtonEmpty>
  );

  return (
    <React.Fragment>
      <EuiFormRow label="Empty start">
        <EuiColorStops
          label="Empty start"
          onChange={handleEmptyChange}
          colorStops={emptyColorStops}
          min={0}
          max={100}
        />
      </EuiFormRow>
      <EuiFormRow label="Standard">
        <EuiColorStops
          label="Standard"
          onChange={setStandardColorStops}
          colorStops={standardColorStops}
          min={0}
          max={100}
        />
      </EuiFormRow>
      <EuiFormRow label="Random new color">
        <EuiColorStops
          label="Random new color"
          onChange={setRandomColorStops}
          colorStops={randomColorStops}
          min={0}
          max={100}
          addColor={addRandomColor}
        />
      </EuiFormRow>
      <EuiFormRow label="Extended range">
        <EuiColorStops
          label="Extended range"
          onChange={handleExtendedChange}
          colorStops={extendedColorStops}
          min={100}
          max={400}
        />
      </EuiFormRow>
      <EuiFormRow label="Fixed color segments">
        <EuiColorStops
          label="Fixed color segments"
          onChange={setFixedColorStops}
          colorStops={fixedColorStops}
          min={0}
          max={100}
          stopType="fixed"
        />
      </EuiFormRow>

      <EuiFormRow label="Stepped color segments">
        <EuiFlexGroup alignItems="center" gutterSize="xs">
          <EuiFlexItem>
            <EuiColorStops
              label="Stepped color segments"
              onChange={setSteppedColorStops}
              colorStops={steppedColorStops}
              stepNumber={value}
              min={0}
              max={100}
              stopType="stepped"
            />
          </EuiFlexItem>

          <EuiFlexItem grow={false}>
            <EuiPopover
              panelStyle={{ minWidth: 380 }}
              button={button}
              isOpen={isPopoverOpen}
              closePopover={closePopover}
            >
              <EuiFormRow label="Number of steps" display="columnCompressed">
                <EuiRange
                  value={value}
                  onChange={(e) => setValue(parseInt(e.target.value))}
                  showInput
                  aria-label="Change the number of steps"
                  min={2}
                  max={20}
                />
              </EuiFormRow>
            </EuiPopover>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiFormRow>
    </React.Fragment>
  );
};
