import React, { useContext } from 'react';
import {
  EuiBreakpointSize,
  EuiCode,
  EuiCodeBlock,
  EuiHideFor,
  EuiShowFor,
  EuiSpacer,
  EuiText,
  keysOf,
} from '../../../../../src';

import { breakpoint as breakpoints } from '@elastic/eui-theme-common';
const breakpointKeys = keysOf(breakpoints);

import { GuideSection } from '../../../components/guide_section/guide_section';
import { ThemeContext } from '../../../components/with_theme';

// @ts-ignore Importing from JS
import { useJsonVars } from '../_json/_get_json_vars';

// @ts-expect-error Importing from JS
import { GuideSectionTypes } from '../../../components';

import ShowFor from './show_for';
const showForSource = require('!!raw-loader!./show_for');

import HideFor from './hide_for';
const hideForSource = require('!!raw-loader!./hide_for');

import UtilityClassesResponsive from './utility_classes_responsive';

function renderJsSizes(size: EuiBreakpointSize, index: number) {
  let code = `'${size}': ${breakpoints[size]}`;

  if (size !== 'xl') {
    code += `, // to ${breakpoints[breakpointKeys[index - 1]] - 1}`;
  } else {
    code += ', // and up';
  }

  return code;
}

export const breakpointUtilitySections = [
  { title: 'Show for', id: 'show-for' },
  { title: 'Hide for', id: 'hide-for' },
  { title: 'Responsive classes', id: 'responsive-classes' },
];

export default () => {
  const themeContext = useContext(ThemeContext);
  const currentLanguage = themeContext.themeLanguage;
  const showSass = currentLanguage.includes('sass');

  const values = useJsonVars();
  const euiBreakpoints = values.euiBreakpoints;
  const euiBreakpointKeys = Object.keys(euiBreakpoints).reverse();

  function renderSassSizes(size: string, index: number) {
    let code = `'${size}': (min-width: ${euiBreakpoints[size]})`;

    if (size !== 'xl') {
      const next = Number(
        euiBreakpoints[euiBreakpointKeys[index - 1]].replace('px', '')
      );
      code += ` and (max-width: ${next - 1}px),`;
    } else {
      code += ',';
    }

    return code;
  }

  return (
    <>
      <GuideSection color="subdued">
        <EuiText grow={false}>
          <h2>Screen sizes</h2>

          <p>
            The sizing options correlate with the keys in{' '}
            <EuiCode language="ts">euiTheme.breakpoint</EuiCode>. The named
            breakpoint starts at the pixel value provided and ends before the
            next one.
          </p>
        </EuiText>

        <EuiSpacer />

        <EuiCodeBlock
          language={showSass ? 'sass' : 'ts'}
          paddingSize="none"
          transparentBackground
        >
          {showSass
            ? euiBreakpointKeys
                .map(function (size, index) {
                  return renderSassSizes(size, index);
                })
                .join('\n')
            : breakpointKeys
                .map(function (size: EuiBreakpointSize, index: number) {
                  return renderJsSizes(size, index);
                })
                .join('\n')}
        </EuiCodeBlock>
      </GuideSection>

      <GuideSection
        id={`${breakpointUtilitySections[0].id}`}
        title={`${breakpointUtilitySections[0].title}`}
        wrapText={false}
        text={
          <EuiText grow={false}>
            <p>
              The <strong>EuiShowFor</strong> wrapping utility component will
              not render its children <strong>unless</strong> the window width
              matches the range of one of the named breakpoints provided to the{' '}
              <EuiCode>sizes</EuiCode> prop.
            </p>
          </EuiText>
        }
        snippet={`<EuiShowFor sizes={['l', 'xl']}>
  <!-- Content only showing for l and xl screens -->
</EuiShowFor>`}
        props={{ EuiShowFor }}
        demo={<ShowFor />}
        source={[
          {
            type: GuideSectionTypes.JS,
            code: showForSource,
          },
        ]}
      />

      <GuideSection
        id={`${breakpointUtilitySections[1].id}`}
        title={`${breakpointUtilitySections[1].title}`}
        wrapText={false}
        text={
          <EuiText grow={false}>
            <p>
              The <strong>EuiHideFor</strong> wrapping utility component will
              not render its children <strong>while</strong> the window width
              matches the range of one of the named breakpoints provided to the{' '}
              <EuiCode>sizes</EuiCode> prop.
            </p>
          </EuiText>
        }
        snippet={`<EuiHideFor sizes={['xs', 's']}>
  <!-- Content to hide from xs and s screens -->
</EuiHideFor>`}
        props={{ EuiShowFor, EuiHideFor }}
        demo={<HideFor />}
        source={[
          {
            type: GuideSectionTypes.JS,
            code: hideForSource,
          },
        ]}
      />

      <EuiSpacer />

      <GuideSection color="subdued">
        <EuiText grow={false}>
          <h2
            id={`${breakpointUtilitySections[2].id}`}
          >{`${breakpointUtilitySections[2].title}`}</h2>
          <p>
            Similar to the wrapping components, these classes will hide or show
            the element based on the current current width matching the range of
            the declared <EuiCode>size</EuiCode>. However, they simply utilize
            the <EuiCode>display</EuiCode> property which means they will still
            render in the DOM.
          </p>
        </EuiText>

        <UtilityClassesResponsive />
      </GuideSection>
    </>
  );
};
