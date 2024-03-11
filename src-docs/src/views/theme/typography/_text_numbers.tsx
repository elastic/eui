import React, { useContext } from 'react';

import { ThemeContext } from '../../../components/with_theme';

import {
  EuiCode,
  EuiTextAlign,
  EuiFlexGrid,
  EuiFlexItem,
  useEuiTheme,
  euiNumberFormat,
} from '../../../../../src';
import { css } from '@emotion/react';
import { ThemeExample } from '../_components/_theme_example';

export default () => {
  const euiTheme = useEuiTheme();
  const themeContext = useContext(ThemeContext);
  const currentLanguage = themeContext.themeLanguage;
  const showSass = currentLanguage.includes('sass');

  return (
    <>
      {/* Mixin */}
      {!showSass ? (
        <ThemeExample
          title={<code>euiNumberFormat(euiTheme)</code>}
          type="function"
          description={
            <p>
              Applies{' '}
              <EuiCode language="sass">
                {'font-feature-settings: "tnum";'}
              </EuiCode>{' '}
              so that numbers align more properly in a column, especially when
              right aligned.
            </p>
          }
          example={
            <EuiTextAlign textAlign="right">
              <EuiFlexGrid columns={2}>
                <EuiFlexItem>
                  <p>
                    <strong>Without function</strong>
                    <br />
                    11317.11
                    <br />
                    0040.900
                  </p>
                </EuiFlexItem>
                <EuiFlexItem>
                  <p
                    css={css`
                      ${euiNumberFormat(euiTheme)}
                    `}
                  >
                    <strong>With function</strong>
                    <br />
                    11317.11
                    <br />
                    0040.900
                  </p>
                </EuiFlexItem>
              </EuiFlexGrid>
            </EuiTextAlign>
          }
          snippet={'${euiNumberFormat(useEuiTheme())}'}
          snippetLanguage="emotion"
        />
      ) : (
        <ThemeExample
          title={<code>@include euiNumberFormat</code>}
          type="mixin"
          description={
            <p>
              Use this Sass mixin to apply number text styles to your selectors.
              No parameters are taken for this utility.
            </p>
          }
          snippet={'@include euiNumberFormat;'}
          snippetLanguage="scss"
        />
      )}
      <ThemeExample
        title={<code>.eui-textNumber</code>}
        type="className"
        description={
          <p>
            Applies the <EuiCode>euiNumberFormat()</EuiCode> styles as an
            overriding CSS utility class.
          </p>
        }
        example={
          <EuiTextAlign textAlign="right">
            <EuiFlexGrid columns={2}>
              <EuiFlexItem>
                <p>
                  <strong>Without class</strong>
                  <br />
                  11317.11
                  <br />
                  0040.900
                </p>
              </EuiFlexItem>
              <EuiFlexItem>
                <p className="eui-textNumber">
                  <strong>With class</strong>
                  <br />
                  11317.11
                  <br />
                  0040.900
                </p>
              </EuiFlexItem>
            </EuiFlexGrid>
          </EuiTextAlign>
        }
        snippet={`<div className="eui-textNumber">
  /* Your number content */
</div>`}
      />
    </>
  );
};
