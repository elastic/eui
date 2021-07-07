import React from 'react';

import { ExternalBadge } from './shared';

import {
  EuiCode,
  EuiCodeBlock,
  EuiSpacer,
  EuiCallOut,
  EuiText,
  // EuiButton,
} from '../../../../src/components';
import { TextureMultiSeriesChart } from './texture';
import { Chart } from '@elastic/charts';

const textureMultiSeriesChartSnippet = `
    <Chart size={{ height: 200 }}>
    <Settings 
          ariaLabelHeadingLevel="h3"
          ariaDescription="This chart has two series with texture fills. The bar series has squares and the area series is comprised of circles."
          ariaUseDefaultSummary={false}
      />
      <BarSeries
        key={1}
        id={'series-1'}
        barSeriesStyle={{
          rect: {
            opacity: 0.2,
            texture: {
              opacity: 1,
              offset: { x: undefined, y: undefined },
              rotation: undefined,
              shape: 'square',
              shapeRotation: undefined,
              size: 9,
              spacing: { x: undefined, y: undefined },
            },
          },
        }}
        stackAccessors={['yes']}
        data={SAMPLE_SMALL_DATA}
        curve={CurveType.CURVE_MONOTONE_X}
      />
      <AreaSeries
        key={2}
        id={'series-2'}
        areaSeriesStyle={{
          area: {
            opacity: 0.05,
            shape: 'circle',
            texture: {
              opacity: 1,
              shape: 'circle',
              rotation: undefined,
              shapeRotation: undefined,
              size: 5,
              spacing: {
                x: 0,
                y: 0,
              },
              offset: {
                x: 0,
                y: 1,
              },
            },
          },
        }}
        data={SAMPLE_SMALL_DATA_2}
      />
    </Chart>`;

