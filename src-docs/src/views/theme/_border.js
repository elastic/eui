import React from 'react';
import { css } from '@emotion/react';
import { useEuiTheme } from '../../../../src/services';

import {
  EuiText,
  EuiSpacer,
  EuiFlexItem,
  EuiColorPickerSwatch,
  EuiCode,
  EuiTabbedContent,
} from '../../../../src/components';

import { useDebouncedUpdate } from './hooks';

import { ThemeSection } from './_theme_section';
import { ThemeValue } from './_values';

import {
  getPropsFromThemeKey,
  EuiThemeBorderTypes,
  EuiThemeBorderValues,
} from './_props';

export default ({ onThemeUpdate }) => {
  const { euiTheme } = useEuiTheme();
  const border = euiTheme.border;
  const [borderClone, updateBorder] = useDebouncedUpdate({
    property: 'border',
    value: border,
    onUpdate: onThemeUpdate,
    time: 1000,
  });

  const valueProps = getPropsFromThemeKey(EuiThemeBorderValues);
  const typeProps = getPropsFromThemeKey(EuiThemeBorderTypes);

  const style = css`
    width: ${euiTheme.size.xl};
    height: ${euiTheme.size.xl};
    border-radius: ${euiTheme.border.radiusSmall};
  `;

  const wrappingExampleStyle = {
    padding: euiTheme.size.s,
  };

  return (
    <div>
      <EuiText>
        <h2>Border</h2>
        <p>
          The <EuiCode>border</EuiCode> theme key contains both individual
          border property values and full shorthand border properties.
        </p>
      </EuiText>
      <EuiSpacer />

      <EuiTabbedContent
        tabs={[
          {
            id: 'themeBorderTabValues',
            name: 'Values',
            content: (
              <>
                <EuiSpacer />
                <ThemeSection
                  code="_EuiThemeBorderValues"
                  description={
                    <p>
                      These basic properties make up the thickness, color and
                      corner radii which can be used individually.
                    </p>
                  }
                  themeValues={Object.keys(valueProps).map((prop) => (
                    <EuiFlexItem key={prop}>
                      <ThemeValue
                        property="border"
                        type={valueProps[prop]}
                        name={prop}
                        value={borderClone[prop]}
                        onUpdate={(value) => updateBorder(prop, value)}
                        example={
                          prop === 'color' ? (
                            <EuiColorPickerSwatch color={borderClone[prop]} />
                          ) : undefined
                        }
                      />
                    </EuiFlexItem>
                  ))}
                />
                <EuiSpacer size="xxl" />

                <ThemeSection
                  code="_EuiThemeBorderTypes"
                  description={
                    <p>
                      These common border types string together the base
                      properties to form common full <EuiCode>border</EuiCode>{' '}
                      properties.
                    </p>
                  }
                  themeValues={Object.keys(typeProps).map((prop) => (
                    <EuiFlexItem key={prop}>
                      <ThemeValue
                        property="border"
                        type={typeProps[prop]}
                        name={prop}
                        value={borderClone[prop]}
                        onUpdate={(value) => updateBorder(prop, value)}
                        stringProps={{ style: { width: 160 } }}
                        buttonStyle={[
                          style,
                          css`
                            border: ${borderClone[prop]};
                          `,
                        ]}
                      />
                    </EuiFlexItem>
                  ))}
                />
              </>
            ),
          },
          {
            id: 'themeBorderTabUsage',
            name: 'Usage',
            content: (
              <>
                <EuiSpacer />
                <ThemeSection
                  code="euiTheme.border[type]"
                  description={
                    <p>
                      The simplest form of consuming border styles is using one
                      of the full types which provides the color, width and
                      style.
                    </p>
                  }
                  example={
                    <div
                      style={wrappingExampleStyle}
                      css={css`
                        border: ${euiTheme.border.thick};
                      `}>
                      <strong>{`border: ${euiTheme.border.thick}`}</strong>
                    </div>
                  }
                  snippet={'border: ${euiTheme.border.thick};'}
                />
                <EuiSpacer />
                <ThemeSection
                  code="euiTheme.border[value]"
                  description={
                    <p>
                      You can also strictly use the border values within a
                      single shorthand property.
                    </p>
                  }
                  example={
                    <div
                      style={wrappingExampleStyle}
                      css={css`
                        border: ${euiTheme.border.widthThick} dashed
                          ${euiTheme.border.color};
                      `}>
                      <strong>{`border: ${euiTheme.border.widthThick} dashed ${euiTheme.border.color}`}</strong>
                    </div>
                  }
                  snippet={
                    'border: ${euiTheme.border.widthThick} dashed ${euiTheme.border.color};'
                  }
                />
                <EuiSpacer />
                <ThemeSection
                  example={
                    <div
                      style={wrappingExampleStyle}
                      css={css`
                        border: ${euiTheme.border.thick};
                        border-radius: ${euiTheme.border.radius};
                      `}>
                      <strong>{`border-radius: ${euiTheme.border.radius}`}</strong>
                    </div>
                  }
                  snippet={'border-radius: ${euiTheme.border.radius};'}
                />
                <EuiSpacer />
              </>
            ),
          },
        ]}
      />
    </div>
  );
};
