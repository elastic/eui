/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  FunctionComponent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';
import { tabbable } from 'tabbable';

import {
  EuiRadio,
  EuiRadioProps,
  EuiCheckbox,
  EuiCheckboxProps,
} from '../../form';
import { EuiSplitPanel } from '../../panel';
import { _EuiSplitPanelOuterProps } from '../../panel/split_panel';
import { useEuiTheme } from '../../../services';
import { euiCheckableCardStyles } from './checkable_card.styles';

interface EuiCheckableCardBaseProps {
  id: string;
  label: ReactNode;
  hasShadow?: _EuiSplitPanelOuterProps['hasShadow'];
  hasBorder?: _EuiSplitPanelOuterProps['hasBorder'];
}

// if `checkableType` is left out or set to 'radio', use EuiRadioProps
interface EuiCheckableCardAsRadioProps
  extends Omit<EuiRadioProps, 'compressed'> {
  /**
   * Whether the control is a radio button or checkbox
   */
  checkableType?: 'radio';
}

// if `checkableType` is set to 'checkbox', use EuiCheckboxProps
interface EuiCheckableCardAsCheckboxProps
  extends Omit<EuiCheckboxProps, 'compressed'> {
  checkableType: 'checkbox';
}

export type EuiCheckableCardProps = Omit<
  EuiCheckableCardAsCheckboxProps | EuiCheckableCardAsRadioProps,
  'label' | 'id'
> &
  EuiCheckableCardBaseProps;
export const EuiCheckableCard: FunctionComponent<EuiCheckableCardProps> = ({
  children,
  className,
  css,
  checkableType = 'radio',
  label,
  labelProps,
  checked,
  disabled,
  hasShadow,
  hasBorder = true,
  ...rest
}) => {
  const euiThemeContext = useEuiTheme();
  const styles = euiCheckableCardStyles(euiThemeContext);
  const baseStyles = [
    styles.euiCheckableCard,
    checked && !disabled && styles.isChecked,
    css,
  ];
  const labelStyles = [
    styles.label.euiCheckableCard__label,
    disabled && styles.label.isDisabled,
  ];
  const childStyles = [styles.euiCheckableCard__children];

  const { id } = rest;
  const labelEl = useRef<HTMLLabelElement>(null);
  const inputEl = useRef<HTMLInputElement>(null);
  const childrenWrapperEl = useRef<HTMLDivElement>(null);

  const classes = classNames('euiCheckableCard', className);

  const [hasInteractiveChildren, setHasInteractiveChildren] = useState(false);

  useEffect(() => {
    const interactiveElements = childrenWrapperEl.current
      ? tabbable(childrenWrapperEl.current)
      : [];
    setHasInteractiveChildren(interactiveElements.length > 0);
  }, [children, childrenWrapperEl]);

  let checkableElement;
  if (checkableType === 'radio') {
    checkableElement = (
      <EuiRadio
        checked={checked}
        disabled={disabled}
        {...(rest as EuiRadioProps)}
      />
    );
  } else {
    checkableElement = (
      <EuiCheckbox
        inputRef={inputEl}
        checked={checked}
        disabled={disabled}
        {...rest}
      />
    );
  }

  const labelClasses = classNames('euiCheckableCard__label');

  const onChangeAffordance = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!labelEl.current || e.target === inputEl.current) return;
    labelEl.current.click();
  };

  const onChildrenClick = () => {
    if (hasInteractiveChildren) return;
    labelEl.current?.click();
  };

  return (
    <EuiSplitPanel.Outer
      responsive={false}
      hasShadow={hasShadow}
      hasBorder={hasBorder}
      direction="row"
      className={classes}
      css={baseStyles}
    >
      <EuiSplitPanel.Inner
        // Bubbles up the change event when clicking on the whole div for extra affordance
        onClick={disabled ? undefined : onChangeAffordance}
        color={checked ? 'primary' : 'subdued'}
        grow={false}
      >
        {checkableElement}
      </EuiSplitPanel.Inner>
      <EuiSplitPanel.Inner>
        <label
          {...labelProps}
          ref={labelEl}
          className={labelClasses}
          css={labelStyles}
          htmlFor={id}
          aria-describedby={children ? `${id}-details` : undefined}
        >
          {label}
        </label>
        {children && (
          <div
            ref={childrenWrapperEl}
            id={`${id}-details`}
            className="euiCheckableCard__children"
            css={childStyles}
            onClick={disabled ? undefined : onChildrenClick}
            style={{
              cursor:
                !disabled && !hasInteractiveChildren ? 'pointer' : undefined,
            }}
          >
            {children}
          </div>
        )}
      </EuiSplitPanel.Inner>
    </EuiSplitPanel.Outer>
  );
};
