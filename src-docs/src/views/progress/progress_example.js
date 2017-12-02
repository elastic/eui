import React from 'react';

import { renderToHtml } from '../../services';

import {
  GuideSectionTypes,
} from '../../components';

import {
  EuiCode,
} from '../../../../src/components';

import Progress from './progress';
const progressSource = require('!!raw-loader!./progress');
const progressHtml = renderToHtml(Progress);

import ProgressValue from './progress_value';
const progressValueSource = require('!!raw-loader!./progress_value');
const progressValueHtml = renderToHtml(ProgressValue);

import ProgressFixed from './progress_fixed';
const progressFixedSource = require('!!raw-loader!./progress_fixed');
const progressFixedHtml = renderToHtml(ProgressFixed);

import ProgressSizeColor from './progress_size_color';
const progressSizeColorSource = require('!!raw-loader!./progress_size_color');
const progressSizeColorHtml = renderToHtml(ProgressSizeColor);

export const ProgressExample = {
  title: 'Progress',
  sections: [{
    title: 'Progress',
    source: [{
      type: GuideSectionTypes.JS,
      code: progressSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: progressHtml,
    }],
    text: (
      <p>
        The <EuiCode>Progress</EuiCode> component by default will display
        in an indeterminate loading state (rendered as a signle div) until you define
        a <EuiCode>max</EuiCode> and <EuiCode>value</EuiCode> prop.
        The <EuiCode>size</EuiCode> prop refers to its verical height. It will
        always strech <EuiCode>100%</EuiCode> to its container.
      </p>
    ),
    demo: <Progress />,
  }, {
    title: 'Progress with values',
    source: [{
      type: GuideSectionTypes.JS,
      code: progressValueSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: progressValueHtml,
    }],
    text: (
      <p>
        Once the <EuiCode>max</EuiCode> and <EuiCode>value</EuiCode> props
        are set, it will act as a determinate progress bar. This is rendered
        using an HTML5 <EuiCode>progress</EuiCode> tag.
      </p>
    ),
    demo: <ProgressValue />,
  }, {
    title: 'Progress can have absolute or fixed positions',
    source: [{
      type: GuideSectionTypes.JS,
      code: progressFixedSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: progressFixedHtml,
    }],
    text: (
      <p>
        Using the <EuiCode>position</EuiCode> prop we can align our bar
        to be <EuiCode>fixed</EuiCode> or <EuiCode>absolute</EuiCode>. In both
        options, the background color of the base bar is dropped (since the
        context of width is already known from your wrapping element). For the
        absolute option, make sure that your wrapping element
        has <EuiCode>position: relative</EuiCode> applied.
      </p>
    ),
    demo: <ProgressFixed />,
  }, {
    title: 'Progress has a range of sizes and colors',
    source: [{
      type: GuideSectionTypes.JS,
      code: progressSizeColorSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: progressSizeColorHtml,
    }],
    text: (
      <p>
        Both <EuiCode>size</EuiCode> and <EuiCode>color</EuiCode> can
        be provided as props. These values will work on both determinate and
        indeterminate progress bars.
      </p>
    ),
    demo: <ProgressSizeColor />,
  }],
};
