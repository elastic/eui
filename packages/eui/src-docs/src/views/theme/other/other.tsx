import React, { useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';

import { GuideTabbedPage } from '../../../components/guide_tabbed_page';
import { ThemeContext } from '../../../components/with_theme';

import { EuiCallOut, EuiCode, EuiSpacer, EuiText } from '../../../../../src';

import { ThemeNotice } from '../_components/_theme_notice';

import ShadowJs, { ShadowValuesJS } from './_shadow_js';
import ShadowSass, { ShadowValuesSass } from './_shadow_sass';
import LevelsJS from './_levels_js';
import LevelsSass from './_levels_sass';
import { GuideSection } from '../../../components/guide_section/guide_section';
import {
  EasingSass,
  EasingValuesSass,
  SpeedSass,
  SpeedValuesSass,
} from './_animation_sass';
import {
  EasingJS,
  EasingValuesJS,
  SpeedJS,
  SpeedValuesJS,
} from './_animation_js';

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

  const speedContent = useMemo(() => {
    const speedDescription = (
      <>
        <p>
          The simplest and most common usage of the animation speeds is to apply
          them to custom transitions like hover effects.
        </p>
      </>
    );
    if (showSass)
      return (
        <>
          <SpeedSass description={speedDescription} />
        </>
      );
    return (
      <>
        <SpeedJS description={speedDescription} />
      </>
    );
  }, [showSass]);

  const easeContent = useMemo(() => {
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
          <EasingSass description={easeDescription} />
        </>
      );
    return (
      <>
        <EasingJS description={easeDescription} />
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
    <GuideTabbedPage
      title="More tokens"
      notice={<ThemeNotice />}
      showThemeLanguageToggle
      description="Here are a few more global theme tokens for styles we use throughout EUI."
    >
      <GuideSection color="subdued">
        <EuiText grow={false}>
          <h2 id={`${otherSections[0].id}`}>{`${otherSections[0].title}`}</h2>
          <p>
            The <EuiCode>animation</EuiCode> values provide some easy and
            consistent ways for adding transition or animation effects and
            timing. These are general properties that can be used to create
            subtle animations or transitions that share similar timing and
            easing functions.
          </p>
        </EuiText>

        <EuiSpacer />

        <EuiCallOut iconType="accessibility" title={<code>euiCanAnimate</code>}>
          <p>
            For accessbility support, we highly recommend always wrapping
            animations and transitions with this{' '}
            {showSass ? 'mixin' : 'constant'}. It wraps the contents in a{' '}
            <EuiCode>prefers-reduced-motion</EuiCode> media query to ensure the
            animations do not run if the user has this preference turned off.
            There is also a counterpart {showSass ? 'mixin' : 'constant'} for
            applying content only if the user has the setting turned off called{' '}
            <EuiCode>euiCantAnimate</EuiCode>.
          </p>
        </EuiCallOut>

        {speedContent}
      </GuideSection>

      <GuideSection color="transparent">
        {showSass ? <SpeedValuesSass /> : <SpeedValuesJS />}
      </GuideSection>

      <GuideSection color="subdued">{easeContent}</GuideSection>

      <GuideSection color="transparent">
        {showSass ? <EasingValuesSass /> : <EasingValuesJS />}
      </GuideSection>

      <GuideSection color="subdued">
        <EuiText grow={false}>
          <h2 id={`${otherSections[1].id}`}>{`${otherSections[1].title}`}</h2>
        </EuiText>

        <EuiSpacer />
        <EuiCallOut iconType="accessibility" title="Shadows in high contrast">
          <p>
            Keep in mind that shadows will not render in{' '}
            <Link to="/theming/high-contrast-mode">
              forced high contrast modes
            </Link>
            . EUI's shadow utilities automatically replace shadows with bottom
            borders, which will render better in high contrast modes. These
            utilities can also be configured to render their high contrast
            borders around the entire element.
          </p>
        </EuiCallOut>

        {shadowContent}
      </GuideSection>

      <GuideSection color="transparent">
        {showSass ? <ShadowValuesSass /> : <ShadowValuesJS />}
      </GuideSection>

      <GuideSection color="subdued">
        <EuiText grow={false}>
          <h2 id={`${otherSections[2].id}`}>
            {`${otherSections[2].title}`} (z-index)
          </h2>
        </EuiText>

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
      </GuideSection>

      <GuideSection color="transparent">{levelsContent}</GuideSection>
    </GuideTabbedPage>
  );
};
