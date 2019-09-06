import React, { Fragment } from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  EuiCallOut,
  EuiDualRange,
  EuiRange,
  EuiSpacer,
  EuiCode,
} from '../../../../src/components';

import {
  EuiRangeLevels,
  LEVEL_COLORS,
} from '../../../../src/components/form/range/range_levels';

import { EuiRangeTicks } from '../../../../src/components/form/range/range_ticks';

import { EuiRangeInput } from '../../../../src/components/form/range/range_input';

import DualRangeExample from './dual_range';
const dualRangeSource = require('!!raw-loader!./dual_range');
const dualRangeHtml = renderToHtml(DualRangeExample);

import RangeExample from './range';
const rangeSource = require('!!raw-loader!./range');
const rangeHtml = renderToHtml(RangeExample);

import InputExample from './input';
const inputSource = require('!!raw-loader!./input');
const inputHtml = renderToHtml(InputExample);

import TicksExample from './ticks';
const ticksSource = require('!!raw-loader!./ticks');
const ticksHtml = renderToHtml(TicksExample);

import LevelsExample from './levels';
const levelsSource = require('!!raw-loader!./levels');
const levelsHtml = renderToHtml(LevelsExample);

import StatesExample from './states';
const statesSource = require('!!raw-loader!./states');
const statesHtml = renderToHtml(StatesExample);

import InputOnlyExample from './input_only';
const inputOnlySource = require('!!raw-loader!./input_only');
const inputOnlyHtml = renderToHtml(InputOnlyExample);

