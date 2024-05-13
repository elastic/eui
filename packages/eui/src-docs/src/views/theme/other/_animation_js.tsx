import React, { FunctionComponent } from 'react';
import { css } from '@emotion/react';
import { keysOf, useEuiTheme, transparentize } from '../../../../../src';

import {
  euiCanAnimate,
  _EuiThemeAnimationEasings,
  _EuiThemeAnimationSpeeds,
} from '../../../../../src/global_styling/variables/animations';

import {
  EuiThemeAnimationSpeed,
  EuiThemeAnimationEasing,
  ThemeRowType,
} from '../_props';
import { getPropsFromComponent } from '../../../services/props/get_props';
import { ThemeExample } from '../_components/_theme_example';
import { ThemeValuesTable } from '../_components/_theme_values_table';

const canAnimateString = `\${euiCanAnimate} {
    transition: background \${euiTheme.animation.slow};
  }`;

const animationString = `\${euiCanAnimate} {
    transition: padding \${euiTheme.animation.slow} \${euiTheme.animation.resistance};
  }`;

export const SpeedJS: FunctionComponent<ThemeRowType> = ({ description }) => {
  const { euiTheme } = useEuiTheme();
  return (
    <ThemeExample
      title={<code>euiTheme.animation[speed]</code>}
      description={description}
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
  );
};

export const SpeedValuesJS = () => {
  const { euiTheme } = useEuiTheme();
  const animation = euiTheme.animation;

  const speedTypes = getPropsFromComponent(
    EuiThemeAnimationSpeed
  ) as unknown as _EuiThemeAnimationSpeeds;
  const speeds = keysOf(speedTypes);

  return (
    <>
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
    </>
  );
};

export const EasingJS: FunctionComponent<ThemeRowType> = ({ description }) => {
  const { euiTheme } = useEuiTheme();

  return (
    <ThemeExample
      title={<code>euiTheme.animation[ease]</code>}
      description={description}
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
  );
};

export const EasingValuesJS = () => {
  const { euiTheme } = useEuiTheme();
  const animation = euiTheme.animation;
  const easingTypes = getPropsFromComponent(
    EuiThemeAnimationEasing
  ) as unknown as _EuiThemeAnimationEasings;
  const eases = keysOf(easingTypes);

  return (
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
  );
};
