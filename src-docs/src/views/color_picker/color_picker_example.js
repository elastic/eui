import React from 'react';
import { Link } from 'react-router-dom';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  EuiCode,
  EuiColorPicker,
  EuiColorPaletteDisplay,
  EuiColorPalettePicker,
  EuiColorStops,
  EuiText,
} from '../../../../src/components';
import {
  EuiColorPalettePickerPaletteTextProps,
  EuiColorPalettePickerPaletteFixedProps,
  EuiColorPalettePickerPaletteGradientProps,
} from '!!prop-loader!../../../../src/components/color_picker/color_palette_picker/color_palette_picker';

import { ColorStop } from '!!prop-loader!../../../../src/components/color_picker/color_stops/color_stop_thumb';

import playgrounds from './playground';

import ColorPicker from './color_picker';
const colorPickerSource = require('!!raw-loader!./color_picker');
const colorPickerHtml = renderToHtml(ColorPicker);
const colorPickerSnippet = `<EuiColorPicker
  id={colorPickerId}
  onChange={handleChange}
  color={chosenColor}
  isInvalid={hasErrors}
/>
`;

import ColorPaletteDisplay from './color_palette_display';
const colorPaletteDisplaySource = require('!!raw-loader!./color_palette_display');
const colorPaletteDisplayHtml = renderToHtml(ColorPaletteDisplay);
const colorPaletteDisplaySnippet = [
  `<EuiColorPaletteDisplay
  palette={euiPaletteColorBlind()}
/>
`,
  `<EuiColorPaletteDisplay
  palette={[
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
  ]}
/>
`,
];

import ColorPalettePicker from './color_palette_picker';
const colorPalettePickerSource = require('!!raw-loader!./color_palette_picker');
const colorPalettePickerHtml = renderToHtml(ColorPalettePicker);
const colorPalettePickerSnippet = `<EuiColorPalettePicker
  palettes={[
    {
      value: 'palette1',
      title: 'Palette 1',
      palette: euiPaletteColorBlind(),
      type: 'fixed',
    },
  ]}
  onChange={onPaletteChange}
  valueOfSelected={palette}
/>
`;

import ColorStops from './color_stops';
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

const colorStopsSnippetStepped = `<EuiColorStops
  label="Stepped color segments"
  onChange={handleChange}
  colorStops={colorStops}
  min={0}
  max={100}
  stopType="stepped"
  stepNumber={stepNumber}
/>
`;

import ColorStopsRange from './color_stops_range';
const colorStopsRangeSource = require('!!raw-loader!./color_stops_range');
const colorStopsRangeHtml = renderToHtml(ColorStopsRange);
const colorPickerRangeSnippet = `<EuiColorStops
  label="Free-range color stops"
  onChange={handleChange}
  colorStops={colorStops}
/>
`;

import Alpha from './alpha';
const alphaSource = require('!!raw-loader!./alpha');
const alphaHtml = renderToHtml(Alpha);
const alphaSnippet = `<EuiColorPicker
  id={colorPickerId}
  onChange={handleChange}
  color={chosenColor}
  showAlpha={true}
  isInvalid={hasErrors}
/>`;

import Formats from './formats';
const formatsSource = require('!!raw-loader!./formats');
const formatsHtml = renderToHtml(Formats);
const formatsSnippet = `<EuiColorPicker
  format="hex"
  id={colorPickerId}
  onChange={handleChange}
  color={chosenColor}
  isInvalid={hasErrors}
/>`;

import CustomSwatches from './custom_swatches';
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

import CustomButton from './custom_button';
const customButtonSource = require('!!raw-loader!./custom_button');
const customButtonHtml = renderToHtml(CustomButton);
const customButtonSnippet = `<EuiColorPicker
  onChange={handleChange}
  color={chosenColor}
  secondaryInputDisplay="top"
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
  secondaryInputDisplay="bottom"
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

import Empty from './empty_state';
const emptySource = require('!!raw-loader!./empty_state');
const emptyHtml = renderToHtml(CustomButton);
const emptySnippet = `<EuiColorPicker
  onChange={handleChange}
  color={chosenColor}
  placeholder="Auto"
  isClearable={true}
