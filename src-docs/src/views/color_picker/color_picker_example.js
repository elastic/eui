import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import { EuiCode, EuiColorPicker, EuiText } from '../../../../src/components';

import { ColorPicker } from './color_picker';
const colorPickerSource = require('!!raw-loader!./color_picker');
const colorPickerHtml = renderToHtml(ColorPicker);
const colorPickerSnippet = `<EuiColorPicker
  id={colorPickerId}
  onChange={handleChange}
  color={chosenColor}
  isInvalid={hasErrors}
/>
`;

import { CustomSwatches } from './custom_swatches';
const customSwatchesSource = require('!!raw-loader!./custom_swatches');
const customSwatchesHtml = renderToHtml(CustomSwatches);
const customSwatchesSnippet = `<EuiColorPicker
  id={colorPickerId}
  onChange={handleChange}
  color={chosenColor}
  isInvalid={hasErrors}
  swatches={[
    '#333',
    '#666',
    '#999',
    '#CCC',
  ]}
/>
`;

import { CustomButton } from './custom_button';
const customButtonSource = require('!!raw-loader!./custom_button');
const customButtonHtml = renderToHtml(CustomButton);
const customButtonSnippet = `<EuiColorPicker
  onChange={handleChange}
  color={chosenColor}
  button={
    <EuiColorPickerSwatch
      color={chosenColor}
      aria-label="Select a new color"
    />
  }
/>
`;
const customBadgeSnippet = `// Be sure to provide relevant accessibility to unmanaged elements
<EuiColorPicker
  onChange={handleChange}
  color={chosenColor}
  isInvalid={hasErrors}
  button={
    <EuiBadge
      color={chosenColor ? chosenColor : 'hollow'}
      onClickAriaLabel="Select a new color"
    >
      I'm a Badge
    </EuiBadge>
  }
/>
`;

import { Modes } from './modes';
const modesSource = require('!!raw-loader!./modes');
const modesHtml = renderToHtml(Modes);
const modesSwatchSnippet = `// Swatches only
<EuiColorPicker
  onChange={handleChange}
  color={chosenColor}
  isInvalid={hasErrors}
  mode="swatch"
/>
`;
const modesPickerSnippet = `// Gradient map only
<EuiColorPicker
  onChange={handleChange}
  color={chosenColor}
  isInvalid={hasErrors}
  mode="picker"
/>
`;

import { KitchenSink } from './kitchen_sink';
const kitchenSinkSource = require('!!raw-loader!./kitchen_sink');
const kitchenSinkHtml = renderToHtml(KitchenSink);
const kitchenSinkSnippet = `<EuiColorPicker
  onChange={handleChange}
  color={chosenColor}
  isInvalid={hasErrors}
  onBlur={() => {}}
  onFocus={() => {}}
  compressed={true}
  popoverZIndex={10}
  mode="default"
  swatches={[
    '#333',
    '#666',
    '#999',
    '#CCC',
    '#FFF',
  ]}
/>
`;

export const ColorPickerExample = {
  title: 'Color Picker',
  intro: (
    <React.Fragment>
      <EuiText>
        <p>
          Color input component allowing for multiple methods of entry and
          selection.
        </p>
        <p>
          Direct text entry will only match hexadecimal (hex) colors, and output
          values only return hex values. Spatial selection involves HSV
          manipulaton, which is converted to hex.
        </p>
        <p>
          Swatches allow consumers to predefine preferred or suggested choices.
          The swatches must also be entered in hex format.
        </p>
      </EuiText>
    </React.Fragment>
  ),
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: colorPickerSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: colorPickerHtml,
        },
      ],
      props: { EuiColorPicker },
      snippet: colorPickerSnippet,
      demo: <ColorPicker />,
    },
    {
      title: 'Custom color swatches',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: customSwatchesSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: customSwatchesHtml,
        },
      ],
      text: (
        <p>
          By default the colors provided are the ten color blind safe
          visualization colors. You can however pass in your own color set with
          the <EuiCode>swatches</EuiCode> prop.
        </p>
      ),
      snippet: customSwatchesSnippet,
      demo: <CustomSwatches />,
    },
    {
      title: 'Custom button',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: customButtonSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: customButtonHtml,
        },
      ],
      text: (
        <p>
          You can optionally use a custom button as the trigger for selection
          using the <EuiCode>button</EuiCode> prop. Please remember to add
          accessibility to this component, using proper button markup and aria
          labeling.
        </p>
      ),
      snippet: [customButtonSnippet, customBadgeSnippet],
      demo: <CustomButton />,
    },
    {
      title: 'Limited selection modes',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: modesSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: modesHtml,
        },
      ],
      text: (
        <p>
          By default, both swatch selection and the gradient color map will be
          rendered. Use the <EuiCode>mode</EuiCode> prop to pass `swatch` for
          swatch-only selection, or pass `picker` for gradient map and hue
          slider selection without swatches.
        </p>
      ),
      snippet: [modesSwatchSnippet, modesPickerSnippet],
      demo: <Modes />,
    },
    {
      title: 'Kitchen sink',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: kitchenSinkSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: kitchenSinkHtml,
        },
      ],
      snippet: kitchenSinkSnippet,
      demo: <KitchenSink />,
    },
  ],
};
