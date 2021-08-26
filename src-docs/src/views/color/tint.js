import React, { Fragment } from 'react';

import { EuiFlexGrid, EuiFlexItem, EuiBadge } from '../../../../src/components';

import { tint } from '../../../../src/services';

export default () => {
  const COLORS = ['#006837', 'rgb(165,0,38)', 'rgba(0,0,0,.5)', 'pink'];

  return (
    <Fragment>
      <EuiFlexGrid columns={1}>
        {COLORS.map((color) => {
          const tinted = tint(color, 0.75);

          return (
            <EuiFlexItem key={color}>
              <code>
                tint(
                <EuiBadge color={color}>{color}</EuiBadge>, 0.75) ={' '}
                <EuiBadge color={tinted}>{tinted}</EuiBadge>
              </code>
            </EuiFlexItem>
          );
        })}
      </EuiFlexGrid>
    </Fragment>
  );
};
