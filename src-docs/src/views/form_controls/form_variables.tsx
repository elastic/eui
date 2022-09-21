import React from 'react';
import { css } from '@emotion/react';

import {
  useEuiTheme,
  EuiColorPickerSwatch,
  EuiCodeBlock,
  EuiTitle,
  EuiSpacer,
} from '../../../../src';

import { euiFormVariables } from '../../../../src/components/form/form.styles';

const SwatchRow = ({ label, color, borderColor }: any) => {
  const { euiTheme } = useEuiTheme();

  return (
    <div
      css={css`
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: ${euiTheme.size.s};
      `}
    >
      <EuiColorPickerSwatch
        color={`${color}`}
        css={css`
          border: ${borderColor ? `1px solid ${borderColor}` : 'none'};
        `}
      />{' '}
      <span>{label}</span>
    </div>
  );
};

export default () => {
  const euiThemeContext = useEuiTheme();
  const euiTheme = euiThemeContext.euiTheme;
  const euiFormVars = euiFormVariables(euiThemeContext);

  const formVarsStr = JSON.stringify(euiFormVars, null, 2);

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: ${euiTheme.size.m};
      `}
    >
      <EuiCodeBlock>{formVarsStr}</EuiCodeBlock>

      <EuiSpacer />

      <EuiTitle>
        <h2>Colors variables</h2>
      </EuiTitle>
      <EuiSpacer size="m" />
      <SwatchRow label="backgroundColor" color={euiFormVars.backgroundColor} />
      <SwatchRow
        label="backgroundDisabledColor"
        color={euiFormVars.backgroundDisabledColor}
      />
      <SwatchRow
        label="backgroundReadOnlyColor"
        color={euiFormVars.backgroundReadOnlyColor}
      />
      <SwatchRow
        label="borderColor"
        color={euiFormVars.backgroundColor}
        borderColor={euiFormVars.borderColor}
      />
      <SwatchRow
        label="borderDisabledColor"
        color={euiFormVars.backgroundDisabledColor}
        borderColor={euiFormVars.borderDisabledColor}
      />
      <SwatchRow
        label="customControlDisabledIconColor"
        color={euiFormVars.customControlDisabledIconColor}
      />
      <SwatchRow
        label="customControlBorderColor"
        color={euiFormVars.backgroundColor}
        borderColor={euiFormVars.customControlBorderColor}
      />
      <SwatchRow
        label="controlDisabledColor"
        color={euiFormVars.controlDisabledColor}
      />
      <SwatchRow
        label="controlBoxShadow"
        color={euiFormVars.controlBoxShadow}
      />
      <SwatchRow
        label="controlPlaceholderText"
        color={euiFormVars.controlPlaceholderText}
      />
      <SwatchRow
        label="inputGroupLabelBackground"
        color={euiFormVars.inputGroupLabelBackground}
      />
    </div>
  );
};
