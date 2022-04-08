import React from 'react';
import { css } from '@emotion/react';

import {
  EuiCode,
  EuiSpacer,
  EuiPanel,
  EuiLink,
  useEuiYScrollWithShadows,
} from '../../../../src';
import { ThemeExample } from '../theme/_components/_theme_example';

export default () => {
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
            {scrollingContent}
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
          '`${useEuiYScrollWithShadows()}; ' +
          'height: 180px;' +
          ` }}>
  <ScrollContent />
</ScrollRegion>`
        }
      />

      <EuiSpacer />

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
            {scrollingContent}
          </div>
        }
        snippet={`.overflowShadowsY {
  @include euiYScrollWithShadows;
  height: 180px;
}`}
        snippetLanguage="scss"
      />
    </>
  );
};
