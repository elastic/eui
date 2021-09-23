import React, { Fragment } from 'react';
import { renderToHtml } from '../../services';
import { GuideSectionTypes } from '../../components';

import { ExternalBadge } from './shared';
import pieSliceOrderImg from '../../images/pie_slice_order.png';

import {
  EuiSpacer,
  EuiCard,
  EuiIcon,
  EuiFlexGroup,
  EuiFlexItem,
  EuiLink,
  EuiIconTip,
  EuiToolTip,
  EuiCallOut,
  EuiCode,
  EuiImage,
} from '../../../../src/components';

import PieChart from './pie';
const pieSource = require('!!raw-loader!./pie');
const pieHtml = renderToHtml(PieChart);

import PieSlices from './pie_slices';

import Treemaps from './treemap';
const treemapsSource = require('!!raw-loader!./treemap');
const treemapsHtml = renderToHtml(Treemaps);

import PieAlts from './pie_alts';

const introCards = [
  {
    title: 'Use',
    iconType: 'checkInCircleFilled',
    iconColor: 'success',
    description: (
      <>
        When categorical data is being <strong>compared to a whole</strong>{' '}
        (usually 100%).
      </>
    ),
  },
  {
    title: "Don't use",
    iconType: 'crossInACircleFilled',
    iconColor: 'danger',
    description: (
      <>
        With relational data or when needing to compare categories to{' '}
        <strong>each other</strong>.
      </>
    ),
  },
  {
    title: 'Tip',
    iconType: 'help',
    iconColor: 'primary',
    description: (
      <>
        Each subdivision or category must be <strong>mutually exclusive</strong>{' '}
        and sum up to a meaningful whole.
      </>
    ),
  },
  {
    title: 'Be careful',
    iconType: 'alert',
    iconColor: 'warning',
    description: (
      <>
        <strong>Don&apos;t leave out sub-sections</strong> as this would render
        the whole as artificial.
      </>
    ),
  },
];

const unsupportedTooltip = (
  <EuiIconTip
    type="iInCircle"
    color="subdued"
    content="Elastic Charts doesn’t provide this functionality yet."
    iconProps={{
      className: 'eui-alignTop',
    }}
  />
);

const orderingTooltip = (
  <EuiIconTip
    type="iInCircle"
    color="subdued"
    content={
      <EuiImage
        url={pieSliceOrderImg}
        alt="Photo of a page in the book referencing the ordering of largest slice on top."
        caption={
          <small>
            Wong, Donna M.{' '}
            <em>
              The Wall Street Journal Guide to Information Graphics: The Dos and
              Don&apos;ts of Presenting Data, Facts, and Figures.
            </em>{' '}
            W. W. Norton & Company, 2013.
          </small>
        }
      />
    }
    iconProps={{
      className: 'eui-alignTop',
    }}
  />
);

