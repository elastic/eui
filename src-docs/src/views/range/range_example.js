import React from 'react';

import { GuideSectionTypes } from '../../components';

import {
  EuiCallOut,
  EuiDualRange,
  EuiRange,
  EuiCode,
} from '../../../../src/components';

import { rangeConfig, dualRangeConfig } from './playground';

import { EuiRangeLevels } from '../../../../src/components/form/range/range_levels';
import { LEVEL_COLORS } from '../../../../src/components/form/range/range_levels_colors';
import { EuiRangeLevel } from '!!prop-loader!../../../../src/components/form/range/types';
import { EuiRangeTicks } from '../../../../src/components/form/range/range_ticks';
import { EuiRangeInput } from '../../../../src/components/form/range/range_input';

import DualRangeExample from './dual_range';
const dualRangeSource = require('!!raw-loader!./dual_range');

import RangeExample from './range';
const rangeSource = require('!!raw-loader!./range');

import InputExample from './input';
const inputSource = require('!!raw-loader!./input');

import TicksExample from './ticks';
const ticksSource = require('!!raw-loader!./ticks');

import LevelsExample from './levels';
const levelsSource = require('!!raw-loader!./levels');

import StatesExample from './states';
const statesSource = require('!!raw-loader!./states');

import InputOnlyExample from './input_only';
const inputOnlySource = require('!!raw-loader!./input_only');

