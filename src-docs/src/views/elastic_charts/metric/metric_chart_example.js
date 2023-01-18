/* eslint-disable @typescript-eslint/no-var-requires */
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

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
import { Grid } from './grid';
import { NoData } from './no_data';
import {
  MetricProps,
  MetricDatumWProgress,
  MetricDatumWNumber,
  MetricDatumWText,
  MetricDatumWTrend,
} from './props';
import { ProgressBar } from './progress_bar';
import { Trend } from './trend';
import { ContextVsNoContext } from './context_vs_no_context';
import { SingleValue } from './single_value';
import { Resizing } from './resizing';
import { MetricVsTimeseries } from './metric_vs_timeseries';

export const MetricChartExample = {
  title: 'Metric Chart',
  intro: (
    <Fragment>
      <ExternalBadge />
      <EuiSpacer size="l" />
      <EuiText>
        <p>
          EUI provides utilities and documentation for working with{' '}
          <EuiLink
            href="https://elastic.github.io/elastic-charts"
            target="_blank"
          >
            Elastic Charts
          </EuiLink>
          , an open source charting library also created and maintained by
          Elastic.
        </p>
      </EuiText>
      <EuiImage
        alt="Overview of metric component."
        url={metric_intro}
        size="900px"
      />
    </Fragment>
  ),
  sections: [
    {
      title: 'Anatomy',
      text: (
        <>
          <EuiImage
            alt="Anatomy of metric component"
            url={metric_anatomy}
            size="700px"
          />
          <p>
            The Metric is used to convey a single value, that could represent a
            specific indicator (like the current CPU value, or the number of log
            ingested in the last minute). A number is a simple way to give an
            immediate immediate status of such indicator. Used sparsely, can be
            very effective to highlight a value that represent an overall
            status.
          </p>
          <p>
            The value can be associated with a secondary visual representation
            that takes place in the background (like a progress bar or a trend),
            providing a contextual information layer.
          </p>
        </>
      ),
    },
    {
      title: 'When to use',
      text: (
        <>
          <p>
            Quantitative information such as plain numbers, counts of elements
            (visitors, flights…), percentages and formulas (sum, average…).
          </p>
          <p>
            Rely on all the required elements to make your metric chart as clear
            as possible. Text and values should be self-explanatory and
            shouldn&apos;t require any prior contextual knowledge in order to be
            understood, try to be specific without being too verbose.
          </p>
          <p>
            If the values displayed are the result of any kind of filter and
            they do not reflect the current timeframe selected on your
            dashboard, please remember to make this explicit. You can use
            subtitles or Unit Text to clarify this and to inform the user of the
            choices and calculations that have been made prior.
          </p>
        </>
      ),
      demo: <ContextVsNoContext />,
      props: {
        Metric: MetricProps,
        MetricWNumber: MetricDatumWNumber,
        MetricWProgress: MetricDatumWProgress,
        MetricWTrend: MetricDatumWTrend,
        MetricWText: MetricDatumWText,
      },
    },
    {
      title: 'Questions answered by this chart',
      text: (
        <ul>
          <li>How many visitors are online now?</li>
          <li>What&apos;s the current usage of CPU and Memory?</li>
          <li>
            How many flights have been delayed in the selected time range?
          </li>
        </ul>
      ),
    },

    {
      title: 'Single Value',
      text: (
        <>
          <p>
            As described above, the Metric can represent just a single value.
          </p>
          <p>
            A <EuiCode>valueFormatter</EuiCode> is required to format the value.
            <br />
            Is important to limit the number of digits to the right amount
            depending on your use case. Giving a 7digit number, for example{' '}
            <EuiCode>$3,364,726M</EuiCode>
            to represent the current company is a detail that can be reserved
            for tables, in this case you probably just need to represent the
            overall magnitude, so reducing it to 4 digit plus a prefix could
            suffice <EuiCode>$3.365M</EuiCode>.
          </p>
          <p>
            The <EuiCode>color</EuiCode> attribute can be used to render a color
            background. Such color can be used for two reasons: aesthetic or
            functional. In the functional one you can associated a color scale,
            that depends on your value range, to give a qualitative indicator
            about your value in that range.
          </p>
        </>
      ),
      demo: <SingleValue />,
      props: {
        Metric: MetricProps,
        MetricWNumber: MetricDatumWNumber,
        MetricWText: MetricDatumWText,
      },
    },
    {
      title: 'Progress Bar',
      text: (
        <Fragment>
          <p>
            <EuiCode>progressBarDirection</EuiCode> and{' '}
            <EuiCode>domainMax</EuiCode>
            TODO
          </p>
        </Fragment>
      ),
      demo: <ProgressBar />,
      props: { Metric: MetricProps, MetricWProgress: MetricDatumWProgress },
    },
    {
      title: 'Trend',
      text: (
        <Fragment>
          <p>
            <EuiCode>trend</EuiCode>
            TODO
          </p>
        </Fragment>
      ),
      demo: <Trend />,
      props: { Metric: MetricProps, MetricWTrend: MetricDatumWTrend },
    },
    {
      title: 'Grid of metrics',
      text: (
        <Fragment>
          <p>
            TODO When applying a break-down-by functionality, you can rotate the
            visual indicator of values (background bar or sidebar) in order to
            facilitate comparison among multiple metrics. When metric charts are
            in columns, an horizontal display of bars could help identify
            differences between them, on the contrary when charts are
            distributed in rows a vertical bar is easier to read.
          </p>
        </Fragment>
      ),
      demo: <Grid />,
      props: { Metric: MetricProps, MetricWProgress: MetricDatumWProgress },
    },
    {
      title: 'Resizing',
      text: (
        <>
          <p>
            The Metric chart will take the parent <EuiCode>height</EuiCode> or
            <EuiCode>width</EuiCode> if those are fixed. If not you can still
            specify a fixed size for the component by constraining the size from
            the <EuiCode>Chart</EuiCode>
            component.
          </p>
          <p>
            There is <strong>no minimum size</strong> for this component even
            though, since font-sizes do not scale according to size but only
            according to specific breakpoints, you might encounter few problems
            if you work with large numbers at really small sizes.
          </p>
          <p>
            Metric charts are composed by a series of elements that follow a
            specified hierarchy. When resizing vertically, it might occur that
            there is not enough room to place all of them within the component.
            If that happens, automatically these elements get hidden starting
            from the least important to the most important. Title and value will
            never be hidden.
          </p>
          <p>
            Below certain breakpoints, secondary elements such as Subtitle are
            removed in order to leave as much space as possible for primary
            elements (Title, value). Be aware of this limitation when dealing
            with small metrics.
          </p>
          <EuiCallOut>
            <p>
              Please be always aware of this limit and resize the Metric
              component accordingly within your interface or dashboard.
            </p>
          </EuiCallOut>
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
              as the
              <EuiCode>value</EuiCode>. This will result in rendering a{' '}
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
      title: 'Relevant choices we made',
      text: (
        <Fragment>
          <p>
            <strong>Additional attributes coexistence →</strong> In order to
            avoid excessive decoration which can compromise readability, some
            attributes can&apos;t exist at the same time. <br />
            Background trendline can&apos;t coexist with the background progress
            bar, they can work only with full background.
          </p>
          <p>
            <strong>Progress bar with negative values →</strong> For The time
            being we decided to avoid the possibility for the user to set a
            baseline for the progress bar other than 0 (zero). We opted for this
            since it would be extremely complex for the readers to understand a
            progress bar that has a baseline different from zero, especially if
            negative values are applied. The absence of a visual scale with
            proper numerical references makes it too abstract and we prefer to
            limit a functionality that could cause many problems. <br />
            <br />
            If your metric chart could display negative values (such as
            temperature, variations in time, YTD losses..) please be aware of
            this limit and the inner complexity that derives from negative
            values in such a simple component, please consider adding visual
            guidance (use an icon to highlight, for instance) to facilitate the
            user in understanding what is happening.
          </p>
        </Fragment>
      ),
    },

    {
      title: 'DONTs',
      text: (
        <Fragment>
          <p>
            Don&apos;t rely solely on the background trendline to provide a
            precise and understandable analysis of data trends. These options
            give a contextual and wider layer of information that could help
            understanding the overall trends and evolution of data but they are
            not detailed enough to get specific insights.
            <br />
            <br />
            If your goal is to precisely see evolution of values over time
            please use a line chart instead, where you&apos;ll have all the
            information required to perform a proper analysis (grid, values,
            axis, legend…)
          </p>
          <p>
            If the values displayed are the result of any kind of filter and
            they do not reflect the current timeframe selected on your
            dashboard, please remember to make this explicit. You can use
            subtitles or Unit Text to clarify this and to inform the user of the
            choices and calculations that have been made prior.
          </p>
        </Fragment>
      ),
      demo: <MetricVsTimeseries />,
      props: { Metric: MetricProps, MetricWTrend: MetricDatumWTrend },
    },
    {
      title: 'Chart alternatives and similarities',
      text: (
        <Fragment>
          <p>
            <ol>
              <li>
                <strong>Bullet Chart →</strong> A more complex version of the
                Metric Chart which provides additional features to display
                values more technically and exhaustively.
              </li>
              <li>
                <strong>Barchart →</strong> When many indicators/metrics share
                the same scale (e.g. percentage) it&apos;s better to put them on
                the same chart in order to simplify the comparison among them.{' '}
                <Link to="/elastic-charts/barchart">Barchart Page</Link>{' '}
              </li>
              <li>
                <strong>Table →</strong> Tables offer the possibility to sort
                and handle data in a more detailed manner. Use tables with
                conditional formatting to obtain a similar result but with more
                controls.
              </li>
              <li>
                <strong>Plain Text →</strong> Within your dashboards, use plain
                text with a dedicated box when a long explanation is needed.
                Metric chart has limitations in terms of component size and
                length of text, instead of abounding with text, switch to a
                simpler component such a plain text.
              </li>
            </ol>
          </p>
        </Fragment>
      ),
    },
  ],
};
