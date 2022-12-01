/* eslint-disable @typescript-eslint/no-var-requires */
import React, { Fragment } from 'react';
import { GuideSectionTypes } from '../../components';

import { ExternalBadge } from './shared';

const themingSource = require('!!raw-loader!./theming');

import {
  EuiSpacer,
  EuiText,
  EuiLink,
  EuiImage,
} from '../../../../src/components';

import barchart_donts_03 from '../../images/barchart_donts_03.png';
import barchart_donts_02 from '../../images/barchart_donts_02.png';
import barchart_donts_01 from '../../images/barchart_donts_01.png';
import barchart_choices_01 from '../../images/barchart_choices_01.png';
import barchart_categories from '../../images/barchart_categories.png';
import barchart_attributes_04 from '../../images/barchart_attributes_04.png';
import barchart_attributes_03 from '../../images/barchart_attributes_03.png';
import barchart_attributes_02 from '../../images/barchart_attributes_02.png';
import barchart_attributes_01 from '../../images/barchart_attributes_01.png';
import barchart_anatomy from '../../images/barchart_anatomy.png';
import barchart_plugin from '../../images/barchart_plugin.jpg';

export const Barchart = {
  title: 'Barchart',
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
    </Fragment>
  ),
  sections: [
    {
      title: 'Definition and Anatomy',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: themingSource,
        },
      ],
      text: (
        <Fragment>
          <p>
            A bar chart (or sometimes bar graph) is a chart that presents
            categorical data with rectangular bars with heights or lengths
            proportional to the values that they represent. It can be orientated
            vertically or horizontally. In case of multiple values, bars can be
            either stacked or grouped. <br />
            <br />
            Bar charts are best suited to represent categorical data, a specific
            typology of data that is structured in discrete groups such as
            typology of logs, host name or day of the week.
          </p>
          <EuiImage
            alt="Anatomy of barchart."
            url={barchart_anatomy}
            size="680px"
          />
          <p>
            Bar charts are represented as rectangles that grow from a common
            baseline that usually correspond to the categorical axis. Each bar
            category is identifiable by a visually aligned label along the
            corresponding categorical axis. A quantitative axis is used to
            represent the scale of the measured value (represented by the height
            or the length of the bars) and shows a set of nicely rounded ticks
            that guide the reader and the analysis. <br />
            <br />
            In a vertical bar chart, categories appear along the horizontal
            axis, while in a horizontal bar chart, the categories appear along
            the vertical axis.
            <br />
            The biggest strength of a bar chart relies on how easy it is to
            visually perceive differences among these bars height/length and
            therefore quickly compare these discrete categories.
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
            Categorical data are usually qualitative and represent groups of
            data points such as hosts in a cluster, months of the year, log
            error groups, applications/services.
            <br />
            <br /> Discrete time intervals can also be represented, but requires
            some adjustment to correctly represent them visually and
            semantically. Depending on the number of discrete time intervals and
            the interval size each bar can be presented as a discrete ordinal
            category (for example when representing the months of a year) or as
            a continuous histogram (for example when representing a 6 hour
            window with 1 minute intervals, in this case the concept of discrete
            groups is faded out by the continuous nature of the time, and the
            bars are better represented with no boundaries between them to
            represent such continuity).
            <br />
            <br /> It is possible to represent a hierarchical set of categories
            by applying colors to the sub-categories: for example if we want to
            represent monthly statistics of two different sets, like the monthly
            memory usage of two different services: each service is coded with a
            color and represented with its own set of monthly bars.
          </p>
          <EuiImage
            alt="Representation of categories thorugh barcharts."
            url={barchart_categories}
            size="640px"
          />
          <p>
            The human eye is particularly good in discerning the height
            differences among two or more elements aligned on the same baseline.
            and this is why this chart is so important and immediate. Solely
            relying on the height of bars, this typology of chart optimizes the
            comprehension of differences among categories (bars) and therefore
            we can consider it the best option when we have to depict even small
            changes in values across options.
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
              <li>
                Which are the most frequent response types across my hosts?
              </li>{' '}
              <li>What are the top five hosts producing more error logs?</li>{' '}
              <li>What is the most selling product category?</li>{' '}
              <li>Are my network interface bandwidths used equally?</li>
              <li>
                {' '}
                Is the traffic more/less demanding on a specific interface?
              </li>
              <li>Which deployed services are demanding more memory?</li>
              <li> How many hourly logs did we ingest during the last week?</li>
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
                <strong>Histogram →</strong> when you have a continuous
                dimension that is divided into discrete intervals instead of a
                set of categorical dimensions (such as a time based dataset) .
                The histogram usually represents a frequency distribution, but
                can in case be adapted for showing other distributions as well.
              </li>{' '}
              <li>
                <strong>Line chart →</strong> When you have a set of discrete
                but ordinal categories or intervals (for example with discrete
                time bins, or age groups). The line chart changes the reading
                paradigm and helps you understand the trends across the overall
                set of ordinal categories, more than compare them.
              </li>{' '}
              <li>
                <strong>Pie chart →</strong> when you are representing a
                complete set divided into their forming categories and the sum
                of the values represent the whole (for example the total logs
                count divided by all the possible types). With such charts the
                questions answered are different and allows you to understand
                the participation of each single category into the whole set.
              </li>{' '}
            </ol>
          </p>
        </Fragment>
      ),
    },
    {
      title: 'Relevant attributes',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: themingSource,
        },
      ],
      text: (
        <Fragment>
          <p>
            <strong>Horizontal / Vertical orientation →</strong> Bars can be
            oriented according to our needs, the horizontal orientation is
            better to represent long labels such as ID or host names and to
            represent a long list of bars, while the vertical orientation is
            more common since it&apos;s typically associated with histograms.
          </p>
          <EuiImage
            alt="Horizontal and vertical barchart"
            url={barchart_attributes_02}
            size="640px"
          />
          <p>
            <strong>Stacked bar chart →</strong> A stacked bar represents
            multiple data series stacked on top of each other. This chart is
            used to show how a larger entity is subdivided into its components
            and the relative effect each component has on the total entity. Each
            data series is identified by a different shade, color, or pattern
            (generally explained in a legend). Depending on the nature of the
            data, the largest, most important, or least variable components
            might be placed on the bottom of the stack.
            <br />
            <br /> <strong>Grouped bar chart →</strong> Similarly to a stacked
            bar chart, the grouped one represents multiple data series aligned
            side-by-side. This chart is used to compare single bars among each
            group and provide a way to compare them across different groups.
            Keep in mind that you should always stack or group bars that
            represent the same measurement unit. Never stack or group different
            parameters (eg. count of logs and bytes).
          </p>
          <EuiImage
            alt="Stacked and grouped barchart"
            url={barchart_attributes_01}
            size="640px"
          />
          <p>
            <strong>100% stacked bar chart →</strong> A stacked barchart shows
            absolute values and allows the user to compare across stacks. If you
            instead need to understand the relative percentage of each element
            within a stack you can use a 100% stacked bar chart.
          </p>
          <EuiImage
            alt="100% stacked barchart"
            url={barchart_attributes_03}
            size="640px"
          />
          <p>
            <strong>Histogram → </strong>Bar Charts are typically used to
            represent value across categories but one slightly different variant
            can be used to represent distribution of values across continuous
            scale, such as time. In this case we are talking about a histogram,
            a specific typology of barchart which leaves no margins between bars
            since its goal is to cover entirely the set of values that we are
            displaying, dividing it into chunks/buckets/ranges.
          </p>
        </Fragment>
      ),
    },
    {
      title: 'DOs',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: themingSource,
        },
      ],
      text: (
        <Fragment>
          <p>
            <strong>Display up to 5 colors/subcategories →</strong> When you
            apply a break-down-by functionality, be careful of the number of
            colors that you are displaying. Unfortunately in most times, a
            number bigger than 5 would create confusion and a really messy chart
            with elements too small to be seen. Always try to reduce the number
            of colors, rely on the “Other” category to group the smallest ones
            without losing them.
          </p>
          <EuiImage
            alt="Example of barchart with an excessive number of categories displayed."
            url={barchart_donts_01}
            size="640px"
          />
          <p>
            <strong>
              Use bars that are big enough to be read and selected →{' '}
            </strong>
            When building a bar chart, don&apos;t reduce the size of the bars to
            a limit where they are no longer readable or selectable. While we
            understand the need to fit more data into your chart, you should
            never forget that the goal of the chart is to be able to compare
            values and therefore it needs to be readable. Consider increasing
            the whole chart size instead of reducing too much the bar size.
          </p>
          <EuiImage
            alt="Example of barchart excessively small bars."
            url={barchart_donts_02}
            size="640px"
          />
          <p>
            <strong>Prefer horizontal bar chart →</strong> An horizontal bar
            chart can display longer categorical labels better then its vertical
            alternative. The labels will mostly never overlap each other,
            reducing the need of truncation, multi-line wrapping or rotation
            strategies to overcome such readability issue. The bar&apos;s length
            keeps its readability and comparability also in such a horizontal
            position. This orientation is recommended in most cases when a
            categorical bar chart is needed.
          </p>
          <EuiImage
            alt="Example of barchart with longer category names, better suited for horizontal orientation."
            url={barchart_donts_03}
            size="640px"
          />
          <p>
            <strong>
              Avoid representing negative values when displaying percentages →
            </strong>{' '}
            A 100% stacked bar chart is a classic representation of data able to
            show the impact of a specific category on a total. For example,
            showing how each source belongs to the overall set of logs, the
            distribution of error messages across their typologies, or any other
            kind of data subdivision. Sometimes negative values are also part of
            your “total definition” like when you are understanding the overall
            net revenue and their constituents (gross revenue and expenses).
            <br /> Always keep in mind that negative values are hard to
            represent in this particular form and even harder to communicate to
            a user/reader who doesn&apos;t know the nature of the data. <br />
            <br />
            <strong>Proportions →</strong> Especially when dealing with
            time-based bars, the chart proportions could greatly affect how we
            perceive trends and changes in values over time. Be aware of this
            risk when you decide how much space and what kind of proportions you
            should give to your chart. The following image is a good example of
            this concept, all the four charts are displaying the exact same set
            of data but the message that they convey is extremely different.
          </p>
          <EuiImage
            alt="Example of smaller and bigger barcharts, and how that affects readability."
            url={barchart_attributes_04}
            size="640px"
          />
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
            <strong>Positive and negative values →</strong> Displaying positive
            and negative values together might be a little complex, a common
            practice that we adopted is to separate them with the chart baseline
            and to display the positive values on the upper part of the chart
            while showing the negative values in the lower part.
          </p>
          <EuiImage
            alt="Example of display of negative values in barcharts."
            url={barchart_choices_01}
            size="640px"
          />
        </Fragment>
      ),
    },
    {
      title: 'Resources for designers',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: themingSource,
        },
      ],
      text: (
        <Fragment>
          <p>
            <strong>Figma plugin for random barcharts →</strong>
            <EuiLink
              href="https://figma.com/community/plugin/1081612471919725568/Random-Barchart"
              target="_blank"
            >
              Plugin Link
            </EuiLink>
          </p>
          <EuiImage
            alt="Figma plugin for random barcharts cover."
            url={barchart_plugin}
            size="640px"
          />
        </Fragment>
      ),
    },
  ],
};
