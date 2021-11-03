import React from 'react';
import { Link } from 'react-router-dom';
import {
  EuiCode,
  EuiFlexGroup,
  EuiLink,
  EuiPanel,
  EuiSpacer,
  EuiText,
} from '../../../../../src';

import { ThemeExample } from '../_components/_theme_example';
import { ThemeValuesTable } from '../_components/_theme_values_table';

const shadows = {
  euiSlightShadow: {
    description: 'Very subtle shadow used on small components.',
  },
  euiBottomShadowSmall: {
    description:
      'Adds subtle depth, usually used in conjunction with a border.',
  },
  euiBottomShadowMedium: {
    description: 'Used on small sized portalled content like popovers.',
  },
  euiBottomShadow: {
    description: 'Primary shadow used in most cases to add visible depth.',
  },
  euiBottomShadowLarge: {
    description:
      'Very large shadows used for large portalled style containers like modals and flyouts.',
  },
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
        items={Object.keys(shadows).map((shadow) => {
          return {
            id: shadow,
            token: `@mixin ${shadow};`,
            // @ts-ignore TODO
            description: shadows[shadow].description,
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
            <EuiText className="guideSass__overflowShadowText" size="s">
              <p>
                Consequuntur atque nulla atque nemo tenetur numquam. Assumenda
                aspernatur qui aut sit. Aliquam doloribus iure sint id. Possimus
                dolor qui soluta cum id tempore ea illum. Facilis voluptatem aut
                aut ut similique ut. Sed repellendus commodi iure officiis
                exercitationem praesentium dolor. Ratione non ut nulla accusamus
                et. Optio laboriosam id incidunt. Ipsam voluptate ab quia
                necessitatibus sequi earum voluptate. Porro tempore et veritatis
                quo omnis. Eaque ut libero tempore sit placeat maxime
                laudantium. Mollitia tempore minus qui autem modi adipisci ad.
                Iste reprehenderit accusamus voluptatem velit. Quidem delectus
                eos veritatis et vitae et nisi. Doloribus ut corrupti voluptates
                qui exercitationem dolores.
              </p>
            </EuiText>
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
