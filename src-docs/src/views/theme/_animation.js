import React from 'react';
import { css } from '@emotion/react';
import { useEuiTheme } from '../../../../src/services';
import { transparentize } from '../../../../src/services/color';

import {
  EuiText,
  EuiSpacer,
  EuiFlexItem,
  EuiTabbedContent,
  EuiCode,
} from '../../../../src/components';

import { useDebouncedUpdate } from './hooks';

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
          Animation <EuiCode>EuiThemeAnimation</EuiCode>
        </h2>
        <p>
          The <EuiCode>animation</EuiCode> values provide some easy and
          consistent ways for adding transition or animation effects and timing.
        </p>
      </EuiText>

      <EuiSpacer />

      <EuiTabbedContent
        tabs={[
          {
            id: 'themeAnimationTabValues',
            name: 'Values',
            content: (
              <>
                <EuiSpacer />

                <ThemeSection
                  code="_EuiThemeAnimationSpeed"
                  description={
                    <p>
                      These are general properties that can be used to create
                      subtle animations or transitions that share similar timing
                      and easing functions.
                    </p>
                  }
                  themeValues={Object.keys(speedTypes).map((prop) => {
                    return (
                      <EuiFlexItem key={prop} className={'guideSass__animRow'}>
                        <ThemeValue
                          property="animation"
                          type={speedTypes[prop]}
                          name={prop}
                          value={animationClone[prop]}
                          onUpdate={(value) => updateAnimation(prop, value)}
                        />
                        <EuiSpacer size="xs" />
                        <div className={'guideSass__animParent'}>
                          <div
                            className="guideSass__animChild"
                            // Using inline style tag to override `:focus`
                            style={{
                              transitionDuration: animationClone[prop],
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
                      EUI utilizes the following easing constants to maintain a
                      similar &apos;bounce&apos; or slight resistance to its
                      animations.
                    </p>
                  }
                  themeValues={Object.keys(easingTypes).map((prop) => {
                    return (
                      <EuiFlexItem key={prop} className={'guideSass__animRow'}>
                        <ThemeValue
                          property="animation"
                          type={easingTypes[prop]}
                          name={prop}
                          value={animationClone[prop]}
                          onUpdate={(value) => updateAnimation(prop, value)}
                        />
                        <EuiSpacer size="xs" />
                        <div className={'guideSass__animParent'}>
                          <div
                            className="guideSass__animChild"
                            style={{
                              transitionTimingFunction: animationClone[prop],
                            }}
                          />
                        </div>
                      </EuiFlexItem>
                    );
                  })}
                />
              </>
            ),
          },
          {
            id: 'themeAnimationTabUsage',
            name: 'Usage',
            content: (
              <>
                <EuiSpacer />
                <ThemeSection
                  code="euiTheme.animation[speed]"
                  description={
                    <p>
                      The simplest and most common usage of the animation speeds
                      is to apply them to custom transitions like hover effects.
                    </p>
                  }
                  example={
                    <div
                      css={css`
                        transition: background ${euiTheme.animation.slow};

                        :hover {
                          background: ${transparentize(
                            euiTheme.colors.danger,
                            0.25
                          )};
                        }
                      `}
                    >
                      <strong>Hover me</strong>
                    </div>
                  }
                  snippet={'transition: background ${euiTheme.animation.slow};'}
                />
                <EuiSpacer />
                <ThemeSection
                  code="euiTheme.animation[ease]"
                  description={
                    <p>
                      When <strong>moving</strong> or changing the{' '}
                      <strong>size</strong> of elements on the page, it&apos;s
                      good to add a slight ease to the transition or animation.
                    </p>
                  }
                  example={
                    <div
                      css={css`
                        padding: ${euiTheme.size.s};
                        transition: padding ${euiTheme.animation.slow}
                          ${euiTheme.animation.resistance};

                        :hover {
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
              </>
            ),
          },
        ]}
      />
    </div>
  );
};
