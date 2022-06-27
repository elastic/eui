import React from 'react';
import { Link } from 'react-router-dom';

import { GuideSectionTypes } from '../../components';

import { EuiCallOut, EuiCode, EuiProgress } from '../../../../src/components';
import progressConfig from './playground';

import Progress from './progress';
const progressSource = require('!!raw-loader!./progress');
const progressSnippet = '<EuiProgress size="xs" color="accent" />';

import ProgressValue from './progress_value';
const progressValueSource = require('!!raw-loader!./progress_value');
const progressValueSnippet = '<EuiProgress value={22} max={100} size="xs" />';

import ProgressFixed from './progress_fixed';
const progressFixedSource = require('!!raw-loader!./progress_fixed');
const progressFixedSnippet = `<!-- Position at top of parent container -->
<EuiProgress size="xs" color="accent" position="absolute" />

<!-- Position at top of screen, above global header -->
<EuiPortal>
  <EuiProgress size="xs" color="accent" position="fixed" />
</EuiPortal>`;

import ProgressSizes from './progress_sizes';
const progressSizesSource = require('!!raw-loader!./progress_sizes');
const progressSizesSnippet = `<EuiProgress
  value={20}
  max={100}
  size="s"
/>`;

import ProgressColors from './progress_colors';
const progressColorsSource = require('!!raw-loader!./progress_colors');
const progressColorsSnippet = `<EuiProgress
  value={20}
  max={100}
  color="vis4"
/>`;

import ProgressChart from './progress_chart';
const progressChartSource = require('!!raw-loader!./progress_chart');
const progressChartSnippet = `<EuiProgress
  value={20}
  valueText={true}
  label={label}
  max={100}
/>`;

export const ProgressExample = {
  title: 'Progress',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: progressSource,
        },
      ],
      text: (
        <p>
          The <strong>EuiProgress</strong> component by default will display in
          an indeterminate loading state (rendered as a single div) until you
          define a <EuiCode>max</EuiCode> and <EuiCode>value</EuiCode> prop. The{' '}
          <EuiCode>size</EuiCode> prop refers to its vertical height. It will
          always stretch <EuiCode>100%</EuiCode> to its container.
        </p>
      ),
      snippet: progressSnippet,
      props: { EuiProgress },
      demo: <Progress />,
      playground: progressConfig,
    },
    {
      title: 'Progress with values',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: progressValueSource,
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
      ],
      text: (
        <>
          <p>
            Using the <EuiCode>position</EuiCode> prop we can align our bar to
            be <EuiCode>fixed</EuiCode> or <EuiCode>absolute</EuiCode>. In both
            options, the background color of the base bar is dropped (since the
            context of width is already known from your wrapping element). For
            the absolute option, make sure that your wrapping element has{' '}
            <EuiCode language="sass">position: relative</EuiCode> applied.
          </p>
          <EuiCallOut
            title="Note about progress bars over fixed headers"
            iconType="iInCircle"
          >
            <p>
              Using <strong>EuiProgress</strong> with a <EuiCode>fixed</EuiCode>{' '}
              position may result in it being overlayed when its parent wrapper
              has a <EuiCode>z-index</EuiCode> value lower than another fixed
              element, such as <strong>EuiHeader</strong>. In that case, wrap{' '}
              <strong>EuiProgress</strong> in an <strong>EuiPortal</strong> as
              seen on the Snippet tab.
            </p>
          </EuiCallOut>
        </>
      ),
      snippet: progressFixedSnippet,
      demo: <ProgressFixed />,
    },
    {
      title: 'Sizes',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: progressSizesSource,
        },
      ],
      text: (
        <p>
          You can adjust the <EuiCode>size</EuiCode> of both determinate and
          indeterminate progress bars.
        </p>
      ),
      demo: <ProgressSizes />,
      snippet: progressSizesSnippet,
    },
    {
      title: 'Colors',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: progressColorsSource,
        },
      ],
      text: (
        <>
          <p>
            <strong>EuiProgress</strong> supports a few options for{' '}
            <EuiCode>color</EuiCode>. You can pass any value from our basic
            color set or from our visualization palette (<EuiCode>vis0</EuiCode>{' '}
            through <EuiCode>vis9</EuiCode>). To learn more about color usage,
            go to the <Link to="/theming/colors/values">Colors</Link> page.
          </p>
          <p>
            Additionally, you can pass any valid color string like a hex value
            or named color. Each <EuiCode>valueText</EuiCode> renders with a
            high contrast version of the color.
          </p>
        </>
      ),
      demo: <ProgressColors />,
      snippet: progressColorsSnippet,
    },
    {
      title: 'Progress for charts',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: progressChartSource,
        },
      ],
      text: (
        <>
          <p>
            Determinate progress bar can be used as simple bar charts. Use them
            with the <EuiCode>label</EuiCode> and <EuiCode>valueText</EuiCode>{' '}
            props to show the data corresponding to each bar.
          </p>
          <p>
            Setting <EuiCode language="ts">{'valueText={true}'}</EuiCode> will
            add a % sign next to the<EuiCode>value</EuiCode> passed. If you want
            to display a custom <EuiCode>valueText</EuiCode>, you can pass a
            node instead.
          </p>
        </>
      ),
      demo: <ProgressChart />,
      snippet: progressChartSnippet,
    },
  ],
};
