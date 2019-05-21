import React, { Fragment } from 'react';
import { GuideSectionTypes } from '../../components';
import VerticalRectSeriesExample from './vertical_rect_series';
import StackedVerticalRectSeriesExample from './stacked_vertical_rect_series';
import HorizontalRectSeriesExample from './horizontal_rect_series';
import StackedHorizontalRectSeriesExample from './stacked_horizontal_rect_series';
import TimeHistogramSeriesExample from './time_histogram_series';
import { FormatCrosshairTimesExample } from './format_crosshair_times';

import {
  EuiBadge,
  EuiSpacer,
  EuiCode,
  EuiCallOut,
  EuiLink,
} from '../../../../src/components';
import { EuiHistogramSeries } from '../../../../src/experimental';

export const XYChartHistogramExample = {
  title: 'Histograms',
  intro: (
    <Fragment>
      <EuiCallOut title="Set for deprecation" color="danger">
        <p>
          This component will be replaced in the near future and managed outside
          of EUI. We do not recommend using it at this time and it will be
          removed by June 2019.
        </p>
      </EuiCallOut>

      <EuiSpacer size="l" />
      <p>
        You can use <EuiCode>EuiSeriesChart</EuiCode> with{' '}
        <EuiCode>EuiHistogramSeries</EuiCode> to displaying histogram charts.
      </p>
      <EuiSpacer size="l" />
      <p>
        The <EuiCode>EuiSeriesChart</EuiCode> component pass the{' '}
        <EuiCode>orientation</EuiCode> prop to every component child to
        accomodate <EuiCode>vertical</EuiCode> and <EuiCode>horizontal</EuiCode>{' '}
        use cases. The default orientation is <EuiCode>vertical</EuiCode>.
      </p>
      <EuiSpacer size="l" />
      <p>
        You can specify the <EuiCode>EuiSeriesChart</EuiCode> prop{' '}
        <EuiCode>xType</EuiCode> and
        <EuiCode>yType</EuiCode> to one of the following scales:{' '}
        <EuiCode>linear</EuiCode>,<EuiCode>log</EuiCode>,<EuiCode>time</EuiCode>
        , <EuiCode>time-utc</EuiCode>. The use of <EuiCode>ordinal</EuiCode> and{' '}
        <EuiCode>category</EuiCode> is not supported.
      </p>
      <EuiSpacer size="l" />
      <EuiCallOut title="What is an histogram?" iconType="pin">
        <Fragment>
          <p>
            A histogram is an accurate representation of the distribution of
            numerical data. [...]
          </p>
          <p>
            To construct a histogram, the first step is to <em>bin</em> the
            range of values—that is, divide the entire range of values into a
            series of intervals—and then count how many values fall into each
            interval. The bins are usually specified as consecutive,
            non-overlapping intervals of a variable. The bins (intervals) must
            be adjacent, and are often (but are not required to be) of equal
            size
          </p>
          <EuiLink href="https://en.wikipedia.org/wiki/Histogram">
            Wikipedia
          </EuiLink>
        </Fragment>
      </EuiCallOut>
      <EuiSpacer size="l" />
    </Fragment>
  ),
  sections: [
    {
      title: 'Vertical Histogram',
      text: (
        <p>
          You can create out-of-the-box vertical histograms just adding a{' '}
          <EuiCode>EuiHistogramSeries</EuiCode>
          component into your <EuiCode>EuiSeriesChart</EuiCode>.
        </p>
      ),
      props: { EuiHistogramSeries },
      source: [
        {
          type: GuideSectionTypes.JS,
          code: require('!!raw-loader!./vertical_rect_series'),
        },
        {
          type: GuideSectionTypes.HTML,
          code: 'This component can only be used from React',
        },
      ],
      demo: <VerticalRectSeriesExample />,
    },
    {
      title: 'Stacked Vertical Histogram',
      text: (
        <Fragment>
          <p>
            Use <EuiCode>EuiSeriesChart</EuiCode> with{' '}
            <EuiCode>EuiHistogramSeries</EuiCode> for displaying stacked
            vertical histograms.
          </p>
          <p>
            Specify <EuiCode>stackBy=&quot;x&quot;</EuiCode> to stack bars
            together.
          </p>
          <EuiCallOut
            size="s"
            title='Is not possible to "cluster" bars by the same X value as in bar charts'
            color="warning"
            iconType="help"
          />
        </Fragment>
      ),
      props: { EuiHistogramSeries },
      source: [
        {
          type: GuideSectionTypes.JS,
          code: require('!!raw-loader!./stacked_vertical_rect_series'),
        },
        {
          type: GuideSectionTypes.HTML,
          code: 'This component can only be used from React',
        },
      ],
      demo: <StackedVerticalRectSeriesExample />,
    },
    {
      title: 'Horizontal Histogram',
      text: (
        <p>
          <EuiBadge color="warning">experimental</EuiBadge> You can create
          horizontal histograms specifing{' '}
          <EuiCode>orientation=&quot;horizontal&quot;</EuiCode>. Since you are
          rotating the histogram, you also have to invert your data.
        </p>
      ),
      props: { EuiHistogramSeries },
      source: [
        {
          type: GuideSectionTypes.JS,
          code: require('!!raw-loader!./vertical_rect_series'),
        },
        {
          type: GuideSectionTypes.HTML,
          code: 'This component can only be used from React',
        },
      ],
      demo: <HorizontalRectSeriesExample />,
    },
    {
      title: 'Stacked Horizontal Histogram',
      text: (
        <Fragment>
          <p>
            <EuiBadge color="warning">experimental</EuiBadge> To display an
            horizontal stacked histograms specify{' '}
            <EuiCode>stackBy=&quot;x&quot;</EuiCode>
            together with <EuiCode>orientation=&quot;horizontal&quot;</EuiCode>.
          </p>
          <EuiCallOut
            size="s"
            title='Is not possible to "cluster" bars by the same Y value as in bar charts'
            color="warning"
            iconType="help"
          />
        </Fragment>
      ),
      props: { EuiHistogramSeries },
      source: [
        {
          type: GuideSectionTypes.JS,
          code: require('!!raw-loader!./stacked_horizontal_rect_series'),
        },
        {
          type: GuideSectionTypes.HTML,
          code: 'This component can only be used from React',
        },
      ],
      demo: <StackedHorizontalRectSeriesExample />,
    },
    {
      title: 'Custom crosshair time format',
      text: (
        <div>
          <p>
            Specify a custom formatting string to change the locality or format
            of the time string on the x crosshair.
          </p>
        </div>
      ),
      source: [
        {
          type: GuideSectionTypes.JS,
          code: require('!!raw-loader!./format_crosshair_times'),
        },
        {
          type: GuideSectionTypes.HTML,
          code: 'This component can only be used from React',
        },
      ],
      demo: <FormatCrosshairTimesExample />,
    },
    {
      title: 'Time Series Histogram version',
      text: (
        <p>
          Use <EuiCode>EuiSeriesChart</EuiCode> with{' '}
          <EuiCode>xType=&apos;time&apos;</EuiCode>
          to display a time series histogram.
        </p>
      ),
      props: { EuiHistogramSeries },
      source: [
        {
          type: GuideSectionTypes.JS,
          code: require('!!raw-loader!./time_histogram_series'),
        },
        {
          type: GuideSectionTypes.HTML,
          code: 'This component can only be used from React',
        },
      ],
      demo: <TimeHistogramSeriesExample />,
    },
  ],
};
