import React, { FunctionComponent, ReactNode } from 'react';
import { useView } from 'react-view';
// @ts-ignore NOT TS
import { propUtilityForPlayground } from '../../services/playground';
// @ts-ignore NOT TS yet
import { humanizeType } from '../../services/playground/knobs';

export type ThemeRowType = {
  description?: React.ReactNode;
};

export function getPropsFromThemeKey(component: any) {
  const docgenInfo = Array.isArray(component.__docgenInfo)
    ? component.__docgenInfo[0]
    : component.__docgenInfo;
  const { props } = docgenInfo;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const params = useView({ props: propUtilityForPlayground(props) });
  return params.knobProps.state;
}

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

import { EuiThemeSize } from '../../../../src/global_styling/variables/_size';

export const _EuiThemeSize: FunctionComponent<EuiThemeSize> = () => <div />;

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
} from '../../../../src/global_styling/variables/_borders';

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
  _EuiThemeAnimationSpeed,
  _EuiThemeAnimationEasing,
} from '../../../../src/global_styling/variables/_animations';

export const EuiThemeAnimationSpeed: FunctionComponent<_EuiThemeAnimationSpeed> = () => (
  <div />
);
export const EuiThemeAnimationEasing: FunctionComponent<_EuiThemeAnimationEasing> = () => (
  <div />
);

import { EuiThemeBreakpoint } from '../../../../src/global_styling/variables/_breakpoint';
import { css } from '@emotion/react';

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
