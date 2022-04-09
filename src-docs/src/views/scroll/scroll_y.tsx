import React, { useContext } from 'react';
import { css } from '@emotion/react';

import { ThemeContext } from '../../components/with_theme';

import { EuiCode, EuiLink, useEuiYScrollWithShadows } from '../../../../src';
import { ThemeExample } from '../theme/_components/_theme_example';
import { ScrollContent } from './_scroll_content';

export default () => {
  const themeContext = useContext(ThemeContext);
  const currentLanguage = themeContext.themeLanguage;
  const showSass = currentLanguage.includes('sass');

  return (
    <>
      <ThemeExample
        title={<code>.eui-yScroll</code>}
        description={
          <>
            <p>
              Quick utility class for adding vertical scrolling to a container.
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
            aria-label="Example of eui-yScroll region"
            className="eui-yScrollWithShadows"
            style={{ height: 180 }}
          >
            <ScrollContent />
          </div>
        }
        snippetLanguage="tsx"
        snippet={`<ScrollRegion
  tabIndex={0}
  role="region"
  aria-label=""
  className="eui-yScrollWithShadows"
  style={{ height: 180 }}>
  <ScrollContent />
</ScrollRegion>`}
      />

      {!showSass && (
        <ThemeExample
          title={<code>useEuiYScroll();</code>}
          description={
            <>
              <p>Styles hook for adding horizontal scrolling to a container.</p>
              <p>
                If you need to further customize the position or side of the
                overflow shadow use the{' '}
                <EuiCode>useEuiYScrollWithShadows</EuiCode>{' '}
                <EuiLink href="https://github.com/elastic/eui/blob/main/src/global_styling/mixins/_shadow.ts">
                  hook
                </EuiLink>
                .
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
              aria-label="Example of useEuiYScrollWithShadows region"
              css={css`
                ${useEuiYScrollWithShadows()};
                height: 180px;
              `}
            >
              <ScrollContent />
            </div>
          }
          snippetLanguage="tsx"
          snippet={
            `<ScrollRegion
  tabIndex={0}
  role="region"
  aria-label=""
  css={css` +
            '`${useEuiYScrollWithShadows()}; ' +
            'height: 180px;' +
            ` }}>
  <ScrollContent />
</ScrollRegion>`
          }
        />
      )}

      {showSass && (
        <ThemeExample
          title={<code>@mixin euiYScroll;</code>}
          description={
            <>
              <p>Sass mixin for adding horizontal scrolling to a container.</p>
              <p>
                If you need to further customize the position or side of the
                overflow shadow use the <EuiCode>euiYScrollWithShadows</EuiCode>{' '}
                <EuiLink href="https://github.com/elastic/eui/blob/master/src/global_styling/mixins/_shadow.scss">
                  mixin
                </EuiLink>
                .
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
              aria-label="Example of euiYScrollWithShadows region"
              className="guideSass__overflowShadowsY"
            >
              <ScrollContent />
            </div>
          }
          snippetLanguage="scss"
          snippet={`.overflowShadowsY {
  @include euiYScrollWithShadows;
  height: 180px;
}`}
        />
      )}
    </>
  );
};
