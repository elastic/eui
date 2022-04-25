import React, { ReactNode } from 'react';
import { css } from '@emotion/react';
import { keysOf, useEuiTheme, transparentize } from '../../../../../src';

import {
  euiCanAnimate,
  _EuiThemeAnimationEasing,
  _EuiThemeAnimationSpeed,
} from '../../../../../src/global_styling/variables/_animations';

import { EuiThemeAnimationSpeed, EuiThemeAnimationEasing } from '../_props';
import { getPropsFromComponent } from '../../../services/props/get_props';
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

  const speedTypes = (getPropsFromComponent(
    EuiThemeAnimationSpeed
  ) as unknown) as _EuiThemeAnimationSpeed;
  const speeds = keysOf(speedTypes);
  const easingTypes = (getPropsFromComponent(
    EuiThemeAnimationEasing
  ) as unknown) as _EuiThemeAnimationEasing;
  const eases = keysOf(easingTypes);

  return (
    <>
      <ThemeExample
        title={<code>euiTheme.animation[speed]</code>}
        description={speedDescription}
        example={
          <div
            css={css`
              ${euiCanAnimate} {
                transition: background ${euiTheme.animation.slow};

                :hover {
                  background: ${transparentize(euiTheme.colors.danger, 0.25)};
                }
              }
            `}
          >
            <strong>Hover me</strong>
          </div>
        }
        snippet={
          'css`${euiCanAnimate}{transition: background ${euiTheme.animation.slow};}`'
        }
        snippetLanguage="ts"
      />

      <ThemeValuesTable
        items={speeds.map((speed) => {
          return {
            id: speed,
            token: `animation.${speed}`,
            type: speedTypes[speed],
            value: animation[speed],
          };
        })}
        tokenColumnProps={{ width: 'auto' }}
        sampleColumnProps={{ width: '80px', align: 'left' }}
        render={(item) => (
          <div className={'guideSass__animRow'}>
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
              ${euiCanAnimate} {
                padding: ${euiTheme.size.s};
                transition: padding ${euiTheme.animation.slow}
                  ${euiTheme.animation.resistance};

                &:hover {
                  padding: ${euiTheme.size.xl};
                }
              }
            `}
          >
            <strong>Hover me</strong>
          </div>
        }
        snippetLanguage="ts"
        snippet={
          'css`${euiCanAnimate}{transition: padding ${euiTheme.animation.slow} ${euiTheme.animation.resistance};}`'
        }
      />

      <ThemeValuesTable
        items={eases.map((ease) => {
          return {
            id: ease,
            token: `animation.${ease}`,
            type: easingTypes[ease],
            value: animation[ease],
          };
        })}
        sampleColumnProps={{ width: '80px', align: 'left' }}
        valueColumnProps={{ width: '260px' }}
        tokenColumnProps={{ width: 'auto' }}
        render={(item) => (
          <div className={'guideSass__animRow'}>
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
