import React from 'react';
import { css } from '@emotion/react';
import { useEuiTheme } from '../../../../../src/services';

import {
  EuiCode,
  EuiLink,
  keysOf,
  logicalCSS,
  logicalStyle,
  logicals,
  EuiSpacer,
  EuiText,
} from '../../../../../src';

import { ThemeExample } from '../_components/_theme_example';

import { EuiThemeSize } from '../_props';
import { getPropsFromComponent } from '../../../services/props/get_props';
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
  const themeSizeProps = getPropsFromComponent(EuiThemeSize);

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

export const UtilsJS = () => {
  return (
    <>
      <EuiText grow={false}>
        <p>
          EUI utilizes{' '}
          <EuiLink href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties">
            logical CSS properties
          </EuiLink>{' '}
          to enable directional writing-modes. To encourage use of logical
          properties, we provide a few helper utilities to convert certain
          directional properties to logical properties.
        </p>
      </EuiText>

      <EuiSpacer size="l" />

      <ThemeExample
        title={<code>{"logicalCSS('property', 'value')"}</code>}
        description={
          <p>
            Returns the <strong>string version</strong> of the logical CSS
            property version for the given{' '}
            <EuiCode language="css">property: value</EuiCode> pair.
          </p>
        }
        example={
          <p css={[logicalCSS('padding-left', '160px')]}>
            <code>{logicalCSS('padding-left', '160px')}</code>
          </p>
        }
        snippet={"${logicalCSS('padding-left', '160px')}"}
      />

      <ThemeExample
        title={<code>{"logicalStyle('property', 'value')"}</code>}
        description={
          <p>
            Returns the <strong>object version</strong> of the logical CSS
            property version for the given{' '}
            <EuiCode language="css">property: value</EuiCode> pair.
          </p>
        }
        example={
          <p style={logicalStyle('padding-left', '160px')}>
            <code>
              {Object.entries(logicalStyle('padding-left', '160px'))[0][0]}:{' '}
              {Object.entries(logicalStyle('padding-left', '160px'))[0][1]};
            </code>
          </p>
        }
        snippetLanguage="tsx"
        snippet={"<p style={logicalStyle('padding-left', '160px')} />"}
      />

      <ThemeExample
        title={<code>{"logicals['property']"}</code>}
        description={
          <p>
            An object that contains the logical property equivelants of the
            given <EuiCode language="css">property</EuiCode>.
          </p>
        }
        example={
          <p
            css={css`
              ${logicals['padding-left']}: 160px;
            `}
          >
            <code>{`${logicals['padding-left']}: 160px`}</code>
          </p>
        }
        snippet={"${logicals['padding-left']}: 160px;"}
      />
    </>
  );
};