export const ElasticChartsAccessiblityExample = {
  title: 'Accessibility features',
  intro: (
    <>
      <ExternalBadge />
      <EuiSpacer size="l" />
      <EuiText>
        Elastic charts is becoming more and more accessible for all users.
      </EuiText>
      <EuiSpacer />
      <EuiText>
        <strong>Available a11y-related features</strong>
      </EuiText>
      <EuiText>
        <ul>
          <li>Chart titles</li>
          <li>Chart descriptions</li>
          <li>Chart data in tabular form (partition charts)</li>
          <li>Texture fill (for xy charts)</li>
          <li>Goal chart specific details</li>
        </ul>
      </EuiText>
    </>
  ),
  sections: [
    {
      title: 'ariaDescription and ariaDescribedBy',
      text: (
        <>
          The <EuiCode>{'ariaDescription'}</EuiCode> and the{' '}
          <EuiCode>{'ariaDescribedBy'}</EuiCode> prop can be set the through the{' '}
          <EuiCode>{'<Settings />'}</EuiCode> component. The{' '}
          <EuiCode>{'ariaDescription'}</EuiCode> prop takes a string description
          which will be visually hidden whereas the{' '}
          <EuiCode>{'ariaDescribedBy'}</EuiCode> prop takes an `id` that you
          have rendered elsewhere in your app.
          <EuiSpacer />
          <EuiCallOut title="Warning" color="warning" iconType="alert">
            <EuiCode>{'ariaDescribedBy'}</EuiCode> will override{' '}
            <EuiCode>{'ariaDescription'}</EuiCode> if both are specified.
          </EuiCallOut>
          <EuiSpacer />
          The <EuiCode>{'ariaUseDefaultSummary'}</EuiCode> prop accepts true or
          false. By default, elastic charts provides a default summary for a
          screen reader. This consists of the type of chart, if it is a mixed
          chart (different types of series in the chart). For example:{' '}
          <EuiCodeBlock language="jsx" isCopyable fontSize="s">
            {`
            <dl>
              <dt>Chart type:</dt>
              <dd id="61b6b2984--defaultSummary">Mixed chart: area and line and bar chart</dd>
            </dl>`}
          </EuiCodeBlock>
          If you are passing in a custom description, you can disable this prop,
          like in the example below.
          <EuiSpacer />
          <EuiCodeBlock language="jsx" isCopyable fontSize="s">
            {`<Settings 
ariaDescription="This chart has three different types of series. There is a bar, line and area series." 
ariaUseDefaultSummary={false}
/>`}
          </EuiCodeBlock>
        </>
      ),
    },
    {
      title: 'ariaLabel and ariaLabelledBy',
      text: (
        <>
          The <EuiCode>{'ariaLabel'}</EuiCode> and the{' '}
          <EuiCode>{'ariaLabelledBy'}</EuiCode> props can be set through the{' '}
          <EuiCode>{'<Settings />'}</EuiCode> component.
          <EuiSpacer />
          <EuiCode>{'ariaLabel'}</EuiCode> takes a string label which will be
          visually hidden whereas the
          <EuiCode>{'ariaLabelledBy'}</EuiCode> prop can tie the chart to other
          accessible elements elsewhere in your app.
          <EuiSpacer />
          You can also change the heading level of the{' '}
          <EuiCode>{'ariaLabel'}</EuiCode> content (instead of the default{' '}
          <EuiCode>{'p'}</EuiCode>) by passing the{' '}
          <EuiCode>{'ariaLabelHeadingLevel'}</EuiCode> prop to the
          <EuiCode>{'<Settings />'}</EuiCode> component. Valid options are{' '}
          <EuiCode>{`h1,
          h2, h3, h4, h5, h6,`}</EuiCode>{' '}
          or
          <EuiCode>{'p'}</EuiCode>. This prop can be helpful if there are
          multiple charts on the page but you want attention drawn to a select
          few charts. If you do not want attention drawn to specific charts, you
          can leave the default for the{' '}
          <EuiCode>{'ariaLabelHeadingLevel'}</EuiCode> prop.
        </>
      ),
    },
    {
      title: 'ariaTableCaption',
      text: (
        <>
          The <EuiCode>{'ariaTableCaption'}</EuiCode> prop is available to set a
          caption to the data table for users of assistive technologies. The
          below table is autogenerated for a sunburst chart. If there are many
          data points, the data table will only generate some of the data each
          time to avoid overwhelming users.
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
          <EuiSpacer />
          The content within the <EuiCode>{'caption'}</EuiCode> can be set with
          the <EuiCode>{'ariaTableCaption'}</EuiCode> prop. This information is
          below the <EuiCode>{'ariaDescription'}</EuiCode> HTML information.
          <EuiSpacer />
          <EuiCallOut title="Warning" color="warning" iconType="alert">
            Currently, data tables are only available for{' '}
            <strong>partition charts</strong>{' '}
          </EuiCallOut>
          <EuiSpacer />
        </>
      ),
    },
    {
      title: 'Texture',
      // source: [
      //   {
      //     type: TextureMultiSeriesChart.HTML,
      //     code: `interface TexturedStylesBase {
      //       /** polygon fill color for texture */
      //       fill?: Color | ColorVariant;
      //       /** polygon stroke color for texture */
      //       stroke?: Color | ColorVariant;
      //       /** polygon stroke width for texture  */
      //       strokeWidth?: number;
      //       /** polygon opacity for texture  */
      //       opacity?: number;
      //       /** polygon opacity for texture  */
      //       dash?: number[];
      //       /** polygon opacity for texture  */
      //       size?: number;
      //       /**
      //       * The angle of rotation for entire texture
      //       * in degrees
      //       */
      //       rotation?: number;
      //       /**
      //       * The angle of rotation for polygons
      //       * in degrees
      //       */
      //       shapeRotation?: number;
      //       /** texture spacing between polygons */
      //       spacing?: Partial<Point> | number;
      //       /** overall origin offset of pattern */
      //       offset?: Partial<Point> & {
      //       /** apply offset along global coordinate axes */
      //       global?: boolean;
      //       };
      //       }

      //       interface TexturedShapeStyles extends TexturedStylesBase {
      //       /** typed of texture designs currently supported */
      //       shape: TextureShape;
      //       }

      //       interface TexturedPathStyles extends TexturedStylesBase {
      //       /** path for polygon texture */
      //       path: string | Path2D;
      //       }

      //       /**
      //       * @public
      //       *
      //       * Texture style config for area spec
      //       */
      //       export type TexturedStyles = TexturedPathStyles | TexturedShapeStyles;`,
      //   },
      // ],
      text: (
        <>
          You can set the fill for area charts with texture fills with the{' '}
          <EuiCode>{'TextureStyles'}</EuiCode> interface.
        </>
      ),
      props: { '@elastic/charts': Chart },
      demo: <TextureMultiSeriesChart />,
      snippet: textureMultiSeriesChartSnippet,
    },
    {
      title: 'Goal chart',
      text: (
        <>
          By default, elastic charts provides the following of goal charts in
          the DOM:
          <ul>
            <li>Maximum</li>
            <li>Minimum</li>
            <li>Target</li>
            <li>Current value</li>
            <li>Major label</li>
            <li>Minor label</li>
          </ul>
          <EuiSpacer />
          You can add meaning to your goal chart by passing in the{' '}
          <EuiCode>{'bandLabels'}</EuiCode> prop in the{' '}
          <EuiCode>{'Goal'}</EuiCode> component.
        </>
      ),
    },
  ],
};