export const RangeControlExample = {
  title: 'Range sliders',
  intro: (
    <Fragment>
      <EuiCallOut color="warning" title="Understanding precision">
        <p>
          Range sliders should only be used when{' '}
          <strong>the precise value is not considered important</strong>. If the
          precise value does matter, add the <EuiCode>showInput</EuiCode> prop
          or use a <EuiCode>EuiFieldNumber</EuiCode> instead.
        </p>
      </EuiCallOut>
      <EuiSpacer />
    </Fragment>
  ),
  sections: [
    {
      title: 'Single range',
      text: (
        <Fragment>
          <h3>Required</h3>
          <ul>
            <li>
              <EuiCode>min, max</EuiCode>: Sets the range values.
            </li>
            <li>
              <EuiCode>step</EuiCode>: Technically not required because the
              default is <EuiCode>1</EuiCode>.
            </li>
            <li>
              <EuiCode>value, onChange</EuiCode>
            </li>
          </ul>
          <h3>Optional</h3>
          <ul>
            <li>
              <EuiCode>showLabels</EuiCode>: While currently considered
              optional, the property should be added to explicitly state the
              range to the user.
            </li>
            <li>
              <EuiCode>showValue</EuiCode>: Displays a tooltip style indicator
              of the selected value. You can add <EuiCode>valuePrepend</EuiCode>{' '}
              and/or <EuiCode>valueAppend</EuiCode> to bookend the value with
              custom content.
            </li>
            <li>
              <EuiCode>showRange</EuiCode>: Displays a thickened line from the
              minimum value to the selected value.
            </li>
          </ul>
        </Fragment>
      ),
      source: [
        {
          type: GuideSectionTypes.JS,
          code: rangeSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: rangeHtml,
        },
      ],
      props: {
        EuiRange,
      },
      demo: <RangeExample />,
      snippet: [
        `<EuiRange
  min={100}
  max={200}
  step={0.05}
  value={this.state.value}
  onChange={this.onChange}
  showLabels
/>`,
        `// Show tooltip
<EuiRange
  min={100}
  max={200}
  value={this.state.value}
  onChange={this.onChange}
  showLabels
  showValue
/>`,
        `// Show thickened range and prepend a string to the tooltip
<EuiRange
  min={100}
  max={200}
  value={this.state.value}
  onChange={this.onChange}
  showLabels
  showRange
  showValue
  valuePrepend="100 - "
/>`,
      ],
    },
    {
      title: 'Dual range',
      text: (
        <Fragment>
          <p>
            The EuiDualRange accepts almost all the same props as the regular
            EuiRange, with the exception of <EuiCode>showRange</EuiCode> which
            is on by default, and <EuiCode>showValue</EuiCode> since tooltips
            don&apos;t fit properly when there are two.
          </p>
          <EuiCallOut color="warning" title="Retrieving field values">
            <p>
              Two-value <EuiCode>input[type=range]</EuiCode> elements are not
              part of the HTML5 specification. Because of this support gap,
              EuiDualRange cannot expose a native <EuiCode>value</EuiCode>{' '}
              property for native form to consumption.
              <strong>
                The React <EuiCode>onChange</EuiCode> prop is the recommended
                method for retrieving the upper and lower values.
              </strong>
            </p>
            <p>
              EuiDualRange does use native inputs to help validate step values
              and range limits. These may be used as form values when{' '}
              <EuiCode>showInput</EuiCode> is in use. The alternative is to
              store values in <EuiCode>input[type=hidden]</EuiCode>.
            </p>
          </EuiCallOut>
        </Fragment>
      ),
      source: [
        {
          type: GuideSectionTypes.JS,
          code: dualRangeSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: dualRangeHtml,
        },
      ],
      props: {
        EuiDualRange,
      },
      demo: <DualRangeExample />,
      snippet: `<EuiDualRange
  min={100}
  max={200}
  step={10}
  value={this.state.value}
  onChange={this.onChange}
  showLabels
/>`,
    },
    {
      title: 'Inputs',
      text: (
        <Fragment>
          <p>
            The <EuiCode>showInput</EuiCode> prop, will append or bookend the
            range slider with number type inputs. This is important for allowing
            precise values to be entered by the user.
          </p>
          <p>
            Passing empty strings as the <EuiCode>value</EuiCode> to the ranges,
            will allow the inputs to be blank, though the range handles will
            show at the min (or max and min) positions.
          </p>
        </Fragment>
      ),
      source: [
        {
          type: GuideSectionTypes.JS,
          code: inputSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: inputHtml,
        },
      ],
      demo: <InputExample />,
      props: { EuiRangeInput },
      snippet: ['<EuiRange showInput />', '<EuiDualRange showInput />'],
    },
    {
      title: 'Tick marks',
      text: (
        <Fragment>
          <p>
            To show clickable tick marks and labels at a given interval, add the
            prop <EuiCode>showTicks</EuiCode>. By default, tick mark interval is
            bound to the <EuiCode>step</EuiCode> prop, however, you can set a
            custom interval without changing the actual steps allowed by passing
            a number to the <EuiCode>tickInterval</EuiCode> prop.
          </p>
          <p>
            To pass completely custom tick marks, you can pass an array of
            objects that require a <EuiCode>value</EuiCode> and{' '}
            <EuiCode>label</EuiCode>. The value must be included in the range of
            values (min-max), though the label may be anythin you choose.
          </p>
          <EuiCallOut color="warning" title="Maximum of 20 ticks allowed">
            <p>
              Spacing can get quite cramped with lots of ticks so we max out the
              number to 20.
            </p>
          </EuiCallOut>
        </Fragment>
      ),
      source: [
        {
          type: GuideSectionTypes.JS,
          code: ticksSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: ticksHtml,
        },
      ],
      demo: <TicksExample />,
      props: { EuiRangeTicks },
      snippet: [
        '<EuiRange step={10} showTicks />',
        '<EuiRange showTicks tickInterval={20} />',
        `<EuiDualRange
  showTicks
  ticks={[
    { label: '20kb', value: 20 },
    { label: '100kb', value: 100 }
  ]}
/>`,
      ],
    },
    {
      title: 'Levels',
      text: (
        <Fragment>
          <p>
            To create colored indicators for certain intervals, pass an array of
            objects that include a <EuiCode>min</EuiCode>,{' '}
            <EuiCode>max</EuiCode> and <EuiCode>color</EuiCode>. Color options
            are <EuiCode>{JSON.stringify(LEVEL_COLORS, null, 2)}</EuiCode>.
          </p>
          <p>
            Be sure to then add an <EuiCode>aria-describedby</EuiCode> and match
            it to the id of a <EuiCode>EuiFormHelpText</EuiCode>.
          </p>
        </Fragment>
      ),
      source: [
        {
          type: GuideSectionTypes.JS,
          code: levelsSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: levelsHtml,
        },
      ],
      demo: <LevelsExample />,
      props: { EuiRangeLevels },
      snippet: [
        `<EuiRange
  levels={[
    {min: 0, max: 20, color: 'danger'},
    {min: 20, max: 100, color: 'success'}
  ]}
  aria-describedBy={replaceWithID}
/>`,
        `<EuiDualRange
  levels={[
    {min: 0, max: 20, color: 'danger'},
    {min: 20, max: 100, color: 'success'}
  ]}
  aria-describedBy={replaceWithID}
/>`,
      ],
    },
    {
      title: 'Inputs with range in a dropdown',
      text: (
        <Fragment>
          <p>
            Passing <EuiCode>showInput=&quot;inputWithPopover&quot;</EuiCode>{' '}
            instead of a boolean will only display the inputs until the input is
            interacted with in which case a dropdown will appear displaying the
            actual slider.
          </p>
        </Fragment>
      ),
      source: [
        {
          type: GuideSectionTypes.JS,
          code: inputOnlySource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: inputOnlyHtml,
        },
      ],
      demo: <InputOnlyExample />,
      snippet: [
        `<EuiRange
  id=""
  value={}
  onChange={() => {}}
  showInput="inputWithPopover"
/>`,
        `<EuiDualRange
  id=""
  value={}
  onChange={() => {}}
  showInput="inputWithPopover"
/>`,
      ],
    },
    {
      title: 'Kitchen sink',
      text: (
        <Fragment>
          <p>
            Other alterations you can add to the range are{' '}
            <EuiCode>fullWidth</EuiCode>, and <EuiCode>disabled</EuiCode>.
          </p>
        </Fragment>
      ),
      source: [
        {
          type: GuideSectionTypes.JS,
          code: statesSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: statesHtml,
        },
      ],
      demo: <StatesExample />,
      snippet: [
        `<EuiRange
  id=""
  value={}
  onChange={() => {}}
  fullWidth
  disabled
  showTicks
  showInput
  showLabels
  showValue
  showRange
  tickInterval={}
  levels={[]}
  aria-describedBy={replaceWithID}
/>`,
        `<EuiDualRange
  id=""
  value={}
  onChange={() => {}}
  fullWidth
  disabled
  showLabels
  showInput
  showTicks
  ticks={[]}
  levels={[]}
  aria-describedBy={replaceWithID}
/>`,
      ],
    },
  ],
};
