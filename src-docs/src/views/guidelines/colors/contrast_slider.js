import React, { useState } from 'react';

import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiFormRow,
  EuiRange,
  EuiToolTip,
  EuiIcon,
} from '../../../../../src/components';
import { ratingAAA, ratingAA18, ratingAA, ratingAll } from './_utilities';

export const ContrastSlider = ({ contrastValue, onChange }) => {
  const [value, setValue] = useState(contrastValue);

  const levels = [
    {
      min: 0,
      max: 2.8,
      color: 'danger',
    },
    {
      min: 2.8,
      max: 4.3,
      color: 'warning',
    },
    {
      min: 4.3,
      max: 7,
      color: 'success',
    },
  ];

  const ticks = [
    {
      value: 0,
      label: (
        <EuiToolTip
          position="bottom"
          content={
            <ul>
              <li>
                <EuiIcon type="minusInCircle" /> Contrast is between 2 and 3.
                Use only for disabled or inconsequential content.
              </li>
              <li>
                <EuiIcon type="cross" /> Contrast is less than 2. Do not use.
              </li>
            </ul>
          }>
          {ratingAll}
        </EuiToolTip>
      ),
    },
    {
      value: 3,
      label: (
        <EuiToolTip
          position="bottom"
          content={
            <p>
              <EuiIcon type="invert" /> Passes with a contrast of 3+, but only
              for graphics or if the text is at least 18px, or 14px and bold
            </p>
          }>
          {ratingAA18}
        </EuiToolTip>
      ),
    },
    {
      value: 4.5,
      label: (
        <EuiToolTip
          position="bottom"
          content={
            <p>
              <EuiIcon type="checkInCircleFilled" /> Passes with a contrast of
              4.5+
            </p>
          }>
          {ratingAA}
        </EuiToolTip>
      ),
    },
    {
      value: 7,
      label: (
        <EuiToolTip
          position="bottom"
          content={
            <p>
              <EuiIcon type="checkInCircleFilled" /> Passes with a contrast of
              7+
            </p>
          }>
          {ratingAAA}
        </EuiToolTip>
      ),
    },
  ];

  return (
    <EuiFlexGroup className="guideSection__shadedBox" justifyContent="center">
      <EuiFlexItem style={{ maxWidth: 400 }}>
        <EuiFormRow
          id="ratingsRange"
          label="Minimum color contrast combinations to show">
          <EuiRange
            min={0}
            max={7}
            step={0.5}
            value={value}
            onChange={e => {
              setValue(e.target.value);
              onChange(e.target.value);
            }}
            showTicks
            showValue
            levels={levels}
            ticks={ticks}
            valueAppend="+"
          />
        </EuiFormRow>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};
