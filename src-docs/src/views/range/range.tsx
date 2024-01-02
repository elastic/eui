import React, { useState, useMemo } from 'react';

import { EuiRange, EuiAccordion } from '../../../../src/components';

// import { useGeneratedHtmlId } from '../../../../src/services';

export default () => {
  const [value, setValue] = useState(21);
  const [active, setActive] = useState(false);

  const range = useMemo(
    () => (
      <>
        <div
          style={{
            display: active ? undefined : 'none',
          }}
        >
          <EuiRange
            value={value}
            onChange={(e) => {
              const range = e.currentTarget.value;
              setValue(Number(range.trim()));
            }}
            max={100}
            min={0}
            showRange
            showInput
            fullWidth={false}
            showTicks
            tickInterval={25}
          />
        </div>
      </>
    ),
    [active, value]
  );

  return (
    <EuiAccordion
      id="rangeTest"
      buttonContent="Toggle accordion"
      onToggle={() => setActive(!active)}
    >
      {range}
    </EuiAccordion>
  );
};
