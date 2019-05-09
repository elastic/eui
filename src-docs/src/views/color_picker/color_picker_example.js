import React from 'react';

import { renderToHtml } from '../../services';

import {
  GuideSectionTypes,
} from '../../components';

import {
  EuiCode,
  EuiColorPicker,
  EuiText
} from '../../../../src/components';

import { ColorPicker } from './color_picker';
const colorPickerSource = require('!!raw-loader!./color_picker');
const colorPickerHtml = renderToHtml(ColorPicker);

import { CustomSwatches } from './custom_swatches';
const customSwatchesSource = require('!!raw-loader!./custom_swatches');
const customSwatchesHtml = renderToHtml(CustomSwatches);

import { CustomButton } from './custom_button';
const customButtonSource = require('!!raw-loader!./custom_button');
const customButtonHtml = renderToHtml(CustomButton);

import { Modes } from './modes';
const modesSource = require('!!raw-loader!./modes');
const modesHtml = renderToHtml(Modes);

export const ColorPickerExample = {
  title: 'Color Picker',
  intro: (
    <React.Fragment>
      <EuiText>
        <p>
          Color input component allowing for multiple methods of entry and selection.
        </p>
        <p>
          Direct text entry will only match hexadecimal (hex) colors, and output values only return hex values.
          Spatial selection involves HSV manipulaton, which is converted to hex.
        </p>
        <p>
          Swatches allow consumers to predefine preferred or suggested choices. The swatches must also be entered in hex format.
        </p>
      </EuiText>
    </React.Fragment>
  ),
  sections: [{
    source: [{
      type: GuideSectionTypes.JS,
      code: colorPickerSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: colorPickerHtml,
    }],
    props: { EuiColorPicker },
    demo: <ColorPicker />,
  }, {
    title: 'Custom color swatches',
    source: [{
      type: GuideSectionTypes.JS,
      code: customSwatchesSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: customSwatchesHtml,
    }],
    text: (
      <p>
        By default the colors provided are the ten color blind safe visualization colors.
        You can however pass in your own color set with the <EuiCode>swatches</EuiCode> prop.
      </p>
    ),
    demo: <CustomSwatches />,
  }, {
    title: 'Custom button',
    source: [{
      type: GuideSectionTypes.JS,
      code: customButtonSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: customButtonHtml,
    }],
    text: (
      <p>
        You can optionally use a custom button as the trigger for selection using
        the <EuiCode>button</EuiCode> prop. Please remember to add accessibility to this
        component, using proper button markup and aria labeling.
      </p>
    ),
    demo: <CustomButton />,
  }, {
    title: 'Modes',
    source: [{
      type: GuideSectionTypes.JS,
      code: modesSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: modesHtml,
    }],
    text: (
      <p>
        By default, both swatch selection and the gradient color map will be rendered.
        Use the <EuiCode>mode</EuiCode> prop to pass `swatch` for swatch-only selection, or
        pass `picker` for gradient map and hue slider selection without swatches.
      </p>
    ),
    demo: <Modes />,
  }
  ],
};
