import React from 'react';

import {
  EuiFlexGrid,
  EuiFlexItem,
  EuiIcon,
  EuiPanel,
  EuiText,
} from '../../../../src/components';

const iconSizes = ['s', 'm', 'l', 'xl', 'xxl', 'original'];

export default () => (
  <EuiFlexGrid columns={4}>
    {iconSizes.map(iconSize => (
      <EuiFlexItem
        className="guideDemo__icon"
        key={iconSize}
        style={{ width: '340px' }}>
        <EuiPanel>
          <EuiIcon type="logoElasticStack" size={iconSize} />
          <EuiText size="s">
            <p>{iconSize}</p>
          </EuiText>
        </EuiPanel>
      </EuiFlexItem>
    ))}
  </EuiFlexGrid>
);
