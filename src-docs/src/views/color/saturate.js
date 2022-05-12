import React, { Fragment } from 'react';

import { saturate } from '../../../../src/services';
import { EuiFlexGrid, EuiFlexItem, EuiBadge } from '../../../../src/components';

export default () => {
  const COLORS = ['#006837', 'rgb(165,0,38)', 'rgba(0,0,0,.5)', 'pink'];

  return (
    <Fragment>
      <EuiFlexGrid columns={1}>
        {COLORS.map((color) => {
          const saturated = saturate(color, 0.75);

          return (
            <EuiFlexItem key={color}>
              <code>
                saturate(
                <EuiBadge color={color}>{color}</EuiBadge>, 0.75) ={' '}
                <EuiBadge color={saturated}>{saturated}</EuiBadge>
              </code>
            </EuiFlexItem>
          );
        })}
      </EuiFlexGrid>
    </Fragment>
  );
};
