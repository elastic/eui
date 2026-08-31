import { useState, createContext, useContext, useEffect } from 'react';
import { css } from '@emotion/react';
import { useEuiTheme, EuiProvider, EuiText, EuiTitle } from '@elastic/eui';

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

export const FontTitleWeightPreview = () => {
  const { euiTheme } = useEuiTheme();
  const titleWeight = euiTheme.font.title.weight;

  return (
    <h2
      css={css`
        font-weight: ${euiTheme.font.weight[titleWeight]};
      `}
    >
      {titleWeight}
    </h2>
  );
};

export const FontTitleLetterSpacingPreview = () => {
  const { euiTheme } = useEuiTheme();

  return (
    <EuiTitle size="m">
      <h3
        css={css`
          font-weight: ${euiTheme.font.weight[euiTheme.font.title.weight]};
          letter-spacing: ${euiTheme.font.title.letterSpacing};
        `}
      >
        The quick brown fox jumped over the blue moon
      </h3>
    </EuiTitle>
  );
};
