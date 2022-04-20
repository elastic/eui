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
  _EuiThemeColors,
  _EuiThemeConstantColors,
} from '../../../../src/global_styling/variables/_colors';

export const EuiThemeColors: FunctionComponent<_EuiThemeColors> = () => <div />;

export const EuiThemeConstantColors: FunctionComponent<_EuiThemeConstantColors> = () => (
  <div />
);

import { _EuiThemeSizes } from '../../../../src/global_styling/variables/size';

export const EuiThemeSize: FunctionComponent<_EuiThemeSizes> = () => <div />;

import {
  _EuiThemeFontBase,
  _EuiThemeFontWeight,
  _EuiThemeFontScale,
} from '../../../../src/global_styling/variables/_typography';

export const EuiThemeFontBase: FunctionComponent<_EuiThemeFontBase> = () => (
  <div />
);
export const EuiThemeFontWeight: FunctionComponent<_EuiThemeFontWeight> = () => (
  <div />
);
export const EuiThemeFontScale: FunctionComponent<_EuiThemeFontScale> = () => (
  <div />
);

import {
  _EuiThemeBorderColorValues,
  _EuiThemeBorderTypes,
  _EuiThemeBorderRadiusValues,
  _EuiThemeBorderWidthValues,
} from '../../../../src/global_styling/variables/borders';

export const EuiThemeBorderRadiusValues: FunctionComponent<_EuiThemeBorderRadiusValues> = () => (
  <div />
);
export const EuiThemeBorderWidthValues: FunctionComponent<_EuiThemeBorderWidthValues> = () => (
  <div />
);
export const EuiThemeBorderColorValues: FunctionComponent<_EuiThemeBorderColorValues> = () => (
  <div />
);
export const EuiThemeBorderTypes: FunctionComponent<_EuiThemeBorderTypes> = () => (
  <div />
);

import { _EuiThemeFocus } from '../../../../src/global_styling/variables/_states';

export const EuiThemeFocus: FunctionComponent<_EuiThemeFocus> = () => <div />;

import {
  _EuiThemeAnimationSpeeds,
  _EuiThemeAnimationEasings,
} from '../../../../src/global_styling/variables/animations';

export const EuiThemeAnimationSpeed: FunctionComponent<_EuiThemeAnimationSpeeds> = () => (
  <div />
);
export const EuiThemeAnimationEasing: FunctionComponent<_EuiThemeAnimationEasings> = () => (
  <div />
);

import { EuiThemeBreakpoint } from '../../../../src/global_styling/variables/_breakpoint';

export const _EuiThemeBreakpoint: FunctionComponent<EuiThemeBreakpoint> = () => (
  <div />
);

export function getType(type: any, euiTheme: EuiThemeComputed<{}>) {
  let typeRender: ReactNode;
  if (type?.custom?.origin?.type) {
    typeRender = (
      <span
        css={css`
          font-weight: ${euiTheme.font.weight.light};
          color: ${euiTheme.colors.subdued};
        `}
      >
        {humanizeType(type.custom.origin.type)}
      </span>
    );
  }
  return typeRender;
}
