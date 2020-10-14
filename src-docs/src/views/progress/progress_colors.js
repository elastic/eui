import React from 'react';

import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiProgress,
  EuiSpacer,
} from '../../../../src/components';

const mainColors = [
  'primary',
  'success',
  'warning',
  'danger',
  'subdued',
  'accent',
];

const vizBars = [];

for (let i = 0; i < 10; i++) {
  vizBars.push(
    <>
      <EuiProgress
        label={`tint${i}`}
        valueText={`tint${i}`}
        value={80}
        max={100}
        color={`tint${i}`}
        size="m"
      />
      <EuiSpacer size="s" />
    </>
  );
}

export default () => (
  <EuiFlexGroup>
    <EuiFlexItem>
      {mainColors.map((value) => (
        <>
          <EuiProgress
            label={value}
            valueText={value}
            value={80}
            max={100}
            color={value}
            size="m"
          />
          <EuiSpacer size="s" />
        </>
      ))}
    </EuiFlexItem>
    <EuiFlexItem>{vizBars}</EuiFlexItem>
    <EuiFlexItem>
      <EuiProgress
        valueText="#32CD32"
        label="#32CD32"
        color="#32CD32"
        value={80}
        max={100}
        size="m"
      />
      <EuiSpacer size="s" />
      <EuiProgress
        valueText="mediumslateblue"
        label="mediumslateblue"
        color="mediumslateblue"
        value={80}
        max={100}
        size="m"
      />
    </EuiFlexItem>
  </EuiFlexGroup>
);
