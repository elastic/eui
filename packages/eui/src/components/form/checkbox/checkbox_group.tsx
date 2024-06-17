/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
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
import { EuiCheckbox, EuiCheckboxProps } from './checkbox';
import { euiCheckboxGroupStyles } from './checkbox_group.styles';

export interface EuiCheckboxGroupOption
  extends Omit<EuiCheckboxProps, 'checked' | 'onChange'> {
  id: string;
}

export interface EuiCheckboxGroupIdToSelectedMap {
  [id: string]: boolean;
}

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

export type EuiCheckboxGroupProps = CommonProps & {
  options: EuiCheckboxGroupOption[];
  idToSelectedMap: EuiCheckboxGroupIdToSelectedMap;
  onChange: (optionId: string) => void;
  /**
   * Tightens up the spacing between checkbox rows
   */
  compressed?: boolean;
  /**
   * Passed down to all child `EuiCheckbox`es
   */
  disabled?: boolean;
} & ExclusiveUnion<AsDivProps, WithLegendProps>;

export const EuiCheckboxGroup: FunctionComponent<EuiCheckboxGroupProps> = ({
  options = [],
  idToSelectedMap = {},
  onChange,
  className,
  disabled,
  compressed,
  legend,
  ...rest
}) => {
  const classes = classNames('euiCheckboxGroup', className);

  const styles = useEuiMemoizedStyles(euiCheckboxGroupStyles);
  const cssStyles = [
    styles.euiCheckboxGroup,
    compressed ? styles.compressed : styles.uncompressed,
  ];

  const checkboxes = options.map((option, index) => {
    const {
      disabled: isOptionDisabled,
      className: optionClass,
      ...optionRest
    } = option;
    return (
      <EuiCheckbox
        className={classNames('euiCheckboxGroup__item', optionClass)}
        key={index}
        checked={idToSelectedMap[option.id]}
        disabled={disabled || isOptionDisabled}
        onChange={onChange.bind(null, option.id)}
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
        {checkboxes}
      </EuiFormFieldset>
    );
  }

  return (
    <div
      css={cssStyles}
      className={classes}
      {...(rest as HTMLAttributes<HTMLDivElement>)}
    >
      {checkboxes}
    </div>
  );
};
