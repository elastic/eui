import React from 'react';
import { Link } from 'react-router-dom';
import { css } from '@emotion/react';
import {
  EuiCode,
  EuiFlexGroup,
  EuiLink,
  EuiPanel,
  EuiSpacer,
  EuiText,
  useEuiTheme,
  keysOf,
  useXScrollWithShadowsStyles,
  useYScrollWithShadowsStyles,
} from '../../../../../src';

// TODO: Update imports
import {
  useSlightShadowStyles,
  mixinSlightShadowStyles,
  // useBottomShadowSmallStyles,
  mixinBottomShadowSmallStyles,
  // useBottomShadowMediumStyles,
  mixinBottomShadowMediumStyles,
  // useBottomShadowStyles,
  mixinBottomShadowStyles,
  // useBottomShadowLargeStyles,
  mixinBottomShadowLargeStyles,
  // useBottomShadowFlatStyles,
  mixinBottomShadowFlatStyles,
} from '../../../../../src/themes/amsterdam/global_styling/mixins/_shadow';

import { ThemeExample } from '../_components/_theme_example';
import { ThemeValuesTable } from '../_components/_theme_values_table';

const shadows = {
  euiSlightShadow: {
    description: 'Very subtle shadow used on small components.',
    hook: 'useSlightShadowStyles',
    mixin: 'mixinSlightShadowStyles',
    fn: mixinSlightShadowStyles,
  },
  euiBottomShadowSmall: {
    description:
      'Adds subtle depth, usually used in conjunction with a border.',
    hook: 'useBottomShadowSmallStyles',
    mixin: 'mixinBottomShadowSmallStyles',
    fn: mixinBottomShadowSmallStyles,
  },
  euiBottomShadowMedium: {
    description: 'Used on small sized portalled content like popovers.',
    hook: 'useBottomShadowMediumStyles',
    mixin: 'mixinBottomShadowMediumStyles',
    fn: mixinBottomShadowMediumStyles,
  },
  euiBottomShadow: {
    description: 'Primary shadow used in most cases to add visible depth.',
    hook: 'useBottomShadowStyles',
    mixin: 'mixinBottomShadowStyles',
    fn: mixinBottomShadowStyles,
  },
  euiBottomShadowLarge: {
    description:
      'Very large shadows used for large portalled style containers like modals and flyouts.',
    hook: 'useBottomShadowLargeStyles',
    mixin: 'mixinBottomShadowLargeStyles',
    fn: mixinBottomShadowLargeStyles,
  },
  euiBottomShadowFlat: {
    description:
      'Subtle shadow on all sides but is usually used for popovers that pop in the up direction.',
    hook: 'useBottomShadowFlatStyles',
    mixin: 'mixinBottomShadowFlatStyles',
    fn: mixinBottomShadowFlatStyles,
  },
};

export default () => {
  const { euiTheme, colorMode } = useEuiTheme();
  return (
    <>
      <ThemeExample
        title="Hooks"
        description={
          <>
            <p>
              Shadows can be applied through both JS functions and React hooks.
              There are a variety of sizes depending on the layer depth you are
              trying to achieve.
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
          <div className="guideSass__shadow" css={css(useSlightShadowStyles())}>
            <strong>Works best on differently shaded backgrounds.</strong>
          </div>
        }
        snippet={'useSlightShadowStyles();'}
        snippetLanguage="scss"
      />

      <ThemeValuesTable
        items={keysOf(shadows).map((shadow) => {
          return {
            id: shadow,
            token: `${shadows[shadow].hook}();`,
            styleFn: shadows[shadow].fn,
            description: shadows[shadow].description,
          };
        })}
        render={(item) => (
          <div
            className="guideSass__shadow"
            css={css(item.styleFn!(euiTheme, {}, colorMode))}
          />
        )}
      />

      <ThemeExample
        title={<code>useYScrollWithShadowsStyles();</code>}
        description={
          <>
            <p>
              Primarily used in modals and flyouts, the overflow shadow masks
              the edges to indicate there is more content.
            </p>
            <p>
              It requires a wrapping element to control the height with{' '}
              <EuiCode>overflow-y: hidden;</EuiCode> and the content to use
              <EuiCode>useYScrollWithShadows();</EuiCode> hook or use the{' '}
              <Link to="/utilities/css-utility-classes">CSS utility class</Link>{' '}
              <EuiCode>.eui-yScrollWithShadows</EuiCode>.
            </p>
          </>
        }
        examplePanel={{
          paddingSize: 'none',
        }}
        example={
          <div
            css={css`
              overflow-y: hidden;
              height: 160px;
            `}
          >
            <EuiText
              css={css`
                ${useYScrollWithShadowsStyles()}
                padding: ${euiTheme.size.base};
              `}
              size="s"
            >
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
        snippet={'useYScrollWithShadowsStyles()'}
        snippetLanguage="scss"
      />

      <ThemeExample
        title={<code>useXScrollWithShadowsStyles();</code>}
        description={
          <>
            <p>
              The horizontal equivalent should be used sparingly and usually
              only in full-height layouts or a grid of items.
            </p>
            <p>
              You may want to add at least <EuiCode>euiTheme.size.base</EuiCode>
              &apos;s worth of padding to the sides of your content so the mask
              doesn&apos;t overlay it.
            </p>
          </>
        }
        examplePanel={{
          paddingSize: 'none',
        }}
        example={
          <div
            css={css`
              ${useXScrollWithShadowsStyles()}
              padding: ${euiTheme.size.base};
            `}
          >
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
          </div>
        }
        snippet={'useXScrollWithShadowsStyles();'}
        snippetLanguage="scss"
      />

      <EuiText>
        <p>
          If you need to further customize the position or side of the overflow
          shadow use the <EuiCode>useOverflowShadowStyles</EuiCode>{' '}
          <EuiLink href="https://github.com/elastic/eui/blob/main/src/global_styling/mixins/_shadow.ts">
            hook
          </EuiLink>
          .
        </p>
      </EuiText>
      <EuiSpacer size="xl" />
    </>
  );
};
