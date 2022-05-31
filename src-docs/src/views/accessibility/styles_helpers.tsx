import { css } from '@emotion/react';
import React from 'react';

import {
  EuiCode,
  euiScreenReaderOnly,
  EuiText,
  useEuiFocusRing,
} from '../../../../src';
import { useEuiTheme } from '../../../../src/services';
import { ThemeExample } from '../theme/_components/_theme_example';

export default () => {
  const { euiTheme } = useEuiTheme();

  return (
    <>
      <ThemeExample
        title={<code>.euiScreenReaderOnly</code>}
        type="className"
        description={
          <p>
            This utility class allows you to apply the screen reader only CSS
            styles directly to your component.
          </p>
        }
        example={
          <EuiText size="s">
            <p>The next paragraph is hidden except for screen readers.</p>
            <p className="euiScreenReaderOnly">
              I am hidden except for screen readers
            </p>
          </EuiText>
        }
        snippet={'<p className="euiScreenReaderOnly" />'}
      />
      <ThemeExample
        title={<code>euiScreenReaderOnly()</code>}
        type="function"
        description={
          <p>
            This function allows you to apply the screen reader only CSS styles
            directly to your component.
          </p>
        }
        example={
          <EuiText size="s">
            <p>The next paragraph is hidden except for screen readers.</p>
            <p
              css={css`
                ${euiScreenReaderOnly()}
              `}
            >
              I am hidden except for screen readers
            </p>
          </EuiText>
        }
        snippetLanguage="emotion"
        snippet={'${euiScreenReaderOnly()}'}
      />
      <ThemeExample
        title={<code>useEuiFocusRing(offset?, color?)</code>}
        type="hook"
        description={
          <p>
            By default, all interactable elements will inherit the{' '}
            <EuiCode>outline</EuiCode> property from the reset file. However,
            some instances require adjustment to the <EuiCode>offset</EuiCode>{' '}
            and <EuiCode>color</EuiCode> of this outline. This helper function
            allows that customization of the focus outline.
          </p>
        }
        props={`offset: 'inset' | 'outset' | 'center' | CSSProperties['outlineOffset'];

color: CSSProperties['outlineColor'];`}
        example={
          <EuiText size="s">
            <p>
              <button>
                I am an unstyled <EuiCode>button</EuiCode> with inherited
                outline
              </button>
            </p>
            <p>
              <button
                css={css`
                  &:focus {
                    ${useEuiFocusRing('outset', euiTheme.colors.primary)}
                  }
                `}
              >
                I am an unstyled <EuiCode>button</EuiCode> with an{' '}
                <EuiCode>outset, primary</EuiCode> outline
              </button>
            </p>
          </EuiText>
        }
        snippetLanguage="emotion"
        snippet={`&:focus {
   \${useEuiFocusRing('outset', euiTheme.colors.primary)}
 }`}
      />
    </>
  );
};
