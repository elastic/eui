import React, { Fragment, useState } from 'react';
import chroma from 'chroma-js';
import { css } from '@emotion/react';

import {
  EuiFlexGrid,
  EuiFlexItem,
  EuiButtonGroup,
  EuiHorizontalRule,
  EuiIcon,
} from '../../../../src/components';

import {
  useEuiTheme,
  makeHighContrastColor,
  transparentize,
  tint,
  shade,
} from '../../../../src/services';

export default () => {
  const { euiTheme, colorMode } = useEuiTheme();
  const [contrastButtonSelected, setContrastButtonSelected] = useState(
    'transparent'
  );

  const transparency = 0.3;
  const BACKGROUND = ['#006837ee', 'rgb(165,0,38)', 'rgb(0,0,0)', 'pink'];
  const FOREGROUND = ['#bfa180', 'rgb(249,133,16)', 'rgb(0,179,164)', 'white'];

  return (
    <Fragment>
      <EuiButtonGroup
        legend={'Contrast style'}
        name={'contrastStyle'}
        idSelected={contrastButtonSelected}
        onChange={(optionId) => setContrastButtonSelected(optionId)}
        options={[
          {
            id: 'incorrect',
            label: 'Transparency only',
          },
          {
            id: 'simulated',
            label: 'Simulated background',
          },
          {
            id: 'transparent',
            label: 'Simulated with transparency',
          },
        ]}
      />

      <EuiHorizontalRule />

      <EuiFlexGrid columns={2}>
        {BACKGROUND.map((background, i) => {
          const simulated =
            colorMode === 'DARK'
              ? shade(background, 1 - transparency)
              : tint(background, 1 - transparency);

          // Default incorrect calculation
          let backgroundColor = transparentize(background, transparency);
          let color = makeHighContrastColor(FOREGROUND[i])(backgroundColor);
          let iconType = 'crossInACircleFilled';
          let contrastRatio = chroma
            .contrast(color, backgroundColor)
            .toFixed(2);

          switch (contrastButtonSelected) {
            case 'simulated':
              backgroundColor = simulated;
              color = makeHighContrastColor(FOREGROUND[i])(simulated);
              iconType = 'checkInCircleFilled';
              contrastRatio = chroma
                .contrast(color, backgroundColor)
                .toFixed(2);
              break;
            case 'transparent':
              backgroundColor = transparentize(background, transparency);
              color = makeHighContrastColor(FOREGROUND[i])(simulated);
              iconType = 'questionInCircle';
              contrastRatio = 'Unknown';
              break;
          }

          return (
            <EuiFlexItem style={{ flexGrow: 1 }} key={background}>
              <div
                title={`${color} - ${backgroundColor}`}
                css={css`
                  padding: ${euiTheme.size.base};
                  border-radius: ${euiTheme.border.radius.small};
                  background: ${backgroundColor};
                  color: ${color};
                  text-transform: capitalize;
                `}
              >
                <EuiIcon type={iconType} /> {contrastRatio}:{' '}
                {contrastButtonSelected}
              </div>
            </EuiFlexItem>
          );
        })}
      </EuiFlexGrid>
    </Fragment>
  );
};
