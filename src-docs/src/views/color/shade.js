import React, { Fragment } from 'react';

import { EuiFlexGrid, EuiFlexItem, EuiBadge } from '../../../../src/components';

import { shade } from '../../../../src/services';

export default () => {
  const COLORS = ['#006837', 'rgb(165,0,38)', 'rgba(0,0,0,.5)', 'pink'];

  return (
    <Fragment>
      <EuiFlexGrid columns={1}>
        {COLORS.map((color) => {
          const shaded = shade(color, 0.5);

          return (
            <EuiFlexItem key={color}>
              <code>
                shade(
                <EuiBadge color={color}>{color}</EuiBadge>, 0.5) ={' '}
                <EuiBadge color={shaded}>{shaded}</EuiBadge>
              </code>
            </EuiFlexItem>
          );
        })}
      </EuiFlexGrid>
    </Fragment>
  );
};
