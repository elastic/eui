import React, { useContext } from 'react';
import { css } from '@emotion/react';

import { ThemeContext } from '../../components/with_theme';

import {
  EuiCode,
  EuiFlexGroup,
  useEuiTheme,
  EuiLink,
  useEuiOverflowScroll,
} from '../../../../src';
import { ThemeExample } from '../theme/_components/_theme_example';
import { ScrollContent } from './_scroll_content';

export default () => {
  const themeContext = useContext(ThemeContext);
  const currentLanguage = themeContext.themeLanguage;
  const showSass = currentLanguage.includes('sass');

  const { euiTheme } = useEuiTheme();

  const scrollingContent = (
    <EuiFlexGroup
      css={css`
        width: 150%;
      `}
      responsive={false}
    >
      <ScrollContent />
    </EuiFlexGroup>
  );

  return (
    <>
      <ThemeExample
        title={<code>.eui-xScroll</code>}
        description={
          <>
            <p>
              Quick utility class for adding horizontal scrolling to a
              container.
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
            aria-label="Example of eui-xScroll region"
            className="eui-xScrollWithShadows"
            style={{ padding: `${euiTheme.size.base}` }}
          >
            {scrollingContent}
          </div>
        }
        snippetLanguage="tsx"
        snippet={
          `<ScrollRegion
  tabIndex={0}
  role="region"
  aria-label=""
  className="eui-xScrollWithShadows"
  style={{ padding: ` +
          '`${euiTheme.size.base}`' +
          ` }}>
  <ScrollContent />
</ScrollRegion>`
        }
      />

      {!showSass && (
        <ThemeExample
          title={<code>{"useEuiOverflowScroll('x');"}</code>}
          description={
            <>
              <p>Styles hook for adding horizontal scrolling to a container.</p>
              <p>
                To mask the top and bottom of the scrolled content, indicating
                visually that there is more content below, pass in true to the
                second paremeter <EuiCode>mask</EuiCode>.
              </p>
              <p>
                <EuiCode>{"useEuiOverflowScroll('x', true);"}</EuiCode>
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
              aria-label="Example of useEuiOverflowScroll(x) region"
              css={css`
                ${useEuiOverflowScroll('x', true)};
                padding: ${euiTheme.size.base};
              `}
            >
              {scrollingContent}
            </div>
          }
          snippetLanguage="tsx"
          snippet={
            `<ScrollRegion
  tabIndex={0}
  role="region"
  aria-label=""
  css={css` +
            "`${useEuiOverflowScroll('x', true)}; " +
            'padding: ${euiTheme.size.base};`' +
            ` }}>
  <ScrollContent />
</ScrollRegion>`
          }
        />
      )}

      {showSass && (
        <ThemeExample
          title={<code>@mixin euiXScroll;</code>}
          description={
            <>
              <p>Sass mixin for adding horizontal scrolling to a container.</p>
              <p>
                If you need to further customize the position or side of the
                overflow shadow use the <EuiCode>euiXScrollWithShadows</EuiCode>{' '}
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
              aria-label="Example of euiXScrollWithShadows region"
              className="guideSass__overflowShadowsX"
            >
              {scrollingContent}
            </div>
          }
          snippet={`.overflowShadowsX {
  @include euiXScrollWithShadows;
  padding: $euiSize;
}`}
          snippetLanguage="scss"
        />
      )}
    </>
  );
};
