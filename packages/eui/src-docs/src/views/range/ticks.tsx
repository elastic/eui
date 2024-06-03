import React, { useState } from 'react';

import {
  EuiRange,
  EuiRangeProps,
  EuiSpacer,
  EuiTitle,
  EuiDualRange,
  EuiDualRangeProps,
  useGeneratedHtmlId,
  useIsWithinBreakpoints,
} from '../../../../src';

export default () => {
  const [value, setValue] = useState<EuiRangeProps['value']>('20');
  const [dualValue, setDualValue] = useState<EuiDualRangeProps['value']>([
    20, 100,
  ]);
  const [noLinearValue, setNoLinearValue] = useState('28');

  const onChange: EuiRangeProps['onChange'] = (e) => {
    setValue(e.currentTarget.value);
  };
  const onDualChange: EuiDualRangeProps['onChange'] = (value) => {
    setDualValue(value);
  };
  const onChangeNoLinearValue: EuiRangeProps['onChange'] = (e) => {
    setNoLinearValue(e.currentTarget.value);
  };

  const rangeBasicTicksId = useGeneratedHtmlId({ prefix: 'rangeBasicTicks' });
  const rangeCustomTickIntervalId = useGeneratedHtmlId({
    prefix: 'rangeCustomTickInterval',
  });
  const dualRangeBasicTicksId = useGeneratedHtmlId({
    prefix: 'dualRangeBasicTicks',
  });
  const dualRangeLongLabelsId = useGeneratedHtmlId({
    prefix: 'dualRangeLongLabels',
  });

  const rangeNoLinearId = useGeneratedHtmlId({ prefix: 'rangeNoLinear' });

  return (
    <>
      <EuiRange
        id={rangeBasicTicksId}
        step={10}
        value={value}
        onChange={onChange}
        min={0}
        max={100}
        showTicks
        aria-label="An example of EuiRange with ticks"
      />

      <EuiSpacer size="xl" />

      <EuiTitle size="xxs">
        <h3>Custom responsive tick interval</h3>
      </EuiTitle>

      <EuiSpacer size="l" />

      <EuiRange
        id={rangeCustomTickIntervalId}
        value={value}
        onChange={onChange}
        min={0}
        max={100}
        showInput
        showRange
        showTicks
        tickInterval={useIsWithinBreakpoints(['xs', 's']) ? 25 : 20}
        aria-label="An example of EuiRange with a custom & responsive tickInterval"
      />

      <EuiSpacer size="xl" />

      <EuiTitle size="xxs">
        <h3>Custom ticks object</h3>
      </EuiTitle>

      <EuiSpacer size="l" />

      <EuiDualRange
        id={dualRangeBasicTicksId}
        min={0}
        max={100}
        value={dualValue}
        onChange={onDualChange}
        showTicks
        ticks={[
          { label: '20kb', value: 20 },
          { label: '100kb', value: 100 },
        ]}
        showInput
        aria-label="An example of EuiDualRange with ticks"
      />

      <EuiSpacer size="xl" />

      <EuiTitle size="xxs">
        <h3>Long labels</h3>
      </EuiTitle>

      <EuiSpacer size="l" />

      <EuiDualRange
        id={dualRangeLongLabelsId}
        min={0}
        max={100}
        value={dualValue}
        onChange={onDualChange}
        showTicks
        ticks={[
          { label: '0 kilobytes', value: 0 },
          { label: '50 kilobytes', value: 50 },
          { label: '100 kilobytes', value: 100 },
        ]}
        aria-label="An example of EuiDualRange with long tick labels"
      />

      <EuiSpacer size="xl" />

      <EuiTitle size="xxs">
        <h3>No linear intervals</h3>
      </EuiTitle>

      <EuiSpacer size="l" />

      <EuiRange
        id={rangeNoLinearId}
        value={noLinearValue}
        onChange={onChangeNoLinearValue}
        showTicks
        min={0}
        max={84}
        ticks={[
          { label: '1 GB', value: 0, accessibleLabel: 'one gigabyte' },
          { label: '2GB', value: 14, accessibleLabel: 'two gigabytes' },
          { label: '4GB', value: 28, accessibleLabel: 'four gigabytes' },
          { label: '8GB', value: 42, accessibleLabel: 'eight gigabytes' },
          { label: '16GB', value: 56, accessibleLabel: 'sixteen gigabytes' },
          { label: '32GB', value: 70, accessibleLabel: 'thirty-two gigabytes' },
          { label: '64GB', value: 84, accessibleLabel: 'sixty-four gigabytes' },
        ]}
        aria-label="An example of EuiRange with no linear intervals"
      />
    </>
  );
};