export const RangeControlExample = {
  title: 'Range sliders',
  intro: (
    <>
      <EuiCallOut color="warning" title="Understanding precision">
        <p>
          Range sliders should only be used when{' '}
          <strong>the precise value is not considered important</strong>. If the
          precise value does matter, add the <EuiCode>showInput</EuiCode> prop
          or use a <strong>EuiFieldNumber</strong> instead.
        </p>
      </EuiCallOut>
    </>
  ),
  sections: [
    {
      title: 'Single range',
      text: (
        <>
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
        </>
      ),
      source: [
        {
          type: GuideSectionTypes.TSX,
          code: rangeSource,
        },
      ],
      props: {
        EuiRange,
      },
      demo: <RangeExample />,
      playground: rangeConfig,
      snippet: [
        `<EuiRange
  min={100}
  max={200}
  step={0.05}
  value={value}
  onChange={handleChange}
  showLabels
/>`,
        `// Show tooltip
<EuiRange
  min={100}
  max={200}
  value={value}
  onChange={handleChange}
  showLabels
  showValue
/>`,
        `// Show thickened range and prepend a string to the tooltip
<EuiRange
  min={100}
  max={200}
  value={value}
  onChange={handleChange}
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
        <>
          <p>
            The <strong>EuiDualRange</strong> accepts almost all the same props
            as the regular <strong>EuiRange</strong>, with the exception of{' '}
            <EuiCode>showRange</EuiCode> which is on by default, and{' '}
            <EuiCode>showValue</EuiCode> since tooltips don&apos;t fit properly
            when there are two.
          </p>
          <EuiCallOut color="warning" title="Retrieving field values">
            <p>
              Two-value <EuiCode>input[type=range]</EuiCode> elements are not
              part of the HTML5 specification. Because of this support gap,{' '}
              <strong>EuiDualRange</strong> cannot expose a native{' '}
              <EuiCode>value</EuiCode> property for native form to consumption.{' '}
              <strong>
                The React <EuiCode>onChange</EuiCode> prop is the recommended
                method for retrieving the upper and lower values.
              </strong>
            </p>
            <p>
              <strong>EuiDualRange</strong> does use native inputs to help
              validate step values and range limits. These may be used as form
              values when <EuiCode>showInput</EuiCode> is in use. The
              alternative is to store values in{' '}
              <EuiCode>input[type=hidden]</EuiCode>.
            </p>
          </EuiCallOut>
        </>
      ),
      source: [
        {
          type: GuideSectionTypes.TSX,
          code: dualRangeSource,
        },
      ],
      props: {
        EuiDualRange,
      },
      demo: <DualRangeExample />,
      playground: dualRangeConfig,
      snippet: [
        `<EuiDualRange
  min={100}
  max={200}
  step={10}
  value={value}
  onChange={handleChange}
  showLabels
/>`,
        `<EuiDualRange
  min={0}
  max={100}
  step={1}
  value={value}
  onChange={handleChange}
  isDraggable
/>`,
      ],
    },
    {
      title: 'Inputs',
      text: (
        <>
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
        </>
      ),
      source: [
        {
          type: GuideSectionTypes.TSX,
          code: inputSource,
        },
      ],
      demo: <InputExample />,
      props: { EuiRangeInput },
      snippet: ['<EuiRange showInput />', '<EuiDualRange showInput />'],
    },
    {
      title: 'Tick marks',
      text: (
        <>
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
        </>
      ),
      source: [
        {
          type: GuideSectionTypes.TSX,
          code: ticksSource,
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
        <>
          <p>
            To create colored indicators for certain intervals, pass an array of
            objects that include a <EuiCode>min</EuiCode>,{' '}
            <EuiCode>max</EuiCode> and <EuiCode>color</EuiCode>. Color options
            are{' '}
            <EuiCode language="js">
              {JSON.stringify(LEVEL_COLORS, null, 2)}
            </EuiCode>{' '}
            or a valid CSS color value (e.g.{' '}
            <EuiCode>&quot;#ff0000&quot;</EuiCode>,{' '}
            <EuiCode>&quot;red&quot;</EuiCode>).
          </p>
          <p>
            Be sure to then add an <EuiCode>aria-describedby</EuiCode> and match
            it to the id of a <strong>EuiFormHelpText</strong>.
          </p>
        </>
      ),
      source: [
        {
          type: GuideSectionTypes.TSX,
          code: levelsSource,
        },
      ],
      demo: <LevelsExample />,
      props: { EuiRangeLevels, EuiRangeLevel },
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
        <>
          <p>
            Passing{' '}
            <EuiCode language="js">
              showInput=&quot;inputWithPopover&quot;
            </EuiCode>{' '}
            instead of a boolean will only display the inputs until the input is
            interacted with in which case a dropdown will appear displaying the
            actual slider.
          </p>
        </>
      ),
      source: [
        {
          type: GuideSectionTypes.TSX,
          code: inputOnlySource,
        },
      ],
      demo: <InputOnlyExample />,
      snippet: [
        `<EuiRange
  id={rangeId__1}
  value={value}
  onChange={handleChange}
  showInput="inputWithPopover"
/>`,
        `<EuiDualRange
  id={rangeId__2}
  value={value}
  onChange={handleChange}
  showInput="inputWithPopover"
/>`,
      ],
    },
    {
      title: 'Kitchen sink',
      text: (
        <>
          <p>
            Other alterations you can add to the range are{' '}
            <EuiCode>fullWidth</EuiCode>, and <EuiCode>disabled</EuiCode>.
          </p>
        </>
      ),
      source: [
        {
          type: GuideSectionTypes.TSX,
          code: statesSource,
        },
      ],
      demo: <StatesExample />,
      snippet: [
        `<EuiRange
  id={rangeId__1}
  value={value}
  onChange={handleChange}
  fullWidth
  disabled
  showTicks
  showInput
  showLabels
  showValue
  showRange
  tickInterval={20}
  levels={levels}
  aria-describedBy={replaceWithID}
/>`,
        `<EuiDualRange
  id={rangeId__2}
  value={value}
  onChange={handleChange}
  fullWidth
  disabled
  showLabels
  showInput
  showTicks
  ticks={[{ label: '20kb', value: 20 }]}
  levels={levels}
  aria-describedBy={replaceWithID}
/>`,
      ],
    },
  ],
};
