import React, { FunctionComponent, ReactNode } from 'react';
import { css } from '@emotion/react';
// @ts-ignore NOT TS yet
import { humanizeType } from '../../services/playground/knobs';

export type ThemeRowType = {
  description?: React.ReactNode;
};

import { EuiThemeComputed, EuiThemeShape } from '../../../../src/services';

export const EuiTheme: FunctionComponent<React.PropsWithChildren<EuiThemeShape>> = () => <div />;

import {
  _EuiThemeColorsMode,
  _EuiThemeConstantColors,
} from '../../../../src/global_styling/variables/colors';

export const EuiThemeColors: FunctionComponent<React.PropsWithChildren<_EuiThemeColorsMode>> = () => (
  <div />
);

export const EuiThemeConstantColors: FunctionComponent<React.PropsWithChildren<_EuiThemeConstantColors>> = () => (
  <div />
);

import { _EuiThemeSizes } from '../../../../src/global_styling/variables/size';

export const EuiThemeSize: FunctionComponent<React.PropsWithChildren<_EuiThemeSizes>> = () => <div />;

import {
  _EuiThemeFontBase,
  _EuiThemeFontWeights,
  _EuiThemeFontScales,
  _EuiThemeBody,
} from '../../../../src/global_styling';

export const EuiThemeFontBase: FunctionComponent<React.PropsWithChildren<_EuiThemeFontBase>> = () => (
  <div />
);
export const EuiThemeFontWeight: FunctionComponent<React.PropsWithChildren<_EuiThemeFontWeights>> = () => (
  <div />
);
export const EuiThemeFontScale: FunctionComponent<React.PropsWithChildren<_EuiThemeFontScales>> = () => (
  <div />
);
export const EuiThemeBody: FunctionComponent<React.PropsWithChildren<_EuiThemeBody>> = () => <div />;

import {
  _EuiThemeBorderColorValues,
  _EuiThemeBorderTypes,
  _EuiThemeBorderRadiusValues,
  _EuiThemeBorderWidthValues,
} from '../../../../src/global_styling/variables/borders';

export const EuiThemeBorderRadiusValues: FunctionComponent<React.PropsWithChildren<_EuiThemeBorderRadiusValues>> = () => (
  <div />
);
export const EuiThemeBorderWidthValues: FunctionComponent<React.PropsWithChildren<_EuiThemeBorderWidthValues>> = () => (
  <div />
);
export const EuiThemeBorderColorValues: FunctionComponent<React.PropsWithChildren<_EuiThemeBorderColorValues>> = () => (
  <div />
);
export const EuiThemeBorderTypes: FunctionComponent<React.PropsWithChildren<_EuiThemeBorderTypes>> = () => (
  <div />
);

import { _EuiThemeFocus } from '../../../../src/global_styling/variables/states';

export const EuiThemeFocus: FunctionComponent<React.PropsWithChildren<_EuiThemeFocus>> = () => <div />;

import {
  _EuiThemeAnimationSpeeds,
  _EuiThemeAnimationEasings,
} from '../../../../src/global_styling/variables/animations';

export const EuiThemeAnimationSpeed: FunctionComponent<React.PropsWithChildren<_EuiThemeAnimationSpeeds>> = () => (
  <div />
);
export const EuiThemeAnimationEasing: FunctionComponent<React.PropsWithChildren<_EuiThemeAnimationEasings>> = () => (
  <div />
);

export const euiThemeBreakpointType = {
  custom: { origin: { type: { name: 'number' } } },
};

import { _EuiThemeLevels } from '../../../../src/global_styling/variables/levels';

export const EuiThemeLevelsProps: FunctionComponent<React.PropsWithChildren<_EuiThemeLevels>> = () => (
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
