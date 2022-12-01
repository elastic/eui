/* eslint-disable @typescript-eslint/no-var-requires */
import React, { Fragment } from 'react';
import { GuideSectionTypes } from '../../components';
import { Link } from 'react-router-dom';

import { ExternalBadge } from './shared';

const themingSource = require('!!raw-loader!./theming');

import {
  EuiSpacer,
  EuiText,
  EuiLink,
  EuiImage,
} from '../../../../src/components';

import metric_anatomy from '../../images/metric_anatomy.png';
import metric_donts from '../../images/metric_donts.png';
import metric_intro from '../../images/metric_intro.png';
import metric_no_data from '../../images/metric_no_data.png';
import metric_relevant from '../../images/metric_relevant.png';
import metric_suited from '../../images/metric_suited.png';
import metric_resize from '../../images/metric_resize.gif';

export const MetricChart = {
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
      source: [
        {
          type: GuideSectionTypes.JS,
          code: themingSource,
        },
      ],
      text: (
        <Fragment>
          <EuiImage
            alt="Anatomy of metric component."
            url={metric_anatomy}
            size="500px"
          />
          <p>
            Metric charts are used to convey a clear understanding of how a
            specific indicator is behaving, the main goal is to use a number to
            directly display the desired value being the most accurate, precise
            and immediate. <br />
            <br />
            This value can be associated with a secondary visual representation
            that takes place in the background, this simple visualization
            provides an additional layer of information that gives more
            contextual information.
          </p>
        </Fragment>
      ),
    },
    {
      title: 'Suited for',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: themingSource,
        },
      ],
      text: (
        <Fragment>
          <p>
            Quantitative information such as plain numbers, counts of elements
            (visitors, flights…), percentages and formulas (sum, average…).
            <br />
            <br />
            Rely on all the required elements to make your metric chart as clear
            as possible. Text and values should be self-explanatory and
            shouldn&apos;t require any prior contextual knowledge in order to be
            understood, try to be specific without being too verbose.
          </p>
          <EuiImage
            alt="Example of metric charts with good and bad use of elements."
            url={metric_suited}
            size="640px"
          />
          <p>
            If the values displayed are the result of any kind of filter and
            they do not reflect the current timeframe selected on your
            dashboard, please remember to make this explicit. You can use
            subtitles or Unit Text to clarify this and to inform the user of the
            choices and calculations that have been made prior.
          </p>
        </Fragment>
      ),
    },
    {
      title: 'Questions answered by this chart',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: themingSource,
        },
      ],
      text: (
        <Fragment>
          <p>
            <ul>
              <li>How many visitors did we have?</li>
              <li>What&apos;s the current usage of CPU and Memory?</li>
              <li>How many flights have been delayed?</li>
            </ul>
          </p>
        </Fragment>
      ),
    },
    {
      title: 'Chart alternatives and similarities',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: themingSource,
        },
      ],
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
    {
      title: 'DONTs',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: themingSource,
        },
      ],
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
          <EuiImage
            alt="Example of metric and linechart working next to each other."
            url={metric_donts}
            size="900px"
          />
          <p>
            If the values displayed are the result of any kind of filter and
            they do not reflect the current timeframe selected on your
            dashboard, please remember to make this explicit. You can use
            subtitles or Unit Text to clarify this and to inform the user of the
            choices and calculations that have been made prior.
          </p>
        </Fragment>
      ),
    },
    {
      title: 'Relevant Attributes',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: themingSource,
        },
      ],
      text: (
        <Fragment>
          <p>
            <strong>Orientation → </strong>When applying a break-down-by
            functionality, you can rotate the visual indicator of values
            (background bar or sidebar) in order to facilitate comparison among
            multiple metrics. When metric charts are in columns, an horizontal
            display of bars could help identify differences between them, on the
            contrary when charts are distributed in rows a vertical bar is
            easier to read.
            <br />
            <br />
            Please note that the full background bar shown in the following is a
            functionality that is still in development, the same concept can be
            applied to the current progress bar.
          </p>
          <EuiImage
            alt="Different orientation of background progress bar."
            url={metric_relevant}
            size="1000px"
          />
          <EuiSpacer />
        </Fragment>
      ),
    },
    {
      title: 'Relevant choices we made',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: themingSource,
        },
      ],
      text: (
        <Fragment>
          <p>
            <strong>Additional attributes coexistence →</strong> In order to
            avoid excessive decoration which can compromise readability, some
            attributes can&apos;t exist at the same time. <br />
            Background trendline can&apos;t coexist with the background progress
            bar, they can work only with full background.
            <br />
            <br />
            <strong>Minimum size →</strong> There is no minimum size for this
            component even though, since font-sizes do not scale according to
            size but only according to specific breakpoints, you might encounter
            few problems if you work with large numbers at really small sizes.
            Please be always aware of this limit and resize the Metric component
            accordingly within your interface or dashboard.
            <br />
            <br /> Also, below certain breakpoints, secondary elements such as
            Subtitle are removed in order to leave as much space as possible for
            primary elements (Title, value). Be aware of this limitation when
            dealing with small metrics.
            <br />
            <br /> <strong>Height resizing →</strong> Metric charts are composed
            by a series of elements that follow a specified hierarchy. When
            resizing vertically, it might occur that there is not enough room to
            place all of them within the component. If that happens,
            automatically these elements get hidden starting from the least
            important to the most important. Title and value will never be
            hidden.
            <br />
            <br />
            FOLLOWING IMAGE NEEDS TO BE REPLACE BY PROPER COMPONENT
          </p>
          <EuiImage
            alt="Animation of how the metric component adapt to different heights."
            url={metric_resize}
            size="400px"
          />
          <p>
            <strong>No data / filtered values →</strong>Various situations could
            lead to an uncertain state. We designed two “empty states” that
            should cover most of those cases:{' '}
            <ul>
              <li>
                When an applied filter makes the metric uncomputable (missing
                values in a windowed function, or filtered out values for a
                percentage calculation), then a `NaN` can be sent as the
                `value`. This will result in rendering a “N/A” string, making
                clear that the chart is working but is not possible to compute
                the metric correctly.
              </li>{' '}
              <li>
                If, instead, the metric itself is filtered out (for example the
                metric represents a specific category, that is filtered out) the
                component won&apos;t be rendered, and an empty box is rendered.
              </li>
            </ul>
          </p>
          <EuiImage
            alt="Example of metric component with no data or related to data that is filtered out."
            url={metric_no_data}
            size="640px"
          />
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
  ],
};
