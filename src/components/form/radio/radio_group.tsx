import React, { FunctionComponent, HTMLAttributes } from 'react';
import classNames from 'classnames';

import { CommonProps, ExclusiveUnion } from '../../common';

import {
  EuiFormFieldsetProps,
  EuiFormLegendProps,
  EuiFormFieldset,
} from '../form_fieldset';
import { EuiRadio, EuiRadioProps } from './radio';

export interface EuiRadioGroupOption
  extends Omit<EuiRadioProps, 'checked' | 'onChange'> {
  id: string;
}

export type EuiRadioGroupChangeCallback = (id: string, value?: string) => void;

// Must omit inherit `onChange` properties or else TS complaines when applying to the EuiRadio
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
  disabled?: boolean;
  /**
   * Tightens up the spacing between radio rows and sends down the
   * compressed prop to the radio itself
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
  const radios = options.map((option, index) => {
    const {
      disabled: isOptionDisabled,
      className: optionClass,
      ...optionRest
    } = option;
    return (
      <EuiRadio
        className={classNames('euiRadioGroup__item', optionClass)}
        key={index}
        name={name}
        checked={option.id === idSelected}
        disabled={disabled || isOptionDisabled}
        onChange={onChange.bind(null, option.id, option.value)}
        compressed={compressed}
        {...optionRest}
      />
    );
  });

  if (!!legend) {
    // Be sure to pass down the compressed option to the legend
    legend.compressed = compressed;

    return (
      <EuiFormFieldset
        className={className}
        legend={legend}
        {...rest as EuiFormFieldsetProps}>
        {radios}
      </EuiFormFieldset>
    );
  }

  return (
    <div className={className} {...rest as HTMLAttributes<HTMLDivElement>}>
      {radios}
    </div>
  );
};
