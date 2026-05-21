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
  ReactNode,
  CSSProperties,
  useState,
  useRef,
  useEffect,
  MutableRefObject,
  useMemo,
} from 'react';
import classNames from 'classnames';
import { EuiI18n } from '../i18n';
import { CommonProps } from '../common';

import { useEuiTheme, makeHighContrastColor } from '../../services';
import { EuiScreenReaderOnly } from '../accessibility';
import { getLinearGradient } from '../color_picker/utils';
import type { PaletteColorStop } from '../color_picker/color_palette_picker';
import {
  euiMeterDataStyles,
  euiMeterLabelStyles,
  euiMeterStyles,
  euiMeterValueTextStyles,
} from './meter.styles';

export const SIZES = ['xs', 's', 'm', 'l'] as const;
export type EuiMeterSize = (typeof SIZES)[number];

export const COLORS = [
  'primary',
  'success',
  'warning',
  'danger',
  'subdued',
  'accent',
  'accentSecondary',
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
export type EuiMeterColor = (typeof COLORS)[number];

export const POSITIONS = ['fixed', 'absolute', 'static'] as const;
export type EuiMeterPosition = (typeof POSITIONS)[number];

export type EuiMeterProps = CommonProps &
  Omit<HTMLAttributes<HTMLDivElement>, 'color'> & {
    size?: EuiMeterSize;
    /**
     * One of EUI's color palette, vis colors or a valid CSS color value https://developer.mozilla.org/en-US/docs/Web/CSS/color_value
     */
    color?: EuiMeterColor | CSSProperties['color'];
    position?: EuiMeterPosition;
    /**
     * A color palette — either an array of CSS color strings or an array of
     * `PaletteColorStop` objects (same format accepted by `getLinearGradient`) —
     * used to paint a gradient fill on the progress bar. The gradient is anchored
     * to the full width of the track so that advancing the bar reveals more of a
     * fixed gradient rather than stretching it.
     * When set, the `color` prop is ignored.
     */
    palette?: string[] | PaletteColorStop[];
    value: number;
    /**
     * When set, creates determinate progress with a value/max ratio
     */
    max: number;
    /**
     * The minimum value of the progress bar. Can be negative.
     * @default 0
     */
    min?: number;
    /**
     * Displays custom text or percentage
     * Pass `true` to display the percentage value
     * Pass a ReactNode for custom text
     * @default false
     */
    valueText?: boolean | ReactNode;
    label?: ReactNode;
    /**
     * Object of props passed to the <span/> wrapping the determinate progress's label
     */
    labelProps?: CommonProps & HTMLAttributes<HTMLSpanElement>;
  };

export const EuiMeter: FunctionComponent<EuiMeterProps> = ({
  className,
  color = 'success',
  size = 'm',
  position = 'static',
  value,
  min = 0,
  max,
  valueText = false,
  label,
  labelProps,
  palette,
  ...rest
}) => {
  const valueTextRef: MutableRefObject<HTMLSpanElement | null> = useRef(null);
  const labelRef: MutableRefObject<HTMLSpanElement | null> = useRef(null);
  const [innerValueText, setInnerValueText] = useState<string | undefined>();
  const [labelText, setLabelText] = useState<string | undefined>();

  const isNamedColor = !palette && COLORS.includes(color as EuiMeterColor);

  const euiTheme = useEuiTheme();
  const customColorStyles = palette || isNamedColor ? {} : { color };
  const customTextColorStyles =
    palette || isNamedColor
      ? {}
      : { color: makeHighContrastColor(color)(euiTheme.euiTheme) };

  // Resolves the palette into a CSS gradient string with stops in track-percentage
  // space (0 % = min, 100 % = max). For PaletteColorStop[], stops are treated as
  // values in the [min, max] domain and mapped to their visual track position.
  // Out-of-range stops (below min or above max) anchor the edge color so the
  // gradient fills the full track without distortion.
  const resolvedGradient = useMemo(() => {
    if (!palette) return null;

    if (typeof palette[0] === 'string') {
      return getLinearGradient(palette as string[]);
    }

    const range = (max as number) - min;
    const rawStops = (palette as PaletteColorStop[]).map(({ stop, color }) => ({
      pct: ((stop - min) / range) * 100,
      color,
    }));

    // First stop always anchors at 0%; last always anchors at 100%.
    // Intermediate stops are only included when inside the (0, 100) range.
    const parts: string[] = [
      `${rawStops[0].color} 0%`,
      ...rawStops
        .slice(1, -1)
        .filter(({ pct }) => pct > 0 && pct < 100)
        .map(({ pct, color }) => `${color} ${pct.toFixed(2)}%`),
      `${rawStops[rawStops.length - 1].color} 100%`,
    ];

    return `linear-gradient(to right, ${parts.join(', ')})`;
  }, [palette, min, max]);

  const gradientStyles: CSSProperties = palette
    ? ({
        '--euiMeterGradient': resolvedGradient,
      } as CSSProperties)
    : {};

  const isBiDirectional = min < 0;

  // Bar geometry is always computed when max is defined so that ::before can
  // render the fill in both standard (min >= 0) and bi-directional (min < 0)
  // modes. In standard mode the zero baseline is at the left edge (0 %);
  // in bi-directional mode it sits at abs(min)/(max-min)*100 % from the left.

  const meterCssStyles: CSSProperties = useMemo(() => {
    const range = (max as number) - min;
    const zeroPercent = isBiDirectional ? (Math.abs(min) / range) * 100 : 0;
    const clampedValue = Math.min(Math.max(value, min), max as number);
    const valuePercent = ((clampedValue - min) / range) * 100;
    const barStart = Math.min(zeroPercent, valuePercent);
    const barWidth = Math.abs(zeroPercent - valuePercent);
    const borderRadius = euiTheme.euiTheme.size.s;
    // In bi-directional mode only the outer cap is rounded; the inner edge
    // stays flat so it sits cleanly against the zero-line divider.
    // In standard mode both caps are always rounded.
    const startRadius = !isBiDirectional || value < 0 ? borderRadius : '0px';
    const endRadius = !isBiDirectional || value >= 0 ? borderRadius : '0px';
    return {
      '--euiMeterBarStart': `${barStart}%`,
      '--euiMeterBarWidth': `${barWidth}%`,
      '--euiMeterBarStartRadius': startRadius,
      '--euiMeterBarEndRadius': endRadius,
      '--euiMeterGradientOffset': `-${barStart}cqi`,
      ...(isBiDirectional && { '--euiMeterZeroLine': `${zeroPercent}%` }),
    } as CSSProperties;
  }, [min, max, value, isBiDirectional, euiTheme]);

  const styles = euiMeterStyles(euiTheme);
  const cssStyles = [
    styles.euiMeter,
    styles[size],
    styles[position],
    styles.fill,
    palette
      ? styles.gradient
      : isNamedColor
      ? styles[color as EuiMeterColor]
      : null,
  ];

  const dataStyles = euiMeterDataStyles(euiTheme);
  const dataCssStyles = [
    dataStyles.euiMeter__data,
    size === 'l' && dataStyles[size],
  ];
  const labelCssStyles = [euiMeterLabelStyles.euiMeter__label, labelProps?.css];
  const valueTextStyles = euiMeterValueTextStyles(euiTheme);
  const valueTextCssStyles = [
    valueTextStyles.euiMeter__valueText,
    isNamedColor ? valueTextStyles[color as EuiMeterColor] : null,
  ];

  const classes = classNames('euiMeter', className);
  const labelClasses = classNames('euiMeter__label', labelProps?.className);

  let valueRender: ReactNode;
  if (valueText === true) {
    // valueText is true
    valueRender = (
      <EuiI18n
        token="euiMeter.valueText"
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

  useEffect(() => {
    setInnerValueText(valueTextRef.current?.textContent ?? '');
    setLabelText(labelRef.current?.textContent ?? '');
  }, [label, valueRender, value]);

  return (
    <>
      {label || valueText ? (
        <div css={dataCssStyles} className="euiMeter__data">
          {label && (
            <div
              ref={(node) => {
                labelRef.current = node;
              }}
              {...labelProps}
              className={labelClasses}
              css={labelCssStyles}
              aria-hidden="true"
            >
              {label}
            </div>
          )}
          {valueRender && (
            <div
              ref={(node) => {
                valueTextRef.current = node;
              }}
              style={customTextColorStyles}
              css={valueTextCssStyles}
              className="euiMeter__valueText"
              aria-hidden="true"
            >
              {valueRender}
            </div>
          )}
        </div>
      ) : undefined}
      <EuiScreenReaderOnly>
        <div aria-live="polite" aria-atomic="true">
          <span>
            {label && <>{labelText} </>}
            {valueRender || value}
          </span>
        </div>
      </EuiScreenReaderOnly>
      <div
        role="meter"
        css={cssStyles}
        className={classes}
        style={{
          ...customColorStyles,
          ...gradientStyles,
          ...meterCssStyles,
        }}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-valuetext={innerValueText || undefined}
        aria-label={labelText || undefined}
        {...rest}
      />
    </>
  );
};
