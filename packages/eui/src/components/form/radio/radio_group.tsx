/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the "Elastic License
 * 2.0", the "GNU Affero General Public License v3.0 only", and the "Server Side
 * Public License v 1"; you may not use this file except in compliance with, at
 * your election, the "Elastic License 2.0", the "GNU Affero General Public
 * License v3.0 only", or the "Server Side Public License, v 1".
 */

import React, { FunctionComponent, HTMLAttributes } from 'react';
import classNames from 'classnames';

import { useEuiMemoizedStyles } from '../../../services';
import { CommonProps, ExclusiveUnion } from '../../common';

import {
  EuiFormFieldsetProps,
  EuiFormLegendProps,
  EuiFormFieldset,
} from '../form_fieldset';

import { EuiRadio, EuiRadioProps } from './radio';
import { euiRadioGroupStyles } from './radio_group.styles';

export interface EuiRadioGroupOption
  extends Omit<EuiRadioProps, 'checked' | 'onChange'> {
  id: string;
}

export type EuiRadioGroupChangeCallback = (id: string, value?: string) => void;

// Must omit inherit `onChange` properties or else TS complains when applying to the EuiRadio
type AsDivProps = Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>;
type WithLegendProps = Omit<EuiFormFieldsetProps, 'onChange'> & {
  /**
   * If the individual labels for each radio do not provide a sufficient description, add a legend.
   * Wraps the group in a `EuiFormFieldset` which adds an `EuiLegend` for titling the whole group.
   * Accepts an `EuiFormLegendProps` shape.
   */
  legend?: EuiFormLegendProps;
};

export type EuiRadioGroupProps = CommonProps & {
  /**
   * Passed down to all child `EuiCheckbox`es
   */
  disabled?: boolean;
  /**
   * Tightens up the spacing between radio rows
   */
  compressed?: boolean;
  name?: string;
  options: EuiRadioGroupOption[];
  idSelected?: string;
  onChange: EuiRadioGroupChangeCallback;
} & ExclusiveUnion<AsDivProps, WithLegendProps>;

export const EuiRadioGroup: FunctionComponent<EuiRadioGroupProps> = ({
  options = [],
  idSelected,
  onChange,
  name,
  className,
  disabled,
  compressed,
  legend,
  ...rest
}) => {
  const classes = classNames('euiRadioGroup', className);

  const styles = useEuiMemoizedStyles(euiRadioGroupStyles);
  const cssStyles = [
    styles.euiRadioGroup,
    compressed ? styles.compressed : styles.uncompressed,
  ];

  const radios = options.map((option, index) => {
    const {
      disabled: isOptionDisabled,
      className: optionClass,
      id,
      label,
      ...optionRest
    } = option;
    return (
      <EuiRadio
        className={classNames('euiRadioGroup__item', optionClass)}
        key={index}
        name={name}
        checked={id === idSelected}
        disabled={disabled || isOptionDisabled}
        onChange={onChange.bind(null, id, option.value)}
        id={id}
        label={label}
        {...optionRest}
      />
    );
  });

  if (!!legend) {
    // Be sure to pass down the compressed option to the legend
    legend.compressed = compressed;

    return (
      <EuiFormFieldset
        css={cssStyles}
        className={classes}
        legend={legend}
        {...(rest as EuiFormFieldsetProps)}
      >
        {radios}
      </EuiFormFieldset>
    );
  }

  return (
    <div
      css={cssStyles}
      className={classes}
      {...(rest as HTMLAttributes<HTMLDivElement>)}
    >
      {radios}
    </div>
  );
};
