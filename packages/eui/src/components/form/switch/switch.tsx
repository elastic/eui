/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  ButtonHTMLAttributes,
  HTMLAttributes,
  FunctionComponent,
  ReactNode,
  useCallback,
} from 'react';
import classNames from 'classnames';

import { useGeneratedHtmlId, useEuiMemoizedStyles } from '../../../services';
import { CommonProps } from '../../common';
import { EuiIcon } from '../../icon';

import { euiSwitchStyles } from './switch.styles';

export type EuiSwitchEvent = React.BaseSyntheticEvent<
  React.MouseEvent<HTMLButtonElement>,
  HTMLButtonElement,
  EventTarget & {
    checked: boolean;
  }
>;

export type EuiSwitchProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange' | 'disabled'> & {
    /**
     * Whether to render the text label
     */
    showLabel?: boolean;
    /**
     * Must be a string if `showLabel` prop is false
     */
    label: ReactNode | string;
    checked: boolean;
    onChange: (event: EuiSwitchEvent) => void;
    disabled?: boolean;
    /**
     * Compressed switches are smaller and contain no icon signifiers
     */
    compressed?: boolean;
    /**
     * Object of props passed to the label's `<span />`
     */
    labelProps?: CommonProps & HTMLAttributes<HTMLSpanElement>;
  };

export const EuiSwitch: FunctionComponent<
  EuiSwitchProps & {
    /**
     * Mini styling is similar to compressed, but even smaller.
     * It's undocumented because it has very specific uses.
     */
    mini?: boolean;
  }
> = ({
  label,
  id,
  checked,
  disabled,
  compressed,
  mini,
  onChange,
  className,
  showLabel = true,
  type = 'button',
  labelProps,
  ...rest
}) => {
  const switchId = useGeneratedHtmlId({ conditionalId: id });
  const labelId = useGeneratedHtmlId({ conditionalId: labelProps?.id });

  const onClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement | HTMLParagraphElement>) => {
      if (disabled) {
        return;
      }

      const event = e as unknown as EuiSwitchEvent;
      event.target.checked = !checked;
      onChange(event);
    },
    [checked, disabled, onChange]
  );

  const classes = classNames('euiSwitch', className);
  const labelClasses = classNames('euiSwitch__label', labelProps?.className);
  if (showLabel === false && typeof label !== 'string') {
    console.warn(
      'EuiSwitch `label` must be a string when `showLabel` is false.'
    );
  }

  const size = mini ? 'mini' : compressed ? 'compressed' : 'uncompressed';

  const styles = useEuiMemoizedStyles(euiSwitchStyles);
  const cssStyles = [
    styles.euiSwitch,
    disabled ? styles.disabled : styles.enabled,
  ];
  const buttonStyles = [styles.button.euiSwitch__button, styles.button[size]];
  const bodyStyles = [
    styles.body.euiSwitch__body,
    disabled
      ? styles.body.disabled[size]
      : checked
      ? styles.body.on
      : styles.body.off,
  ];
  const iconsStyles = [
    styles.icons.euiSwitch__icons,
    checked ? styles.icons.on : styles.icons.off,
    disabled ? styles.icons.disabled : styles.icons.enabled,
  ];
  const thumbStyles = [
    styles.thumb.euiSwitch__thumb,
    !disabled && [styles.thumb.enabled.enabled, styles.thumb.enabled[size]],
    // keep checked styles after enabled styles to ensure checked overrides enabled.off state
    checked ? styles.thumb.on[size] : styles.thumb.off,
    disabled && [styles.thumb.disabled.disabled, styles.thumb.disabled[size]],
  ];
  const labelStyles = [
    styles.label.euiSwitch__label,
    styles.label[size],
    disabled && styles.label.disabled,
    labelProps?.css,
  ];

  return (
    <div css={cssStyles} className={classes}>
      <button
        id={switchId}
        aria-checked={checked || false}
        css={buttonStyles}
        className="euiSwitch__button"
        role="switch"
        type={type}
        disabled={disabled}
        onClick={onClick}
        aria-label={showLabel ? undefined : (label as string)}
        aria-labelledby={showLabel ? labelId : undefined}
        {...rest}
      >
        <span css={bodyStyles} className="euiSwitch__body">
          {!(compressed || mini) && (
            <span css={iconsStyles} className="euiSwitch__icons">
              <EuiIcon type="check" size="m" />
              <EuiIcon type="cross" size="m" />
            </span>
          )}
        </span>
        <span css={thumbStyles} className="euiSwitch__thumb" />
      </button>

      {showLabel && (
        // <button> + <label> has poor screen reader support.
        // Click handler added to simulate natural, secondary <label> interactivity.
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
        <span
          {...labelProps}
          css={labelStyles}
          className={labelClasses}
          id={labelId}
          onClick={onClick}
        >
          {label}
        </span>
      )}
    </div>
  );
};
