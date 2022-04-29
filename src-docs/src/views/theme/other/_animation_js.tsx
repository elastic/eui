import React, { ReactNode } from 'react';
import { css } from '@emotion/react';
import { keysOf, useEuiTheme, transparentize } from '../../../../../src';

import {
  euiCanAnimate,
  _EuiThemeAnimationEasings,
  _EuiThemeAnimationSpeeds,
} from '../../../../../src/global_styling/variables/animations';

import { EuiThemeAnimationSpeed, EuiThemeAnimationEasing } from '../_props';
import { getPropsFromComponent } from '../../../services/props/get_props';
import { ThemeExample } from '../_components/_theme_example';
import { ThemeValuesTable } from '../_components/_theme_values_table';

const canAnimateString = `\${euiCanAnimate} {
    transition: background \${euiTheme.animation.slow};
  }`;

const animationString = `\${euiCanAnimate} {
    transition: padding \${euiTheme.animation.slow} \${euiTheme.animation.resistance};
  }`;

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
  ) as unknown) as _EuiThemeAnimationSpeeds;
  const speeds = keysOf(speedTypes);
  const easingTypes = (getPropsFromComponent(
    EuiThemeAnimationEasing
  ) as unknown) as _EuiThemeAnimationEasings;
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
        snippet={canAnimateString}
        snippetLanguage="emotion"
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
        snippet={animationString}
        snippetLanguage="emotion"
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
