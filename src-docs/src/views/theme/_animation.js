import React from 'react';
import { useEuiTheme } from '../../../../src/services';

import { EuiTitle, EuiSpacer, EuiFlexItem } from '../../../../src/components';

import { ThemeSection } from './_theme_section';
import { ThemeValue } from './_values';

import {
  getPropsFromThemeKey,
  EuiThemeAnimationSpeed,
  EuiThemeAnimationEasing,
} from './_props';

export default ({ onThemeUpdate }) => {
  const { euiTheme } = useEuiTheme();
  const animation = euiTheme.animation;
  const speedTypes = getPropsFromThemeKey(EuiThemeAnimationSpeed);
  const easingTypes = getPropsFromThemeKey(EuiThemeAnimationEasing);

  const updateAnimation = (property, value) => {
    onThemeUpdate({
      animation: {
        [property]: value,
      },
    });
  };

  return (
    <div>
      <EuiTitle>
        <h2>Animation</h2>
      </EuiTitle>

      <EuiSpacer />

      <ThemeSection
        code="_EuiThemeAnimationSpeed"
        description={
          <p>
            These are general properties that can be used to create subtle
            animations or transitions that share similar timing and easing
            functions.
          </p>
        }
        themeValues={Object.keys(speedTypes).map((prop) => {
          return (
            <EuiFlexItem key={prop} className={'guideSass__animRow'}>
              <ThemeValue
                property="animation"
                type={speedTypes[prop]}
                name={prop}
                value={animation[prop]}
                onUpdate={(value) => updateAnimation(prop, value)}
              />
              <EuiSpacer size="xs" />
              <div className={'guideSass__animParent'}>
                <div
                  className="guideSass__animChild"
                  // Using inline style tag to override `:focus`
                  style={{
                    transitionDuration: animation[prop],
                  }}
                />
              </div>
            </EuiFlexItem>
          );
        })}
      />
      <EuiSpacer />

      <ThemeSection
        code="_EuiThemeAnimationEasing"
        description={
          <p>
            EUI utilizes the following constants to maintain a similar
            &apos;bounce&apos; to its animations.
          </p>
        }
        themeValues={Object.keys(easingTypes).map((prop) => {
          return (
            <EuiFlexItem key={prop} className={'guideSass__animRow'}>
              <ThemeValue
                property="animation"
                type={easingTypes[prop]}
                name={prop}
                value={animation[prop]}
                onUpdate={(value) => updateAnimation(prop, value)}
              />
              <EuiSpacer size="xs" />
              <div className={'guideSass__animParent'}>
                <div
                  className="guideSass__animChild"
                  // Using inline style tag to override `:focus`
                  style={{
                    transitionTimingFunction: animation[prop],
                  }}
                />
              </div>
            </EuiFlexItem>
          );
        })}
      />
    </div>
  );
};
