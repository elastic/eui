import React, { useState } from 'react';
import {
  euiPaletteColorBlind,
  euiPaletteForStatus,
  euiPaletteForTemperature,
  euiPaletteComplimentary,
  euiPaletteNegative,
  euiPalettePositive,
  euiPaletteCool,
  euiPaletteWarm,
  euiPaletteGray,
} from '../../../../src/services/color';

import {
  EuiColorPaletteDisplay,
  EuiColorPalettePicker,
  EuiFormRow,
  EuiSpacer,
  EuiTitle,
  EuiFlexGroup,
  EuiFlexItem,
  EuiButtonIcon,
  EuiPopover,
  EuiRange,
  EuiSwitch,
  EuiCode,
  EuiButtonEmpty
} from '../../../../src/components/';

const paletteWithStops = [
  {
    stop: 100,
    color: 'white',
  },
  {
    stop: 250,
    color: 'lightgray',
  },
  {
    stop: 320,
    color: 'gray',
  },
  {
    stop: 470,
    color: 'black',
  },
];

const paletteData = {
  euiPaletteForStatus,
  euiPaletteForTemperature,
  euiPaletteComplimentary,
  euiPaletteNegative,
  euiPalettePositive,
  euiPaletteCool,
  euiPaletteWarm,
  euiPaletteGray,
};

const paletteNames = Object.keys(paletteData);

export default () => {
  const [palette, setPalette] = useState("1");
  const [categories, setCategories] = useState(5);
  const [selectionType, setSelectionType] = useState(true);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const onChange = (e) => {
    setCategories(parseInt(e.target.value));
  };

  const palettes = paletteNames.map((paletteName, index) => {
    return {
      value: String(index + 1),
      title: paletteName,
      palette: paletteData[paletteNames[index]](categories),
      type: selectionType ? 'fixed' : 'gradient',
    };
  });
 
  const selectedPalette = paletteData[paletteNames[palette - 1]](categories);

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
      Customize    
    </EuiButtonEmpty>
  );

  return (
    <>
      <EuiTitle size="xxxs">
        <h4>Fixed</h4>
      </EuiTitle>
      <EuiSpacer size="s" />
      <EuiColorPaletteDisplay type="fixed" palette={euiPaletteColorBlind()} />
      <EuiSpacer />
      <EuiTitle size="xxxs">
        <h4>Gradient</h4>
      </EuiTitle>
      <EuiSpacer size="s" />
      <EuiColorPaletteDisplay
        type="gradient"
        palette={euiPaletteColorBlind()}
      />
      <EuiSpacer />
      <EuiTitle size="xxxs">
        <h4>Fixed with stops</h4>
      </EuiTitle>
      <EuiSpacer size="s" />
      <EuiColorPaletteDisplay type="fixed" palette={paletteWithStops} />
      <EuiSpacer />
      <EuiTitle size="xxxs">
        <h4>Gradient with stops</h4>
      </EuiTitle>
      <EuiSpacer size="s" />
      <EuiColorPaletteDisplay type="gradient" palette={paletteWithStops} />
      <EuiSpacer />
      <EuiTitle size="xxs">
        <h4>Complex example</h4>
      </EuiTitle>
      <EuiSpacer size="xs" />
      <EuiFlexGroup alignItems="center" gutterSize="xs">
        <EuiFlexItem>
          <EuiColorPaletteDisplay
            type={selectionType ? 'fixed' : 'gradient'}
            palette={selectedPalette}
          />
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiPopover
            ownFocus
            button={button}
            isOpen={isPopoverOpen}
            closePopover={closePopover}>
            <EuiFormRow label="Palette">
              <EuiColorPalettePicker
                style={{ width: 300 }}
                palettes={palettes}
                onChange={setPalette}
                valueOfSelected={palette}
                selectionDisplay="title"
                compressed
              />
            </EuiFormRow>
            <EuiFormRow label="Stops">
              <EuiRange
                value={categories}
                onChange={onChange}
                min={1}
                max={10}
                compressed
                showValue
              />
            </EuiFormRow>
            <EuiFormRow>
              <EuiSwitch
                label={
                  <span>
                    Display palette as <EuiCode>fixed</EuiCode>
                  </span>
                }
                checked={selectionType}
                onChange={() => setSelectionType(!selectionType)}
                compressed
              />
            </EuiFormRow>
          </EuiPopover>
        </EuiFlexItem>
      </EuiFlexGroup>
    </>
  );
};
