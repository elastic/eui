import React from 'react';
import { css } from '@emotion/react';

import {
  useEuiTheme,
  EuiText,
  EuiSpacer,
  EuiColorPickerSwatch,
  EuiPanel,
  EuiTitle,
  logicalSizeCSS,
} from '../../../../../src';

import { getPropsFromComponent } from '../../../services/props/get_props';

import { useDebouncedUpdate } from '../hooks';

import { ThemeValue } from './_values';

import {
  EuiThemeBorderTypes,
  EuiThemeBorderColorValues,
  EuiThemeBorderWidthValues,
  EuiThemeBorderRadiusValues,
} from '../_props';

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

  const colorProps = getPropsFromComponent(EuiThemeBorderColorValues);
  const widthProps = getPropsFromComponent(EuiThemeBorderWidthValues);
  const radiusProps = getPropsFromComponent(EuiThemeBorderRadiusValues);
  const typeProps = getPropsFromComponent(EuiThemeBorderTypes);

  const style = css`
    ${logicalSizeCSS(euiTheme.size.xl, euiTheme.size.xl)}
    border-radius: ${euiTheme.border.radius.small};
  `;

  return (
    <div>
      <EuiText>
        <h2>
          Border &emsp;{' '}
          <small>
            <code>EuiThemeBorder</code>
          </small>
        </h2>
      </EuiText>
      <EuiSpacer size="xl" />

      <EuiPanel color="subdued">
        {Object.keys(colorProps).map((prop) => (
          <ThemeValue
            key={prop}
            property="border"
            type={colorProps[prop]}
            name={prop}
            value={borderClone[prop]}
            onUpdate={(value) => updateBorder(prop, value)}
            example={
              <EuiColorPickerSwatch
                showToolTip={false}
                color={borderClone[prop]}
              />
            }
          />
        ))}

        {Object.keys(widthProps).map((prop) => (
          <ThemeValue
            key={prop}
            property="border.width"
            type={widthProps[prop]}
            name={prop}
            value={widthClone.width[prop]}
            onUpdate={(value) => updateWidth(prop, value)}
            buttonStyle={[
              style,
              css`
                border: ${borderClone.thin};
                border-width: ${widthClone.width[prop]};
              `,
            ]}
          />
        ))}

        {Object.keys(radiusProps).map((prop) => (
          <ThemeValue
            key={prop}
            property="border.radius"
            type={radiusProps[prop]}
            name={prop}
            value={radiusClone.radius[prop]}
            onUpdate={(value) => updateRadius(prop, value)}
            buttonStyle={[
              style,
              css`
                border: ${borderClone.thin};
                border-radius: ${radiusClone.radius[prop]};
              `,
            ]}
          />
        ))}
      </EuiPanel>

      <EuiSpacer size="xl" />

      <EuiTitle size="xs">
        <h3>
          <code>_EuiThemeBorderTypes</code>
        </h3>
      </EuiTitle>
      <EuiSpacer size="s" />
      <EuiText size="s" grow={false}>
        <p>
          These common border types are computed from the base border values
          above. Changing them would convert them to hard-coded strings.
        </p>
      </EuiText>

      <EuiSpacer />

      {Object.keys(typeProps).map((prop) => (
        <ThemeValue
          key={prop}
          property="border"
          type={typeProps[prop]}
          name={prop}
          value={borderClone[prop]}
          groupProps={{ alignItems: 'center' }}
          stringProps={{ style: { width: 200 } }}
          buttonStyle={[
            style,
            css`
              border: ${borderClone[prop]};
            `,
          ]}
        />
      ))}
    </div>
  );
};
