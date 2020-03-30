import React, { useState } from 'react';

import {
  EuiColorPalettePicker,
  EuiFormRow,
  EuiButtonIcon,
  EuiToolTip,
  EuiModal,
  EuiModalBody,
  EuiModalFooter,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiOverlayMask,
  EuiButton,
  EuiButtonEmpty,
  EuiColorStops,
} from '../../../../src/components';

import {
  euiPaletteColorBlind,
  euiPaletteComplimentary,
  euiPaletteForStatus,
  euiPaletteForTemperature,
  euiPaletteCool,
  euiPaletteGray,
  useColorStopsState,
} from '../../../../src/services';

const basicExample = [
  {
    value: 'basicExample1',
    title: 'EUI basicPalette Cool',
    palette: euiPaletteCool(),
    type: 'stops',
  },
  {
    value: 'basicExample2',
    title: 'Paul Tor 14',
    palette: euiPaletteColorBlind(2),
    type: 'stops',
  },
  {
    value: 'basicExample3',
    title: 'EUI basicPalette for Status',
    palette: euiPaletteForStatus(),
    type: 'stops',
  },
  {
    value: 'basicExample4',
    title: 'Liner Gradient',
    palette:
      'linear-gradient(to right, rgb(0, 104, 55) 0%, rgb(45, 161, 84) 14%, rgb(134, 203, 102) 28%, rgb(205, 233, 131) 42%, rgb(255, 254, 189) 57%, rgb(253, 210, 127) 71%, rgb(248, 139, 81) 85%, rgb(164, 0, 37) 100%)',
    type: 'gradient',
  },
  // {
  //   title: 'Custom Option',
  //   type: 'button',
  // },
];

const customExample = [
  {
    value: 'customExample1',
    title: 'EUI basicPalette Color Blind',
    palette: euiPaletteColorBlind(),
    type: 'stops',
  },
  {
    value: 'customExample2',
    title: 'EUI basicPalette Complimentary',
    palette: euiPaletteComplimentary(2),
    type: 'stops',
  },
  {
    value: 'customExample3',
    title: 'EUI basicPalette for Temperature',
    palette: euiPaletteForTemperature(),
    type: 'stops',
  },
  {
    value: 'customExample4',
    title: 'EUI basicPalette Gray',
    palette: euiPaletteGray(),
    type: 'stops',
  },
];

export const ColorPalettePicker = () => {
  const [basicPalette, setBasicPalette] = useState('basicExample1');
  const [customPalette, setCustomPalette] = useState('customExample1');
  const [colorStops, setColorStops] = useColorStopsState(true);
  const [isShowing, setIsShowing] = useState(false);

  const onBasicPaletteChange = value => {
    setBasicPalette(value);
  };

  const onCustomPaletteChange = value => {
    setCustomPalette(value);
  };

  const toggleModal = () => {
    setIsShowing(!isShowing);
  };

  const customPaletteAppend = (
    <EuiToolTip position="top" content="Custom basicPalette">
      <EuiButtonIcon
        iconType="gear"
        color="text"
        aria-label="Custom palette"
        onClick={toggleModal}
      />
    </EuiToolTip>
  );

  const newCustomPaletteArray = colorStops.map(item => item.color);

  const extendedCustomExample = customExample.concat({
    value: 'customExample5',
    title: 'Custom basicPalette',
    palette: newCustomPaletteArray,
    type: 'stops',
  });

  const saveAndCloseModal = () => {
    setCustomPalette(
      extendedCustomExample[extendedCustomExample.length - 1].value
    );
    toggleModal();
  };

  let modal;

  if (isShowing) {
    modal = (
      <EuiOverlayMask>
        <EuiModal onClose={toggleModal} initialFocus="[name=popswitch]">
          <EuiModalHeader>
            <EuiModalHeaderTitle>Custom Palette</EuiModalHeaderTitle>
          </EuiModalHeader>

          <EuiModalBody>
            <EuiFormRow label="Fixed color segments">
              <EuiColorStops
                label="Fixed color segments"
                onChange={setColorStops}
                colorStops={colorStops}
                min={0}
                max={100}
                stopType="fixed"
              />
            </EuiFormRow>
          </EuiModalBody>

          <EuiModalFooter>
            <EuiButtonEmpty onClick={toggleModal}>Cancel</EuiButtonEmpty>

            <EuiButton onClick={saveAndCloseModal} fill>
              Save and Apply
            </EuiButton>
          </EuiModalFooter>
        </EuiModal>
      </EuiOverlayMask>
    );
  }

  return (
    <>
      <EuiFormRow label="Basic palette picker">
        <EuiColorPalettePicker
          palettes={basicExample}
          onChange={onBasicPaletteChange}
          valueOfSelected={basicPalette}
        />
      </EuiFormRow>
      <EuiFormRow label="Palette picker with one custom palette">
        <EuiColorPalettePicker
          palettes={extendedCustomExample}
          onChange={onCustomPaletteChange}
          valueOfSelected={customPalette}
          append={customPaletteAppend}
          compressed
        />
      </EuiFormRow>
      {modal}
    </>
  );
};
