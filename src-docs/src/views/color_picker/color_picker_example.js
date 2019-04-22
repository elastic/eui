import React from 'react';

import { renderToHtml } from '../../services';

import {
  GuideSectionTypes,
} from '../../components';

import {
  EuiCode,
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

export const ColorPickerExample = {
  title: 'Color Picker',
  sections: [{
    source: [{
      type: GuideSectionTypes.JS,
      code: colorPickerSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: colorPickerHtml,
    }],
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
  }],
};
