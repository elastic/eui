import React from 'react';
import { css } from '@emotion/react';
import { useEuiTheme } from '../../../../../src/services';

import { EuiCode, EuiLink, keysOf } from '../../../../../src/components';

import { ThemeExample } from '../_components/_theme_example';

import { getPropsFromThemeKey, _EuiThemeSize } from '../_props';
import { ThemeValuesTable } from '../_components/_theme_values_table';

export const BaseJS = () => {
  const { euiTheme } = useEuiTheme();

  return (
    <ThemeExample
      title={<code>euiTheme.base = {euiTheme.base}</code>}
      description={
        <>
          <p>
            This <EuiCode>base</EuiCode> integer sets the scale for the entire
            theme. You can use calculations on top of the base value, just be
            sure to append the <EuiCode>px</EuiCode> unit to the end.
          </p>
        </>
      }
      example={
        <div
          style={{
            background: euiTheme.colors.highlight,
            fontWeight: euiTheme.font.weight.bold,
          }}
          css={css`
            padding: ${euiTheme.base * 2}px;
          `}
        >
          {`padding: ${euiTheme.base * 2}px`}
        </div>
      }
      snippet={'padding: ${euiTheme.base * 2}px;'}
    />
  );
};

export default () => {
  const { euiTheme } = useEuiTheme();
  const sizes = euiTheme.size;
  const themeSizeProps = getPropsFromThemeKey(_EuiThemeSize);

  const wrappingExampleStyle = {
    background: euiTheme.colors.highlight,
    fontWeight: euiTheme.font.weight.bold,
  };

  return (
    <>
      <ThemeExample
        title={<code>euiTheme.size[size]</code>}
        description={<p>Use the named keys as as much as possible.</p>}
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

      <ThemeExample
        title={<code>calc()</code>}
        description={
          <p>
            When doing calculations on top of the named key values, you have to
            use the{' '}
            <EuiLink href="https://developer.mozilla.org/en-US/docs/Web/CSS/calc()">
              CSS <EuiCode>calc()</EuiCode> method
            </EuiLink>{' '}
            because the value that is returned is a string value with the
            appended unit.
          </p>
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

      <ThemeValuesTable
        items={keysOf(sizes).map((size) => {
          return {
            id: size,
            token: `size.${size}`,
            type: themeSizeProps[size],
            value: sizes[size],
          };
        })}
        valign="middle"
        sampleColumnProps={{ width: '100px' }}
        render={(size) => (
          <div
            css={css`
              width: ${size.value};
              height: ${size.value};
              border-radius: min(25%, ${euiTheme.border.radius.small});
              background: ${euiTheme.colors.mediumShade};
            `}
          />
        )}
      />
    </>
  );
};
