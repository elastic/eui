import React from 'react';

import {
  EuiFlexGrid,
  EuiFlexItem,
  EuiIcon,
  EuiPanel,
  EuiText,
} from '../../../../src/components';

const iconColors = [
  'default',
  'primary',
  'secondary',
  'accent',
  'warning',
  'danger',
  'text',
  'subdued',
  'ghost',
];

export default () => (
  <EuiFlexGrid columns={4}>
    {
      iconColors.map(iconColor => (
        <EuiFlexItem
          className="guideDemo__icon"
          key={iconColor}
          style={{ width: '340px' }}
        >
          <EuiPanel>
            <EuiIcon
              type="brush"
              color={iconColor}
            />
            <EuiText size="s">
              <p>{iconColor}</p>
            </EuiText>
          </EuiPanel>
        </EuiFlexItem>
      ))
    }
  </EuiFlexGrid>
);
