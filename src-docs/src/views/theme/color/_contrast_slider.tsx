import React, { useState, FunctionComponent } from 'react';

import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiFormRow,
  EuiRange,
  EuiToolTip,
  EuiIcon,
  EuiSwitch,
  EuiSpacer,
  EuiFlexGroupProps,
  EuiRangeProps,
} from '../../../../../src/components';

// @ts-ignore Importing from JS
import {
  ratingAAA,
  ratingAA18,
  ratingAA,
  ratingAll,
} from './_contrast_utilities';

type ContrastSlider = EuiFlexGroupProps & {
  contrastValue: EuiRangeProps['value'];
  showTextVariants: boolean;
  onChange?: (value: number | string, checked: boolean) => void;
};

export const ContrastSlider: FunctionComponent<ContrastSlider> = ({
  contrastValue,
  showTextVariants,
  onChange,
  ...rest
}) => {
  const [value, setValue] = useState(contrastValue);
  const [checked, setChecked] = useState(showTextVariants);
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
          }
        >
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
              <EuiIcon type="partial" /> Partially passes with a contrast of 3+,
              but only for graphics or if the text is at least 18px, or 14px and
              bold
            </p>
          }
        >
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
          }
        >
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
          }
        >
          {ratingAAA}
        </EuiToolTip>
      ),
    },
  ];

  return (
    <EuiFlexGroup gutterSize="xl" justifyContent="center" {...rest}>
      <EuiFlexItem>
        <EuiFormRow
          id="ratingsRange"
          label="Minimum color contrast combinations to show"
          fullWidth
        >
          <EuiRange
            min={0}
            max={7}
            step={0.5}
            value={value}
            onChange={(e) => {
              setValue(e.currentTarget.value);
              // @ts-ignore Help
              onChange(e.currentTarget.value, checked);
            }}
            showTicks
            ticks={ticks}
            valueAppend="+"
            fullWidth
          />
        </EuiFormRow>
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiFormRow
          labelType="legend"
          label="Show text variant versions of core color tokens as the foreground"
          hasChildLabel={false}
        >
          <div>
            <EuiSpacer size="s" />
            <EuiSwitch
              label="Show text variant"
              checked={showTextVariants}
              onChange={(e) => {
                setChecked(e.target.checked);
                // @ts-ignore Help
                onChange(value, e.target.checked);
              }}
            />
          </div>
        </EuiFormRow>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};
