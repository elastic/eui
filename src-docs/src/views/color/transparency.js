import React, { Fragment } from 'react';

import { EuiFlexGrid, EuiFlexItem, EuiBadge } from '../../../../src/components';

import { useEuiTheme, transparentize } from '../../../../src/services';

export default () => {
  const { euiTheme, colorMode } = useEuiTheme();
  const COLORS = ['#006837', 'rgb(165,0,38)', 'rgba(0,0,0,.5)', 'pink'];

  return (
    <Fragment>
      <EuiFlexGrid columns={1}>
        {COLORS.map((color) => {
          const transparent = transparentize(color, 0.25);

          return (
            <EuiFlexItem key={color}>
              <code>
                transparentize(
                <EuiBadge color={color}>{color}</EuiBadge>, 0.75) ={' '}
                <EuiBadge
                  color={transparent}
                  style={{
                    color:
                      colorMode === 'DARK'
                        ? euiTheme.colors.ghost
                        : euiTheme.colors.ink,
                  }}
                >
                  {transparent}
                </EuiBadge>
              </code>
            </EuiFlexItem>
          );
        })}
      </EuiFlexGrid>
    </Fragment>
  );
};
