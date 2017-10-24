import React from 'react';

import { renderToHtml } from '../../services';

import {
  GuidePage,
  GuideSection,
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

import Accessibility from './accessibility';
const accessibilitySource = require('!!raw-loader!./accessibility');
const accessibilityHtml = renderToHtml(Accessibility);

export default props => (
  <GuidePage title={props.route.name}>
    <GuideSection
      title="Icons"
      source={[{
        type: GuideSectionTypes.JS,
        code: iconsSource,
      }, {
        type: GuideSectionTypes.HTML,
        code: iconsHtml,
      }]}
      text={
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
      }
      demo={
        <Icons />
      }
    />

    <GuideSection
      title="Apps"
      source={[{
        type: GuideSectionTypes.JS,
        code: appsSource,
      }, {
        type: GuideSectionTypes.HTML,
        code: appsHtml,
      }]}
      text={
        <p>
          App logos are usually displayed at <EuiCode>32x32</EuiCode> or above
          and can contain multiple colors.
        </p>
      }
      demo={
        <Apps />
      }
    />

    <GuideSection
      title="Logos"
      source={[{
        type: GuideSectionTypes.JS,
        code: logosSource,
      }, {
        type: GuideSectionTypes.HTML,
        code: logosHtml,
      }]}
      text={
        <p>
          Product logos follow similar rules as app logos.
        </p>
      }
      demo={
        <Logos />
      }
    />

    <GuideSection
      title="Sizes"
      source={[{
        type: GuideSectionTypes.JS,
        code: iconSizesSource,
      }, {
        type: GuideSectionTypes.HTML,
        code: iconSizesHtml,
      }]}
      text={
        <p>
          Use the <EuiCode>size</EuiCode> prop to automatically size your icons.
          Medium is the default, and will output a <EuiCode>16x16</EuiCode> icons.
        </p>
      }
      demo={
        <IconSizes />
      }
    />

    <GuideSection
      title="Accessibility"
      source={[{
        type: GuideSectionTypes.JS,
        code: accessibilitySource,
      }, {
        type: GuideSectionTypes.HTML,
        code: accessibilityHtml,
      }]}
      text={
        <p>
          By default, this component will use a human-readable version of the <EuiCode>type</EuiCode>
          to title the SVG. You can specify a <EuiCode>title</EuiCode> prop to override this.
        </p>
      }
      demo={
        <Accessibility />
      }
    />
  </GuidePage>
);
