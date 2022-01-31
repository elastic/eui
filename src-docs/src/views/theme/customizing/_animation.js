import React from 'react';

import {
  useEuiTheme,
  EuiText,
  EuiSpacer,
  EuiPanel,
  EuiTitle,
} from '../../../../../src';

import { useDebouncedUpdate } from '../hooks';

import { ThemeValue } from './_values';

import {
  getPropsFromThemeKey,
  EuiThemeAnimationSpeed,
  EuiThemeAnimationEasing,
} from '../_props';

export default ({ onThemeUpdate }) => {
  const { euiTheme } = useEuiTheme();
  const animation = euiTheme.animation;
  const [animationClone, updateAnimation] = useDebouncedUpdate({
    property: 'animation',
    value: animation,
    onUpdate: onThemeUpdate,
    time: 1000,
  });

  const speedTypes = getPropsFromThemeKey(EuiThemeAnimationSpeed);
  const easingTypes = getPropsFromThemeKey(EuiThemeAnimationEasing);

  return (
    <div>
      <EuiText>
        <h2>
          Animation &emsp;
          <small>
            <code>EuiThemeAnimation</code>
          </small>
        </h2>
      </EuiText>

      <EuiSpacer size="xl" />

      <EuiPanel color="subdued">
        <EuiTitle size="xs">
          <h3>
            <code>_EuiThemeAnimationSpeed</code>
          </h3>
        </EuiTitle>

        <EuiSpacer />

        {Object.keys(speedTypes).map((prop) => {
          return (
            <ThemeValue
              key={prop}
              property="animation"
              type={speedTypes[prop]}
              name={prop}
              value={animationClone[prop]}
              onUpdate={(value) => updateAnimation(prop, value)}
              example={
                <div className={'guideSass__animRow'}>
                  <div className={'guideSass__animParent'}>
                    <div
                      className="guideSass__animChild"
                      // Using inline style tag to override `:focus`
                      style={{
                        transitionDuration: animationClone[prop],
                      }}
                    />
                  </div>
                </div>
              }
            />
          );
        })}
      </EuiPanel>

      <EuiSpacer size="xl" />

      <EuiPanel color="subdued">
        <EuiTitle size="xs">
          <h3>
            <code>_EuiThemeAnimationEasing</code>
          </h3>
        </EuiTitle>

        <EuiSpacer />

        {Object.keys(easingTypes).map((prop) => {
          return (
            <ThemeValue
              key={prop}
              property="animation"
              type={easingTypes[prop]}
              name={prop}
              value={animationClone[prop]}
              onUpdate={(value) => updateAnimation(prop, value)}
              stringProps={{
                style: { width: 240 },
              }}
              example={
                <div className={'guideSass__animRow'}>
                  <div className={'guideSass__animParent'}>
                    <div
                      className="guideSass__animChild"
                      style={{
                        transitionTimingFunction: animationClone[prop],
                      }}
                    />
                  </div>
                </div>
              }
            />
          );
        })}
      </EuiPanel>
    </div>
  );
};
