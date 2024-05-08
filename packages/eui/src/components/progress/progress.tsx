/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  FunctionComponent,
  HTMLAttributes,
  ProgressHTMLAttributes,
  ReactNode,
  Fragment,
  CSSProperties,
} from 'react';
import classNames from 'classnames';
import { EuiI18n } from '../i18n';
import { EuiInnerText } from '../inner_text';
import { CommonProps, ExclusiveUnion } from '../common';
import { isNil } from '../../services/predicate';

import { useEuiTheme, makeHighContrastColor } from '../../services';
import {
  euiProgressStyles,
  euiProgressDataStyles,
  euiProgressLabelStyles,
  euiProgressValueTextStyles,
} from './progress.styles';

export const SIZES = ['xs', 's', 'm', 'l'] as const;
export type EuiProgressSize = (typeof SIZES)[number];

export const COLORS = [
  'primary',
  'success',
  'warning',
  'danger',
  'subdued',
  'accent',
  'vis0',
  'vis1',
  'vis2',
  'vis3',
  'vis4',
  'vis5',
  'vis6',
  'vis7',
  'vis8',
  'vis9',
] as const;
export type EuiProgressColor = (typeof COLORS)[number];

export const POSITIONS = ['fixed', 'absolute', 'static'] as const;
export type EuiProgressPosition = (typeof POSITIONS)[number];

export type EuiProgressProps = CommonProps & {
  size?: EuiProgressSize;
  /**
   * One of EUI's color palette, vis colors or a valid CSS color value https://developer.mozilla.org/en-US/docs/Web/CSS/color_value
   */
  color?: EuiProgressColor | CSSProperties['color'];
  position?: EuiProgressPosition;
};

type Indeterminate = EuiProgressProps & HTMLAttributes<HTMLDivElement>;

type Determinate = EuiProgressProps &
  Omit<ProgressHTMLAttributes<HTMLProgressElement>, 'max'> & {
    max?: number;
    /*
     * If true, will render the percentage, otherwise pass a custom node
     */
    valueText?: boolean | ReactNode;
    label?: ReactNode;
    /**
     * Object of props passed to the <span/> wrapping the determinate progress's label
     */
    labelProps?: CommonProps & HTMLAttributes<HTMLSpanElement>;
  };

export const EuiProgress: FunctionComponent<
  ExclusiveUnion<Determinate, Indeterminate>
> = ({
  className,
  color = 'success',
  size = 'm',
  position = 'static',
  max,
  valueText = false,
  label,
  value,
  labelProps,
  ...rest
}) => {
  const determinate = !isNil(max);
  const isNamedColor = COLORS.includes(color as EuiProgressColor);

  const euiTheme = useEuiTheme();
  const customColorStyles = !isNamedColor ? { color } : {};
  const customTextColorStyles = !isNamedColor
    ? { color: makeHighContrastColor(color)(euiTheme.euiTheme) }
    : {};

  const styles = euiProgressStyles(euiTheme, determinate);
  const cssStyles = [
    styles.euiProgress,
    determinate && styles.native,
    !determinate && styles.indeterminate,
    styles[size],
    styles[position],
    isNamedColor ? styles[color as EuiProgressColor] : styles.customColor,
  ];

  const dataStyles = euiProgressDataStyles(euiTheme);
  const dataCssStyles = [
    dataStyles.euiProgress__data,
    size === 'l' && dataStyles[size],
  ];
  const labelCssStyles = [
    euiProgressLabelStyles.euiProgress__label,
    labelProps?.css,
  ];
  const valueTextStyles = euiProgressValueTextStyles(euiTheme);
  const valueTextCssStyles = [
    valueTextStyles.euiProgress__valueText,
    isNamedColor
      ? valueTextStyles[color as EuiProgressColor]
      : styles.customColor,
  ];

  const classes = classNames('euiProgress', className);
  const labelClasses = classNames('euiProgress__label', labelProps?.className);

  let valueRender: ReactNode;
  if (valueText === true) {
    // valueText is true
    valueRender = (
      <EuiI18n
        token="euiProgress.valueText"
        default="{value}%"
        values={{
          value,
        }}
      />
    );
  } else if (valueText) {
    // valueText exists
    valueRender = valueText;
  }

  // Because of a Firefox animation issue, indeterminate progress needs to not use <progress />.
  // See https://css-tricks.com/html5-progress-element/

  if (determinate) {
    return (
      <Fragment>
        {label || valueText ? (
          <div css={dataCssStyles} className="euiProgress__data">
            {label && (
              <EuiInnerText>
                {(ref, innerText) => (
                  <span
                    title={innerText}
                    ref={ref}
                    {...labelProps}
                    className={labelClasses}
                    css={labelCssStyles}
                  >
                    {label}
                  </span>
                )}
              </EuiInnerText>
            )}
            {valueRender && (
              <EuiInnerText>
                {(ref, innerText) => (
                  <span
                    title={innerText}
                    ref={ref}
                    style={customTextColorStyles}
                    css={valueTextCssStyles}
                    className="euiProgress__valueText"
                  >
                    {valueRender}
                  </span>
                )}
              </EuiInnerText>
            )}
          </div>
        ) : undefined}
        <progress
          css={cssStyles}
          className={classes}
          style={customColorStyles}
          max={max}
          value={value}
          aria-hidden={label && valueText ? true : false}
          {...(rest as ProgressHTMLAttributes<HTMLProgressElement>)}
        />
      </Fragment>
    );
  } else {
    return (
      <div
        css={cssStyles}
        style={customColorStyles}
        className={classes}
        {...(rest as HTMLAttributes<HTMLDivElement>)}
      />
    );
  }
};
