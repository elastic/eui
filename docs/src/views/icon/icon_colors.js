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
  'text',
  'primary',
  'secondary',
  'warning',
  'danger',
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
