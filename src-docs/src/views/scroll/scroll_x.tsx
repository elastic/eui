import React from 'react';
import { css } from '@emotion/react';

import {
  EuiCode,
  EuiSpacer,
  EuiPanel,
  EuiFlexGroup,
  useEuiXScrollWithShadows,
  useEuiTheme,
  EuiLink,
} from '../../../../src';
import { ThemeExample } from '../theme/_components/_theme_example';

export default () => {
  const { euiTheme } = useEuiTheme();

  const scrollingContent = (
    <EuiFlexGroup
      css={css`
        width: 150%;
      `}
      responsive={false}
    >
      <EuiPanel className="guideSass__shadow" color="primary" />
      <EuiPanel className="guideSass__shadow" color="primary" />
      <EuiPanel className="guideSass__shadow" color="primary" />
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

      <ThemeExample
        title={<code>useEuiXScroll();</code>}
        description={
          <>
            <p>Styles hook for adding horizontal scrolling to a container.</p>
            <p>
              If you need to further customize the position or side of the
              overflow shadow use the{' '}
              <EuiCode>useEuiXScrollWithShadows</EuiCode>{' '}
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
            aria-label="Example of useEuiXScrollWithShadows region"
            css={css`
              ${useEuiXScrollWithShadows()};
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
          '`${useEuiXScrollWithShadows()}; ' +
          'padding: ${euiTheme.size.base};`' +
          ` }}>
  <ScrollContent />
</ScrollRegion>`
        }
      />

      <EuiSpacer />

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
    </>
  );
};
