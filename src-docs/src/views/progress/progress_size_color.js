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

for (let i = 1; i < 10; i++) {
  vizBars.push(
    <>
      <EuiProgress
        label={`tint${i}`}
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
      <EuiProgress value={20} max={100} color="secondary" size="xs" />
      <EuiSpacer size="l" />
      <EuiProgress value={40} max={100} color="secondary" size="xs" />
      <EuiSpacer size="l" />
      <EuiProgress value={60} max={100} color="secondary" size="s" />
      <EuiSpacer size="l" />
      <EuiProgress value={80} max={100} color="secondary" size="m" />
      <EuiSpacer size="l" />
      <EuiProgress value={90} max={100} color="secondary" size="l" />
    </EuiFlexItem>
    <EuiFlexItem>
      <EuiFlexGroup>
        <EuiFlexItem>
          {mainColors.map((value) => (
            <>
              <EuiProgress
                label={value}
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
      </EuiFlexGroup>
    </EuiFlexItem>
  </EuiFlexGroup>
);
