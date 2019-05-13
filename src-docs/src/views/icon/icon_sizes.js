// DON'T USE THIS
// DON'T USE THIS
// DON'T USE THIS
// DON'T USE THIS
// DON'T USE THIS

// This example JS is overly complex for simple icon usage
// and is set up this way for ease of use in our docs.
//
// Check the snippet tab for a more common usage.

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
