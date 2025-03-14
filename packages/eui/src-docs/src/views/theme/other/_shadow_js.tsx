import React, { useState } from 'react';
import { css } from '@emotion/react';
import {
  EuiPanel,
  EuiSpacer,
  useEuiTheme,
  _EuiShadowSizesDescriptions,
  _EuiThemeShadowSize,
  EuiThemeShadowSizes,
  EuiSwitch,
  transparentize,
  EuiDescribedFormGroup,
  EuiFormRow,
  useEuiShadow,
  useEuiShadowFlat,
} from '../../../../../src';
import { getPropsFromComponent } from '../../../services/props/get_props';
import { getDescription } from '../../../services/props/get_description';

import { ThemeExample } from '../_components/_theme_example';
import { ThemeValuesTable } from '../_components/_theme_values_table';
import { EuiThemeColors } from '../_props';

const RenderShadow = ({
  size,
  color,
}: {
  size: _EuiThemeShadowSize;
  color?: string;
}) => {
  const style = useEuiShadow(size, { color });
  return (
    <div
      className="guideSass__shadow"
      css={css`
        ${style}
      `}
    />
  );
};

const RenderFlatShadow = ({ color }: { color?: string }) => {
  const style = useEuiShadowFlat({ color });
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
  const colorProps = getPropsFromComponent(EuiThemeColors);

  return (
    <>
      <ThemeExample
        title={<code>euiTheme.colors.shadow</code>}
        description={
          <>
            <p>{getDescription(colorProps.shadow)}</p>
            <p>
              Use this token when creating your own specific box-shadow styles.
              Otherwise, we recommend using the provided React hooks.
            </p>
          </>
        }
        examplePanel={{
          color: 'subdued',
        }}
        example={
          <div
            className="guideSass__shadow"
            css={css`
              box-shadow: 0 ${euiTheme.size.xs} ${euiTheme.size.xs}
                ${transparentize(euiTheme.colors.shadow, 0.04)};
            `}
          >
            <strong>
              Shadows work best on differently shaded backgrounds.
            </strong>
          </div>
        }
        snippet={
          'box-shadow: 0 ${euiTheme.size.xs} ${euiTheme.size.xs} ${transparentize(euiTheme.colors.shadow, 0.04)};'
        }
        snippetLanguage="emotion"
      />

      <ThemeExample
        type="hook"
        title={<code>useEuiShadow(size, options)</code>}
        props={`size?: '${EuiThemeShadowSizes.join("' | '")}';

options?: {
  color?: string;
  property?: 'box-shadow' | 'filter';
  borderAllInHighContrastMode?: boolean;
};`}
        description={
          <>
            <p>
              Shadows can be applied through both JS functions and React hooks.
              There are a variety of sizes depending on the layer depth you are
              trying to achieve.
            </p>
            <p>
              Usually you want to avoid putting shadows on containers with the
              same background color of its parent (e.g. white on white).
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
        snippet={'${useEuiShadow()}'}
        snippetLanguage="emotion"
      />
    </>
  );
};

export const ShadowValuesJS = () => {
  const { euiTheme } = useEuiTheme();
  const [customColor, setCustomColor] = useState(false);

  const shadowItems = EuiThemeShadowSizes.map((shadow) => {
    return {
      id: shadow,
      token: customColor
        ? `useEuiShadow('${shadow}', { color: euiTheme.colors.accent });`
        : `useEuiShadow('${shadow}');`,
      description: _EuiShadowSizesDescriptions[shadow],
    };
  });

  const allShadows = shadowItems.concat([
    {
      // @ts-ignore TODO
      id: 'flat',
      token: customColor
        ? 'useEuiShadowFlat({ color: euiTheme.colors.accent });'
        : 'useEuiShadowFlat();',
      description:
        'Similar to shadow medium but without the bottom depth. Useful for popovers that drop UP rather than DOWN.',
    },
  ]);

  return (
    <>
      <EuiPanel color="accent">
        <EuiDescribedFormGroup
          fullWidth
          title={<h3>Colorizing shadows</h3>}
          description={
            <p>
              Shadow functions and hooks accept passing through a custom color.
              This color will still get transparentized at the normal opacity
              value, so be sure to pass in a fully opaque color.
            </p>
          }
        >
          <EuiFormRow fullWidth>
            <EuiSwitch
              label="Show samples using custom color"
              checked={customColor}
              onChange={(e) => setCustomColor(e.target.checked)}
            />
          </EuiFormRow>
        </EuiDescribedFormGroup>
      </EuiPanel>

      <EuiSpacer />

      <ThemeValuesTable
        valign="middle"
        items={allShadows}
        tokenColumnProps={{ name: 'Hook' }}
        render={(item) =>
          item.id === 'flat' ? (
            <RenderFlatShadow
              color={customColor ? euiTheme.colors.accent : undefined}
            />
          ) : (
            <RenderShadow
              size={item.id as _EuiThemeShadowSize}
              color={customColor ? euiTheme.colors.accent : undefined}
            />
          )
        }
      />
    </>
  );
};
