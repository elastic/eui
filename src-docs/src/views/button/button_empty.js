import React from 'react';

import {
  EuiButtonEmpty,
  EuiFlexGroup,
  EuiFlexItem,
} from '../../../../src/components/';

const buttons = ['primary', 'success', 'warning', 'danger', 'text', 'disabled'];

export default () => (
  <div>
    {buttons.map((value) => (
      <React.Fragment key={value}>
        <EuiFlexGroup
          key={value}
          responsive={false}
          gutterSize="s"
          alignItems="center">
          <EuiFlexItem grow={false}>
            <EuiButtonEmpty
              isDisabled={value === 'disabled' ? true : false}
              color={value !== 'disabled' ? value : 'primary'}
              onClick={() => {}}>
              {value.charAt(0).toUpperCase() + value.slice(1)}
            </EuiButtonEmpty>
          </EuiFlexItem>

          <EuiFlexItem grow={false}>
            <EuiButtonEmpty
              size="s"
              isDisabled={value === 'disabled' ? true : false}
              color={value !== 'disabled' ? value : 'primary'}
              onClick={() => {}}>
              Small
            </EuiButtonEmpty>
          </EuiFlexItem>

          <EuiFlexItem grow={false}>
            <EuiButtonEmpty
              size="xs"
              isDisabled={value === 'disabled' ? true : false}
              color={value !== 'disabled' ? value : 'primary'}
              onClick={() => {}}>
              Extra small
            </EuiButtonEmpty>
          </EuiFlexItem>
        </EuiFlexGroup>
      </React.Fragment>
    ))}
  </div>
);
