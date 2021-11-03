import React, { useContext, useMemo } from 'react';

// @ts-ignore Importing from JS
import { GuidePage } from '../../../components/guide_page';
import { ThemeContext } from '../../../components/with_theme';

import { EuiCallOut, EuiCode, EuiSpacer, EuiText } from '../../../../../src';

import { ThemeNotice } from '../_components/_theme_notice';

import AnimationJS from './_animation_js';
import AnimationSass from './_animation_sass';
import ShadowSass from './_shadow_sass';
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
          <EuiCallOut title="Coming soon" />
        </>
      );
    }
  }, [showSass]);

  const levelsContent = useMemo(() => {
    if (showSass) {
      return (
        <>
          <EuiSpacer size="l" />

          <EuiText grow={false}>
            <p>
              Most of the time the z-index is handled per component. But you can
              use this table as a reference to how EUI layers the components.
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

          <LevelsSass />
        </>
      );
    } else {
      return (
        <>
          <EuiSpacer size="xl" />

          <EuiCallOut title="Coming soon" />
        </>
      );
    }
  }, [showSass]);

  return (
    <GuidePage
      title="More tokens"
      isBeta={!showSass}
      notice={!showSass && <ThemeNotice />}
      showThemeLanguageToggle
      description="Here are a few more global theme tokens for styles we use throughout EUI."
    >
      <EuiSpacer size="xl" />

      <EuiText grow={false}>
        <h2 id={`${otherSections[0].id}`}>{`${otherSections[0].title}`}</h2>
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

      {levelsContent}
    </GuidePage>
  );
};
