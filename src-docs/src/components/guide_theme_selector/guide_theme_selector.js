import React from 'react';

import { ThemeContext } from '../with_theme';
import { EuiButton, EuiSelect, EuiFormRow } from '../../../../src/components';
import { EUI_THEMES } from '../../../../src/themes';

export const GuideThemeSelector = () => {
  return (
    <ThemeContext.Consumer>
      {context => <GuideThemeSelectorComponent context={context} />}
    </ThemeContext.Consumer>
  );
};

const GuideThemeSelectorComponent = ({ context }) => {
  return (
    <>
      <EuiFormRow label="Theme">
        <EuiSelect
          options={EUI_THEMES}
          value={context.theme}
          onChange={e => {
            context.changeTheme(e.target.value);
          }}
          aria-label="Switch the theme"
        />
      </EuiFormRow>
      <EuiFormRow label="euiColorLightShade">
        <EuiButton onClick={context.randomizeLightShade}>Randomize</EuiButton>
      </EuiFormRow>
    </>
  );
};
