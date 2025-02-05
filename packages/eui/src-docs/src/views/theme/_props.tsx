import React, { FunctionComponent, ReactNode } from 'react';
import { css } from '@emotion/react';
// @ts-ignore NOT TS yet
import { humanizeType } from '../../services/playground/knobs';

export type ThemeRowType = {
  description?: React.ReactNode;
};

import { EuiThemeComputed, EuiThemeShape } from '../../../../src/services';

export const EuiTheme: FunctionComponent<EuiThemeShape> = () => <div />;

import {
  _EuiThemeColorsMode,
  _EuiThemeConstantColors,
} from '../../../../src/global_styling/variables/colors';

export const EuiThemeColors: FunctionComponent<_EuiThemeColorsMode> = () => (
  <div />
);

export const EuiThemeConstantColors: FunctionComponent<
  _EuiThemeConstantColors
> = () => <div />;

import { _EuiThemeSizes } from '../../../../src/global_styling/variables/size';

export const EuiThemeSize: FunctionComponent<_EuiThemeSizes> = () => <div />;

import {
  _EuiThemeFontBase,
  _EuiThemeFontWeights,
  _EuiThemeFontScales,
  _EuiThemeBody,
} from '../../../../src/global_styling';

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

import {
  _EuiThemeBorderColorValues,
  _EuiThemeBorderTypes,
  _EuiThemeBorderRadiusValues,
  _EuiThemeBorderWidthValues,
} from '../../../../src/global_styling/variables/borders';

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

import { _EuiThemeFocus } from '../../../../src/global_styling/variables/states';

export const EuiThemeFocus: FunctionComponent<_EuiThemeFocus> = () => <div />;

import {
  _EuiThemeAnimationSpeeds,
  _EuiThemeAnimationEasings,
} from '../../../../src/global_styling/variables/animations';

export const EuiThemeAnimationSpeed: FunctionComponent<
  _EuiThemeAnimationSpeeds
> = () => <div />;
export const EuiThemeAnimationEasing: FunctionComponent<
  _EuiThemeAnimationEasings
> = () => <div />;

export const euiThemeBreakpointType = {
  custom: { origin: { type: { name: 'number' } } },
};

import { _EuiThemeLevels } from '../../../../src/global_styling/variables/levels';

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
          color: ${euiTheme.colors.textSubdued};
        `}
      >
        {humanizeType(type.custom.origin.type)}
      </span>
    );
  }
  return typeRender;
}
