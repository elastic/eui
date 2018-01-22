import React from 'react';

import { renderToHtml } from '../../services';

import {
  GuideSectionTypes,
} from '../../components';

import { ColorPicker } from './color_picker';
const colorPickerSource = require('!!raw-loader!./color_picker');
const colorPickerHtml = renderToHtml(ColorPicker);

import { ColorPickerLabelAndClear } from './color_picker_clear';
const colorPickerClearSource = require('!!raw-loader!./color_picker_clear');
const colorPickerClearHtml = renderToHtml(ColorPickerLabelAndClear);

import { ColorPickerNoColorLabel } from './color_picker_no_color_label';
const colorPickerNoColorLabelSource = require('!!raw-loader!./color_picker_no_color_label');
const colorPickerNoColorLabelHtml = renderToHtml(ColorPickerNoColorLabel);

export const ColorPickerExample = {
  title: 'Color Picker',
  sections: [{
    title: 'Color Picker',
    source: [{
      type: GuideSectionTypes.JS,
      code: colorPickerSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: colorPickerHtml,
    }],
    demo: <ColorPicker />,
  }, {
    title: 'Color Picker with label and reset link',
    source: [{
      type: GuideSectionTypes.JS,
      code: colorPickerClearSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: colorPickerClearHtml,
    }],
    demo: <ColorPickerLabelAndClear />,
  }, {
    title: 'Color Picker without a color labe',
    source: [{
      type: GuideSectionTypes.JS,
      code: colorPickerNoColorLabelSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: colorPickerNoColorLabelHtml,
    }],
    demo: <ColorPickerNoColorLabel />,
  }],
};
