import React, { Fragment } from 'react';
import chroma from 'chroma-js';
import { css } from '@emotion/react';

import { EuiFlexGrid, EuiFlexItem } from '../../../../src/components';

import {
  useEuiTheme,
  makeHighContrastColor,
  transparentize,
} from '../../../../src/services';

export default () => {
  const { euiTheme } = useEuiTheme();

  const transparency = 0.3;
  const BACKGROUND = ['#006837ee', 'rgb(165,0,38)', 'rgb(0,0,0)', 'pink'];
  const FOREGROUND = ['#bfa180', 'rgb(249,133,16)', 'rgb(0,179,164)', 'white'];

  return (
    <Fragment>
      <EuiFlexGrid columns={2}>
        {BACKGROUND.map((background, i) => {
          const simulated = chroma
            .mix(background, euiTheme.colors.body, 1 - transparency, 'rgb')
            .css();
          const backgroundColor = transparentize(background, transparency);
          const color = makeHighContrastColor(FOREGROUND[i])(simulated);

          return (
            <EuiFlexItem style={{ flexGrow: 1 }} key={background}>
              <div
                css={css`
                  padding: ${euiTheme.size.base};
                  border-radius: ${euiTheme.border.radius.small};
                  background: ${backgroundColor};
                  color: ${color};
                `}
              >
                {chroma.contrast(color, simulated).toFixed(2)}: Roughly
              </div>
            </EuiFlexItem>
          );
        })}
      </EuiFlexGrid>
    </Fragment>
  );
};
