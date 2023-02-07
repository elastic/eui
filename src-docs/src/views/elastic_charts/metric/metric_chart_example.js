/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react';

import { ExternalBadge } from '../shared';

import {
  EuiSpacer,
  EuiText,
  EuiLink,
  EuiImage,
  EuiCode,
  EuiCallOut,
} from '../../../../../src/components';

import metric_anatomy from '../../../images/metric_anatomy.png';
import metric_intro from '../../../images/metric_intro.png';
import { GuideSectionTypes } from '../../../components';
import {
  MetricProps,
  MetricDatumWProgress,
  MetricDatumWNumber,
  MetricDatumWText,
  MetricDatumWTrend,
} from './metric_chart_props';
import Grid from './metric_chart_grid';
import NoData from './metric_chart_no_data';
import ProgressBar from './metric_chart_progress_bar';
import Trend from './metric_chart_trend';
import Overview from './metric_chart_overview';
import SingleValue from './metric_chart_single_value';
import Resizing from './metric_chart_resizing';
import GridRow from './metric_chart_grid_row';
import GridColumn from './metric_chart_grid_column';
import {
  gridColumnSnippet,
  gridRowSnippet,
  gridSnippet,
  progressBarSnippet,
  singleValueSnippet,
  trendSnippet,
} from './metric_chart_snippets';
import { Link } from 'react-router-dom';

const gridColumnSource = require('!!raw-loader!./metric_chart_grid_column');
const gridRowSource = require('!!raw-loader!./metric_chart_grid_row');
const gridSource = require('!!raw-loader!./metric_chart_grid');
const progressBarSource = require('!!raw-loader!./metric_chart_progress_bar');
const singleValueSource = require('!!raw-loader!./metric_chart_single_value');
const trendSource = require('!!raw-loader!./metric_chart_trend');

