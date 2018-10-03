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
  '#490',
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
    <EuiFlexItem
      className="guideDemo__icon"
      style={{ width: '340px' }}
    >
      <EuiPanel>
        <EuiIcon
          type="gisApp"
          color="text"
          size="xl"
        />
        <EuiText size="s">
          <p><strong>Special:</strong> the text color makes <strong>App</strong> icons fully that color</p>
        </EuiText>
      </EuiPanel>
    </EuiFlexItem>
    <EuiFlexItem
      className="guideDemo__icon"
      style={{ width: '340px' }}
    >
      <EuiPanel>
        <EuiIcon
          type="gisApp"
          color="primary"
          size="xl"
        />
        <EuiText size="s">
          <p><strong>Special:</strong> the primary color makes <strong>App</strong> icons fully that color</p>
        </EuiText>
      </EuiPanel>
    </EuiFlexItem>
  </EuiFlexGrid>
);