/>
`;

import Modes from './modes';
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

import Inline from './inline';
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

import KitchenSink from './kitchen_sink';
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
  title: 'Color selection',
  intro: (
    <React.Fragment>
      <EuiText>
        <p>
          Three components exist to aid color selection:{' '}
          <strong>EuiColorPicker</strong>,{' '}
          <strong>EuiColorPalettePicker</strong> and{' '}
          <strong>EuiColorStops</strong>.
        </p>
      </EuiText>
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
              Direct text entry will match hexadecimal (hex) and RGB(a) colors,
              and output will return both hex and RGBa values. Spatial selection
              involves HSV manipulaton, which is converted to hex.
            </p>
            <p>
              Swatches allow consumers to predefine preferred or suggested
              choices. The swatches must also be entered in hex or RGBa format.
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
      title: 'Color palette picker',
      text: (
        <React.Fragment>
          <EuiText>
            <p>
              Use <strong>EuiColorPalettePicker</strong> to select palettes to
              apply colors to data visualization like maps and charts.
            </p>
            <p>
              Use the <EuiCode>palettes</EuiCode> prop to pass your palettes as
              an array <EuiCode>strings</EuiCode> or an array of{' '}
              <EuiCode>ColorStops</EuiCode> in the form of{' '}
              <EuiCode>{'{ stop: number, color: string }'}</EuiCode>. For each
              object, you should pass a palette (array of hex values) and
              specify the <EuiCode>type</EuiCode>. Use <EuiCode>fixed</EuiCode>{' '}
              palettes for categorical data and <EuiCode>gradient</EuiCode>{' '}
              palettes for continuous data.
            </p>
          </EuiText>
        </React.Fragment>
      ),
      source: [
        {
          type: GuideSectionTypes.JS,
          code: colorPalettePickerSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: colorPalettePickerHtml,
        },
      ],
      props: {
        EuiColorPalettePicker,
        EuiColorPalettePickerPaletteTextProps,
        EuiColorPalettePickerPaletteFixedProps,
        EuiColorPalettePickerPaletteGradientProps,
        ColorStop,
      },
      snippet: colorPalettePickerSnippet,
      demo: <ColorPalettePicker />,
    },
    {
      title: 'Color palette display',
      text: (
        <React.Fragment>
          <EuiText>
            <p>
              Use <strong>EuiColorPaletteDisplay</strong> to show the palette in
              use for a data visualization.
            </p>
            <p>
              Use the palette prop to pass your palette as an array of color{' '}
              <EuiCode>strings</EuiCode> or an array of{' '}
              <EuiCode>ColorStops</EuiCode> in the form of{' '}
              <EuiCode>{'{ stop: number, color: string }'}</EuiCode>. Use{' '}
              <EuiCode>fixed</EuiCode> palettes for categorical data and{' '}
              <EuiCode>gradient</EuiCode> palettes for continuous data.
            </p>
            <p>
              In cases you need to apply a palette, it&apos;s recommended to use
              the{' '}
              <Link to="/forms/color-selection#color-palette-picker">
                <strong>EuiColorPalettePicker</strong>
              </Link>
              .
            </p>
          </EuiText>
        </React.Fragment>
      ),
      source: [
        {
          type: GuideSectionTypes.JS,
          code: colorPaletteDisplaySource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: colorPaletteDisplayHtml,
        },
      ],
      props: {
        EuiColorPaletteDisplay,
        ColorStop,
      },
      snippet: colorPaletteDisplaySnippet,
      demo: <ColorPaletteDisplay />,
    },
    {
      title: 'Color stops',
      text: (
        <React.Fragment>
          <EuiText>
            <p>
              Use <strong>EuiColorStops</strong> to define color stops for data
              driven styling. Stops are numbers within the provided range. The
              color segment spans from the given stop number (inclusive) to the
              next stop number (exclusive).
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
      props: {
        EuiColorStops,
        ColorStop,
      },
      snippet: [
        colorStopsSnippetStandard,
        colorStopsSnippetAdd,
        colorStopsSnippetFixed,
        colorStopsSnippetStepped,
      ],
      demo: <ColorStops />,
    },
    {
      title: 'Free-range color stops',
      text: (
        <React.Fragment>
          <EuiText>
            <p>
              Typical use of <strong>EuiColorStops</strong> (as above) will have
              defined <EuiCode>min</EuiCode> and <EuiCode>max</EuiCode> range
              values. It is also possible to leave the range open-ended for
              cases where the target data set is unknown or maleable. In this
              case, a user&apos;s added values will define{' '}
              <EuiCode>min</EuiCode> and <EuiCode>max</EuiCode> and users will
              have more freedom over resetting the values on the fly.
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
      title: 'Format selection',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: formatsSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: formatsHtml,
        },
      ],
      text: (
        <>
          <p>
            Format selection does <em>not</em> limit the format of text input
            the picker will allow, but instead attempts to keep consistency
            during HSV selection. By default, the color picker will
            automatically use the last input value format. Notice in following
            the examples how hue and saturation selection behave differently.
          </p>
          <p>
            Swatches will always show the &quot;as-authored&quot; color value,
            as will the value provided via the <EuiCode>color</EuiCode> prop.
          </p>
        </>
      ),
      snippet: formatsSnippet,
      demo: <Formats />,
    },
    {
      title: 'Alpha channel (opacity) selection',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: alphaSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: alphaHtml,
        },
      ],
      text: (
        <p>
          To allow color opacity via alpha channel, set{' '}
          <EuiCode language="js">showAlpha=true</EuiCode>. This will also
          display a range slider allowing manual opacity updates.
        </p>
      ),
      snippet: alphaSnippet,
      demo: <Alpha />,
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
          rendered. Use the <EuiCode>mode</EuiCode> prop to pass{' '}
          <EuiCode>swatch</EuiCode> for swatch-only selection, or pass{' '}
          <EuiCode>picker</EuiCode> for gradient map and hue slider selection
          without swatches.
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
        <>
          <p>
            Available only in <strong>EuiColorPicker</strong>. You can
            optionally use a custom button as the trigger for selection using
            the <EuiCode>button</EuiCode> prop. Please remember to add
            accessibility to this component, using proper button markup and aria
            labeling.
          </p>
          <p>
            Additionally, use the <EuiCode>secondaryInputDisplay</EuiCode> prop
            to show a secondary or alternative color value input. Options
            include <EuiCode>top</EuiCode> and <EuiCode>bottom</EuiCode>{' '}
            placement.
          </p>
        </>
      ),
      snippet: [customButtonSnippet, customBadgeSnippet],
      demo: <CustomButton />,
    },
    {
      title: 'Empty state',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: emptySource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: emptyHtml,
        },
      ],
      text: (
        <>
          <p>
            For instances where an &quot;empty&quot; color picker has meaning
            other than transparent color value, use the{' '}
            <EuiCode>placeholder</EuiCode> prop to provide context. Removing
            color selection and returning to the default state can be made
            easier by setting <EuiCode>isClearable=true</EuiCode>.
          </p>
        </>
      ),
      snippet: emptySnippet,
      demo: <Empty />,
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
          Available only in <strong>EuiColorPicker</strong>. Set the{' '}
          <EuiCode>display</EuiCode> prop to <EuiCode>inline</EuiCode> to
          display the color picker without an input or popover. Note that the{' '}
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
  playground: playgrounds,
};
