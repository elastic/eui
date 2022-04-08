import React from 'react';
import { Link } from 'react-router-dom';
import {
  EuiCode,
  EuiFlexGroup,
  EuiLink,
  EuiPanel,
  EuiSpacer,
  EuiText,
  keysOf,
  _EuiShadowSizesDescriptions,
} from '../../../../../src';

import { ThemeExample } from '../_components/_theme_example';
import { ThemeValuesTable } from '../_components/_theme_values_table';

const shadows = {
  euiSlightShadow: 'xs',
  euiBottomShadowSmall: 's',
  euiBottomShadowMedium: 'm',
  euiBottomShadow: 'l',
  euiBottomShadowLarge: 'xl',
  euiBottomShadowFlat: {
    description:
      'Subtle shadow on all sides but is usually used for popovers that pop in the up direction.',
  },
};

export default () => {
  return (
    <>
      <ThemeExample
        title="Mixins"
        description={
          <>
            <p>
              Shadows can be applied through Sass mixins only. There are a
              variety of sizes depending on the layer depth you are trying to
              achieve.
            </p>
            <p>
              Usually you want to avoid putting shadows on containers with the
              same background color of its parent (e.g. white on white);
            </p>
          </>
        }
        examplePanel={{
          color: 'subdued',
        }}
        example={
          <div className="guideSass__shadow guideSass__shadow--euiBottomShadow">
            <strong>Works best on differently shaded backgrounds.</strong>
          </div>
        }
        snippet={'@include euiBottomShadow;'}
        snippetLanguage="scss"
      />

      <ThemeValuesTable
        valign="middle"
        items={keysOf(shadows).map((shadow) => {
          return {
            id: shadow,
            token: `@mixin ${shadow};`,
            description:
              typeof shadows[shadow] === 'string'
                ? // @ts-ignore TODO
                  _EuiShadowSizesDescriptions[shadows[shadow]]
                : // @ts-ignore TODO
                  shadows[shadow].description,
          };
        })}
        render={(item) => (
          <div className={`guideSass__shadow guideSass__shadow--${item.id}`} />
        )}
      />

      <ThemeExample
        title={<code>@mixin euiYScrollWithShadows;</code>}
        description={
          <>
            <p>
              Primarily used in modals and flyouts, the overflow shadow masks
              the edges to indicate there is more content.
            </p>
            <p>
              It requires a wrapping element to control the height with{' '}
              <EuiCode>overflow-y: hidden;</EuiCode> and the content to
              <EuiCode>@include euiYScrollWithShadows;</EuiCode> or use the{' '}
              <Link to="/utilities/css-utility-classes">CSS utility class</Link>{' '}
              <EuiCode>.eui-yScrollWithShadows</EuiCode>.
            </p>
          </>
        }
        examplePanel={{
          paddingSize: 'none',
        }}
        example={
          <div className="guideSass__overflowShadows">
            <div className="guideSass__overflowShadowText">
              <EuiPanel className="guideSass__shadow" color="primary" />
              <EuiPanel className="guideSass__shadow" color="primary" />
              <EuiPanel className="guideSass__shadow" color="primary" />
            </div>
          </div>
        }
        snippet={`.overflowY {
  height: 200px;
  overflow-y: hidden;

  .overflowY__content {
    @include euiYScrollWithShadows;
    padding; $euiSize;
  }
}`}
        snippetLanguage="scss"
      />

      <ThemeExample
        title={<code>@mixin euiXScrollWithShadows;</code>}
        description={
          <>
            <p>
              The horizontal equivalent should be used sparingly and usually
              only in full-height layouts or a grid of items.
            </p>
            <p>
              You may want to add at least <EuiCode>$euiSizeS</EuiCode>
              &apos;s worth of padding to the sides of your content so the mask
              doesn&apos;t overlay it.
            </p>
          </>
        }
        examplePanel={{
          paddingSize: 'none',
        }}
        example={
          <div className="guideSass__overflowShadowsX">
            <EuiFlexGroup
              className="guideSass__overflowShadowTextX"
              responsive={false}
            >
              <EuiPanel className="guideSass__shadow" color="primary" />
              <EuiPanel className="guideSass__shadow" color="primary" />
              <EuiPanel className="guideSass__shadow" color="primary" />
            </EuiFlexGroup>
          </div>
        }
        snippet={`.overflowX {
  @include euiXScrollWithShadows;
  padding: $euiSize;
}`}
        snippetLanguage="scss"
      />

      <EuiText>
        <p>
          If you need to further customize the position or side of the overflow
          shadow use the <EuiCode>euiOverflowShadow</EuiCode>{' '}
          <EuiLink href="https://github.com/elastic/eui/blob/master/src/global_styling/mixins/_shadow.scss">
            mixin
          </EuiLink>
          .
        </p>
      </EuiText>
      <EuiSpacer size="xl" />
    </>
  );
};
