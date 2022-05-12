import React, { Fragment } from 'react';

import { desaturate } from '../../../../src/services';
import { EuiFlexGrid, EuiFlexItem, EuiBadge } from '../../../../src/components';

export default () => {
  const COLORS = ['#006837', 'rgb(165,0,38)', 'rgba(0,0,0,0.5)', 'pink'];

  return (
    <Fragment>
      <EuiFlexGrid columns={1}>
        {COLORS.map((color) => {
          const desaturated = desaturate(color, 0.75);

          return (
            <EuiFlexItem key={color}>
              <code>
                desaturate(
                <EuiBadge color={color}>{color}</EuiBadge>, 0.75) ={' '}
                <EuiBadge color={desaturated}>{desaturated}</EuiBadge>
              </code>
            </EuiFlexItem>
          );
        })}
      </EuiFlexGrid>
    </Fragment>
  );
};
