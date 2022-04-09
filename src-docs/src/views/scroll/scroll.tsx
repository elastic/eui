import { css } from '@emotion/react';
import React from 'react';

import {
  EuiCode,
  EuiPanel,
  useEuiScrollBar,
  useEuiTheme,
} from '../../../../src';
import { ThemeExample } from '../theme/_components/_theme_example';

export default () => {
  const { euiTheme } = useEuiTheme();
  const scrollingContent = (
    <>
      <EuiPanel className="guideSass__shadow" color="primary" />
      <EuiPanel className="guideSass__shadow" color="primary" />
      <EuiPanel className="guideSass__shadow" color="primary" />
    </>
  );

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
            {scrollingContent}
          </div>
        }
        snippetLanguage="tsx"
        snippet={`<ScrollRegion
  tabIndex={0}
  role="region"
  aria-label=""
  className="eui-scrollBar"
  style={{ overflowY: 'auto', euiTheme.base * 10 }}>
  <ScrollContent />
</ScrollRegion>`}
      />

      <ThemeExample
        title={<code>useEuiScrollBar()</code>}
        description={
          <>
            <p>
              Use this style function to style the browser&apos;s scrollbar in a
              minimal aesthetic. This is best used on small, inner-page contents
              like panels.
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
            {scrollingContent}
          </div>
        }
        snippet={'useEuiScrollBar()'}
      />

      <ThemeExample
        title={<code>@mixin euiScrollBar;</code>}
        description={
          <>
            <p>
              Use this Sass mixin to style the browser&apos;s scrollbar in a
              minimal aesthetic. This is best used on small, inner-page contents
              like panels.
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
            {scrollingContent}
          </div>
        }
        snippetLanguage="scss"
        snippet={`.scrollBarRegion {
  @include euiScrollBar;
  overflow-y: auto;
  height: $euiSize * 10;
}`}
      />
    </>
  );
};
