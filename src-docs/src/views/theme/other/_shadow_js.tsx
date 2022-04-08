import React, { useState } from 'react';
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
  useXScrollWithShadowsStyles,
  useYScrollWithShadowsStyles,
  _EuiShadowSizesDescriptions,
  _EuiShadowSizes,
  SHADOW_SIZE,
  EuiSwitch,
  EuiTextAlign,
} from '../../../../../src';

// TODO: Update imports
import {
  useEuiShadow,
  useEuiBottomShadowFlat,
} from '../../../../../src/themes/amsterdam/global_styling/mixins/_shadow';

import { ThemeExample } from '../_components/_theme_example';
import { ThemeValuesTable } from '../_components/_theme_values_table';

const RenderShadow = ({
  size,
  color,
}: {
  size: _EuiShadowSizes;
  color?: boolean;
}) => {
  const customColor = color ? 'red' : undefined;
  const style = useEuiShadow(size, customColor);
  return (
    <div
      className="guideSass__shadow"
      css={css`
        ${style}
      `}
    />
  );
};

const RenderFlatShadow = ({ color }: { color?: boolean }) => {
  const customColor = color ? 'red' : undefined;
  const style = useEuiBottomShadowFlat(customColor);
  return (
    <div
      className="guideSass__shadow"
      css={css`
        ${style}
      `}
    />
  );
};

export default () => {
  const { euiTheme } = useEuiTheme();
  const [customColor, setCustomColor] = useState(false);

  const shadowItems = SHADOW_SIZE.map((shadow) => {
    return {
      id: shadow,
      token: customColor
        ? `useEuiShadow('${shadow}', 'red');`
        : `useEuiShadow('${shadow}');`,
      description: _EuiShadowSizesDescriptions[shadow],
    };
  });

  const allShadows = shadowItems.concat([
    {
      // @ts-ignore TODO
      id: 'flat',
      token: customColor
        ? "useEuiBottomShadowFlat('red');"
        : 'useEuiBottomShadowFlat();',
      description:
        'Similar to shadow medium but without the bottom depth. Useful for popovers that drop UP rather than DOWN.',
    },
  ]);

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
          <div className="guideSass__shadow" css={css(useEuiShadow())}>
            <strong>
              Shadows work best on differently shaded backgrounds.
            </strong>
          </div>
        }
        snippet={'css(useEuiShadow())'}
        snippetLanguage="tsx"
      />

      <EuiTextAlign textAlign="right">
        <EuiSwitch
          label="Show with custom color"
          checked={customColor}
          onChange={(e) => setCustomColor(e.target.checked)}
        />
      </EuiTextAlign>

      <EuiSpacer />

      <ThemeValuesTable
        valign="middle"
        items={allShadows}
        tokenColumnProps={{ name: 'Hook' }}
        render={(item) =>
          item.id === 'flat' ? (
            <RenderFlatShadow color={customColor} />
          ) : (
            <RenderShadow
              size={item.id as _EuiShadowSizes}
              color={customColor}
            />
          )
        }
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
