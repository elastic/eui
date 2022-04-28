import React, { useContext } from 'react';

import { ThemeContext } from '../../components/with_theme';

import {
  EuiCode,
  EuiTextAlign,
  EuiFlexGrid,
  EuiFlexItem,
} from '../../../../src';
import { ThemeExample } from '../theme/_components/_theme_example';

export default () => {
  const themeContext = useContext(ThemeContext);
  const currentLanguage = themeContext.themeLanguage;
  const showSass = currentLanguage.includes('sass');

  return (
    <>
      <ThemeExample
        title={<code>.eui-textNumber</code>}
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
      {/* Mixin */}
      {!showSass ? (
        <ThemeExample
          title={<code>euiNumberFormat()</code>}
          description={
            <p>
              Use this style function to apply{' '}
              <EuiCode>.eui-textNumber</EuiCode> within your CSS-in-JS styling.
              No parameters are taken for this utility.
            </p>
          }
          snippet={'${euiNumberFormat()}'}
          snippetLanguage="emotion"
        />
      ) : (
        <ThemeExample
          title={<code>Mixin</code>}
          description={
            <p>
              Use this Sass mixin to apply <EuiCode>.eui-textNumber</EuiCode>{' '}
              within your classes. No parameters are taken for this utility.
            </p>
          }
          snippet={'@include euiNumberFormat;'}
          snippetLanguage="scss"
        />
      )}
    </>
  );
};
