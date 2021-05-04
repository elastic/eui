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
        <EuiFlexGroup gutterSize="s" key={value} alignItems="center">
          <EuiFlexItem grow={false}>
            <EuiButtonEmpty
              style={{
                textTransform: 'capitalize',
              }}
              isDisabled={value === 'disabled' ? true : false}
              color={value !== 'disabled' ? value : 'primary'}
              onClick={() => {}}>
              {value}
            </EuiButtonEmpty>
          </EuiFlexItem>

          <EuiFlexItem grow={false}>
            <EuiButtonEmpty
              isDisabled={value === 'disabled' ? true : false}
              color={value !== 'disabled' ? value : 'primary'}
              size="s"
              onClick={() => {}}>
              small
            </EuiButtonEmpty>
          </EuiFlexItem>

          <EuiFlexItem grow={false}>
            <EuiButtonEmpty
              isDisabled={value === 'disabled' ? true : false}
              color={value !== 'disabled' ? value : 'primary'}
              size="xs"
              onClick={() => {}}>
              extra small
            </EuiButtonEmpty>
          </EuiFlexItem>
        </EuiFlexGroup>
      </React.Fragment>
    ))}

    <EuiFlexGroup gutterSize="s" alignItems="center">
      <EuiFlexItem grow={false}>
        <EuiButtonEmpty onClick={() => {}} iconType="arrowDown">
          Primary with icon left
        </EuiButtonEmpty>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButtonEmpty
          onClick={() => {}}
          iconType="arrowDown"
          iconSide="right"
          size="xs">
          Extra small with icon right
        </EuiButtonEmpty>
      </EuiFlexItem>
    </EuiFlexGroup>

    <EuiFlexGroup gutterSize="s" alignItems="center">
      <EuiFlexItem grow={false}>
        <EuiButtonEmpty color="text" onClick={() => {}} iconType="dashboardApp">
          Text with app icon left
        </EuiButtonEmpty>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButtonEmpty
          color="text"
          onClick={() => {}}
          iconType="dashboardApp"
          iconSide="right"
          size="xs">
          Extra small with app icon right
        </EuiButtonEmpty>
      </EuiFlexItem>
    </EuiFlexGroup>

    <EuiFlexGroup gutterSize="s" alignItems="center">
      <EuiFlexItem grow={false}>
        <EuiButtonEmpty onClick={() => {}} isLoading>
          Loading
        </EuiButtonEmpty>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButtonEmpty onClick={() => {}} isLoading iconSide="right">
          Loading
        </EuiButtonEmpty>
      </EuiFlexItem>
    </EuiFlexGroup>
  </div>
);
