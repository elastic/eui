import React, { Fragment } from 'react';
import { ExternalBadge } from './shared';

import {
  EuiSpacer,
  EuiCard,
  EuiIcon,
  EuiFlexGroup,
  EuiFlexItem,
  EuiLink,
  EuiIconTip,
  EuiToolTip,
} from '../../../../src/components';

import PieChart from './pie';

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

export const ElasticChartsPieExample = {
  title: 'Part to whole comparisons',
  intro: (
    <Fragment>
      <ExternalBadge />
      <EuiSpacer size="l" />
      <EuiFlexGroup responsive={false} wrap>
        {introCards.map(card => (
          <EuiFlexItem key={card.title} style={{ minWidth: 170 }}>
            <EuiCard
              layout="horizontal"
              title={
                <EuiFlexGroup
                  gutterSize="s"
                  responsive={false}
                  alignItems="center">
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
      <EuiSpacer size="l" />
    </Fragment>
  ),
  sections: [
    {
      title: 'Pie and donut charts',
      text: (
        <>
          <p>
            There are arguments that pie charts are not usually the best
            representation for understanding data. However there are situations
            where pie charts are useful. Like when:
          </p>
          <ul>
            <li>there are a maximum of 6 slices (divisions);</li>
            <li>the values are around 25%, 50% or 75%;</li>
            <li>one of the categories is much bigger than the others.</li>
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
              }>
              <EuiLink href="http://kosara.net/publications/Skau-EuroVis-2016.html">
                donut charts
              </EuiLink>
            </EuiToolTip>{' '}
            are the same for pie charts. The empty center of donut charts can
            provide a place to display additional/related information
            <EuiIconTip
              type="iInCircle"
              color="subdued"
              content="Elastic charts doesn’t provide this functionality yet."
              iconProps={{
                className: 'eui-alignTop',
              }}
            />
            .
          </p>
        </>
      ),
      demo: <PieChart />,
    },
    {
      title: 'Slices and labelling',
      text: (
        <>
          <p>
            Try to keep the labels <strong>within the slices</strong> (or just
            outside) and consider appending their values. However, if there are
            many small slices or long labels, use a legend, especially one that
            displays the values in a table format with right aligned values.
          </p>
          <p>
            Again, pie charts should have no more than six slices. However, it
            can be beneficial to <strong>group smaller/overflow slices</strong>{' '}
            into a single “Other” category. Careful consideration should be
            given when doing so as this could end up being the largest category
            and therefore obscuring the meaning of the chart.
          </p>
          <h3>Slice order</h3>
          <p>
            The order of the slices should alway{' '}
            <strong>start from the 12 o’clock position</strong> and continue
            clockwise. Categorical slices that have no inherent order are best
            displayed in order of size. While categories that do have a natural
            order, must follow this natural order, be it low to high or good to
            bad.
          </p>
        </>
      ),
      // demo: <PieChart />,
    },
    {
      title: 'Treemaps and other variations/alternatives',
      text: (
        <>
          <p>Definitely don’t use pie charts when:</p>
          <ul>
            <li>
              You want users to compare the size of slices, use a bar chart
              instead
            </li>
            <li>You have more than 6 slices, consider a stacked bar chart</li>
            <li>
              You need multiple pie charts to compare multiple data sets: Use
              part-to-whole bar charts
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
          <p>
            Multi-level (also known as sunbursts) are great for visualizing
            hierarchical relationships and for quickly referencing the overall
            data comparison. However, they’re terrible for displaying a true
            understanding of the values.
          </p>
          <p>
            A previously mentioned, there are some better and basic alternatives
            to pie/donut charts such as:
          </p>
        </>
      ),
      // demo: <PieChart />,
    },
  ],
};
