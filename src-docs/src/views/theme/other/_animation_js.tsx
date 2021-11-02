import React, { ReactNode } from 'react';
import { css } from '@emotion/react';
import { useEuiTheme } from '../../../../../src/services';
import { transparentize } from '../../../../../src/services/color';

import {
  getPropsFromThemeKey,
  EuiThemeAnimationSpeed,
  EuiThemeAnimationEasing,
} from '../_props';
import { ThemeExample } from '../_components/_theme_example';
import { ThemeValuesTable } from '../_components/_theme_values_table';

export default ({
  speedDescription,
  easeDescription,
}: {
  speedDescription: ReactNode;
  easeDescription: ReactNode;
}) => {
  const { euiTheme } = useEuiTheme();
  const animation = euiTheme.animation;

  const speedTypes = getPropsFromThemeKey(EuiThemeAnimationSpeed);
  const speeds = Object.keys(speedTypes);
  const easingTypes = getPropsFromThemeKey(EuiThemeAnimationEasing);
  const eases = Object.keys(easingTypes);

  return (
    <>
      <ThemeExample
        title={<code>euiTheme.animation[speed]</code>}
        description={speedDescription}
        example={
          <div
            css={css`
              transition: background ${euiTheme.animation.slow};

              :hover {
                background: ${transparentize(euiTheme.colors.danger, 0.25)};
              }
            `}
          >
            <strong>Hover me</strong>
          </div>
        }
        snippet={'transition: background ${euiTheme.animation.slow};'}
      />

      <ThemeValuesTable
        items={speeds.map((speed) => {
          return {
            id: speed,
            token: `animation.${speed}`,
            type: speedTypes[speed],
            // @ts-ignore Help
            value: animation[speed],
          };
        })}
        render={(item) => (
          <div className={'guideSass__animRowSmall'}>
            <div className={'guideSass__animParent'}>
              <div
                className="guideSass__animChild"
                // Using inline style tag to override `:focus`
                style={{
                  transitionDuration: item.value,
                }}
              />
            </div>
          </div>
        )}
      />

      <ThemeExample
        title={<code>euiTheme.animation[ease]</code>}
        description={easeDescription}
        example={
          <div
            css={css`
              padding: ${euiTheme.size.s};
              transition: padding ${euiTheme.animation.slow}
                ${euiTheme.animation.resistance};

              &:hover {
                padding: ${euiTheme.size.xl};
              }
            `}
          >
            <strong>Hover me</strong>
          </div>
        }
        snippet={
          'transition: padding ${euiTheme.animation.slow} ${euiTheme.animation.resistance}'
        }
      />

      <ThemeValuesTable
        items={eases.map((ease) => {
          return {
            id: ease,
            token: `animation.${ease}`,
            type: easingTypes[ease],
            // @ts-ignore Help
            value: animation[ease],
          };
        })}
        typeColumnProps={{ width: '70px' }}
        valueColumnProps={{ width: '260px' }}
        render={(item) => (
          <div className={'guideSass__animRowSmall'}>
            <div className={'guideSass__animParent'}>
              <div
                className="guideSass__animChild"
                // Using inline style tag to override `:focus`
                style={{
                  transitionTimingFunction: item.value,
                }}
              />
            </div>
          </div>
        )}
      />
    </>
  );
};
