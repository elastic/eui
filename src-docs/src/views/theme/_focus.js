import React from 'react';
import { css } from '@emotion/react';
import { useEuiTheme } from '../../../../src/services';

import {
  EuiTitle,
  EuiSpacer,
  EuiColorPickerSwatch,
  EuiFlexItem,
  EuiCodeBlock,
} from '../../../../src/components';

import { ThemeSection } from './_theme_section';
import { ThemeValue } from './_values';

import { getPropsFromThemeKey, EuiThemeFocus } from './_props';

export default ({ onThemeUpdate }) => {
  const { euiTheme } = useEuiTheme();
  const focus = euiTheme.focus;
  const focusProps = getPropsFromThemeKey(EuiThemeFocus);

  const updateFocus = (property, value) => {
    onThemeUpdate({
      focus: {
        [property]: value,
      },
    });
  };

  const style = css`
    width: ${euiTheme.size.xl};
    height: ${euiTheme.size.xl};
    border-radius: ${euiTheme.border.radius.small};
  `;

  return (
    <div>
      <EuiTitle>
        <h2>Focus</h2>
      </EuiTitle>

      <EuiSpacer />

      <ThemeSection
        code="_EuiThemeFocus"
        description={
          <p>
            These are general properties that apply to the focus state of
            interactable components. Some components have their own specific
            implementation, but most use these variables.
          </p>
        }
        themeValues={Object.keys(focus).map((prop) => {
          const isColor = prop.toLowerCase().includes('color');
          if (prop === 'outline') {
            return (
              <EuiFlexItem key={prop}>
                <ThemeValue
                  property="focus"
                  type={focusProps[prop]}
                  name={prop}
                  buttonStyle={[style, focus[prop]]}
                />
                <EuiSpacer size="xs" />
                <EuiCodeBlock paddingSize="s" language="css">{`${JSON.stringify(
                  focus[prop]
                ).replace(/[{}"]/g, '')};`}</EuiCodeBlock>
              </EuiFlexItem>
            );
          }
          return (
            <EuiFlexItem key={prop}>
              <ThemeValue
                property="focus"
                name={prop}
                type={focusProps[prop]}
                value={focus[prop]}
                onUpdate={(value) => updateFocus(prop, value)}
                example={
                  isColor ? (
                    <EuiColorPickerSwatch color={focus[prop]} />
                  ) : undefined
                }
                colorProps={
                  isColor ? { showAlpha: true, format: 'rgba' } : undefined
                }
              />
            </EuiFlexItem>
          );
        })}
      />
    </div>
  );
};
