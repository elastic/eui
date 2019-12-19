import React, { FunctionComponent, HTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames';
import { CommonProps, ExclusiveUnion } from '../../common';

import { EuiRadio, RadioProps } from './radio';
import { EuiScreenReaderOnly } from '../../accessibility';

export interface EuiRadioGroupOption
  extends Omit<RadioProps, 'checked' | 'onChange'> {
  id: string;
}

export interface EuiRadioGroupLegend
  extends CommonProps,
    HTMLAttributes<HTMLLegendElement> {
  children: ReactNode;
  /**
   * For a hidden legend that is still visible to the screen reader, set to 'hidden'
   */
  display?: 'hidden';
}

export type EuiRadioGroupChangeCallback = (id: string, value?: string) => void;

type AsDivProps = Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>;
type WithLegendProps = {
  /**
   * If the individual labels for each radio do not provide a sufficient description, add a legend.
   * Wraps the group in a `fieldset` and adds a `legend` for titling the whole group.
   */
  legend: EuiRadioGroupLegend;
} & Omit<HTMLAttributes<HTMLFieldSetElement>, 'onChange'>;

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
  });

  if (!!legend) {
    const {
      children,
      display,
      className: legendClassName,
      ...legendRest
    } = legend;
    const isLegendHidden = display === 'hidden';
    const legendClasses = classNames(
      'euiRadioGroup__legend',
      {
        'euiRadioGroup__legend--hidden': isLegendHidden,
      },
      legendClassName
    );
    const legendDisplay = isLegendHidden ? (
      <EuiScreenReaderOnly>
        <span>{children}</span>
      </EuiScreenReaderOnly>
    ) : (
      children
    );

    return (
      <fieldset
        className={className}
        {...rest as HTMLAttributes<HTMLFieldSetElement>}>
        <legend className={legendClasses} {...legendRest}>
          {legendDisplay}
        </legend>
        {radios}
      </fieldset>
    );
  }

  return (
    <div className={className} {...rest as HTMLAttributes<HTMLDivElement>}>
      {radios}
    </div>
  );
};
