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
        label={`vis${i}`}
        valueText={true}
        value={80}
        max={100}
        color={`vis${i}`}
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
            valueText={true}
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
        valueText={true}
        label="#32CD32"
        color="#32CD32"
        value={80}
        max={100}
        size="m"
      />
      <EuiSpacer size="s" />
      <EuiProgress
        valueText={true}
        label="mediumslateblue"
        color="mediumslateblue"
        value={80}
        max={100}
        size="m"
      />
    </EuiFlexItem>
  </EuiFlexGroup>
);
