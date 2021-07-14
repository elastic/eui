import React from 'react';
import {
  EuiCallOut,
  EuiCode,
  EuiCodeBlock,
  EuiSpacer,
  EuiText,
} from '../../../../src/components';
import { GuideSectionTypes } from '../../components';
import { ExternalBadge } from './shared';
import { TextureMultiSeriesChart } from './texture';
import { TexturedStylesProps, ChartProps } from './texture_props';
import { GoalChart } from './goal';

const TextureMultiSeriesChartSource = require('!!raw-loader!./texture');
const GoalChartSource = require('!!raw-loader!./goal');

export const ElasticChartsAccessibilityExample = {
  title: 'Accessibility features',
  intro: (
    <>
      <ExternalBadge />
      <EuiSpacer size="l" />
      <EuiText>
        <p>
          Elastic charts is becoming more and more accessible for all users.
        </p>
        <p>
          <strong>Available a11y-related features</strong>
        </p>
        <ul>
          <li>Chart titles</li>
          <li>Chart descriptions</li>
          <li>
            Chart data in tabular form<sup>*</sup>
          </li>
          <li>
            Texture fill<sup>*</sup>
          </li>
          <li>
            Semantic groupings<sup>*</sup>
          </li>
        </ul>
        <p>
          <small>
            <sup>*</sup>Not all chart types that may benefit from this feature
            have it implemented as of yet
          </small>
        </p>
      </EuiText>
    </>
  ),
  sections: [
    {
      title: 'Titles',
      text: (
        <>
          <p>
            <EuiCode>{'ariaLabel'}</EuiCode> and{' '}
            <EuiCode>{'ariaLabelledBy'}</EuiCode> props can be set through the{' '}
            <EuiCode>{'<Settings />'}</EuiCode> component.
            <EuiSpacer />
            <EuiCode>{'ariaLabel'}</EuiCode> takes a string label which will be
            visually hidden whereas the
            <EuiCode>{'ariaLabelledBy'}</EuiCode> prop can tie the chart to
            other accessible elements elsewhere in your app.
          </p>
          <EuiCodeBlock language="jsx" isCopyable fontSize="s">
            {`<Fragment>
  <h1 id="randomHeadingId">Days of the week: weekdays vs weekends</h1>
  <Chart>
    <Settings
      ariaLabelledby="randomHeadingId"
    />
    <BarSeries {...props} />
  </Chart>
</Fragment>`}
          </EuiCodeBlock>
          <p>
            If using <EuiCode>{'ariaLabel'}</EuiCode>, you can set a heading
            level for it by passing in{' '}
            <EuiCode>{'ariaLabelHeadingLevel'}</EuiCode>.{' '}
            <EuiCode>{'h1'}</EuiCode> through <EuiCode>{'h6'}</EuiCode> are
            valid options (<EuiCode>{'p'}</EuiCode> is the default).
          </p>

          <p>
            You may want to set a heading level if there are multiple charts on
            the page but you want to draw attention to a select few or if a
            specific chart is the main content of the page.
          </p>
          <EuiCodeBlock language="jsx" isCopyable fontSize="s">
            {`<Chart>
  <Settings
    ariaLabel="Days of the week: weekdays vs weekends"
    ariaLabelHeadingLevel="h1"
  />
  <BarSeries {...props} />
</Chart>`}
          </EuiCodeBlock>
        </>
      ),
    },
    {
      title: 'Descriptions',
      text: (
        <>
          <p>
            <EuiCode>{'ariaDescription'}</EuiCode> and{' '}
            <EuiCode>{'ariaDescribedBy'}</EuiCode> props can be set through the{' '}
            <EuiCode>{'<Settings />'}</EuiCode> component.
            <EuiCode>{'ariaDescription'}</EuiCode> takes a string description
            which will be visually hidden whereas{' '}
            <EuiCode>{'ariaDescribedBy'}</EuiCode> prop takes an{' '}
            <EuiCode>{'id'}</EuiCode> that you have rendered elsewhere in your
            app.
          </p>
          <EuiCodeBlock language="jsx" isCopyable fontSize="s">
            {`<Chart>
  <Settings
    ariaLabel="Days of the week: weekdays vs weekends"
    ariaDescription="Bar one is labelled weekdays and has a value of 5. Bar two is labelled weekends and has a value of 2."
  />
  <BarSeries {...props} />
</Chart>`}
          </EuiCodeBlock>
          <EuiCallOut
            title={
              <>
                <EuiCode>{'ariaDescribedBy'}</EuiCode> will override{' '}
                <EuiCode>{'ariaDescription'}</EuiCode> if both are specified.
              </>
            }
            color="warning"
            iconType="alert"
          />
          <EuiSpacer />
          <p>
            <EuiCode>{'ariaUseDefaultSummary'}</EuiCode> is a boolean defaulted
            to <EuiCode>{'true'}</EuiCode>. The default summary is bare bones
            and only reports the chart type(s). Some chart types provide more
            information but today that is only Gauge and Goal charts. If you are
            passing in a custom description, you can disable this prop.
          </p>
          <EuiCodeBlock language="jsx" isCopyable fontSize="s">
            {`<Fragment>
  <h1 id="randomHeadingId">Days of the week: weekdays vs weekends</h1>
  <p id="randomDescId">Bar chart with two bars. Bar one is labelled weekdays and has a value of 5. Bar two is labelled weekends and has a value of 2.</p>
  <Chart>
    <Settings
      ariaLabelledby="randomHeadingId"
      ariaDescribedBy="randomDescId"
      ariaUseDefaultSummary={false}
    />
    <BarSeries {...props} />
  </Chart>
</Fragment>`}
          </EuiCodeBlock>
        </>
      ),
    },
    {
      title: 'Tables',
      text: (
        <>
          <p>
            The <EuiCode>{'ariaTableCaption'}</EuiCode> prop is available to set
            a caption to the data table for users of assistive technologies. The
            below table is an example autogenerated for a sunburst chart. If
            there are many data points, the data table will only generate some
            of the data each time to avoid overwhelming users.
          </p>
          <EuiCallOut
            title={
              <>
                Currently, data tables are only available for{' '}
                <strong>partition charts</strong>.
              </>
            }
            iconType="visPie">
            <p>
              At time of this writing, partition charts include: sunburst,
              treemap, icicle, flame, and mosaic.
            </p>
          </EuiCallOut>
          <EuiCodeBlock language="html">
            <table>
              <caption>
                The table fully represents the dataset of 10 data points
              </caption>
              <thead>
                <tr>
                  <th scope="col">Label</th>
                  <th scope="col">Value</th>
                  <th scope="col">Percentage</th>
                </tr>
              </thead>
              <tbody>
                <tr tabIndex="-1">
                  <th>Mineral fuels, lubricants and related materials</th>
                  <td>$1,930&nbsp;Bn</td>
                  <td>22%</td>
                </tr>
                <tr tabIndex="-1">
                  <th>Chemicals and related products</th>
                  <td>$848&nbsp;Bn</td>
                  <td>10%</td>
                </tr>
                <tr tabIndex="-1">
                  <th>Miscellaneous manufactured articles</th>
                  <td>$817&nbsp;Bn</td>
                  <td>9%</td>
                </tr>
                <tr tabIndex="-1">
                  <th>Manufactured goods classified chiefly by material</th>
                  <td>$745&nbsp;Bn</td>
                  <td>9%</td>
                </tr>
                <tr tabIndex="-1">
                  <th>Commodities and transactions not classified elsewhere</th>
                  <td>$451&nbsp;Bn</td>
                  <td>5%</td>
                </tr>
                <tr tabIndex="-1">
                  <th>Crude materials, inedible, except fuels</th>
                  <td>$394&nbsp;Bn</td>
                  <td>5%</td>
                </tr>
                <tr tabIndex="-1">
                  <th>Food and live animals</th>
                  <td>$353&nbsp;Bn</td>
                  <td>4%</td>
                </tr>
                <tr tabIndex="-1">
                  <th>Beverages and tobacco</th>
                  <td>$54&nbsp;Bn</td>
                  <td>1%</td>
                </tr>
                <tr tabIndex="-1">
                  <th>Animal and vegetable oils, fats and waxes</th>
                  <td>$36&nbsp;Bn</td>
                  <td>0%</td>
                </tr>
                <tr tabIndex="-1">
                  <th>Machinery and transport equipment</th>
                  <td>$3,110&nbsp;Bn</td>
                  <td>36%</td>
                </tr>
              </tbody>
            </table>
          </EuiCodeBlock>
          <p>
            Consider the table caption supplementary to the description. Use it
            to fill in the gaps that might be created when converting a chart to
            a tabular format.
          </p>
        </>
      ),
    },
    {
      title: 'Texture fill',
      text: (
        <>
          <p>
            You can set a texture fill for charts with{' '}
            <EuiCode>{'TextureStyles'}</EuiCode> interface.
          </p>
          <EuiCallOut
            title={
              <>
                Currently, texture fills are only available for{' '}
                <strong>XY charts</strong>.
              </>
            }
            iconType="visAreaStacked">
            <p>
              At time of this writing, XY charts include: area, bar, bubble,
              histogram, line, and heatmap.
            </p>
          </EuiCallOut>
        </>
      ),
      props: { TexturedStylesProps, ChartProps },
      demo: <TextureMultiSeriesChart />,
      source: [
        {
          type: GuideSectionTypes.JS,
          code: TextureMultiSeriesChartSource,
        },
      ],
    },
    {
      title: 'Semantic groupings',
      text: (
        <>
          <p>
            You can add meaning to your color segments by using the{' '}
            <EuiCode>{'bandLabels'}</EuiCode> prop.
          </p>
          <EuiCallOut
            title={
              <>
                Currently, semantic groupings are only available for{' '}
                <strong>goal and gauge charts</strong>.
              </>
            }
            iconType="visGoal"
          />
        </>
      ),
      demo: <GoalChart />,
      source: [
        {
          type: GuideSectionTypes.JS,
          code: GoalChartSource,
        },
      ],
    },
  ],
};
