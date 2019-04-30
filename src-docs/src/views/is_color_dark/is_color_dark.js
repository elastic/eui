import React, { Fragment } from 'react';

import { EuiFlexGrid, EuiFlexItem } from '../../../../src/components';

import { isColorDark } from '../../../../src/services';

const SWATCH_STYLE = {
  width: 100,
  height: 100,
  padding: 16,
};

const rgb = (r, g, b) => {
  return `rgb(${r}, ${g}, ${b})`;
};

export default () => {
  const DARK_COLORS = [
    [0, 104, 55],
    [165, 0, 38],
    [0, 0, 0],
    [219, 19, 116],
    [73, 0, 146],
    [70, 26, 10],
    [146, 0, 0],
  ];

  const LIGHT_COLORS = [
    [191, 161, 128],
    [249, 133, 16],
    [0, 179, 164],
    [212, 157, 170],
    [255, 255, 255],
    [254, 182, 219],
    [230, 194, 32],
  ];

  return (
    <Fragment>
      <EuiFlexGrid>
        {DARK_COLORS.map(color => (
          <EuiFlexItem
            style={{ backgroundColor: rgb(...color), ...SWATCH_STYLE }}
            key={color.join('')}>
            {isColorDark(...color) ? (
              <div style={{ color: 'white' }}>Dark</div>
            ) : (
              <div style={{ color: 'black' }}>Light</div>
            )}
          </EuiFlexItem>
        ))}
      </EuiFlexGrid>

      <EuiFlexGrid>
        {LIGHT_COLORS.map(color => (
          <EuiFlexItem
            style={{ backgroundColor: rgb(...color), ...SWATCH_STYLE }}
            key={color.join('')}>
            {isColorDark(...color) ? (
              <div style={{ color: 'white' }}>Dark</div>
            ) : (
              <div style={{ color: 'black' }}>Light</div>
            )}
          </EuiFlexItem>
        ))}
      </EuiFlexGrid>
    </Fragment>
  );
};
