import { useState, createContext, useContext, useEffect } from 'react';
import { css } from '@emotion/react';
import { useEuiTheme, EuiProvider, EuiText } from '@elastic/eui';

export const FontFamilyPreview = () => {
  const { euiTheme } = useEuiTheme();

  return (
    <p
      css={css`
        font-family: ${euiTheme.font.family};
      `}
    >
      {euiTheme.font.family}
    </p>
  );
};

export const FontFamilyCodePreview = () => {
  const { euiTheme } = useEuiTheme();

  return (
    <p
      css={css`
        font-family: ${euiTheme.font.familyCode};
      `}
    >
      {euiTheme.font.familyCode}
    </p>
  );
};

export const FontFamilySerifPreview = () => {
  const { euiTheme } = useEuiTheme();

  return (
    <p
      css={css`
        font-family: ${euiTheme.font.familySerif};
      `}
    >
      {euiTheme.font.familySerif}
    </p>
  );
};

export const FontFeatureSettingsPreview = () => {
  const { euiTheme } = useEuiTheme();

  return (
    <p
      css={css`
        font-feature-settings: ${euiTheme.font.featureSettings};
      `}
    >
      {euiTheme.font.featureSettings}
    </p>
  );
};

export const FontDefaultUnitsPreview = () => {
  const { euiTheme } = useEuiTheme();

  return (
    <EuiProvider modify={{ font: { defaultUnits: 'px' } }}>
      <EuiText>
        <p>Hello world</p>
      </EuiText>
    </EuiProvider>
  );
};
