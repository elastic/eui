import React from 'react';
import { css } from '@emotion/react';
import { useEuiTheme } from '../../../../src/services';

import {
  EuiText,
  EuiSpacer,
  EuiCode,
  EuiLink,
  EuiTabbedContent,
} from '../../../../src/components';

import { useDebouncedUpdate } from './hooks';
import { getPropsFromThemeKey, EuiTheme, _EuiThemeSize } from './_props';
import { ThemeSection } from './_theme_section';
import { ThemeValue } from './_values';
import { EuiFlexItem } from '../../../../src/components/flex';

export default ({ onThemeUpdate }) => {
  const { euiTheme } = useEuiTheme();
  const sizes = euiTheme.size;
  const base = euiTheme.base;
  const [baseClone, updateBase] = useDebouncedUpdate({
    base: 'base',
    value: base,
    onUpdate: onThemeUpdate,
  });

  const themeProps = getPropsFromThemeKey(EuiTheme);
  const themeSizeProps = getPropsFromThemeKey(_EuiThemeSize);

  const wrappingExampleStyle = {
    background: euiTheme.colors.highlight,
    fontWeight: euiTheme.font.weight.bold,
  };

  return (
    <div>
      <EuiText>
        <h2>Sizing</h2>
        <p>
          All sizing values, including font size, are calculated from a single{' '}
          <EuiCode>base</EuiCode> integer and converted to pixel or rem string
          values.
        </p>
      </EuiText>
      <EuiSpacer />

      <EuiTabbedContent
        tabs={[
          {
            id: 'themeSizingTabValues',
            name: 'Values',
            content: (
              <>
                <EuiSpacer />
                <ThemeSection
                  code="EuiThemeBase"
                  description={
                    <p>
                      This <EuiCode>base</EuiCode> integer sets the scale for
                      the entire theme. Adjust cautiously.
                    </p>
                  }
                  themeValues={
                    <EuiFlexItem>
                      <ThemeValue
                        property=""
                        name="base"
                        type={themeProps.base}
                        value={baseClone}
                        groupProps={{ alignItems: 'center' }}
                        buttonStyle={css`
                          width: ${euiTheme.base}px;
                          height: ${euiTheme.base}px;
                          border-radius: min(
                            25%,
                            ${euiTheme.border.radius.small}
                          );
                          background: ${euiTheme.colors.mediumShade};
                        `}
                        onUpdate={(value) => updateBase('base', value)}
                      />
                    </EuiFlexItem>
                  }
                />
                <EuiSpacer size="xxl" />
                <ThemeSection
                  code="EuiThemeSize"
                  description={
                    <p>
                      It is not recommended to adjust the computed sizes but to
                      only adjust the top level base value in order to keep
                      proper proportions.
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
                          border-radius: min(
                            25%,
                            ${euiTheme.border.radius.small}
                          );
                          background: ${euiTheme.colors.mediumShade};
                        `}
                      />
                    </EuiFlexItem>
                  ))}
                />
              </>
            ),
          },
          {
            id: 'themeSizingTabUsage',
            name: 'Usage',
            content: (
              <>
                <EuiSpacer />
                <ThemeSection
                  code="euiTheme.base"
                  description={
                    <p>
                      You can use calculations on top of the base value, just be
                      sure to append the <EuiCode>px</EuiCode> unit to the end.
                    </p>
                  }
                  example={
                    <div
                      style={wrappingExampleStyle}
                      css={css`
                        padding: ${euiTheme.base * 2}px;
                      `}
                    >
                      {`padding: ${euiTheme.base * 2}px`}
                    </div>
                  }
                  snippet={'padding: ${euiTheme.base * 2}px;'}
                />
                <EuiSpacer />

                <ThemeSection
                  code="euiTheme.size[size]"
                  description={
                    <p>Using the named keys as values is straight forward.</p>
                  }
                  example={
                    <div
                      style={wrappingExampleStyle}
                      css={css`
                        padding: ${euiTheme.size.xl};
                      `}
                    >
                      {`padding: ${euiTheme.size.xl}`}
                    </div>
                  }
                  snippet={'padding: ${euiTheme.size.xl};'}
                />

                <EuiSpacer />

                <ThemeSection
                  code="calc()"
                  description={
                    <>
                      <p>
                        When doing calculations on top of the named key values,
                        you have to use the{' '}
                        <EuiLink href="https://developer.mozilla.org/en-US/docs/Web/CSS/calc()">
                          CSS <EuiCode>calc()</EuiCode> method
                        </EuiLink>{' '}
                        because the value that is returned is a string value
                        with the appended unit.
                      </p>
                    </>
                  }
                  example={
                    <div
                      style={wrappingExampleStyle}
                      css={css`
                        padding: calc(${euiTheme.size.base} * 2);
                      `}
                    >
                      {`padding: calc(${euiTheme.size.base} * 2)`}
                    </div>
                  }
                  snippet={'padding: calc(${euiTheme.size.base} * 2);'}
                />
              </>
            ),
          },
        ]}
      />
    </div>
  );
};
