import React from 'react';
import {
  EuiFlexItem,
  EuiFlexGroup,
  EuiFlexGrid,
  EuiSpacer,
  EuiText,
  EuiTitle,
  EuiCode,
  EuiLink,
} from '../../../../../src';

// @ts-ignore Importing from JS file
import animations from '!!sass-vars-to-js-loader?preserveKeys=true!../../../../../src/global_styling/variables/_animations.scss';

const euiAnimationSpeeds = [
  'euiAnimSpeedExtraFast',
  'euiAnimSpeedFast',
  'euiAnimSpeedNormal',
  'euiAnimSpeedSlow',
  'euiAnimSpeedExtraSlow',
];

const euiAnimationTimings = ['euiAnimSlightBounce', 'euiAnimSlightResistance'];

function renderAnimationSpeed(speed: string) {
  return (
    <div
      key={speed}
      className={`guideSass__animRow guideSass__animRow--${speed}`}
    >
      <EuiFlexGroup alignItems="center" gutterSize="s">
        <EuiFlexItem grow={false}>
          {animations[speed]}ms
          <EuiSpacer size="s" />
          <EuiCode language="scss">animation-duration: ${speed}</EuiCode>
          <EuiSpacer size="s" />
        </EuiFlexItem>
      </EuiFlexGroup>
      <div className={'guideSass__animParent'}>
        <div className="guideSass__animChild" />
      </div>
    </div>
  );
}

function renderAnimationTiming(speed: string) {
  return (
    <div
      key={speed}
      className={`guideSass__animRow guideSass__animRow--${speed}`}
    >
      <EuiFlexGroup alignItems="center" gutterSize="s">
        <EuiFlexItem grow={false}>
          {animations[speed]}
          <EuiSpacer size="s" />
          <EuiCode language="scss">animation-timing-function: ${speed}</EuiCode>
          <EuiSpacer size="s" />
        </EuiFlexItem>
      </EuiFlexGroup>
      <div className={'guideSass__animParent'}>
        <div className="guideSass__animChild" />
      </div>
    </div>
  );
}

export const Animation = () => {
  return (
    <>
      <EuiText>
        <p>
          <EuiLink href="https://github.com/elastic/eui/blob/master/src/global_styling/variables/_animations.scss">
            View the Sass code for animation
          </EuiLink>
          .
        </p>
        <p>
          EUI utilizes the following constants to maintain a similar
          &apos;bounce&apos; to its animations. That said, animations are
          tricky, and if they aren&apos;t working for your specific application
          this is the one place where we think it&apos;s OK to come up with your
          own rules.
        </p>
      </EuiText>
      <EuiSpacer />
      <EuiFlexGrid columns={2}>
        <EuiFlexItem>
          <EuiTitle size="s">
            <h3>Speed</h3>
          </EuiTitle>

          <EuiSpacer />

          {euiAnimationSpeeds.map(function (speed) {
            return renderAnimationSpeed(speed);
          })}
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiTitle size="s">
            <h3>Timing</h3>
          </EuiTitle>

          <EuiSpacer />

          {euiAnimationTimings.map(function (speed) {
            return renderAnimationTiming(speed);
          })}
        </EuiFlexItem>
      </EuiFlexGrid>
    </>
  );
};
