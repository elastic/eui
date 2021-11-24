import React, { useContext, useMemo, useState } from 'react';

import { EuiCode, EuiSpacer, EuiText } from '../../../../../src';

// @ts-ignore Importing from JS
import { GuidePage } from '../../../components/guide_page';
import { ThemeContext } from '../../../components/with_theme';

import { ThemeNotice } from '../_components/_theme_notice';

// @ts-ignore Importing JS
import ColorsContrast from './contrast';

import { BrandJS, ShadeJS, SpecialJS, TextJS } from './_color_js';
import { Link } from 'react-router-dom';
import { BrandSass, ShadeSass, SpecialSass, TextSass } from './_color_sass';

const tabs = [
  {
    label: 'Values',
    id: 'colorsTabs--values',
  },
  {
    label: 'Contrast checker',
    id: 'colorsTabs--contrast',
  },
];

// This array is used inside routes.js to create the sidenav sub-sections
export const colorsSections = [
  { title: 'Brand colors', id: 'brand-colors' },
  { title: 'Text colors', id: 'text-colors' },
  { title: 'Shades', id: 'shades' },
  { title: 'Special colors', id: 'special-colors' },
];

export default () => {
  const themeContext = useContext(ThemeContext);
  const currentLanguage = themeContext.themeLanguage;
  const showSass = currentLanguage.includes('sass');

  const [selectedTabId, setSelectedTabId] = useState('colorsTabs--values');
  const onSelectedTabChanged = (id: string) => {
    setSelectedTabId(id);
  };

  const brandContent = useMemo(() => {
    const description = (
      <p>
        Most usages of the colors can be implemented simply by pulling and
        applying the values.
      </p>
    );
    if (showSass) return <BrandSass description={description} />;
    return <BrandJS description={description} />;
  }, [showSass]);

  const textContent = useMemo(() => {
    const description = (
      <p>
        Remember, when using any of the EUI colors for text,{' '}
        <strong>use the text specific variant</strong>.
      </p>
    );
    if (showSass) return <TextSass description={description} />;
    return <TextJS description={description} />;
  }, [showSass]);

  const shadesContent = useMemo(() => {
    const description = (
      <>
        <p>
          Since the EUI colors usually evaluate to a hex value, the easiest way
          to perform color operations like transparency, shading, or tinting is
          by using the EUI provided methods of{' '}
          <EuiCode>transparentize()</EuiCode>, <EuiCode>shade()</EuiCode>, and{' '}
          <EuiCode>tint()</EuiCode> respectively.
        </p>
        <p>
          For all available color functions see the{' '}
          <Link to="/utilities/color-functions">Color Utilities page</Link>.
        </p>
      </>
    );
    if (showSass) return <ShadeSass description={description} />;
    return <ShadeJS description={description} />;
  }, [showSass]);

  const specialContent = useMemo(() => {
    const description = (
      <p>
        Constant colors are those that do not change no matter the theme or
        color mode and typically represent the polar extremes.
      </p>
    );
    if (showSass) return <SpecialSass description={description} />;
    return <SpecialJS description={description} />;
  }, [showSass]);

  return (
    <GuidePage
      isBeta={!showSass && !selectedTabId.includes('contrast')}
      title="Colors"
      notice={
        !showSass && !selectedTabId.includes('contrast') && <ThemeNotice />
      }
      showThemeLanguageToggle
      tabs={tabs.map((tab) => {
        return {
          label: tab.label,
          id: tab.id,
          onClick: () => onSelectedTabChanged(tab.id),
          isSelected: tab.id === selectedTabId,
        };
      })}
      intro={
        <>
          <EuiText grow={false}>
            <p>
              Elastic UI builds with a very limited palette. It uses a core set
              of three colors with a green / orange / red qualitative set and
              combined with a six-color grayscale. Variation beyond these colors
              is minimal and always done with math manipulation against the
              original set.
            </p>
            <p>
              When switching between light and dark color modes, the theme keys
              do not change, only their values do. This is why most keys are not
              named for their <strong>evaluated</strong> value but by their{' '}
              <strong>purpose</strong>.
            </p>
          </EuiText>
        </>
      }
    >
      <EuiSpacer size="xl" />

      {selectedTabId.includes('contrast') ? (
        <ColorsContrast />
      ) : (
        <>
          <EuiText grow={false}>
            <h2
              id={`${colorsSections[0].id}`}
            >{`${colorsSections[0].title}`}</h2>
            <p>
              Elastic has two main brand colors. The other three are used for
              statefulness like indicating between successful and dangerous
              actions.
            </p>
          </EuiText>

          <EuiSpacer size="xl" />

          {brandContent}

          <EuiSpacer size="xl" />

          <EuiText grow={false}>
            {' '}
            <h2
              id={`${colorsSections[1].id}`}
            >{`${colorsSections[1].title}`}</h2>
            <p>
              Specific text colors calculated off either the brand or shade
              colors.
            </p>
            <p>
              Each brand color also has a corresponding text variant that has
              been calculated for proper (4.5) contrast against{' '}
              <EuiCode>colors.body</EuiCode> and should be used specifically
              when coloring text. As is used in{' '}
              <Link to="/display/text#coloring-text">
                <strong>EuiTextColor</strong>
              </Link>
              .
            </p>
          </EuiText>

          <EuiSpacer size="xl" />

          {textContent}

          <EuiSpacer size="xl" />

          <EuiText grow={false}>
            {' '}
            <h2
              id={`${colorsSections[2].id}`}
            >{`${colorsSections[2].title}`}</h2>
            <p>
              A six-color grayscale palette. Variation beyond these colors is
              minimal and always done through computations against this set.
            </p>
          </EuiText>

          <EuiSpacer size="xl" />

          {shadesContent}

          <EuiSpacer size="xl" />

          <EuiText grow={false}>
            {' '}
            <h2
              id={`${colorsSections[3].id}`}
            >{`${colorsSections[3].title}`}</h2>
            <p>These are used a lot for special cases.</p>
          </EuiText>

          <EuiSpacer size="xl" />

          {specialContent}
        </>
      )}
    </GuidePage>
  );
};
