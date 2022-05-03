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
  useEuiPaddingSize,
  useEuiBackgroundColor,
  useEuiBackgroundColorStyles,
  useEuiPaddingStyles,
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
      snippetLanguage="emotion"
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
        snippetLanguage="emotion"
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
        snippetLanguage="emotion"
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
        <h3>Logical properties</h3>
        <p>
          EUI utilizes{' '}
          <EuiLink href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties">
            logical CSS properties
          </EuiLink>{' '}
          to enable directional writing-modes. To encourage use of logical
          properties, we provide a few{' '}
          <EuiLink href="https://github.com/elastic/eui/blob/main/src/global_styling/functions/logicals.ts">
            helper utilities
          </EuiLink>{' '}
          to convert certain directional properties to logical properties.
        </p>
      </EuiText>

      <EuiSpacer size="l" />

      <ThemeExample
        title={<code>{'logicalCSS(property, value)'}</code>}
        description={
          <p>
            Returns the <strong>string version</strong> of the logical CSS
            property version for the given{' '}
            <EuiCode language="css">property: value</EuiCode> pair. Best used
            when providing styles via Emotion&apos;s{' '}
            <EuiCode>{'css``'}</EuiCode> method.
          </p>
        }
        example={
          <p
            css={[
              useEuiBackgroundColorStyles().warning,
              logicalCSS('padding-left', '100px'),
            ]}
          >
            <code>{logicalCSS('padding-left', '100px')}</code>
          </p>
        }
        snippetLanguage="emotion"
        snippet={"${logicalCSS('padding-left', '100px')};"}
      />

      <ThemeExample
        title={<code>{'logicalStyle(property, value)'}</code>}
        description={
          <p>
            Returns the <strong>object version</strong> of the logical CSS
            property version for the given{' '}
            <EuiCode language="css">property: value</EuiCode> pair. Best used
            when providing styles via React&apos;s <EuiCode>style</EuiCode>{' '}
            property.
          </p>
        }
        example={
          <p
            css={css(useEuiBackgroundColorStyles().warning)}
            style={logicalStyle('padding-left', '100px')}
          >
            <code>{JSON.stringify(logicalStyle('padding-left', '100px'))}</code>
          </p>
        }
        snippetLanguage="tsx"
        snippet={"<p style={logicalStyle('padding-left', '100px')} />"}
      />

      <ThemeExample
        title={<code>{'logicals[property]'}</code>}
        description={
          <p>
            An object that contains the logical property equivelants of the
            given <EuiCode language="css">property</EuiCode>.
          </p>
        }
        example={
          <p
            css={css`
              ${useEuiBackgroundColorStyles().warning};
              ${logicals['padding-left']}: 100px;
            `}
          >
            <code>{`${logicals['padding-left']}: 100px`}</code>
          </p>
        }
        snippetLanguage="emotion"
        snippet={"${logicals['padding-left']}: 100px;"}
      />

      <EuiSpacer size="xl" />

      <EuiText grow={false}>
        <h3>Padding</h3>
        <p>
          Uniform padding is a common task within EUI and as a consumer. These
          utiliies provide both contexts with simple helpers, that also provide
          the logical property type.
        </p>
      </EuiText>

      <EuiSpacer size="l" />

      <ThemeExample
        title={<code>{'useEuiPaddingStyles(side?)[size]'}</code>}
        description={
          <>
            <p>
              Returns an object of the available sizing keys containing the css
              string of the logical CSS property version for the given{' '}
              <EuiCode language="sass">side</EuiCode>.
            </p>
            <p>
              This is best used to map component prop styles to padding output.
            </p>
          </>
        }
        example={
          <p
            css={[
              useEuiBackgroundColorStyles().warning,
              useEuiPaddingStyles('left').l,
            ]}
          >
            <code>{useEuiPaddingStyles('left').l}</code>
          </p>
        }
        snippetLanguage="tsx"
        snippet={`const paddingStyles = useEuiPaddingStyles('left');
const cssStyles = [paddingStyles['l']];

<span css={cssStyles}>
  /* Your content */
</span>`}
      />

      <ThemeExample
        title={<code>{'useEuiPadding(size)'}</code>}
        description={
          <p>
            Returns just the padding size value for the given{' '}
            <EuiCode>size</EuiCode>.
          </p>
        }
        example={
          <p
            css={css`
              background: ${useEuiBackgroundColor('warning')};
              padding: ${useEuiPaddingSize('l')};
            `}
          >
            <code>{useEuiPaddingSize('l')}</code>
          </p>
        }
        snippetLanguage="emotion"
        snippet={"padding: ${useEuiPadding('l')};"}
      />
    </>
  );
};