export const MetricChartExample = {
  title: 'Metric Chart',
  intro: (
    <>
      <ExternalBadge />
      <EuiSpacer size="l" />
      <EuiText>
        <p>
          The <strong>Metric</strong> chart is a single value visualization
          available from{' '}
          <EuiLink
            href="https://elastic.github.io/elastic-charts"
            target="_blank"
          >
            Elastic Charts
          </EuiLink>
          . It allows you to represent a metric, a KPI, a specific state with a
          very simple interface, similar to{' '}
          <Link to="/display/stat">
            <strong>EuiStat</strong>
          </Link>{' '}
          but with more data visualization oriented capabilities.
        </p>
      </EuiText>
      <EuiImage
        alt="Overview of metric component."
        url={metric_intro}
        style={{ width: '100%', maxWidth: '900px' }}
      />
    </>
  ),
  sections: [
    {
      title: 'Anatomy',
      text: (
        <>
          <EuiImage
            alt="Anatomy of metric component"
            url={metric_anatomy}
            style={{ width: '100%', maxWidth: '900px' }}
          />
          <p>
            The Metric is used to convey a single numerical value. It usually
            can represent a specific indicator like: the current CPU value or
            the number of logs ingested in the last minute. Used correctly, can
            be very effective represent an overall status.
          </p>
          <p>Some of the questions answered by this chart can be:</p>
          <ul>
            <li>How many visitors are online now?</li>
            <li>What&apos;s the current usage of CPU and Memory?</li>
            <li>
              How many flights have been delayed in the selected time range?
            </li>
          </ul>
          <p>
            The value can be associated with a secondary visual representation
            that takes place in the background (like a progress bar or a trend),
            providing a contextual information layer.
          </p>
          <EuiCallOut title="Decorations" iconType="image">
            These secondary visual representations should be considered
            decorations. They cannot coexist at the same time (progress bar and
            trend) to limit the visual complexity and improve the
            understandability of the data
          </EuiCallOut>
        </>
      ),
    },
    {
      title: 'When to use',
      text: (
        <>
          <p>
            It can convey quantitative information such as plain numbers, counts
            of elements (visitors, flights, etc), percentages and formulas (sum,
            average, etc).
          </p>
          <p>
            A qualitative value can be described through a plain background
            color, or even better through a progress bar.
          </p>
          <p>
            When using this chart the used text, title, and subtitles should be
            clearly described and self-explanatory, try to be specific without
            being too verbose. Longer text or very precise multi-digit numbers
            can nullify the scope of the chart. You can use subtitles or Unit
            Text to clarify this and to inform the user of the choices and
            calculations that have been made prior.
          </p>
        </>
      ),
      demo: <Overview />,
      props: {
        Metric: MetricProps,
        MetricWNumber: MetricDatumWNumber,
        MetricWProgress: MetricDatumWProgress,
        MetricWTrend: MetricDatumWTrend,
        MetricWText: MetricDatumWText,
      },
    },
    {
      title: 'Single value',
      text: (
        <>
          <p>
            As described above, the Metric can represent just a single value.
          </p>
          <p>
            A <EuiCode>valueFormatter</EuiCode> is required to format the value.
            <br />
            Is important to limit the number of digits to the right amount
            depending on your use case. Given a 7 digits number, for example,{' '}
            <EuiCode>$3,364,726</EuiCode>
            to represent the current company is a detail that can be reserved
            for tables. In this case, you probably just need to represent the
            overall magnitude, so reducing it to 4 digits plus a suffix could
            suffice <EuiCode>$3.365M</EuiCode>.
          </p>
          <p>
            The <EuiCode>color</EuiCode> attribute can be used to render a color
            background. Such color can be used for two reasons: aesthetic or
            functional. In the functional one you can associate a color scale,
            which depends on your value range, to give a qualitative indicator
            of your value in that range.
          </p>
          <p>
            If the passed <EuiCode>value</EuiCode> is a{' '}
            <EuiCode>Number</EuiCode> then you must provide a{' '}
            <EuiCode>valueFormatter</EuiCode>, if instead is a{' '}
            <EuiCode>String</EuiCode> then the <EuiCode>valueFormatter</EuiCode>{' '}
            is not required.
          </p>
        </>
      ),
      demo: <SingleValue />,
      props: {
        Metric: MetricProps,
        MetricWNumber: MetricDatumWNumber,
        MetricWText: MetricDatumWText,
      },
      snippet: singleValueSnippet,
      source: [
        {
          type: GuideSectionTypes.TSX,
          code: singleValueSource,
        },
      ],
    },
    {
      title: 'Progress bar',
      text: (
        <>
          <p>
            The metric can also represent a progress or a quantity within a
            range. This embellishment improves the context and increases the
            readability of the data.
          </p>
          <p>
            The length of a bar is one natural representation of progress. To
            simplify the readability of the length, the bar always starts at{' '}
            <strong>zero</strong>.
          </p>
          <EuiCallOut title="Zero baseline" color="warning" iconType="help">
            <p>
              The zero baseline constraint is a constraint that we already know
              from bar charts: when the length of the bar is not proportional to
              the value it represents it becomes hard to discern that quantity.
              If you are thinking of using a non-zero baseline (not available in
              the Metric) try to reconsider the problem by considering the bar
              as the increment/decrement of the value with respect to a non-zero
              baseline like revenue change from the past year, or how many
              degrees above the normal body temperature. Consider also that the
              absence of a visual scale with numerical references makes the bar
              abstract and should be immediately clear what it represents.
            </p>
          </EuiCallOut>
          <EuiCallOut title="Negative values" color="warning" iconType="help">
            <p>
              If your metric chart could display negative values (such as
              temperature, variations in time, YTD losses..) please be aware of
              this limit and the inner complexity that derives from negative
              values in such a simple component, please consider adding visual
              guidance (use an icon to highlight, for instance) to facilitate
              the user in understanding what is happening.
            </p>
          </EuiCallOut>
          <br />
          <p>
            To use this progress bar, your data should adhere to the{' '}
            <EuiCode>MetricWProgress</EuiCode> type. In particular, in addition
            to the already required properties you have to specify the maximum
            value the progress bar can reach through the{' '}
            <EuiCode>domainMax</EuiCode> prop and you have to specify a progress
            bar direction via <EuiCode>progressBarDirection</EuiCode>.
          </p>
        </>
      ),
      demo: <ProgressBar />,
      props: { Metric: MetricProps, MetricWProgress: MetricDatumWProgress },
      snippet: progressBarSnippet,
      source: [
        {
          type: GuideSectionTypes.TSX,
          code: progressBarSource,
        },
      ],
    },
    {
      title: 'Trend',
      text: (
        <>
          <p>
            A metric usually represents a statistic of a variable in a time
            frame. To add a bit more context is possible to represent the trend
            of that variable over time, by plotting an overlay on the metric
            background.
          </p>
          <p>
            To achieve that, the <EuiCode>trend</EuiCode> needs to be filled
            with an array of objects in the form of{' '}
            <EuiCode language="js">{'{x: number, y: number}'}</EuiCode>
          </p>
          <p>The trend is then rendered following these principles:</p>
          <ul>
            <li>
              the vertical height represents the range from 0 to the maximum{' '}
              <EuiCode>y</EuiCode> value.
            </li>
            <li>
              the horizontal space represents the range from the minimum to the
              maximum <EuiCode>x</EuiCode> value
            </li>
            <li>
              the trend height is limited to 50% of the overall Metric height,
              so the maximum <EuiCode>y</EuiCode> value always touches the
              vertical middle of the metric chart.
            </li>
          </ul>
        </>
      ),
      demo: <Trend />,
      props: { Metric: MetricProps, MetricWTrend: MetricDatumWTrend },
      snippet: trendSnippet,
      source: [
        {
          type: GuideSectionTypes.TSX,
          code: trendSource,
        },
      ],
    },
    {
      title: 'Multiple metrics',
      text: (
        <>
          <p>
            Metric can live alone or be rendered in a grid. To support this, the{' '}
            <EuiCode>data</EuiCode> prop is structured to accept an Array of
            Arrays representing respectively columns and rows of a grid. In this
            way you can build:
          </p>
          <ul>
            <li>
              a single row of multiple metrics using{' '}
              <EuiCode>{'[[{col1}, {col2}, {col3}]]'}</EuiCode>
            </li>
            <li>
              a single column of multiple metrics using{' '}
              <EuiCode>{'[[{row1}], [{row2}], [{row3}]]'}</EuiCode>
            </li>
            <li>
              a grid column ✕ rows of multiple metrics using{' '}
              <EuiCode>
                {'[[{col1row1}, {col2row1}], [{col1row2}], [{col2row2}]]'}
              </EuiCode>
            </li>
          </ul>
        </>
      ),
    },
    {
      title: 'Multiple horizontal metrics',
      text: (
        <>
          <p>
            Providing the following data structure{' '}
            <EuiCode>{'data={[[{col1}, {col2}, {col3}]]}'}</EuiCode>
            you will get an horizontally aligned set of metrics
          </p>
          <p>
            You can align vertically the progress bars&apos; directions to
            compare values using <EuiCode>LayoutDirection.Vertical</EuiCode>
          </p>
        </>
      ),
      demo: <GridRow />,
      props: {
        Metric: MetricProps,
        MetricWNumber: MetricDatumWNumber,
        MetricWProgress: MetricDatumWProgress,
        MetricWTrend: MetricDatumWTrend,
        MetricWText: MetricDatumWText,
      },
      snippet: gridRowSnippet,
      source: [
        {
          type: GuideSectionTypes.TSX,
          code: gridRowSource,
        },
      ],
    },
    {
      title: 'Multiple vertical metrics',
      text: (
        <>
          <p>
            Providing the following data structure{' '}
            <EuiCode>{'data={[[{col1}], [{col2}], [{col3}]]}'}</EuiCode>
            you will get an vertically aligned set of metrics
          </p>
          <p>
            You can align horizontally the progress bars directions to compare
            values using <EuiCode>LayoutDirection.Horizontal</EuiCode>
          </p>
        </>
      ),
      demo: <GridColumn />,
      props: {
        Metric: MetricProps,
        MetricWNumber: MetricDatumWNumber,
        MetricWProgress: MetricDatumWProgress,
        MetricWTrend: MetricDatumWTrend,
        MetricWText: MetricDatumWText,
      },
      snippet: gridColumnSnippet,
      source: [
        {
          type: GuideSectionTypes.TSX,
          code: gridColumnSource,
        },
      ],
    },
    {
      title: 'Grid',
      text: (
        <>
          <p>
            You can mix columns and rows in the <EuiCode>data</EuiCode> array to
            create a grid. The grid is filled with missing tiles to cover the
            last grid row. If you want to skip a tile, you can pass an{' '}
            <EuiCode>undefined</EuiCode> datum as an element of the array.
          </p>
          <p>Different types of metrics can be mixed together.</p>
        </>
      ),
      demo: <Grid />,
      props: {
        Metric: MetricProps,
        MetricWNumber: MetricDatumWNumber,
        MetricWProgress: MetricDatumWProgress,
        MetricWTrend: MetricDatumWTrend,
        MetricWText: MetricDatumWText,
      },
      snippet: gridSnippet,
      source: [
        {
          type: GuideSectionTypes.TSX,
          code: gridSource,
        },
      ],
    },

    {
      title: 'Resizing',
      text: (
        <>
          <p>
            The Metric chart will take the parent <EuiCode>height</EuiCode> or{' '}
            <EuiCode>width</EuiCode> if those are fixed. If not you can still
            specify a fixed size for the component by constraining the size from
            the <EuiCode>Chart</EuiCode> component.
          </p>
          <p>
            There is <strong>no minimum size</strong> for this component even
            though since font sizes do not scale according to size but only
            according to specific breakpoints, you might encounter a few
            problems if you work with large numbers at really small sizes.
          </p>
          <p>
            Metric charts are composed of a series of elements that follow a
            specified hierarchy. When resizing vertically, it might occur that
            there is not enough room to place all of them within the component.
            If that happens, automatically these elements get hidden starting
            from the least important to the most important.{' '}
            <EuiCode>title</EuiCode> and <EuiCode>value</EuiCode> will never be
            hidden.
          </p>
          <p>
            Below certain breakpoints, secondary elements such as{' '}
            <EuiCode>subtitles</EuiCode> are removed in order to leave as much
            space as possible for primary elements (<EuiCode>title</EuiCode>,{' '}
            <EuiCode>value</EuiCode>). Be aware of this limitation when dealing
            with small metrics.
          </p>
          <EuiCallOut
            color="warning"
            iconType="help"
            title="Please be always aware of this limit and resize the Metric
              component accordingly within your interface or dashboard."
          />
        </>
      ),
      demo: <Resizing />,
    },
    {
      title: 'No Data',
      text: (
        <p>
          Various situations could lead to an uncertain state. We designed two{' '}
          <strong>empty states</strong> that should cover most of those cases:
          <ul>
            <li>
              When an applied filter makes the metric uncomputable (missing
              values in a windowed function, or filtered out values for a
              percentage calculation), then a <EuiCode>NaN</EuiCode> can be sent
              as the <EuiCode>value</EuiCode>. This will result in rendering a{' '}
              <EuiCode>N/A</EuiCode> string, making clear that the chart is
              working but is not possible to compute the metric correctly.
            </li>
            <li>
              If, instead, the metric itself is filtered out (for example the
              metric represents a specific category, that is filtered out) the
              component won&apos;t be rendered, and an empty box is rendered.
            </li>
          </ul>
        </p>
      ),
      demo: <NoData />,
    },
    {
      title: 'Alternatives and similarities',
      text: (
        <>
          <p>
            Don&apos;t rely solely on the background trend-line to provide a
            precise and understandable analysis of data trends. These options
            give a contextual and wider layer of information that could help in
            understanding the overall trends and evolution of data but they are
            not detailed enough to get specific insights.
            <br />
            <br />
            If your goal is to precisely see the evolution of values over time
            please use a line chart instead, where you&apos;ll have all the
            information required to perform a proper analysis (grid, values,
            axis, legend, etc)
          </p>
          <p>
            If the values displayed are the result of any kind of filter and
            they do not reflect the current timeframe selected on your
            dashboard, please remember to make this explicit. You can use
            subtitles or Unit Text to clarify this and to inform the user of the
            choices and calculations that have been made prior.
          </p>

          <ol>
            <li>
              <strong>Bullet Chart</strong>: A more complex version of the
              Metric Chart which provides additional features to display values
              more technically and exhaustively.
            </li>
            <li>
              <strong>Barchart</strong>: When many indicators/metrics share the
              same scale (e.g. percentage) it&apos;s better to put them on the
              same chart in order to simplify the comparison among them.{' '}
            </li>
            <li>
              <strong>Table</strong>: Tables offer the possibility to sort and
              handle data in a more detailed manner. Use tables with conditional
              formatting to obtain a similar result but with more controls.
            </li>
            <li>
              <strong>Plain Text</strong>: Within your dashboards, use plain
              text with a dedicated box when a long explanation is needed. The
              Metric chart has limitations in terms of component size and length
              of text, instead of abounding with text, switch to a simpler
              component such as plain text.
            </li>
          </ol>
        </>
      ),
    },
  ],
};
