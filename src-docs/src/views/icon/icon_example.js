import React from 'react';

import { renderToHtml } from '../../services';

import {
  GuideSectionTypes,
} from '../../components';

import {
  EuiCode,
} from '../../../../src/components';

import Icons from './icons';
const iconsSource = require('!!raw-loader!./icons');
const iconsHtml = renderToHtml(Icons);

import Apps from './apps';
const appsSource = require('!!raw-loader!./apps');
const appsHtml = renderToHtml(Apps);

import Logos from './logos';
const logosSource = require('!!raw-loader!./logos');
const logosHtml = renderToHtml(Logos);

import IconSizes from './icon_sizes';
const iconSizesSource = require('!!raw-loader!./icon_sizes');
const iconSizesHtml = renderToHtml(IconSizes);

import IconColors from './icon_colors';
const iconColorsSource = require('!!raw-loader!./icon_colors');
const iconColorsHtml = renderToHtml(IconColors);

import Accessibility from './accessibility';
const accessibilitySource = require('!!raw-loader!./accessibility');
const accessibilityHtml = renderToHtml(Accessibility);

export const IconExample = {
  title: 'Icons',
  sections: [{
    title: 'Icons',
    source: [{
      type: GuideSectionTypes.JS,
      code: iconsSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: iconsHtml,
    }],
    text: (
      <div>
        <p>
          <EuiCode>EuiIcon</EuiCode> can build out an icon from our SVG
          icon library. Icons can be resized and recolored (through a
          CSS <EuiCode>Fill</EuiCode>) decleration.
        </p>
        <p>
          New icons should be placed in
          the <EuiCode>/icons/assets/</EuiCode> folder on
          a <EuiCode>16x16</EuiCode> empty canvas.
          Icons in the general set should be monochromatic and the code
          itself <strong>should not contain any fill attributes</strong>. Use the SVGO plugin
          for Sketch when exporting to compress / clean your SVG of junk.
        </p>
        <p>
          Note: <EuiCode>guideDemo__icon</EuiCode> styling is applied on the
          below grid for documentation presentation only. Do not copy
          this class into production.
        </p>
      </div>
    ),
    demo: <Icons />,
  }, {
    title: 'Apps',
    source: [{
      type: GuideSectionTypes.JS,
      code: appsSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: appsHtml,
    }],
    text: (
      <p>
        App logos are usually displayed at <EuiCode>32x32</EuiCode> or above
        and can contain multiple colors.
      </p>
    ),
    demo: <Apps />,
  }, {
    title: 'Logos',
    source: [{
      type: GuideSectionTypes.JS,
      code: logosSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: logosHtml,
    }],
    text: (
      <p>
        Product logos follow similar rules as app logos.
      </p>
    ),
    demo: <Logos />,
  }, {
    title: 'Sizes',
    source: [{
      type: GuideSectionTypes.JS,
      code: iconSizesSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: iconSizesHtml,
    }],
    text: (
      <p>
        Use the <EuiCode>size</EuiCode> prop to automatically size your icons.
        Medium is the default, and will output a <EuiCode>16x16</EuiCode> icons.
      </p>
    ),
    demo: <IconSizes />,
  }, {
    title: 'Colors',
    source: [{
      type: GuideSectionTypes.JS,
      code: iconColorsSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: iconColorsHtml,
    }],
    text: (
      <p>
        Use the <EuiCode>color</EuiCode> prop to assign a color for your icons.
        The default behavior is to inherit the text color as the SVG
        color <EuiCode>fill</EuiCode> property via <EuiCode>currentColor</EuiCode> in CSS.
      </p>
    ),
    demo: <IconColors />,
  }, {
    title: 'Accessibility',
    source: [{
      type: GuideSectionTypes.JS,
      code: accessibilitySource,
    }, {
      type: GuideSectionTypes.HTML,
      code: accessibilityHtml,
    }],
    text: (
      <p>
        You can title the SVG by passing the `aria-label` prop to <EuiCode>EuiCode</EuiCode>. No value is set by default.
      </p>
    ),
    demo: <Accessibility />,
  }],
};

