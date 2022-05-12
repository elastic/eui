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
  EuiPopover,
  EuiRange,
  EuiSwitch,
  EuiCode,
  EuiButtonEmpty,
  EuiSelect,
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

const sizes = [
  { value: 'xs', text: 'Extra small' },
  { value: 's', text: 'Small' },
  { value: 'm', text: 'Medium' },
];

export default () => {
  const [palette, setPalette] = useState('1');
  const [categories, setCategories] = useState(5);
  const [selectionType, setSelectionType] = useState(true);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [size, setSize] = useState(sizes[1].value);

  const onChangeSize = (e) => {
    setSize(e.target.value);
  };

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
        <h3>Fixed</h3>
      </EuiTitle>
      <EuiSpacer size="s" />
      <EuiColorPaletteDisplay type="fixed" palette={euiPaletteColorBlind()} />
      <EuiSpacer />
      <EuiTitle size="xxxs">
        <h3>Gradient</h3>
      </EuiTitle>
      <EuiSpacer size="s" />
      <EuiColorPaletteDisplay
        type="gradient"
        palette={euiPaletteColorBlind()}
      />
      <EuiSpacer />
      <EuiTitle size="xxxs">
        <h3>Fixed with stops</h3>
      </EuiTitle>
      <EuiSpacer size="s" />
      <EuiColorPaletteDisplay type="fixed" palette={paletteWithStops} />
      <EuiSpacer />
      <EuiTitle size="xxxs">
        <h3>Gradient with stops</h3>
      </EuiTitle>
      <EuiSpacer size="s" />
      <EuiColorPaletteDisplay type="gradient" palette={paletteWithStops} />
      <EuiSpacer />
      <EuiTitle size="xxxs">
        <h3>Complex example</h3>
      </EuiTitle>
      <EuiSpacer size="xs" />
      <EuiFlexGroup alignItems="center" gutterSize="xs">
        <EuiFlexItem>
          <EuiColorPaletteDisplay
            type={selectionType ? 'fixed' : 'gradient'}
            palette={selectedPalette}
            size={size}
          />
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiPopover
            panelStyle={{ minWidth: 380 }}
            button={button}
            isOpen={isPopoverOpen}
            closePopover={closePopover}
          >
            <EuiFormRow label="Color palette" display="columnCompressed">
              <EuiColorPalettePicker
                palettes={palettes}
                onChange={setPalette}
                valueOfSelected={palette}
                selectionDisplay="title"
                compressed
              />
            </EuiFormRow>
            <EuiFormRow label="Number of stops" display="columnCompressed">
              <EuiRange
                value={categories}
                onChange={onChange}
                min={1}
                max={10}
                compressed
                showValue
              />
            </EuiFormRow>
            <EuiFormRow label="Size" display="columnCompressed">
              <EuiSelect
                options={sizes}
                value={size}
                onChange={(e) => onChangeSize(e)}
                compressed
              />
            </EuiFormRow>
            <EuiFormRow
              label={
                <span>
                  Display <EuiCode>fixed</EuiCode>
                </span>
              }
              display="columnCompressedSwitch"
            >
              <EuiSwitch
                checked={selectionType}
                onChange={() => setSelectionType(!selectionType)}
                compressed
                showLabel={false}
                label="Display as fixed"
              />
            </EuiFormRow>
          </EuiPopover>
        </EuiFlexItem>
      </EuiFlexGroup>
    </>
  );
};
