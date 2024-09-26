import React, { FunctionComponent, ReactNode } from 'react';
import { css } from '@emotion/react';
import {
  EuiThemeComputed,
  EuiThemeShape,
  _EuiThemeColorsMode,
  _EuiThemeConstantColors,
  _EuiThemeSizes,
  _EuiThemeFontBase,
  _EuiThemeFontWeights,
  _EuiThemeFontScales,
  _EuiThemeBody,
  _EuiThemeBorderColorValues,
  _EuiThemeBorderTypes,
  _EuiThemeBorderRadiusValues,
  _EuiThemeBorderWidthValues,
  _EuiThemeFocus,
  _EuiThemeAnimationSpeeds,
  _EuiThemeAnimationEasings,
  _EuiThemeLevels,
} from '@elastic/eui-theme-base';

// @ts-ignore NOT TS yet
import { humanizeType } from '../../services/playground/knobs';

export type ThemeRowType = {
  description?: React.ReactNode;
};

export const EuiTheme: FunctionComponent<EuiThemeShape> = () => <div />;

export const EuiThemeColors: FunctionComponent<_EuiThemeColorsMode> = () => (
  <div />
);

export const EuiThemeConstantColors: FunctionComponent<
  _EuiThemeConstantColors
> = () => <div />;

export const EuiThemeSize: FunctionComponent<_EuiThemeSizes> = () => <div />;

export const EuiThemeFontBase: FunctionComponent<_EuiThemeFontBase> = () => (
  <div />
);
export const EuiThemeFontWeight: FunctionComponent<
  _EuiThemeFontWeights
> = () => <div />;
export const EuiThemeFontScale: FunctionComponent<_EuiThemeFontScales> = () => (
  <div />
);
export const EuiThemeBody: FunctionComponent<_EuiThemeBody> = () => <div />;

export const EuiThemeBorderRadiusValues: FunctionComponent<
  _EuiThemeBorderRadiusValues
> = () => <div />;
export const EuiThemeBorderWidthValues: FunctionComponent<
  _EuiThemeBorderWidthValues
> = () => <div />;
export const EuiThemeBorderColorValues: FunctionComponent<
  _EuiThemeBorderColorValues
> = () => <div />;
export const EuiThemeBorderTypes: FunctionComponent<
  _EuiThemeBorderTypes
> = () => <div />;

export const EuiThemeFocus: FunctionComponent<_EuiThemeFocus> = () => <div />;

export const EuiThemeAnimationSpeed: FunctionComponent<
  _EuiThemeAnimationSpeeds
> = () => <div />;
export const EuiThemeAnimationEasing: FunctionComponent<
  _EuiThemeAnimationEasings
> = () => <div />;

export const euiThemeBreakpointType = {
  custom: { origin: { type: { name: 'number' } } },
};

export const EuiThemeLevelsProps: FunctionComponent<_EuiThemeLevels> = () => (
  <div />
);

export function getType(type: any, euiTheme: EuiThemeComputed<{}>) {
  let typeRender: ReactNode;
  if (type?.custom?.origin?.type) {
    typeRender = (
      <span
        css={css`
          font-weight: ${euiTheme.font.weight.light};
          color: ${euiTheme.colors.subduedText};
        `}
      >
        {humanizeType(type.custom.origin.type)}
      </span>
    );
  }
  return typeRender;
}
