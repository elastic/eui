import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import { EuiCallOut, EuiCode, EuiProgress } from '../../../../src/components';

import Progress from './progress';
const progressSource = require('!!raw-loader!./progress');
const progressHtml = renderToHtml(Progress);
const progressSnippet = `<EuiProgress size="xs" color="accent" />`;

import ProgressValue from './progress_value';
const progressValueSource = require('!!raw-loader!./progress_value');
const progressValueHtml = renderToHtml(ProgressValue);
const progressValueSnippet = '<EuiProgress value={22} max={100} size="xs" />';

import ProgressFixed from './progress_fixed';
const progressFixedSource = require('!!raw-loader!./progress_fixed');
const progressFixedHtml = renderToHtml(ProgressFixed);
const progressFixedSnippet = `<!-- Position at top of parent container -->
<EuiProgress size="xs" color="accent" position="absolute" />

<!-- Position at top of screen, above global header -->
<EuiPortal>
  <EuiProgress size="xs" color="accent" position="fixed" />
</EuiPortal>`;

import ProgressSizeColor from './progress_size_color';
const progressSizeColorSource = require('!!raw-loader!./progress_size_color');
const progressSizeColorHtml = renderToHtml(ProgressSizeColor);

export const ProgressExample = {
  title: 'Progress',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: progressSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: progressHtml,
        },
      ],
      text: (
        <p>
          The <EuiCode>Progress</EuiCode> component by default will display in
          an indeterminate loading state (rendered as a single div) until you
          define a <EuiCode>max</EuiCode> and <EuiCode>value</EuiCode> prop. The{' '}
          <EuiCode>size</EuiCode> prop refers to its vertical height. It will
          always stretch <EuiCode>100%</EuiCode> to its container.
        </p>
      ),
      snippet: progressSnippet,
      props: { EuiProgress },
      demo: <Progress />,
    },
    {
      title: 'Progress with values',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: progressValueSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: progressValueHtml,
        },
      ],
      text: (
        <p>
          Once the <EuiCode>max</EuiCode> and <EuiCode>value</EuiCode> props are
          set, it will act as a determinate progress bar. This is rendered using
          an HTML5 <EuiCode>progress</EuiCode> tag.
        </p>
      ),
      snippet: progressValueSnippet,
      demo: <ProgressValue />,
    },
    {
      title: 'Progress can have absolute or fixed positions',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: progressFixedSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: progressFixedHtml,
        },
      ],
      text: (
        <div>
          <p>
            Using the <EuiCode>position</EuiCode> prop we can align our bar to
            be <EuiCode>fixed</EuiCode> or <EuiCode>absolute</EuiCode>. In both
            options, the background color of the base bar is dropped (since the
            context of width is already known from your wrapping element). For
            the absolute option, make sure that your wrapping element has{' '}
            <EuiCode>position: relative</EuiCode> applied.
          </p>
          <EuiCallOut
            title="Note about progress bars over fixed headers"
            iconType="iInCircle">
            <p>
              Using <EuiCode>EuiProgress</EuiCode> with a{' '}
              <EuiCode>fixed</EuiCode> position may result in it being overlayed
              when its parent wrapper has a <EuiCode>z-index</EuiCode> value
              lower than another fixed element, such as{' '}
              <EuiCode>EuiHeader</EuiCode>. In that case, wrap{' '}
              <EuiCode>EuiProgress</EuiCode> in an <EuiCode>EuiPortal</EuiCode>{' '}
              as seen on the Snippet tab.
            </p>
          </EuiCallOut>
        </div>
      ),
      snippet: progressFixedSnippet,
      demo: <ProgressFixed />,
    },
    {
      title: 'Progress has a range of sizes and colors',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: progressSizeColorSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: progressSizeColorHtml,
        },
      ],
      text: (
        <p>
          Both <EuiCode>size</EuiCode> and <EuiCode>color</EuiCode> can be
          provided as props. These values will work on both determinate and
          indeterminate progress bars.
        </p>
      ),
      demo: <ProgressSizeColor />,
    },
  ],
};
