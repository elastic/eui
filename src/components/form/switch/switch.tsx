/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React, {
  ButtonHTMLAttributes,
  HTMLAttributes,
  FunctionComponent,
  ReactNode,
  useState,
  useCallback,
} from 'react';
import classNames from 'classnames';

import { CommonProps } from '../../common';
import { htmlIdGenerator } from '../../../services/accessibility';
import { EuiIcon } from '../../icon';

export type EuiSwitchEvent = React.BaseSyntheticEvent<
  React.MouseEvent<HTMLButtonElement>,
  HTMLButtonElement,
  EventTarget & {
    checked: boolean;
  }
>;

export type EuiSwitchProps = CommonProps &
  Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    'onChange' | 'type' | 'disabled'
  > & {
    /**
     * Whether to render the render the text label
     */
    showLabel?: boolean;
    /**
     * Must be a string if `showLabel` prop is false
     */
    label: ReactNode | string;
    checked: boolean;
    onChange: (event: EuiSwitchEvent) => void;
    disabled?: boolean;
    compressed?: boolean;
    type?: 'submit' | 'reset' | 'button';
    /**
     * Object of props passed to the label's <span/>
     */
    labelProps?: CommonProps & HTMLAttributes<HTMLSpanElement>;
  };

export const EuiSwitch: FunctionComponent<EuiSwitchProps> = ({
  label,
  id,
  checked,
  disabled,
  compressed,
  onChange,
  className,
  showLabel = true,
  type = 'button',
  labelProps,
  ...rest
}) => {
  const [switchId] = useState(id || htmlIdGenerator()());
  const [labelId] = useState(labelProps?.id || htmlIdGenerator()());

  const onClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement | HTMLParagraphElement>) => {
      if (disabled) {
        return;
      }

      const event = (e as unknown) as EuiSwitchEvent;
      event.target.checked = !checked;
      onChange(event);
    },
    [checked, disabled, onChange]
  );

  const classes = classNames(
    'euiSwitch',
    {
      'euiSwitch--compressed': compressed,
    },
    className
  );
  const labelClasses = classNames('euiSwitch__label', labelProps?.className);
  if (showLabel === false && typeof label !== 'string') {
    console.warn(
      'EuiSwitch `label` must be a string when `showLabel` is false.'
    );
  }

  return (
    <div className={classes}>
      <button
        id={switchId}
        aria-checked={checked || false}
        className="euiSwitch__button"
        role="switch"
        type={type}
        disabled={disabled}
        onClick={onClick}
        aria-label={showLabel ? undefined : (label as string)}
        aria-labelledby={showLabel ? labelId : undefined}
        {...rest}>
        <span className="euiSwitch__body">
          <span className="euiSwitch__thumb" />
          <span className="euiSwitch__track">
            {!compressed && (
              <React.Fragment>
                <EuiIcon type="cross" size="m" className="euiSwitch__icon" />

                <EuiIcon
                  type="check"
                  size="m"
                  className="euiSwitch__icon euiSwitch__icon--checked"
                />
              </React.Fragment>
            )}
          </span>
        </span>
      </button>

      {showLabel && (
        // <button> + <label> has poor screen reader support.
        // Click handler added to simulate natural, secondary <label> interactivity.
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
        <span
          {...labelProps}
          className={labelClasses}
          id={labelId}
          onClick={onClick}>
          {label}
        </span>
      )}
    </div>
  );
};
