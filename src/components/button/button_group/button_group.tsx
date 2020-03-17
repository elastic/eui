import classNames from 'classnames';
import React, { FunctionComponent, HTMLAttributes, ReactNode } from 'react';
import { EuiScreenReaderOnly } from '../../accessibility';
import { CommonProps } from '../../common';
import { IconType } from '../../icon';
import { ToggleType } from '../../toggle';
import {
  ButtonColor,
  ButtonIconSide,
  EuiButton,
  colorToClassNameMap,
} from '../button';
import { EuiButtonIcon } from '../button_icon';
import { EuiIcon } from '../../icon/icon';

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
            iconType,
            iconSide,
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
              return (
                <EuiButtonIcon
                  className={buttonClasses}
                  id={id}
                  color={color === 'secondary' ? 'success' : color}
                  isDisabled={optionDisabled || isDisabled}
                  aria-selected={isSelectedState}
                  size={buttonSize === 'compressed' ? 's' : buttonSize}
                  onClick={() => onChange(id, value)}
                  data-test-subj={dataTestSubj}
                  label={label}
                  key={index}
                  iconType={iconType}
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
                isDisabled={optionDisabled || isDisabled}
                aria-selected={isSelectedState}
                size={buttonSize === 'compressed' ? 's' : buttonSize}
                onClick={() => onChange(id, value)}
                data-test-subj={dataTestSubj}
                key={index}
                iconSide={iconSide}
                iconType={iconType}
                {...rest}>
                {label}
              </EuiButton>
            );
          }

          const wrapperClasses = classNames(
            'euiButtonToggle',
            'euiToggle',
            'euiButtonGroup__toggle',
            'euiButtonToggle__wrapper',
            color ? colorToClassNameMap[color] : null,
            {
              'euiButtonToggle--isDisabled': isDisabled,
              'euiButtonToggle--isIconOnly': isIconOnly,
              'euiButton--fill': fill,
            },
            buttonClasses
          );

          const icon = iconType && (
            <EuiIcon
              type={iconType}
              color={color}
              size={buttonSize === 'compressed' ? 's' : buttonSize}
            />
          );

          return (
            <div className={wrapperClasses} key={index} {...rest}>
              <label htmlFor={id}>
                {isIconOnly ? (
                  <>
                    <EuiScreenReaderOnly>
                      <span>{label}</span>
                    </EuiScreenReaderOnly>
                    {icon}
                  </>
                ) : (
                  <>
                    {iconSide === 'left' && icon}
                    {label}
                    {iconSide === 'right' && icon}
                  </>
                )}
              </label>
              <input
                id={id}
                className="euiToggle__input"
                name={optionName || name}
                onChange={() => onChange(id, value)}
                checked={isSelectedState}
                data-test-subj={dataTestSubj}
                disabled={optionDisabled || isDisabled}
                value={value}
                type="radio"
                {...rest}
              />
            </div>
          );
        })}
      </div>
    </fieldset>
  );
};
