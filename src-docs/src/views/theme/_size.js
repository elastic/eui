import React from 'react';
import { css } from '@emotion/react';
import { useEuiTheme } from '../../../../src/services';

import {
  EuiTitle,
  EuiSpacer,
  EuiCode,
  EuiLink,
} from '../../../../src/components';

import { getPropsFromThemeKey, EuiTheme, _EuiThemeSize } from './_props';
import { ThemeSection } from './_theme_section';
import { ThemeValue } from './_values';
import { EuiFlexItem } from '../../../../src/components/flex';

export default ({ onThemeUpdate }) => {
  const { euiTheme } = useEuiTheme();
  const sizes = euiTheme.size;

  const updateBase = (value) => {
    onThemeUpdate({
      base: value,
    });
  };

  const themeProps = getPropsFromThemeKey(EuiTheme);
  const themeSizeProps = getPropsFromThemeKey(_EuiThemeSize);

  const wrappingExampleStyle = {
    background: euiTheme.colors.highlight,
    fontWeight: euiTheme.font.weight.bold,
  };

  return (
    <div>
      <EuiTitle>
        <h2>Sizing</h2>
      </EuiTitle>
      <EuiTitle size="s">
        <h3>Base</h3>
      </EuiTitle>

      <EuiSpacer />

      <ThemeSection
        code="EuiThemeBase"
        description={
          <p>
            All sizing keys are calculated from a single <EuiCode>base</EuiCode>{' '}
            integer and evaluate to pixel values.
          </p>
        }
        themeValues={
          <EuiFlexItem>
            <ThemeValue
              property=""
              name="base"
              type={themeProps.base}
              value={euiTheme.base}
              groupProps={{ alignItems: 'center' }}
              buttonStyle={css`
                width: ${euiTheme.base}px;
                height: ${euiTheme.base}px;
                border-radius: min(25%, ${euiTheme.border.radiusSmall});
                background: ${euiTheme.colors.mediumShade};
              `}
              onUpdate={(value) => updateBase(value)}
            />
          </EuiFlexItem>
        }
      />

      <EuiSpacer />

      <ThemeSection
        description={
          <p>
            You can use calculations on top of the base value, just be sure to
            append the <EuiCode>px</EuiCode> unit to the end.
          </p>
        }
        example={
          <div
            style={wrappingExampleStyle}
            css={css`
              padding: ${euiTheme.base * 2}px;
            `}>
            {`padding: ${euiTheme.base * 2}px`}
          </div>
        }
        snippet={'padding: ${euiTheme.base * 2}px;'}
      />

      <EuiSpacer size="xxl" />
      <EuiTitle size="s">
        <h3>Size</h3>
      </EuiTitle>
      <EuiSpacer />

      <ThemeSection
        code="EuiThemeSize"
        description={
          <p>
            It is recommended not to adjust the computed sizes and only adjust
            the top level base value.
          </p>
        }
        property="size"
        themeValues={Object.keys(sizes).map((size) => (
          <EuiFlexItem key={size}>
            <ThemeValue
              property="size"
              type={themeSizeProps[size]}
              name={size}
              value={sizes[size]}
              groupProps={{ alignItems: 'center' }}
              buttonStyle={css`
                width: ${sizes[size]};
                height: ${sizes[size]};
                border-radius: min(25%, ${euiTheme.border.radiusSmall});
                background: ${euiTheme.colors.mediumShade};
              `}
            />
          </EuiFlexItem>
        ))}
      />

      <EuiSpacer />

      <ThemeSection
        description={<p>Using the values as they are is straight foward.</p>}
        example={
          <div
            style={wrappingExampleStyle}
            css={css`
              padding: ${euiTheme.size.xl};
            `}>
            {`padding: ${euiTheme.size.xl}`}
          </div>
        }
        snippet={'padding: ${euiTheme.size.xl};'}
      />

      <EuiSpacer />

      <ThemeSection
        description={
          <>
            <p>
              When doing calculations on top of the size values, you have to use{' '}
              the{' '}
              <EuiLink href="https://developer.mozilla.org/en-US/docs/Web/CSS/calc()">
                CSS <EuiCode>calc()</EuiCode> method
              </EuiLink>{' '}
              because the value that is returned is only a string value with the
              unit.
            </p>
          </>
        }
        example={
          <div
            style={wrappingExampleStyle}
            css={css`
              padding: calc(${euiTheme.size.base} * 2);
            `}>
            {`padding: calc(${euiTheme.size.base} * 2)`}
          </div>
        }
        snippet={'padding: calc(${euiTheme.size.base} * 2);'}
      />
    </div>
  );
};
