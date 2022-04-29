import { css } from '@emotion/react';
import React, { useContext } from 'react';

import { ThemeContext } from '../../components/with_theme';

import { EuiCode, useEuiScrollBar, useEuiTheme } from '../../../../src';
import { ThemeExample } from '../theme/_components/_theme_example';
import { ScrollContent } from './_scroll_content';

export default () => {
  const themeContext = useContext(ThemeContext);
  const currentLanguage = themeContext.themeLanguage;
  const showSass = currentLanguage.includes('sass');

  const { euiTheme } = useEuiTheme();

  return (
    <>
      <ThemeExample
        title={<code>.eui-scrollBar</code>}
        description={
          <>
            <p>
              Use this utility class to style the browser&apos;s scrollbar in a
              minimal aesthetic. This is best used on small, inner-page contents
              like panels wherever you have{' '}
              <EuiCode language="scss">overflow: auto</EuiCode>.
            </p>
          </>
        }
        examplePanel={{
          paddingSize: 'none',
        }}
        example={
          <div
            tabIndex={0}
            role="region"
            aria-label="Example of eui-scrollBar region"
            className="eui-scrollBar"
            style={{
              overflowY: 'auto',
              height: euiTheme.base * 10,
            }}
          >
            <ScrollContent />
          </div>
        }
        snippet={`<div
  tabIndex={0}
  role="region"
  aria-label=""
  className="eui-scrollBar"
  style={{ overflowY: 'auto', euiTheme.base * 10 }}>
  <EuiPanel />
  <EuiPanel />
  <EuiPanel />
</div>`}
      />

      {!showSass && (
        <ThemeExample
          title={<code>useEuiScrollBar()</code>}
          description={
            <>
              <p>
                Use this style function to style the browser&apos;s scrollbar in
                a minimal aesthetic. This is best used on small, inner-page
                contents like panels.
              </p>
              <p>
                All parameters are optional and default to specific global
                settings.
              </p>
            </>
          }
          examplePanel={{
            paddingSize: 'none',
          }}
          example={
            <div
              tabIndex={0}
              role="region"
              aria-label="Example of useEuiScrollBar region"
              css={css`
                ${useEuiScrollBar()}
                overflow-y: auto;
                height: ${euiTheme.base * 10}px;
              `}
            >
              <ScrollContent />
            </div>
          }
          snippet={'${useEuiScrollBar()}'}
          snippetLanguage="emotion"
        />
      )}

      {showSass && (
        <ThemeExample
          title={<code>@mixin euiScrollBar;</code>}
          description={
            <>
              <p>
                Use this Sass mixin to style the browser&apos;s scrollbar in a
                minimal aesthetic. This is best used on small, inner-page
                contents like panels.
              </p>
              <p>
                All parameters are optional and default to specific global
                settings.
              </p>
            </>
          }
          examplePanel={{
            paddingSize: 'none',
          }}
          example={
            <div
              tabIndex={0}
              role="region"
              aria-label="Example of euiScrollBar region"
              className="guideSass__euiScrollBar"
            >
              <ScrollContent />
            </div>
          }
          snippetLanguage="scss"
          snippet={`.scrollBarRegion {
  @include euiScrollBar;
  overflow-y: auto;
  height: $euiSize * 10;
}`}
        />
      )}
    </>
  );
};
