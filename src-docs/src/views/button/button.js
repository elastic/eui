import React from 'react';

import {
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
} from '../../../../src/components/';

const buttons = [
  'primary',
  'success',
  'warning',
  'danger',
  'text',
  'accent',
  'disabled',
];

export default () => (
  <div>
    {buttons.map((value) => (
      <EuiFlexGroup
        key={value}
        gutterSize="s"
        alignItems="center"
        responsive={false}
        wrap>
        <EuiFlexItem grow={false}>
          <EuiButton
            color={value !== 'disabled' ? value : undefined}
            isDisabled={value === 'disabled' ? true : false}
            onClick={() => {}}>
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </EuiButton>
        </EuiFlexItem>

        <EuiFlexItem grow={false}>
          <EuiButton
            color={value !== 'disabled' ? value : undefined}
            isDisabled={value === 'disabled' ? true : false}
            fill
            onClick={() => {}}>
            Filled
          </EuiButton>
        </EuiFlexItem>

        <EuiFlexItem grow={false}>
          <EuiButton
            color={value !== 'disabled' ? value : undefined}
            isDisabled={value === 'disabled' ? true : false}
            size="s"
            onClick={() => {}}>
            Small
          </EuiButton>
        </EuiFlexItem>

        <EuiFlexItem grow={false}>
          <EuiButton
            color={value !== 'disabled' ? value : undefined}
            isDisabled={value === 'disabled' ? true : false}
            size="s"
            fill
            onClick={() => {}}>
            Small and filled
          </EuiButton>
        </EuiFlexItem>

        <EuiFlexItem grow={true}>
          <EuiButton
            color={value !== 'disabled' ? value : undefined}
            isDisabled={value === 'disabled' ? true : false}
            fullWidth
            onClick={() => {}}>
            Full width
          </EuiButton>
        </EuiFlexItem>
      </EuiFlexGroup>
    ))}
  </div>
);
