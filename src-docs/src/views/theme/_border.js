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
  EuiThemeBorderColorValues,
  EuiThemeBorderWidthValues,
  EuiThemeBorderRadiusValues,
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
  const [radiusClone, updateRadius] = useDebouncedUpdate({
    property: ['border', 'radius'],
    value: border,
    onUpdate: onThemeUpdate,
    time: 1000,
  });
  const [widthClone, updateWidth] = useDebouncedUpdate({
    property: ['border', 'width'],
    value: border,
    onUpdate: onThemeUpdate,
    time: 1000,
  });

  const colorProps = getPropsFromThemeKey(EuiThemeBorderColorValues);
  const widthProps = getPropsFromThemeKey(EuiThemeBorderWidthValues);
  const radiusProps = getPropsFromThemeKey(EuiThemeBorderRadiusValues);
  const typeProps = getPropsFromThemeKey(EuiThemeBorderTypes);

  const style = css`
    width: ${euiTheme.size.xl};
    height: ${euiTheme.size.xl};
    border-radius: ${euiTheme.border.radius.small};
  `;

  const wrappingExampleStyle = {
    padding: euiTheme.size.s,
  };

  return (
    <div>
      <EuiText>
        <h2>
          Border <EuiCode>EuiThemeBorder</EuiCode>
        </h2>
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
                  code="_EuiThemeBorderColorValues"
                  description={
                    <p>
                      EUI only has one base color it uses for all borders (or
                      calculated borders).
                    </p>
                  }
                  themeValues={Object.keys(colorProps).map((prop) => (
                    <EuiFlexItem key={prop}>
                      <ThemeValue
                        property="border"
                        type={colorProps[prop]}
                        name={prop}
                        value={borderClone[prop]}
                        onUpdate={(value) => updateBorder(prop, value)}
                        example={
                          <EuiColorPickerSwatch color={borderClone[prop]} />
                        }
                      />
                    </EuiFlexItem>
                  ))}
                />
                <EuiSpacer size="xxl" />
                <ThemeSection
                  code="_EuiThemeBorderWidthValues"
                  description={
                    <p>
                      These basic properties make up the border thickness which
                      can be used individually.
                    </p>
                  }
                  themeValues={Object.keys(widthProps).map((prop) => (
                    <EuiFlexItem key={prop}>
                      <ThemeValue
                        property="border.width"
                        type={widthProps[prop]}
                        name={prop}
                        value={widthClone.width[prop]}
                        onUpdate={(value) => updateWidth(prop, value)}
                      />
                    </EuiFlexItem>
                  ))}
                />
                <EuiSpacer size="xxl" />
                <ThemeSection
                  code="_EuiThemeBorderRadiusValues"
                  description={
                    <p>
                      These basic properties make up the corner radii which can
                      be used individually.
                    </p>
                  }
                  themeValues={Object.keys(radiusProps).map((prop) => (
                    <EuiFlexItem key={prop}>
                      <ThemeValue
                        property="border.radius"
                        type={radiusProps[prop]}
                        name={prop}
                        value={radiusClone.radius[prop]}
                        onUpdate={(value) => updateRadius(prop, value)}
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
                      `}
                    >
                      <strong>{`border: ${euiTheme.border.thick}`}</strong>
                    </div>
                  }
                  snippet={'border: ${euiTheme.border.thick};'}
                />
                <EuiSpacer />
                <ThemeSection
                  code="euiTheme.border[property][value]"
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
                        border: ${euiTheme.border.width.thick} dashed
                          ${euiTheme.border.color};
                      `}
                    >
                      <strong>{`border: ${euiTheme.border.width.thick} dashed ${euiTheme.border.color}`}</strong>
                    </div>
                  }
                  snippet={
                    'border: ${euiTheme.border.width.thick} dashed ${euiTheme.border.color};'
                  }
                />
                <EuiSpacer />
                <ThemeSection
                  example={
                    <div
                      style={wrappingExampleStyle}
                      css={css`
                        border: ${euiTheme.border.thick};
                        border-radius: ${euiTheme.border.radius.medium};
                      `}
                    >
                      <strong>{`border-radius: ${euiTheme.border.radius.medium}`}</strong>
                    </div>
                  }
                  snippet={'border-radius: ${euiTheme.border.radius.medium};'}
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
