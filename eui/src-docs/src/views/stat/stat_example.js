import React from 'react';

import { renderToHtml } from '../../services';

import {
  GuideSectionTypes,
} from '../../components';

import {
  EuiCode,
  EuiStat,
} from '../../../../src/components';

import Stat from './stat';
const statSource = require('!!raw-loader!./stat');
const statHtml = renderToHtml(Stat);

import StatColors from './stat_colors';
const statColorsSource = require('!!raw-loader!./stat_colors');
const statColorsHtml = renderToHtml(StatColors);

import StatAlign from './stat_align';
const statAlignSource = require('!!raw-loader!./stat_align');
const statAlignHtml = renderToHtml(StatAlign);

import StatSize from './stat_size';
const statSizeSource = require('!!raw-loader!./stat_size');
const statSizeHtml = renderToHtml(StatSize);

import StatOrder from './stat_order';
const statOrderSource = require('!!raw-loader!./stat_order');
const statOrderHtml = renderToHtml(StatOrder);

import StatCombos from './stat_combos';
const statCombosSource = require('!!raw-loader!./stat_combos');
const statCombosHtml = renderToHtml(StatCombos);

export const StatExample = {
  title: 'Stat',
  sections: [{
    source: [{
      type: GuideSectionTypes.JS,
      code: statSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: statHtml,
    }],
    text: (
      <p>
        <EuiCode>EuiStat</EuiCode> can be used to display prominent text or number values. It consists of <EuiCode>title</EuiCode>
        and <EuiCode>description</EuiCode> elements with several visual styling properties (examples below).
      </p>
    ),
    props: { EuiStat },
    demo: <Stat />,
  }, {
    title: 'Applying color',
    source: [{
      type: GuideSectionTypes.JS,
      code: statColorsSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: statColorsHtml,
    }],
    text: (
      <p>
        <EuiCode>title</EuiCode> can be altered using the color property. By default, it will appear in <EuiCode>full</EuiCode> color.
        For proper color contrast, only a limited set of EUI colors are offered. See the Props tab above for a list of available colors.
      </p>
    ),
    demo: <StatColors />,
  }, {
    title: 'Text alignment',
    source: [{
      type: GuideSectionTypes.JS,
      code: statAlignSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: statAlignHtml,
    }],
    text: (
      <p>
        <EuiCode>EuiStat</EuiCode> also offers alignment options. By default, text will be left aligned.
      </p>
    ),
    demo: <StatAlign />,
  }, {
    title: 'Title size',
    source: [{
      type: GuideSectionTypes.JS,
      code: statSizeSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: statSizeHtml,
    }],
    text: (
      <p>
        <EuiCode>title</EuiCode> uses the <EuiCode>EuiTitle</EuiCode> component and thus its sizing properites.
        Although all <EuiCode>EuiTitle</EuiCode> sizes are available, suggested sizes include <EuiCode>`l`, `m`, and `s`</EuiCode>.
        By default, the size is set to Large (<EuiCode>`l`</EuiCode>). The <EuiCode>description</EuiCode> label cannot be re-sized via
        component properties.
      </p>
    ),
    demo: <StatSize />,
  }, {
    title: 'Reverse the order',
    source: [{
      type: GuideSectionTypes.JS,
      code: statOrderSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: statOrderHtml,
    }],
    text: (
      <p>
        You can reverse the order of the <EuiCode>description</EuiCode> and <EuiCode>title</EuiCode> text by setting
        the <EuiCode>reverse</EuiCode> property to true. By default, the description (label) is displayed above the title (value).
      </p>
    ),
    demo: <StatOrder />,
  }, {
    title: 'Putting it all together',
    source: [{
      type: GuideSectionTypes.JS,
      code: statCombosSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: statCombosHtml,
    }],
    text: (
      <p>
        Following are samples demonstrating how you might assemble and display <EuiCode>EuiStat</EuiCode> components.
      </p>
    ),
    demo: <StatCombos />,
  }],
};
