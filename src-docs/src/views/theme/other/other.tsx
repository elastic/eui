import React, { useContext, useMemo } from 'react';

// @ts-ignore Importing from JS
import { GuidePage } from '../../../components/guide_page';
import { ThemeContext } from '../../../components/with_theme';

import { EuiCallOut, EuiCode, EuiSpacer, EuiText } from '../../../../../src';

import { ThemeNotice } from '../_components/_theme_notice';

import AnimationJS from './_animation_js';
import AnimationSass from './_animation_sass';
import ShadowJs from './_shadow_js';
import ShadowSass from './_shadow_sass';
import LevelsJS from './_levels_js';
import LevelsSass from './_levels_sass';

// This array is used inside routes.js to create the sidenav sub-sections
export const otherSections = [
  { title: 'Animation', id: 'animation' },
  { title: 'Shadow', id: 'shadow' },
  { title: 'Levels', id: 'levels' },
];

export default () => {
  const themeContext = useContext(ThemeContext);
  const currentLanguage = themeContext.themeLanguage;
  const showSass = currentLanguage.includes('sass');

  const animationContent = useMemo(() => {
    const speedDescription = (
      <>
        <p>
          The simplest and most common usage of the animation speeds is to apply
          them to custom transitions like hover effects.
        </p>
      </>
    );
    const easeDescription = (
      <>
        <p>
          EUI utilizes the following easing constants to maintain a similar
          &apos;bounce&apos; or slight resistance to its animations.
        </p>
        <p>
          When <strong>moving</strong> or changing the <strong>size</strong> of
          elements on the page, it&apos;s good to add a slight ease to the
          transition or animation.
        </p>
      </>
    );
    if (showSass)
      return (
        <>
          <AnimationSass
            speedDescription={speedDescription}
            easeDescription={easeDescription}
          />
        </>
      );
    return (
      <>
        <AnimationJS
          speedDescription={speedDescription}
          easeDescription={easeDescription}
        />
      </>
    );
  }, [showSass]);

  const shadowContent = useMemo(() => {
    if (showSass) {
      return (
        <>
          <ShadowSass />
        </>
      );
    } else {
      return (
        <>
          <ShadowJs />
        </>
      );
    }
  }, [showSass]);

  const levelsContent = useMemo(() => {
    if (showSass) {
      return (
        <>
          <LevelsSass />
        </>
      );
    } else {
      return (
        <>
          <LevelsJS />
        </>
      );
    }
  }, [showSass]);

  return (
    <GuidePage
      title="More tokens"
      isBeta={!showSass}
      notice={<ThemeNotice />}
      showThemeLanguageToggle
      description="Here are a few more global theme tokens for styles we use throughout EUI."
    >
      <EuiSpacer size="xl" />

      <EuiText grow={false}>
        <h2 id={`${otherSections[0].id}`}>{`${otherSections[0].title}`}</h2>
      </EuiText>

      <EuiSpacer />

      <EuiCallOut
        color="warning"
        iconType="accessibility"
        title={<code>euiCanAnimate()</code>}
      >
        <p>
          For accessbility support, we highly recommend always wrapping
          animations and transitions with this {showSass ? 'mixin' : 'function'}
          . It wraps the contents in a <EuiCode>prefers-reduced-motion</EuiCode>{' '}
          media query to ensure the animations do not run if the user has this
          preference turned off. There is also a counterpart{' '}
          {showSass ? 'mixin' : 'function'} for running content only if the user
          has the setting turned off called <EuiCode>euiCantAnimate()</EuiCode>.
        </p>
      </EuiCallOut>

      <EuiSpacer />

      <EuiText grow={false}>
        <p>
          The <EuiCode>animation</EuiCode> values provide some easy and
          consistent ways for adding transition or animation effects and timing.
          These are general properties that can be used to create subtle
          animations or transitions that share similar timing and easing
          functions.
        </p>
      </EuiText>

      <EuiSpacer size="xl" />

      {animationContent}

      <EuiSpacer size="xl" />

      <EuiText grow={false}>
        <h2 id={`${otherSections[1].id}`}>{`${otherSections[1].title}`}</h2>
      </EuiText>

      <EuiSpacer size="xl" />

      {shadowContent}

      <EuiSpacer size="xl" />

      <EuiText grow={false}>
        <h2 id={`${otherSections[2].id}`}>
          {`${otherSections[2].title}`} (z-index)
        </h2>
      </EuiText>

      <EuiSpacer size="l" />

      <EuiText grow={false}>
        <p>
          Most of the time the z-index is handled per component. But you can use
          this table as a reference to how EUI layers the components.
        </p>
      </EuiText>

      <EuiSpacer size="l" />

      <EuiCallOut color="warning">
        <p>
          If you do have to adjust z-index levels, remember that they become
          scoped only to their parents if their parent also has a custom
          z-index.
        </p>
      </EuiCallOut>

      <EuiSpacer size="xl" />

      {levelsContent}
    </GuidePage>
  );
};