export const ElasticChartsPieExample = {
  title: 'Part to whole comparisons',
  intro: (
    <Fragment>
      <ExternalBadge />
      <EuiSpacer size="l" />
      <EuiFlexGroup responsive={false} wrap>
        {introCards.map((card) => (
          <EuiFlexItem key={card.title} style={{ minWidth: 170 }}>
            <EuiCard
              layout="horizontal"
              title={
                <EuiFlexGroup
                  gutterSize="s"
                  responsive={false}
                  alignItems="center"
                >
                  <EuiFlexItem grow={false}>
                    <EuiIcon type={card.iconType} color={card.iconColor} />
                  </EuiFlexItem>
                  <EuiFlexItem>{card.title}</EuiFlexItem>
                </EuiFlexGroup>
              }
              titleElement="h2"
              description={card.description}
            />
          </EuiFlexItem>
        ))}
      </EuiFlexGroup>
    </Fragment>
  ),
  sections: [
    {
      title: 'Pie and donut charts',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: pieSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: pieHtml,
        },
      ],
      text: (
        <>
          <p>
            A common argument is made that pie charts are not usually the best
            representation for understanding data. However there are situations
            where pie charts are useful. Like when:
          </p>
          <ul>
            <li>There are a maximum of 6 slices (divisions)</li>
            <li>The values are around 25%, 50% or 75%</li>
            <li>One of the categories is much bigger than the others</li>
          </ul>
          <p>
            The guidelines for{' '}
            <EuiToolTip
              title="Yes, donut charts are ok."
              content={
                <>
                  It was originally thought that comparing the angles of the
                  center vertices of the slices were how viewers read pie
                  charts. However, certain research shows that it is the arc and
                  area that are the crucial parts to understanding giving donut
                  charts a firm foothold in the circular graph category.
                  <br />
                  <br />
                  Click the link to read more on the study.
                </>
              }
            >
              <EuiLink href="http://kosara.net/publications/Skau-EuroVis-2016.html">
                donut charts
              </EuiLink>
            </EuiToolTip>{' '}
            are the same for pie charts. The empty center of donut charts can
            provide a place to display additional/related information
            <EuiIconTip
              type="iInCircle"
              color="subdued"
              content="Elastic Charts doesn’t provide this functionality directly, but there is a workaround. See the 'Sunbursts and treemaps' example further down the page."
              iconProps={{
                className: 'eui-alignTop',
              }}
            />
            .
          </p>
          <EuiCallOut
            color="warning"
            title={
              <>
                Elastic Charts&apos;{' '}
                <EuiLink href="https://github.com/elastic/elastic-charts/issues/518">
                  partition charts do not currently support theming
                </EuiLink>{' '}
                through the <EuiCode>{'<Settings />'}</EuiCode> component.
              </>
            }
          >
            <p>
              {' '}
              EUI provides a separate key for use with
              <EuiCode language="ts">
                {'Partition.config={{...EUI_CHARTS_THEME_LIGHT.partition}}'}
              </EuiCode>
              . The chart colors also need to be passed a different way via{' '}
              <EuiCode language="ts">
                {'Partition.layers.shape.fillColor'}
              </EuiCode>
              . See the snippet for full details.
            </p>
          </EuiCallOut>
        </>
      ),
      demo: <PieChart />,
      snippet: `import { EUI_CHARTS_THEME_DARK, EUI_CHARTS_THEME_LIGHT } from '@elastic/eui/dist/eui_charts_theme';

const euiChartTheme = isDarkTheme ? EUI_CHARTS_THEME_DARK : EUI_CHARTS_THEME_LIGHT;
const euiPartitionConfig = euiChartTheme.partition;

<Chart size={{height: 200}}>
  <Partition
    data={[
      {
        category: 'Name',
        percent: 50,
      },
    ]}
    valueAccessor={d => Number(d.percent)}
    valueFormatter={() => ''} // Hide the slice value if data values are already in percentages
    layers={[
      {
        groupByRollup: d => d.category,
        shape: {
          fillColor: d => euiChartTheme.theme.colors.vizColors[d.sortIndex],
        },
      },
    ]}
    config={{
      ...euiPartitionConfig,
      emptySizeRatio: 0.4, // To create a donut chart
      clockwiseSectors: false, // For correct slice order
    }}
  />
</Chart>`,
    },
    {
      title: 'Slices and labelling',
      text: (
        <>
          <p>
            Try to keep the labels <strong>within the slices</strong> (or just
            outside)
            <EuiIconTip
              type="iInCircle"
              color="subdued"
              content="Elastic charts will do this automatically."
              iconProps={{
                className: 'eui-alignTop',
              }}
            />{' '}
            and consider appending their values. However, if there are many
            small slices or long labels, use a legend, especially one that
            displays the values in a table format with right aligned values.
          </p>
          <h3>Other slices</h3>
          <p>
            Again, pie charts should have no more than six slices. However, it
            can be beneficial to <strong>group smaller/overflow slices</strong>{' '}
            into a single “Other” category. Careful consideration should be
            given when doing so as this could end up being the largest category
            and therefore obscuring the meaning of the chart.
          </p>
          <h3>Slice order</h3>
          <p>
            The order of the slices should always{' '}
            <strong>start from the 12 o’clock position</strong>, showing the
            largest slice in the clockwise position then the rest ordering
            counterclockwise in descending order.{orderingTooltip} However,
            categories that have a natural order, should follow this natural
            order, be it low to high or good to bad.{unsupportedTooltip}
          </p>
        </>
      ),
      demo: <PieSlices />,
    },
    {
      title: 'Sunbursts and treemaps',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: treemapsSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: treemapsHtml,
        },
      ],
      text: (
        <>
          <p>
            Multi-level pie charts (also known as sunbursts) and treemaps are
            great for visualizing hierarchical relationships and for quickly
            referencing the overall data comparison. However, they’re not meant
            to represent trends or explicit/detailed value comparison.
          </p>
          <p>
            Below are some basic examples and how EUI supports them with
            theming. However, this site will not document the best uses of these
            chart types. For more guidance, go to the{' '}
            <EuiLink href="https://elastic.github.io/elastic-charts">
              Elastic Charts documentation
            </EuiLink>
            .
          </p>
        </>
      ),
      demo: <Treemaps />,
    },
    {
      title: 'Alternatives',
      text: (
        <>
          <p>
            Most pie/donut/sunburst chart data can be <strong>better</strong>{' '}
            explained using bar charts with different configurations. You should
            definitely <strong>not</strong> use pie charts when:
          </p>
          <ul>
            <li>
              You want users to <strong>compare</strong> the size of slices
            </li>
            <li>You have more than 6 slices</li>
            <li>
              You need multiple pie charts to compare multiple data sets, use
              part-to-whole bar charts with <strong>percentages</strong>
            </li>
            <li>You have negative values</li>
          </ul>
          <p>
            And under no circumstances should you enlarge or explode slices.
            This leads to{' '}
            <EuiLink href="https://digitalblog.ons.gov.uk/2017/02/28/the-humble-pie-chart-part2/">
              errors in understanding
            </EuiLink>
            .
          </p>
        </>
      ),
      demo: <PieAlts />,
    },
  ],
};
