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

import classNames from 'classnames';

import {
  EuiFlexGrid,
  EuiFlexItem,
  EuiIcon,
  EuiPanel,
  EuiText,
  EuiCallOut,
  EuiSpacer,
} from '../../../../src/components';

const iconColors = [
  'default',
  'primary',
  'success',
  'accent',
  'warning',
  'danger',
  'text',
  'subdued',
  'ghost',
  '#490',
  '#DA8B45',
  '#DDDDDD',
];

export default () => (
  <div>
    <EuiFlexGrid columns={4}>
      {iconColors.map((iconColor) => (
        <EuiFlexItem
          className="guideDemo__icon"
          key={iconColor}
          style={{ width: '340px' }}>
          <EuiPanel
            className={classNames({
              guideDemo__ghostBackground: iconColor === 'ghost',
            })}>
            <EuiIcon type="brush" color={iconColor} />
            <EuiText
              size="s"
              color={iconColor === 'ghost' ? 'ghost' : 'default'}>
              <p>{iconColor}</p>
            </EuiText>
          </EuiPanel>
        </EuiFlexItem>
      ))}
    </EuiFlexGrid>

    <EuiSpacer />

    <EuiCallOut
      color="warning"
      title="App icons have special, restricted coloring considerations"
      size="s"
    />

    <EuiSpacer />

    <EuiFlexGrid columns={4}>
      <EuiFlexItem className="guideDemo__icon" style={{ width: '255px' }}>
        <EuiPanel>
          <EuiIcon type="gisApp" size="xl" />
          <EuiText size="s">
            <p>
              Default coloring of <strong>App</strong> icons is two-toned
            </p>
          </EuiText>
        </EuiPanel>
      </EuiFlexItem>
      <EuiFlexItem className="guideDemo__icon" style={{ width: '255px' }}>
        <EuiPanel>
          <EuiIcon type="gisApp" color="text" size="xl" />
          <EuiText size="s">
            <p>
              <strong>Special:</strong> the text color makes{' '}
              <strong>App</strong> icons fully that color
            </p>
          </EuiText>
        </EuiPanel>
      </EuiFlexItem>
      <EuiFlexItem className="guideDemo__icon" style={{ width: '255px' }}>
        <EuiPanel>
          <EuiIcon type="createAdvancedJob" color="primary" size="xl" />
          <EuiText size="s">
            <p>
              <strong>Special:</strong> the primary color makes{' '}
              <strong>App</strong> icons fully that color
            </p>
          </EuiText>
        </EuiPanel>
      </EuiFlexItem>
      <EuiFlexItem className="guideDemo__icon" style={{ width: '255px' }}>
        <EuiPanel>
          <EuiIcon type="createAdvancedJob" color="#DA8B45" size="xl" />
          <EuiText size="s">
            <p>
              <strong>Special:</strong> a custom color makes{' '}
              <strong>App</strong> icons fully that color
            </p>
          </EuiText>
        </EuiPanel>
      </EuiFlexItem>
    </EuiFlexGrid>
  </div>
);
