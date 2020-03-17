import classNames from 'classnames';
import React, { FunctionComponent, HTMLAttributes, ReactNode } from 'react';
import { EuiScreenReaderOnly } from '../../accessibility';
import { CommonProps } from '../../common';
import { IconType } from '../../icon';
import { ToggleType } from '../../toggle';
import { ButtonColor, ButtonIconSide, EuiButton } from '../button';
import { EuiButtonIcon } from '../button_icon';
import { EuiButtonToggle } from '../button_toggle';

export interface EuiButtonGroupIdToSelectedMap {
  [id: string]: boolean;
}

export type GroupButtonSize = 's' | 'm' | 'compressed';

export interface EuiButtonGroupOption extends CommonProps {
  id: string;
  label: ReactNode;
  name?: string;
  isDisabled?: boolean;
  value?: any;
  iconSide?: ButtonIconSide;
  iconType?: IconType;
}

export interface EuiButtonGroupProps extends CommonProps {
  options?: EuiButtonGroupOption[];
  onChange: (id: string, value?: any) => void;
  /**
   * Typical sizing is `s`. Medium `m` size should be reserved for major features.
   * `compressed` is meant to be used alongside and within compressed forms.
   */
  buttonSize?: GroupButtonSize;
  isDisabled?: boolean;
  isFullWidth?: boolean;
  isIconOnly?: boolean;
  idSelected?: string;
  legend: string;
  color?: ButtonColor;
  name?: string;
  type?: ToggleType;
  idToSelectedMap?: EuiButtonGroupIdToSelectedMap;
}

type Props = Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> &
  EuiButtonGroupProps;

export const EuiButtonGroup: FunctionComponent<Props> = ({
  className,
  buttonSize = 's',
  color = 'text',
  idSelected,
  idToSelectedMap = {},
  isDisabled,
  isFullWidth,
  isIconOnly,
  name,
  legend,
  onChange,
  options = [],
  type = 'single',
  'data-test-subj': dataTestSubj,
  ...rest
}) => {
  const classes = classNames(
    'euiButtonGroup',
    [`euiButtonGroup--${buttonSize}`],
    {
      'euiButtonGroup--fullWidth': isFullWidth,
    },
    className
  );

  const fieldsetClasses = classNames('euiButtonGroup__fieldset', {
    'euiButtonGroup__fieldset--fullWidth': isFullWidth,
  });

  return (
    <fieldset className={fieldsetClasses}>
      <EuiScreenReaderOnly>
        <legend>{legend}</legend>
      </EuiScreenReaderOnly>

      <div className={classes} {...rest}>
        {options.map((option, index) => {
          const {
            id,
            name: optionName,
            value,
            label,
            isDisabled: optionDisabled,
            className,
            ...rest
          } = option;

          let isSelectedState;
          if (type === 'multi') {
            isSelectedState = idToSelectedMap[id] || false;
          } else {
            isSelectedState = id === idSelected;
          }

          let fill;
          if (buttonSize !== 'compressed') {
            fill = isSelectedState;
          }
          const buttonClasses = classNames(
            'euiButtonGroup__button',
            {
              'euiButtonGroup__button--selected': isSelectedState,
            },
            className
          );

          if (type === 'multi') {
            if (isIconOnly) {
              if (color === 'secondary') {
                console.warn(
                  'Secondary is not a support color for EuiButtonIcon. Falling back to Primary;'
                );
                color = 'primary';
              }

              return (
                <EuiButtonIcon
                  className={buttonClasses}
                  id={id}
                  color={color}
                  isDisabled={isDisabled}
                  aria-selected={isSelectedState}
                  size={buttonSize === 'compressed' ? 's' : buttonSize}
                  onClick={() => onChange(id, value)}
                  data-test-subj={dataTestSubj}
                  label={label}
                  key={index}
                  {...rest}
                />
              );
            }

            return (
              <EuiButton
                className={buttonClasses}
                id={id}
                color={color}
                fill={fill}
                isDisabled={isDisabled}
                aria-selected={isSelectedState}
                size={buttonSize === 'compressed' ? 's' : buttonSize}
                onClick={() => onChange(id, value)}
                data-test-subj={dataTestSubj}
                key={index}
                {...rest}>
                {label}
              </EuiButton>
            );
          }

          return (
            <EuiButtonToggle
              className={buttonClasses}
              toggleClassName="euiButtonGroup__toggle"
              id={id}
              key={index}
              value={value}
              color={color}
              fill={fill}
              isDisabled={optionDisabled || isDisabled}
              isIconOnly={isIconOnly}
              isSelected={isSelectedState}
              name={optionName || name}
              onChange={() => onChange(id, value)}
              size={buttonSize === 'compressed' ? 's' : buttonSize}
              type={type}
              data-test-subj={dataTestSubj}
              label={label}
              {...rest}
            />
          );
        })}
      </div>
    </fieldset>
  );
};
