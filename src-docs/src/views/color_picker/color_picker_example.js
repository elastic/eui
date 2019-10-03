import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  EuiCode,
  EuiColorPicker,
  EuiColorStops,
  EuiSpacer,
  EuiText,
} from '../../../../src/components';

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

import { ColorStops } from './color_stops';
const colorStopsSource = require('!!raw-loader!./color_stops');
const colorStopsHtml = renderToHtml(ColorStops);
const colorStopsSnippetStandard = `<EuiColorStops
  label="Standard"
  onChange={handleChange}
  colorStops={colorStops}
  min={0}
  max={100}
/>`;

const colorStopsSnippetAdd = `<EuiColorStops
  label="Custom add color"
  onChange={handleChange}
  colorStops={colorStops}
  min={0}
  max={100}
  addColor={colorToAddToNewStops}
/>`;

const colorStopsSnippetFixed = `<EuiColorStops
  label="Fixed color segments"
  onChange={handleChange}
  colorStops={colorStops}
  min={0}
  max={100}
  stopType="fixed"
/>
`;

import { ColorStopsRange } from './color_stops_range';
const colorStopsRangeSource = require('!!raw-loader!./color_stops');
const colorStopsRangeHtml = renderToHtml(ColorStopsRange);
const colorPickerRangeSnippet = `<EuiColorStops
  label="Free-range color stops"
  onChange={handleChange}
  colorStops={colorStops}
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
/>`;

const stopCustomSwatchesSnippet = `<EuiColorStops
  label="Swatches"
  onChange={handleChange}
  colorStops={colorStops}
  min={0}
  max={100}
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
const stopModesSwatchSnippet = `// Swatches only
<EuiColorStops
  label="Swatch"
  onChange={handleChange}
  colorStops={colorStops}
  min={0}
  max={100}
  mode="swatch"
/>
`;
const stopModesPickerSnippet = `// Gradient map only
<EuiColorStops
  label="Picker"
  onChange={handleChange}
  colorStops={colorStops}
  min={0}
  max={100}
  mode="picker"
/>
`;

import { Inline } from './inline';
const inlineSource = require('!!raw-loader!./inline');
const inlineHtml = renderToHtml(Inline);
const inlineSnippet = `<EuiColorPicker
  onChange={handleChange}
  color={chosenColor}
  isInvalid={hasErrors}
  display="inline"
/>
`;

import Containers from './containers';
const containersSource = require('!!raw-loader!./containers');
const containersHtml = renderToHtml(Containers);

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
const stopKitchenSinkSnippet = `<EuiColorStops
  label="All the things"
  onChange={handleChange}
  colorStops={colorStops}
  min={0}
  max={100}
  mode="default"
  addStop={#FFF}
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
  title: 'Color Selection',
  intro: (
    <React.Fragment>
      <EuiText>
        <p>
          Two components exist to aid color selection:{' '}
          <EuiCode>EuiColorPicker</EuiCode> and <EuiCode>EuiColorStops</EuiCode>
          .
        </p>
      </EuiText>
      <EuiSpacer />
    </React.Fragment>
  ),
  sections: [
    {
      title: 'Color picker',
      text: (
        <React.Fragment>
          <EuiText>
            <p>
              Color input component allowing for multiple methods of entry and
              selection.
            </p>
            <p>
              Direct text entry will only match hexadecimal (hex) colors, and
              output values only return hex values. Spatial selection involves
              HSV manipulaton, which is converted to hex.
            </p>
            <p>
              Swatches allow consumers to predefine preferred or suggested
              choices. The swatches must also be entered in hex format.
            </p>
          </EuiText>
        </React.Fragment>
      ),
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
      title: 'Color stops',
      text: (
        <React.Fragment>
          <EuiText>
            <p>
              Use <EuiCode>EuiColorStops</EuiCode> to define color stops for
              data driven styling. Stops are numbers within the provided range.
              The color segment spans from the given stop number (inclusive) to
              the next stop number (exclusive).
            </p>
          </EuiText>
        </React.Fragment>
      ),
      source: [
        {
          type: GuideSectionTypes.JS,
          code: colorStopsSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: colorStopsHtml,
        },
      ],
      props: { EuiColorStops },
      snippet: [
        colorStopsSnippetStandard,
        colorStopsSnippetAdd,
        colorStopsSnippetFixed,
      ],
      demo: <ColorStops />,
    },
    {
      title: 'Free-range color stops',
      text: (
        <React.Fragment>
          <EuiText>
            <p>
              Typical use of <EuiCode>EuiColorStops</EuiCode> (as above) will
              have defined `min` and `max` range values. It is also possible to
              leave the range open-ended for cases where the target data set is
              unknown or maleable. In this case, a user{"'"}s added values will
              define `min` and `max` and users will have more freedom over
              resetting the values on the fly.
            </p>
          </EuiText>
        </React.Fragment>
      ),
      source: [
        {
          type: GuideSectionTypes.JS,
          code: colorStopsRangeSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: colorStopsRangeHtml,
        },
      ],
      snippet: colorPickerRangeSnippet,
      demo: <ColorStopsRange />,
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
      snippet: [customSwatchesSnippet, stopCustomSwatchesSnippet],
      demo: <CustomSwatches />,
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
      snippet: [
        modesSwatchSnippet,
        modesPickerSnippet,
        stopModesSwatchSnippet,
        stopModesPickerSnippet,
      ],
      demo: <Modes />,
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
          Available only in <EuiCode>EuiColorPicker</EuiCode>. You can
          optionally use a custom button as the trigger for selection using the{' '}
          <EuiCode>button</EuiCode> prop. Please remember to add accessibility
          to this component, using proper button markup and aria labeling.
        </p>
      ),
      snippet: [customButtonSnippet, customBadgeSnippet],
      demo: <CustomButton />,
    },
    {
      title: 'Inline',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: inlineSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: inlineHtml,
        },
      ],
      text: (
        <p>
          Available only in <EuiCode>EuiColorPicker</EuiCode>. Set the{' '}
          <EuiCode>display</EuiCode> prop to `inline` to display the color
          picker without an input or popover. Note that the{' '}
          <EuiCode>button</EuiCode> prop will be ignored in this case.
        </p>
      ),
      snippet: inlineSnippet,
      demo: <Inline />,
    },
    {
      title: 'Containers',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: containersSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: containersHtml,
        },
      ],
      text: (
        <p>
          Demonstrating that both color selection components can exist in portal
          containers and that their popover positioning works in nested
          contexts.
        </p>
      ),
      demo: <Containers />,
    },
    {
      title: 'Option toggling',
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
      snippet: [kitchenSinkSnippet, stopKitchenSinkSnippet],
      demo: <KitchenSink />,
    },
  ],
};
