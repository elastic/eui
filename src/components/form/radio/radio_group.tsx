import React, { FunctionComponent, HTMLAttributes } from 'react';
import { CommonProps, Omit } from '../../common';

import { EuiRadio, RadioProps } from './radio';

export interface EuiRadioGroupOption
  extends Omit<RadioProps, 'checked' | 'onChange'> {
  id: string;
}

export type EuiRadioGroupChangeCallback = (id: string, value?: string) => void;

export type EuiRadioGroupProps = CommonProps &
  Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> & {
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
  };

export const EuiRadioGroup: FunctionComponent<EuiRadioGroupProps> = ({
  options = [],
  idSelected,
  onChange,
  name,
  className,
  disabled,
  compressed,
  ...rest
}) => (
  <div className={className} {...rest}>
    {options.map((option, index) => {
      const { disabled: isOptionDisabled, ...optionRest } = option;
      return (
        <EuiRadio
          className="euiRadioGroup__item"
          key={index}
          name={name}
          checked={option.id === idSelected}
          disabled={disabled || isOptionDisabled}
          onChange={onChange.bind(null, option.id, option.value)}
          compressed={compressed}
          {...optionRest}
        />
      );
    })}
  </div>
);
